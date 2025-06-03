/**
 * This class is responsible for managing form validation rules.
 */
class Rules {

    /**
     * Validate that a field's date value is after another's.
     *
     * @param {string} fieldName 
     * @param {string} afterFieldName 
     * @param {object} formFields 
     * @return {boolean}
     */
    validateAfter(fieldName, afterFieldName, formFields)
    {
        let fieldValue = formFields[fieldName];
        let afterFieldValue = formFields[afterFieldName];

        if(this.validateDate(fieldValue) && this.validateDate(afterFieldValue)) {
            return this._compareDates(fieldValue, afterFieldValue) === 1;
        };

        return false;
    }

    /**
     * Validate that a value contains only alphabetic characters.
     *
     * @param {string} value 
     * @return {boolean}
     */
    validateAlpha(value)
    {
        return typeof(value) === 'string' && value.match(/^[a-z]+$/i);
    }

    /**
     * Validate that a value contains only alphabetic characters, hyphens and underscores.
     *
     * @param {string} value 
     * @return {boolean}
     */
    validateAlphaDash(value)
    {
        return  typeof(value) === 'string' && 
                typeof(value) !== 'number' &&
                value.match(/^[a-z\-\_]+$/i);
    }

    /**
     * Validate that a value contains only alphanumeric characters.
     *
     * @param {string} value 
     * @return {boolean}
     */
    validateAlphaNum(value)
    {
        return  typeof(value) === 'string' && 
                typeof(value) !== 'number' &&
                value.match(/^[a-z0-9]+$/i);
    }

    /**
     * Validate if value is an array.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateArray(value)
    {
        return Array.isArray(value);
    }

    /**
     * Validate that a field's date value is before another's.
     *
     * @param {string} fieldName 
     * @param {string} beforeFieldName 
     * @param {object} formFields 
     * @return {boolean}
     */
    validateBefore(fieldName, beforeFieldName, formFields)
    {
        let fieldValue = formFields[fieldName];
        let beforeFieldValue = formFields[beforeFieldName];

        if(this.validateDate(fieldValue) && this.validateDate(beforeFieldValue)) {
            return this._compareDates(fieldValue, beforeFieldValue) === -1;
        };

        return false;
    }

    /**
     * Compare two dates.
     *
     * @param {mixed} first The first date value to be compared.
     * @param {mixed} second The second date value to be compared.
     * @return {integer}
     */
    _compareDates(first, second)
    {
        let firstDate = (new Date(first)).valueOf();
        let secondDate = (new Date(second)).valueOf();

        return Math.sign(firstDate - secondDate);
    }
    
    /**
     * Validate if value is boolean.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateBoolean(value)
    {
        let acceptable = [true, false, 1, 0, '1', '0'];
        return acceptable.includes(value);
    }

    /**
     * Validate if value is a date.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date
     *
     * @param {mixed} value 
     */
    validateDate(value)
    {
        return new Date(value) != 'Invalid Date';
    }


    validateDateEquals(fieldName, otherFieldName, formFields)
    {
        let firstDate =  new Date(formFields[fieldName]);
        let secondDate = new Date(formFields[otherFieldName]);

        return  firstDate != 'Invalid Date' &&
                firstDate.valueOf() === secondDate.valueOf();
    }

    /**
     * Validate if value is an email address.
     *
     * @param {string} value 
     * @return {boolean}
     */
    validateEmail(value) {
        let matches = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);

