/**
 * This class is responsible for managing form validation rules.
 */
class Rules {
    
    /**
     * Validate if value is boolean.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateBoolean(value) {
        let acceptable = [true, false, 1, 0, '1', '0'];
        return acceptable.includes(value);
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
     * Validate if value is string.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateString(value) {
        return (typeof value === 'string');
    }

    /**
     * Validate if value is integer.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateInteger(value) {
        return !isNaN(+value) && Number.isInteger(+value);
    }

    /**
     * Validate if value is object.
     *
     * @param {mixed} value 
     * @return {boolean}
     */
    validateObject(value) {
        return (value instanceof Object && !(value instanceof Array));
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
        return value != null && value != '' && value.length != 0;
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

        return valid_num  > 0
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
     * Validate if value equals another value.
     *
     * @param {mixed} value 
     * @param {mixed} comparedValue 
     * @return {boolean}
     */
    validateEquals(value, comparedValue) {

        if (Array.isArray(value) && Array.isArray(comparedValue))
        {
            return JSON.stringify(value) == JSON.stringify(comparedValue);
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
    validateDifferent(fieldValue, otherFieldName, formFields)
    {
        // String, Number or Boolean
        if(['string', 'number', 'boolean'].includes(typeof(fieldValue)))
        {
            return fieldValue !== formFields[otherFieldName];
        };

        // Array
        if(Array.isArray(fieldValue))
        {
            return fieldValue !== formFields[otherFieldName];
        }

        // Object
        if(typeof(fieldValue) === 'object')
        {
            return JSON.stringify(fieldValue) !== JSON.stringify(formFields[otherFieldName]);
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
        let confirm_name = `${fieldName}_confirmation`;

        return keys.includes(confirm_name);
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
