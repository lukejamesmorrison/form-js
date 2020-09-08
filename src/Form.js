import axios from 'axios';
import Errors from './Errors';
import Validator from './Validator';
import ErrorsParser from './ErrorsParser';

/**
 * This class is responsible for managing form data and initiation HTTP 
 * requests and validation.  It's errors property contains errors 
 * generated on the client-side and from from HTTP responses.
 */
class Form {

	/**
     * Create a new Form instance.
     *
	 * @param {object} data The attributes to be added to the form data.
	 * @return void
     */
	constructor(data, options = {}) {
		this.errors = new Errors;
		this.validator = new Validator;
		this.formData = new FormData;

		this.originalData = {};
		this.options = options;
		this.headers = {};
		this.files = {};
		this.rules = {};
		this.messages = {};
		this.sections = {};

		this.isValid = false;
		this.hasFiles = false;

		this.submitting = false;
		this.submittable = true;

		this.beforeSubmitCallback = null;
		this.afterSubmitCallback = null;
		this.afterSuccessCallback = null;
		this.afterFailCallback = null;
	
		/**
		 * Cast values to originalData object, create properties on
		 * form object and add rules. If strings are provided,
		 * they are created as null properties.
		*/
		for (let field in data) {
			if (this._isSimpleValue(data[field])) {
				this._setPropertyFromSimpleValue(field, data[field]);
			} else {
				this._setPropertyFromObject(field, data[field]);
				this._setRulesForProperty(field, data[field]);
				this._setMessagesForProperty(field, data[field]);
			};	
		};

		// Provide validator with current fields
		this.validator.setData(this.data());

		// Resolve options on form
		// this._resolveOptions();
	};

	/**
	 * Verify if field value is 'simple'.
	 *
	 * Acceptable simple values are strings, numbers, booleans, arrays or null.
	 *
	 * @param {mixed} value 
	 * @return {boolean}
	 */
	_isSimpleValue(value)
	{
		return 	typeof (value) == 'string' || 
				typeof (value) == 'number' || 
				typeof (value) == 'boolean' ||
				Array.isArray(value) ||
				value == null
	}

	/**
	 * Set property on form object if property is a String.
	 * 
	 * @param {string} name The name of the property.
	 * @param {string} field The value of the field.
	 * @return void
	 */
	_setPropertyFromSimpleValue(name, field)
	{
		this.originalData[name] = field;
		this[name] = field;
	}

	/**
	 * Set property on form object if property is an Object. Custom objects can be empty 
	 * or must NOT contain a key of "value".  If this is the case, it will be treated 
	 * like it has rules and validation logic rather than pure data.
	 * 
 	 * @param {string} name The name of the property.
	 * @param {object} field The value of the field.
	 * @return void
	 */
	_setPropertyFromObject(name, field)
	{
		if(this._isEmptyObject(field) || this._isAdvancedObject(field))
		{
			this.originalData[name] = field;
			this[name] = field;
			return;
		};
		
		this.originalData[name] = field.value;
		this[name] = field.value;
	}

	/**
	 * Is object empty?
	 * 
	 * @param {object} obj 
	 * @return {boolean}
	 */
	_isEmptyObject(obj)
	{
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	}

	/**
	 * Check if object has a value property.  If it does not, we 
	 * will return true signifying the provided object is user 
	 * data and should not contain rules or validation logic.
	 * 
	 * @param {Object} obj 
	 * @return {boolean}
	 */
	_isAdvancedObject(obj)
	{
		return !Object.keys(obj).includes('value');
	}

	/**
	 * Set rules on form object for property if rules key exists.  If rules 
	 * are defined as a string, they will be reformatted into an array.
	 * 
	 * @param {string} name The name of the property.
	 * @param {object} field The value of the field.
	 * @return void
	 */
	_setRulesForProperty(name, field)
	{
		if (field.rules) {
			this.rules[name] = typeof (field.rules) == 'string' 
				? field.rules.split('|') // string -> array
				: field.rules; // array
		};
	}

	/**
	 * Set messages on form object for property if messages key exists.
	 * 
	 * @param {string} name The name of the property.
	 * @param {object} field The value of the field.
	 * @return void
	 */
	_setMessagesForProperty(name, field)
	{
		if (field.messages) {
			this.messages[name] = field.messages; // Object
		};
	}