        return matches ? matches.length > 0 : false;
    }

    /**
     * Validate that a form field is a file.
     *
     * @param {string} fieldName
     * @param {File} file
     */
    validateFile(fieldName, formData)
    {
        let field = formData[fieldName];
        // let extension = this._getFileExtension(field);
        return field instanceof File;
    }

    /**
     * Get extension from filename string.
     *
     * @param {string} file 
     * @return {string}
     */
    _getFileExtension(file)
    {
        return file.name.split('.').pop();
    }

    /**
     * Validate if value is string.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateString(value) {
        return typeof value === 'string';
    }

    /**
     * Validate if value is integer.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateInteger(value) {
        return  !isNaN(+value) && 
                Number.isInteger(+value);
    }

    /**
     * Validate if value is object.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateObject(value) {
        return  value instanceof Object && 
                !(value instanceof Array);
    }

    /**
     * Validate if value is less than or equal to max.
     *
     * @param {mixed} value 
     * @param {number} max
     * @return {boolean}
     */
    validateMax(value, max) {
        // Number
        if (typeof (value) === 'number') {
            return value <= max;
        }

        // String, Array
        return value.length <= max;
    }

    /**
     * Validate if value is greater than or equal to min.
     *
     * @param {mixed} value 
     * @param {number} min
     * @return {boolean}
     */
    validateMin(value, min) {
        // Number
        if (typeof (value) === 'number') {
            return value >= min;
        }

        // String, Array
        return value.length >= min;
    }

    /**
     * Validate if value is null.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateNull(value) {
        return value == null;
    }

    /**
     * Validate if value is numeric.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateNumeric(value) {
        return !isNaN(value);
    }

    /**
     * Validate if value is required.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateRequired(value) {
        return  value != null && 
                value != '' && 
                value.length != 0;
    }

    /**
     * Validate that value is required if another field equals a certain value.
     *
     * @param {string} fieldName The field name to be validated
     * @param {array} otherFieldName The name of field to be validated against
     * @param {array} otherFielValue The value of field to be validated against
     * @param {object} formFields The forms fields.
     * @return {boolean}
     */
    validateRequiredIf(fieldName, otherFieldName, otherFieldValue, formFields) {
        let formFieldValue = formFields[otherFieldName];

        // Check for boolean
        if (otherFieldValue == 'true' || otherFieldValue == 'false') {
            otherFieldValue = this._convertStringToBoolean(otherFieldValue);
        };

        return formFieldValue != otherFieldValue 
            ? false
            : this.validateRequired(formFields[fieldName]);
    }

    /**
     * Validate that a field is required unless another field has a specific value.
     * 
     * @param {string} fieldName The field name to be validated
     * @param {array} otherFieldName The name of field to be validated against
     * @param {array} otherFielValue The value of field to be validated against
     * @param {object} formFields The forms fields.
     * @return {boolean}
     */
    validateRequiredUnless(fieldName, otherFieldName, otherFieldValue, formFields) {

        let formFieldValue = formFields[otherFieldName];

        // Check for boolean
        if (otherFieldValue == 'true' || otherFieldValue == 'false') {
            otherFieldValue = this._convertStringToBoolean(otherFieldValue);
        };

        return formFieldValue == otherFieldValue 
            ? true
            : this.validateRequired(formFields[fieldName]);
    }

    /**
     * 
     * @param {string} fieldName The field name to be validated
     * @param {array} otherFieldNames The field names of fields to be validated against
     * @param {object} formFields 
     * @return {boolean}
     */
    validateRequiredWith(fieldName, otherFieldNames, formFields) {
        let valid_num = 0;

        otherFieldNames.forEach(name => {
            if(this.validateRequired(formFields[name])) {
                valid_num++;
            };
        })

        return valid_num > 0
            ? this.validateRequired(formFields[fieldName]) 
            : false;
    }

    /**
     * Validate that a field is require will all names fields.
     * 
     * @param {string} fieldName The field name to be validated
     * @param {array} otherFieldNames The field names of fields to be validated against
     * @param {object} formFields 
     * @return {boolean}
     */
    validateRequiredWithAll(fieldName, otherFieldNames, formFields)
    {
        let valid_num = 0;

        otherFieldNames.forEach(name => {
            if(this.validateRequired(formFields[name])) {
                valid_num++;
            };
        })

        return otherFieldNames.length === valid_num 
            ? this.validateRequired(formFields[fieldName]) 
            : false;
    }

    /**
     * Validate a URL string.
     * @see https://gist.github.com/dperini/729294
     * 
     * @param {string} value The URL string to be validated.
     * @return {boolean}
     */
    validateUrl(value)
    {
        let regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

        let matches = value.match(regex);
        return matches && matches.length;
    }

    /**
     * Validate if value is of length.
     *
     * @param {mixed} value 
     * @param {number} length
     * @return {boolean}
     */
    validateLength(value, length) 
    {
        return value.length == length;
    }

    /**
     * Validate if value equals another value.
     *
     * @param {mixed} value 
     * @param {mixed} comparedValue 
     * @return {boolean}
     */
    validateEquals(value, comparedValue) {

        if (Array.isArray(value) && Array.isArray(comparedValue))
        {
            return JSON.stringify(value) === JSON.stringify(comparedValue);
        };

        return value == comparedValue;
    }

    /**
     * Validate if value is greater than another value.
     *
     * @param {number} value 
     * @param {number} comparedValue 
     * @return {boolean}
     */
    validateGt(value, comparedValue)
    {
        return value > comparedValue;
    }

    /**
     * Validate if value is less than another value.
     *
     * @param {number} value 
     * @param {number} comparedValue 
     * @return {boolean}
     */
    validateLt(value, comparedValue) {
        return value < comparedValue;
    }

    /**
     * Validate if value is greater than or equal to another value.
     *
     * @param {number} value 
     * @param {number} comparedValue 
     * @return {boolean}
     */
    validateGte(value, comparedValue)
    {
        return this.validateGt(value, comparedValue) || this.validateEquals(value, comparedValue);
    }

    /**
     * Validate if value is less than or equals another value.
     *
     * @param {number} value 
     * @param {number} comparedValue 
     * @return {boolean}
     */
    validateLte(value, comparedValue)
    {
        return this.validateLt(value, comparedValue) || this.validateEquals(value, comparedValue);
    }

    /**
     * Validate if value is between two values.
     *
     * @param {mixed} value 
     * @param {number} lowerValue 
     * @param {number} higherValue 
     * @return {boolean}
     */
    validateBetween(value, lowerValue, higherValue)
    {
        return this.validateLt(value, higherValue) && this.validateGt(value, lowerValue);
    }

    /**
     * Validate if value is in an array.
     *
     * @param {mixed} value 
     * @param {array} array
     * @return {boolean}
     */
    validateInArray(value, array)
    {
        return array.includes(value);
    }

    /**
     * Validate if field value is different than another field value.
     *
     * @param {mixed} fieldValue
     * @param {array} otherFieldName
     * @param {object} formFields
     * @return {boolean}
     */
    validateDifferent(fieldName, otherFieldName, formFields)
    {
        let fieldValue = formFields[fieldName];
        let otherFieldValue = formFields[otherFieldName];

        // String, Number or Boolean
        if(['string', 'number', 'boolean'].includes(typeof(fieldValue))) {
            return fieldValue !== otherFieldValue;
        };

        // Array
        if(Array.isArray(fieldValue)) {
            return fieldValue !== otherFieldValue;
        }

        // Object
        if(typeof(fieldValue) === 'object') {
            return JSON.stringify(fieldValue) !== JSON.stringify(otherFieldValue);
        }
    }

    /**
     * Validate if field is confirmed by another field.
     * 
     * @param {string} fieldName 
     * @param {object} formFields 
     * @return {boolean}
     */
    validateConfirmed(fieldName, formFields)
    {
        let keys = Object.keys(formFields);
        let confirmFieldName = `${fieldName}_confirmation`;

        return  keys.includes(confirmFieldName) &&
                formFields[fieldName] == formFields[confirmFieldName];
    }

    /**
     * Validate if field is present and not empty.
     * 
     * @param {string} fieldName 
     * @param {object} formFields 
     * @return {boolean}
     */
    validateFilled(fieldName, formFields)
    {
        let keys = Object.keys(formFields);

        return  keys.includes(fieldName) && 
                // Boolean and numbers should still be permitted so we exclude `0` and `false`
                formFields[fieldName] !== null && 
                formFields[fieldName] !== ''
    }

    /**
     * Validate that a value is a valid JSON string.
     * 
     * @param {string} value
     * @return {boolean}
     */
    validateJson(value)
    {
        // let fieldValue = formFields[fieldName];

        if(typeof(value) !== 'string') {
            return false;
        };

        try {
            JSON.parse(value);
            return true;
        } catch(e) {
            return false;
        };
    }

    /**
     * Validate that a value is a valid IP address ahering to IPv4 or IPv6 standard.
     *
     * @param {string} value 
     * @return {boolean}
     */
    validateIp(value)
    {
        if(typeof value !== 'string') {
            return false
        };

        return this.validateIpv4(value) || this.validateIpv6(value);
    }

    /**
     * Validate that a value is a valid IPv4 string.
     *
     * @see https://stackoverflow.com/questions/5284147/validating-ipv4-addresses-with-regexp
     * @param {string} value 
     * @return {boolean}
     */
    validateIpv4(value)
    {
        if(typeof value !== 'string') {
            return false
        };

        let matches = value.match(/^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/);

        return matches && matches.length;
    }

    /**
     * Validate that a value is a valid IPv6 string.
     *
     * @see https://www.ibm.com/support/knowledgecenter/en/STCMML8/com.ibm.storage.ts3500.doc/opg_3584_IPv4_IPv6_addresses.html
     * @see https://stackoverflow.com/questions/53497/regular-expression-that-matches-valid-ipv6-addresses
     * @param {string} value
     * @return {boolean}
     */
    validateIpv6(value)
    {
        if(typeof value !== 'string') {
            return false
        };

        let matches = value.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/);
        
        return matches && matches.length ? true : false;
    }

    /**
     * Validate that a field is the same as another field.
     *
     * @param {string} value
     * @return {boolean}
     */
    // validateSame(value)
    // {
    //     if(typeof value !== 'string') {
    //         return false
    //     };

    //     let matches = value.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/);
        
    //     return matches && matches.length ? true : false;
    // }

    /**
     * Convert a string to a boolean. 
     * Ie. 'true' -> true
     * 
     * @param {string} value 
     */
    _convertStringToBoolean(value)
    {
        if (value === 'true')
        {
            return true;
        } else if (value == 'false')
        {
            return false
        } else {
            return Boolean(value);
        };
    }

}

export default Rules;
