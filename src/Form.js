import axios from 'axios';
import Errors from './Errors';
import Validator from './Validator';
import DefaultOptions from './options';
import ErrorsParser from './ErrorsParser';
import SectionNotDefinedException from './Exceptions/SectionNotDefinedException';
import InvalidSectionOrderException from './Exceptions/InvalidSectionOrderException';

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
	 * @param {object} customOptions The custom options to be applied to the form.
	 * @return void
     */
	constructor(data, customOptions = {}) {
		/**
		 * @property {Error} The form errors instance.
		 */
		this.errors = new Errors;
		/**
		 * @property {Validator} The form validator instance.
		 */
		this.validator = new Validator;
		/**
		 * @property {FormData} The form's FormData instance. Used when files are present in form.
		 */
		this.formData = new FormData;

		/**
		 * @property {object} Contains form's files.
		 * UNUSED
		 */
		this.files = {};
		/**
		 * @property {object} The form's rules.
		 */
		this.rules = {};
		/**
		 * @property {object} The form's headers.
		 */
		this.headers = {};
		/**
		 * @property {object} The form's error messages.
		 */
		this.messages = {};
		/**
		 * @property {object} The form's section definitions.
		 */
		this.sections = {};

		/**
		 * @property {array} The custom defined order of form sections.
		 */
		this.sectionOrder = [];
		/**
		 * @property {string} The form's currently active section.  
		 * This is for use when a form has sections.
		 */
		this.currentSection = '';

		/**
		 * @property {number} The form's current completion progress.
		 */
		this.progress = 0;
		
		/**
		 * @property {object} The form's original data from instantiation.
		 */
		this.originalData = {};
		/**
		 * @property {object} The form's options.
		 */
		this.options = DefaultOptions;
		/**
		 * @property {object} The form's custom options.
		 */
		this.customOptions = customOptions;

		/**
		 * @property {boolean} Is the form valid?
		 */
		this.isValid = false;
		/**
		 * @property {boolean} Does the form have files?
		 */
		this.hasFiles = false;
		/**
		 * @property {boolean} Is the form submitting?
		 */
		this.submitting = false;
		/**
		 * @property {boolean} Is the form submittable?
		 */
		this.submittable = true;

		/**
		 * @property {callback} Called before submit() method is called.
		 */
		this.beforeSubmitCallback = null;
		/**
		 * @property {callback} Called after submit() method is called.
		 */
		this.afterSubmitCallback = null;
		/**
		 * @property {callback} Called after request is successful.
		 */
		this.afterSuccessCallback = null;
		/**
		 * @property {callback} Called after request fails.
		 */
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
				this._addFieldToSection(field, data[field]);
			};
		};

		/**
		 * Update default form options with custom options.
		 */
		this._resolveCustomOptions();
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
		return 	typeof value == 'string' || 
				typeof value == 'number' || 
				typeof value == 'boolean' ||
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
		this.originalData[name] = this[name] = field;
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
		if(this._isEmptyObject(field) || !this._isAdvancedObject(field)) {
			this.originalData[name] = this[name] = field;
			return;
		};
		
		this.originalData[name] = this[name] = field.value;
	}

	/**
	 * Is object empty?
	 * 
	 * @param {object} obj 
	 * @return {boolean}
	 */
	_isEmptyObject(obj)
	{
		return 	Object.keys(obj).length === 0 && obj.constructor === Object;
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
		return Object.keys(obj).includes('value');
	}

	/**
	 * Set rules on form object for property if rules key exists.  If rules 
	 * are defined as a string, they will be reformatted into an array.
	 * 
	 * @param {string} fieldName The name of the property.
	 * @param {object} data The value of the field.
	 * @return void
	 */
	_setRulesForProperty(fieldName, data)
	{
		if (data.rules) {
			this.rules[fieldName] = typeof (data.rules) == 'string' 
				? data.rules.split('|') // string -> array
				: data.rules; // array
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

	_addFieldToSection(name, field)
	{
		let sectionName = field.section;

		if (sectionName) {
			// Create section if doesn't exist
			if(!this.sections[sectionName]) {
				this.sections[sectionName] = {
					valid: false,
					fields: []
				};
			};

			this.sections[sectionName].fields.push(name);

			// Set as current section if not already defined
			if(!this.currentSection) {
				this.currentSection = sectionName; 
			};
			
		};
	}

	/**
	 * Update default form options with custom options.
	 */
	_resolveCustomOptions()
	{
		for(let option in this.customOptions) {
			this.options[option] = this.customOptions[option]
		};
	}
	/**
	 * Get config to be used in HTTP request.  
	 * 
	 * This method combines form headers and custom configurations 
	 * defined in the `axios` key of the form options 
	 * object provided when instantiated.
	 * 
	 * @return {object}
	 */
	getRequestConfig()
	{
		return { 
			headers: this.headers, 
			...this.customOptions.axios
		};
	}

	/**
	* Fetch all relevant data for the form. Only the attributes whos keys 
	* are in the original data will be returned.
	*
	* @return {object} data
	*/
	data()
	{
		let data = {};

		for (let property in this.originalData) {
			data[property] = this[property];
		};

		return data;
	};

	/**
	* Add file to FormData object. Required for each form input in form triggered by 
	* a 'change' DOM event. Each file input element MUST have a name attribute.
	*
	* For Vue: @change="addFile"
	* For HTML: onChange="addFile(this)"
    *
    * @param {object} event The HTML DOM object or Vue $event object.
	* @return void
    */
	addFile(event)
	{
		
		// HTML
		if(event.files && event.files[0]) {
			let fieldName = event.name;
			this.formData.append(fieldName, event.files[0]);
			this.headers['Content-Type'] = 'multipart/form-data';
			this.hasFiles = true;
			this.originalData[fieldName] = this[fieldName] = this.formData.get(fieldName);
			this.files[fieldName] = this.formData.get(fieldName);
			return;	
		};
		
		// Vue
		if (event.target && event.target.files && event.target.files[0]) {
			let fieldName = event.target.name;
			this.formData.append(fieldName, event.target.files[0]);
			this.headers['Content-Type'] = 'multipart/form-data';
			this.hasFiles = true;
			this.originalData[fieldName] = this[fieldName] = this.formData.get(fieldName);
			this.files[fieldName] = this.formData.get(fieldName);
			return;
		};
	};

	/**
	 * Get form files.
	 * 
	 * @return {object}
	 * UNUSED
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
	* @return {FormData|null}
	*/
	getFormData()
	{
		let data = this.data();

		Object.keys(data).forEach(key => {

			//	If object property is an array, modify for FormData object
			if (Array.isArray(data[key])) {
				//	Remove items from existing object
				this.formData.delete(`${key}[]`);
				//	Add new items
				Object.values(data[key]).forEach(value => {
					this.formData.append(`${key}[]`, value)
				});
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
	reset()
	{
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
	post(url)
	{
		return this.submit('post', url);
	};

	/**
     * Call form submit for GET request.
     *
     * @param (string) url
     */
	get(url)
	{
		return this.submit('get', url);
	};

	/**
     * Call form submit for PATCH request.
     *
     * @param (string) url
     */
	patch(url) 
	{
		return this.submit('patch', url);
	};

	/**
     *  Call form submit for DELETE request.
     *
     *	@param (string) url
     */
	delete(url)
	{
		return this.submit('delete', url);
	};

	/**
     *  Call form submit for PUT request.
     *
     *	@param (string) url
     */
	put(url)
	{
		return this.submit('put', url);
	};

	/**
	 * Callback function to be executed before form is submitted.
	 * 
	 * @param {callback} callback 
	 * @return {Form}
	 */
	beforeSubmit(callback)
	{
		this.beforeSubmitCallback = callback;
		return this;
	};

	/**
	 * Callback function to be executed after form is submitted.
	 * 
	 * @param {callback} callback 
	 * @return {Form}
	 */
	afterSubmit(callback)
	{
		this.afterSubmitCallback = callback;
		return this;
	};

	/**
	 * Callback function to be executed if form submission succeeds.
	 *
	 * @param {callback} callback
	 * @return {Form}
	 */
	afterSuccess(callback)
	{
		this.afterSuccessCallback = callback;
		return this;
	}

	/**
	 * Callback function to be executed if form submission fails.
	 *
	 * @param {callback} callback
	 * @return {Form}
	 */
	afterFail(callback)
	{
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
	submit(requestType, url)
	{
		//  Only submit if form is submittable
		if (!this.submittable) {
			console.warn('Form cannot be submitted.');
			return;
		};

		// Validate form
		if (this.options.validateOnSubmit) {
			this.validate();

			if(!this.isValid) {
				return new Promise((resolve, reject) => {
					reject('Cannot submit, form is not valid.');
				});
			}
		};

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
			axios[requestType](url, data, this.getRequestConfig())
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
	 * @param {object} response The response object returned from the HTTP request.
	 * @return void
	 */
	onSuccess(response)
	{
		// Run after submit callback
		if (this.afterSubmitCallback) {
			this.afterSubmitCallback(response);
		};

		// Run after success callback
		if (this.afterSuccessCallback) {
			this.afterSuccessCallback(response);
		};

		this.submitting = false;
	};

	/**
     * Handle a failed form submission.
     *
     * @param {object} response The response object returned from the HTTP request.
     * @return void
     */
	onFail(response)
	{
		// Run after fail callback
		if (this.afterFailCallback) {
			this.afterFailCallback(response);
		};

		// Resolve submitting state
		this.submitting = false;

		// Record errors in forms
		let parsedErrors = (new ErrorsParser).getErrors(response);
		this.errors.record(parsedErrors);
	};

	/**
	 * List current sections in order.
	 *
	 * @return {array}
	 */
	getSections()
	{
		return this.sectionOrder.length ? this.sectionOrder : Object.keys(this.sections);
	}

	/**
	 * 
	 * @param {array} sections An array containing the form section names in order.
	 */
	orderSections(sections)
	{
		// Check if new order equals current order
		if(this.getSections() === sections) {
			return;
		};

		// Ensure all sections are present
		let difference = sections.filter(section => !this.getSections().includes(section));
		let differenceString = difference.join(',');

		if(difference.length) {
			throw new InvalidSectionOrderException(`Cannot set new section order. The form does not currently have the following sections defined: ${differenceString}`);
		};

		// Set new section order
		return this.sectionOrder = sections;
	}

	/**
	 * Validate form fields.
	 *
	 * @return {object}
	 */
	validate()
	{
		// Check for strict sections
		if(!this._checkStrictSections()) {	
			this.isValid = false;
			return { valid: this.isValid };
		}

		// Valid if no rules have been defined
		else if(!Object.keys(this.rules).length) {
			this.isValid = true;
			return { valid: this.isValid };
		}

		else {
			let errors = {};
			let validations = {};

			Object.keys(this.data()).forEach(field_name => {
				let fieldValidation = this.validateField(field_name);
				validations[field_name] = fieldValidation.valid;
				errors[field_name] = fieldValidation.errors;
			});

			let valid = Object.values(validations).every(validation => validation == true);
			this.isValid = valid;
			this.errors.record(errors);
			
			return { valid, validations };
		}
	}

	/**
	 * Validate form fields then call function.
	 * 
	 * This method can be used in order to further aid in 
	 * streamlining application flow.
	 * 
	 * @param {callback} callback 
	 */
	validateThen(callback)
	{
		this.validate();

		if(this.isValid) {
			callback(this.data());
		};
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

		return { valid, validations };
	}

	/**
	 * Validate a form field.
	 * 
	 * @param {string} fieldName 
	 * @return {object}
	 */
	validateField(fieldName)
	{
		let errors = [];
		let rules = this.rules[fieldName];
		let messages = this.messages[fieldName];
		let valid = rules && rules.length ? false : true;

		// Only attempt property validation if rules for property exist
		if(rules) {
			let validateRules = this.validator.validate(fieldName, rules, this.data(), messages);

			valid = validateRules.valid;

			if (!validateRules.valid) {
				// Add messages to return errors property
				Object.values(validateRules.errors).forEach(message => {
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
	 * @param {array[string]} fields The fields belonging to the section.
	 * @return void
	 */
	defineSection(name, fields)
	{
		this.sections[name] = {
			valid: false,
			fields
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

	/**
	 * Get the current form section.
	 *
	 * @return {string}
	 */
	getCurrentSection()
	{
		return this.currentSection;
	}

	/**
	 * Set current section to next section if it exists.
	 *
	 * @return {string} 
	 */
	nextSection()
	{
		let currentIndex = this.getSections().indexOf(this.getCurrentSection());
		let nextIndex = currentIndex + 1;

		currentIndex = 	nextIndex < this.getSections().length ? nextIndex  : currentIndex

		this.currentSection = this.getSections()[currentIndex];
		this.updateProgress();

		return this.currentSection;
	}

	/**
	 * Set current section to previous section if it exists.
	 *
	 * @return {string} 
	 */
	previousSection()
	{
		let currentIndex = this.getSections().indexOf(this.getCurrentSection());
		let nextIndex = currentIndex - 1;

		currentIndex = 	nextIndex >= 0 ? nextIndex : currentIndex;

		this.currentSection = this.getSections()[currentIndex];
		this.updateProgress();

		return this.currentSection;
	}
	
	/**
	 * Set the current form section.
	 *
	 * @param {string} name The section name to be set.
	 * @return {string}
	 */
	setCurrentSection(name)
	{
		if(!this.getSections().includes(name)) {
			throw new SectionNotDefinedException(`The '${name}' section is not currently defined on the form.`);
		};

		this.currentSection = name;
		this.updateProgress();
		return name;
	}

	/**
	 * Get form progress through sections. This should only be used when form sections are completed in order.
	 *
	 * @return {number}
	 */
	updateProgress()
	{

		let sectionsLength = this.getSections().length;

		if(sectionsLength === 0) {
			throw new Error('Cannot get progress, form does not have any sections defined');
		};

		let currentIndex = this.getSections().indexOf(this.currentSection);

		// If final section is for review, we will reduce section length by 
		// one so that is is considered for form progress.
		this.options.finalSectionForReview ? sectionsLength-- : sectionsLength;

		return this.progress = Math.round(currentIndex/sectionsLength * 100, 2);
	}

	getProgress()
	{
		return this.progress;
	}

	/**
	 * Get field names in a specific section.
	 * 
	 * @param {string} name The section name.
	 * @return {array} The array of field names in section.
	 */
	getSectionFields(name)
	{
		return this.sections[name] ? this.sections[name].fields : [];
	}

	/**
	 * Check if all form fields are associated with a section.
	 */
	_checkStrictSections()
	{
		if(this.options.strictSections) {
			let allFields = Object.keys(this.data()).sort();
			let sectionFields = Object.values(this.sections).map(section => section.fields).flat().sort();

			return JSON.stringify(allFields) === JSON.stringify(sectionFields);
		};
		return true;
	}
}

export default Form;