	/**
	*  Fetch all relevant data for the form.
	*
	* @return {object} data
	*/
	data() {
		let data = {};

		for (let property in this.originalData) {
			data[property] = this[property];
		};

		return data;
	};

	/**
    * Add file to FormData object. Required for each form input 
	* in form triggered by a 'change' DOM event.
	*
	* For Vue: @change="addFile"
	* For HTML: onChange="addFile(this)"
    *
    * @param {object} event The HTML DOM object or Vue $event object.
	* @return void
    */
	addFile(event) {
		//	Attach file to FormData object

		// HTML
		if(event.files && event.files[0]) {
			this.formData.append(event.name, event.files[0]);
			this.headers['Content-Type'] = 'multipart/form-data';
			this.hasFiles = true;
			return;
		};
		
		// Vue
		if (event.target && event.target.files && event.target.files[0]) {
			this.formData.append(event.target.name, event.target.files[0]);
			this.headers['Content-Type'] = 'multipart/form-data';
			this.hasFiles = true;
			return;
		};

	};

	/**
	 * Get form files.
	 * 
	 * @return {object}
	 */
	getFiles()
	{
		return this.files;
	};

	/**
	* Consolidate DOM FormData object (this.formData) for form submission. Required 
	* for submitting forms with files. Also resolves submitting arrays.
	*
	* @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
	*
	* @return {FormData}
	*/
	getFormData() {
		let data = this.data();

		Object.keys(data).forEach(key => {

			//	If object property is an array, modify for FormData object
			if (Array.isArray(data[key])) {

				//	Remove items from existing object
				this.formData.delete(`${key}[]`);

				//	Add new items
				Object.values(data[key]).forEach(value => this.formData.append(`${key}[]`, value));

			}

			//	If null, don't add to FormData object
			else if (data[key] == null) {
				return;
			}
			else {
				this.formData.append(key, data[key])
			};

		});

		return this.formData;
	};

	/**
	 * Reset the form fields.
	 * 
	 * @return void
	*/
	reset() {
		// Clear data fields
		for (let field in this.originalData) {
			this[field] = null;
		};
		// Clear errors
		this.errors.clear();
	};

	/**
	* Call form submit for POST request.
	*
	* @param (string) url
	*/
	post(url) {
		return this.submit('post', url);
	};

	/**
     * Call form submit for GET request.
     *
     * @param (string) url
     */
	get(url) {
		return this.submit('get', url);
	};

	/**
     * Call form submit for PATCH request.
     *
     * @param (string) url
     */
	patch(url) {
		return this.submit('patch', url);
	};

	/**
     *  Call form submit for DELETE request.
     *
     *	@param (string) url
     */
	delete(url) {
		return this.submit('delete', url);
	};

	/**
     *  Call form submit for PUT request.
     *
     *	@param (string) url
     */
	put(url) {
		return this.submit('put', url);
	};

	/**
	 * Callback function to be executed before form is submitted.
	 * 
	 * @param {callback} callback 
	 * @return {Form}
	 */
	beforeSubmit(callback) {
		this.beforeSubmitCallback = callback;
		return this;
	};

	/**
	 * Callback function to be executed after form is submitted.
	 * 
	 * @param {callback} callback 
	 * @return {Form}
	 */
	afterSubmit(callback) {
		this.afterSubmitCallback = callback;
		return this;
	};

	/**
	 * Callback function to be executed if form submission succeeds.
	 *
	 * @param {callback} callback
	 * @return {Form}
	 */
	afterSuccess(callback) {
		this.afterSuccessCallback = callback;
		return this;
	}

	/**
	 * Callback function to be executed if form submission fails.
	 *
	 * @param {callback} callback
	 * @return {Form}
	 */
	afterFail(callback) {
		this.afterFailCallback = callback;
		return this;
	}

