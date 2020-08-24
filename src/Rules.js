/**
 * This class is responsible for managing form validation rules.
 */
class Rules {

    constructor()
    {
        // this.messages = defaultMessages;
    }
    
    /**
     * Validate if value is boolean.
     *
     * @param {mixed} value 
     */
    validateBoolean(value) {
        let acceptable = [true, false, 1, 0, '1', '0'];
        return acceptable.includes(value);
    }

    /**
     * Validate if value is string.
     *
     * @param {mixed} value 
     */
    validateString(value) {
        return (typeof value === 'string');
    }

    /**
     * Validate if value is integer.
     *
     * @param {mixed} value 
     */
    validateInteger(value) {
        return Number.isInteger(value);
    }

    /**
     * Validate if value is object.
     *
     * @param {mixed} value 
     */
    validateObject(value) {
        return (value instanceof Object && !(value instanceof Array));
    }

    /**
     * Validate if value is less than or equal to max.
     *
     * @param {mixed} value 
     * @param {number} max
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
     * Validate if value is required.
     *
     * @param {mixed} value 
     */
    validateRequired(value) {
        return value != null && value != '' && value.length != 0;
    }

    /**
     * Validate that value is required if another field equals a certain value.
     *
     * @param {mixed} value 
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
     * 
     * @param {string} fieldName The field name to be validated
     * @param {array} otherFieldNames The field names of fields to be validated against
     * @param {object} formFields 
     */
    validateRequiredWithAll(fieldName, otherFieldNames, formFields) {
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
     * Validate if value is null.
     *
     * @param {mixed} value 
     */
    validateNull(value) {
        return value == null;
    }

    /**
     * Validate if value is of length.
     *
     * @param {mixed} value 
     * @param {number} length
     */
    validateLength(value, length) {
        return value.length == length;
    }

    /**
     * Validate if value is an array.
     *
     * @param {mixed} value 
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
     */
    validateGreaterThan(value, comparedValue)
    {
        return value > comparedValue;
    }

    /**
     * Validate if value is less than another value.
     *
     * @param {number} value 
     * @param {number} comparedValue 
     */
    validateLessThan(value, comparedValue) {
        return value < comparedValue;
    }

    /**
     * Validate if value is greater than or equal to another value.
     *
     * @param {number} value 
     * @param {number} comparedValue 
     */
    validateGreaterThanOrEquals(value, comparedValue)
    {
        return this.validateGreaterThan(value, comparedValue) || this.validateEquals(value, comparedValue);
    }

    /**
     * Validate if value is less than or equals another value.
     *
     * @param {number} value 
     * @param {number} comparedValue 
     */
    validateLessThanOrEquals(value, comparedValue)
    {
        return this.validateLessThan(value, comparedValue) || this.validateEquals(value, comparedValue);
    }

    /**
     * Validate if value is between two values.
     *
     * @param {mixed} value 
     * @param {number} lowerValue 
     * @param {number} higherValue 
     */
    validateBetween(value, lowerValue, higherValue)
    {
        return this.validateLessThan(value, higherValue) && this.validateGreaterThan(value, lowerValue);
    }

    /**
     * Validate if value is in an array.
     *
     * @param {mixed} value 
     * @param {array} array
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
     */
    validateDifferent(fieldValue, otherFieldName, formFields)
    {
        // console.log(fieldValue, formFields[otherFieldName]);
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
     */
    validateConfirmed(fieldName, formFields)
    {
        let keys = Object.keys(formFields);
        let confirm_name = `${fieldName}_confirmation`;

        return keys.includes(confirm_name);
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
