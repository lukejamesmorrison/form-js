import axios from 'axios';
import Errors from './Errors';
import Validator from './Validator';
import DefaultMessages from './Messages';
import ErrorsParser from './ErrorsParser';

/**
 * This class is responsible for managing form data and initiation HTTP 
 * requests and validation.  It's errors property contains errors 
 * generated on the client-side and from from HTTP responses.
 */
class Form {

	/**
     *  Create a new Form instance.
     *
     *	@param (object) data The attributes to be added to the form data.
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
			if (typeof (data[field]) == 'string' || typeof (data[field]) == 'number') {
				this._setPropertyFromString(field, data[field]);
			} else {
				this._setPropertyFromObject(field, data[field]);
				this._setRulesForProperty(field, data[field]);
				this._setMessagesForProperty(field, data[field]);
			};	
		};
	};

	/**
	 * Set property on form object if property is a String.
	 * 
	 * @param {string} name The name of the property.
	 * @param {string} field The value of the field.
	 */
	_setPropertyFromString(name, field)
	{
		this.originalData[name] = field;
		this[name] = field;
	}

	/**
	 * Set property on form object if property is an Object.
	 * 
 	 * @param {string} name The name of the property.
	 * @param {object} field The value of the field.
	 */
	_setPropertyFromObject(name, field)
	{
		this.originalData[name] = field.value;
		this[name] = field.value;
	}

	/**
	 * Set rules on form object for property if rules key exists.  If rules 
	 * are defined as a string, they will be reformatted into an array.
	 * 
	 * @param {string} name The name of the property.
	 * @param {object} field The value of the field.
	 * @return {array}
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
	 * @return {array}
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
	* @return {object}
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
	* For Vuejs: @change="addFile"
	* For HTML: onChange="addFile(event)"
    *
    * @param (object) event The DOM event object.
    */
	addFile(event) {
		//	Attach file to FormData object
		if (event.target.files[0]) {
			this.formData.append(event.target.name, event.target.files[0]);
			this.headers['Content-Type'] = 'multipart/form-data';
			this.hasFiles = true;
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
	*  Reset the form fields.
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
	 * Callback function to be executed before form is submitted.
	 * 
	 * @param {callback} callback 
	 */
	beforeSubmit(callback) {
		this.beforeSubmitCallback = callback;
		return this;
	};

	/**
	 * Callback function to be executed after form is submitted.
	 * 
	 * @param {callback} callback 
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
	*  Submit the form.
	*
	*  @param (string) requestType
	*  @param (string) url
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
			console.warn('Form is not valid.');
			return (new Promise((resolve, reject) => {
				reject(response);
			}));
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
	*  Handle a successful form submission.
	*
	*  @param (object) response
	*/
	onSuccess(response) {
		// Run after submit callback
		if (this.afterSubmitCallback) {
			this.afterSubmitCallback();
		};

		// Run after success callback
		if (this.afterSuccessCallback) {
			this.afterSuccessCallback();
		}

		this.submitting = false;
	};

	/**
   *  Handle a failed form submission.
   *
   *  @param (object) error
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
	 * Validate form fields based on provided rules.
	 *
	 */
	validate() {
		if(!Object.keys(this.rules).length)
		{
			return this.isValid = true;
		};

		let validations = {};
		let errors = {};

		Object.keys(this.data()).forEach(property => {

			let field_name = property;
			let value = this[property];
			let rules = this.rules[property];
			let messages = this.messages[property];

			// Only attempt property validation if rules for property exist
			if(rules) {
				let validationForProperty = this.validator.validate(field_name, value, rules, messages);
				validations[property] = validationForProperty;

				if (!validationForProperty.valid) {
					errors[property] = [];
					// Add messages to return errors property
					Object.values(validationForProperty.errors).forEach(message => {
						errors[property].push(message);
					})
				}
			}
		});

		let valid = Object.values(validations).every(validation => {
			return validation.valid == true;
		});

		this.errors.record(errors);

		this.isValid = valid;
		return {valid, validations};
	}

	/**
	 * Is form in a submitting state.
	 */
	isSubmitting()
	{
		return this.submitting;
	}

	/**
	 * Is form in a submittable state.
	 */
	isSubmittable()
	{
		return this.submittable;
	}
}

export default Form;