	/**
	 * Submit the form.
	 *
	 * @param {string} requestType
	 * @param {string} url
	 * @return {Promise|null}
	*/
	submit(requestType, url) {
		//  Only submit if form is submittable
		if (!this.submittable) {
			console.warn('Form cannot be submitted.');
			return;
		};

		// Validate form
		this.validate();

		if(!this.isValid) {
			// console.warn('Form is not valid.');
			return new Promise((resolve, reject) => {
				reject('Cannot submit, form is not valid.');
			});
		}

		// Clear errors
		this.errors.clear();

		// Set submitting to true
		this.submitting = true;

		// Run before submit callback
		if (this.beforeSubmitCallback) {
			this.beforeSubmitCallback();
		};

		// If request has files, we will send a FormData() object
		let data = this.hasFiles ? this.getFormData() : this.data();

		return new Promise((resolve, reject) => {
			axios[requestType](url, data, this.headers)
				.then(response => {
					this.onSuccess(response);
					resolve(response);
				})
				.catch(error => {
					this.onFail(error.response);
					reject(error.response);
				});
		});
	};

	/**
	 * Handle a successful form submission.
	 *
	 * @param {object} response
	 * @return void
	 */
	onSuccess(response) {
		// Run after submit callback
		if (this.afterSubmitCallback) {
			this.afterSubmitCallback(response);
		};

		// Run after success callback
		if (this.afterSuccessCallback) {
			this.afterSuccessCallback(response);
		}

		this.submitting = false;
	};

	/**
   *  Handle a failed form submission.
   *
   *  @param {object} error
   * @return void
   */
	onFail(response) {
		// Run after fail callback
		if (this.afterFailCallback) {
			this.afterFailCallback();
		};

		// Resolve submitting state
		this.submitting = false;

		// Record errors in forms
		let parsedErrors = (new ErrorsParser).getErrors(response);
		this.errors.record(parsedErrors);
	};

	/**
	 * Validate form fields.
	 *
	 * @return {object}
	 */
	validate() {
		if(!Object.keys(this.rules).length) {
			return this.isValid = true;
		};

		let errors = {};
		let validations = {};

		Object.keys(this.data()).forEach(field_name => {
			let fieldValidation = this.validateField(field_name);
			validations[field_name] = fieldValidation.valid;
			errors[field_name] = fieldValidation.errors;
		});

		let valid = Object.values(validations).every(validation => validation == true);

		this.errors.record(errors);
		this.isValid = valid;

		return {valid, validations};
	}

	/**
	 * Validate a form section.
	 * 
	 * @param {string} name The name of the section.
	 * @return {object}
	 */
	validateSection(name)
	{
		let errors = {};
		let validations = {};
		let section = this.sections[name];

		// Throw error if section does not exist
		if(!section) {
			console.warn(`There is no section with name '${name}' defined.`);
			return false;
		};

		section.fields.forEach(field_name => {
			let fieldValidation = this.validateField(field_name);
			validations[field_name] = fieldValidation.valid;
			errors[field_name] = fieldValidation.errors;
		});

		let valid = Object.values(validations).every(validation => validation == true);

		this.errors.record(errors);
		this.sections[name].valid = valid;

		return {valid, validations};
	}

	/**
	 * Validate a form field.
	 * 
	 * @param {string} field_name 
	 * @return {object}
	 */
	validateField(field_name)
	{
		let errors = [];
		let value = this[field_name];
		let rules = this.rules[field_name];
		let messages = this.messages[field_name];
		let valid = rules && rules.length ? false : true;

		// Only attempt property validation if rules for property exist
		if(rules) {
			let validationForField = this.validator.validate(field_name, value, rules, messages);
			valid = validationForField.valid;

			if (!validationForField.valid) {
				// Add messages to return errors property
				Object.values(validationForField.errors).forEach(message => {
					errors.push(message);
				})
			}
		};

		return { valid, errors };
	}

	/**
	 * Is form in a submitting state.
	 * 
	 * @return {boolean}
	 */
	isSubmitting()
	{
		return this.submitting;
	}

	/**
	 * Is form in a submittable state.
	 * 
	 * @return {boolean}
	 */
	isSubmittable()
	{
		return this.submittable;
	}

	/**
	 * Define a form section.
	 * 
	 * @param {string} name The name of the section.
	 * @param {array} fieldNames The fields belonging to the section.
	 * @return void
	 */
	defineSection(name, fieldNames)
	{
		this.sections[name] = {
			valid: false,
			fields: fieldNames
		};
	}

	/**
	 * Is a section valid?
	 * 
	 * @param {string} name The name of the section.
	 * @return {boolean}
	 */
	sectionIsValid(name)
	{
		return this.sections[name] && this.sections[name].valid;
	}
}

export default Form;
