import axios from 'axios';
import Errors from './Errors';
import Validator from './Validator';

/**
 * 
 * A Form class that supports files and HTTP requests.
 * 
 */
class Form {

	/**
     *  Create a new Form instance.
     *
     *	@param (object) data The attributes to be added to the form data.
     */
	constructor(data) {
		this.originalData = {};
		this.errors = new Errors();
		this.validator = new Validator();
		this.headers = {};
		this.files = {};
		this.rules = {};
		this.isValid = false;
		this.hasFiles = false;
		this.formData = new FormData();
		this.submitting = false;
		this.submittable = true;
		this.beforeSubmitCallback = null;
		this.afterSubmitCallback = null;
		this.afterSuccessCallback = null;
		this.afterFailCallback = null;


		/**
		 * Cast values to originalData object, create properties on
		 * form object and add rules. If strings areprovided,
		 * they are created as null properties.
		*/
		for (let field in data) {
			if (typeof (data[field]) == 'string') {
				this._setPropertyFromString(field, data[field]);
				// this._setPropertyFromString(data[field], null);

			} else {
				this._setPropertyFromObject(field, data[field]);
				this._setRulesForProperty(field, data[field]);
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
	 * Set rule on form object for property if rules key exists.
	 * 
	 * @param {string} name The name of the property.
	 * @param {object} field The value of the field.
	 */
	_setRulesForProperty(name, field)
	{
		if (field.rules) {
			this.rules[name] = typeof (field.rules) == 'string' 
				? field.rules.split('|') 
				: field.rules;
		};
	}

	/**
	*  Fetch all relevant data for the form.
	*/
	data() {
		let data = {};

		for (let property in this.originalData) {
			data[property] = this[property];
		};

		return data;
	};

	/**
   *	Add file to FormData object. Required for each
   *	form input in form using @change event and
   *	$event object.
   *
   *	@param (object) event The DOM event object.
   */
	addFile(event) {
		//	Attach file to FormData objet
		if (event.target.files[0]) {
			this.formData.append(event.target.name, event.target.files[0]);
			this.headers['Content-Type'] = 'multipart/form-data';
			this.hasFiles = true;
		};

	};

	/**
	 * Get form files.
	 * 
	 * @return Object
	 */
	getFiles()
	{
		return this.files;
	};

	/**
	*	Consolidate DOM FormData object (this.formData) for form
	* 	submission.  Required for submitting forms with
	*	files.  Also resolves submitting arrays.
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

			//	If null, not add to FormData object
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
		for (let field in this.originalData) {
			this[field] = null;
		};
		this.errors.clear();
	};

	/**
	*  Call form submit for POST request.
	*
	*	@param (string) url
	*/
	post(url) {
		return this.submit('post', url);
	};

	/**
     *  Call form submit for GET request.
     *
     *	@param (string) url
     */
	get(url) {
		return this.submit('get', url);
	};

	/**
     *  Call form submit for PATCH request.
     *
     *	@param (string) url
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
	 */
	afterSuccess(callback) {
		this.afterSuccessCallback = callback;
		return this;
	}

	/**
	 * Callback function to be executed if form submission fails.
	 *
	 * @param {callback} callback
	 */
	afterFail(callback) {
		this.afterFailCallback = callback;
		return this;
	}

	/**
	*  Submit the form.
	*
	*  @param (string) requestType
	*	@param (string) url
	*/
	submit(requestType, url) {
		//  Only submit if form is submittable
		if (!this.submittable) {
			console.log('Form cannot be submitted.');
			return;
		};

		// Validate form
		this.validate(this.data());
		if(!this.isValid) {
			console.log('Form is not valid.');
			return;
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
	onSuccess(data) {
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
	onFail(errors) {
		// Run after fail callback
		if (this.afterFailCallback) {
			this.afterFailCallback();
		};

		this.submitting = false;
		this.errors.record(errors);
	};

	validate() {
		if(!Object.keys(this.rules).length)
		{
			this.isValid = true;
			return true;
		};

		let validations = {};
		// let errors = {};

		Object.keys(this.data()).forEach(property => {

			let validationForProperty = this.validator.validate(this[property], this.rules[property]);
			validations[property] = validationForProperty;

			if (!validationForProperty.valid) {
				// Add errors property to returned object
			}
		})

		let valid = Object.values(validations).every(validation => {
			return validation.valid == true
		});

		this.isValid = valid;
		return {valid, validations};
	}
}

export default Form;
