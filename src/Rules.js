class Rules {
    
    validateBoolean(value) {
        let acceptable = [true, false, 1, 0, '1', '0'];
        return acceptable.includes(value);
    }

    validateString(value) {
        return (typeof value === 'string');
    }

    validateInteger(value) {
        return Number.isInteger(value);
    }

    validateObject(value) {
        return (value instanceof Object && !(value instanceof Array));
    }

    validateMax(value, max) {
        // Number
        if (typeof (value) == 'number') {
            return value <= max;
        }

        // String, Array
        return value.length <= max;
    }

    validateMin(value, min) {
        // Number
        if (typeof (value) == 'number') {
            return value >= min;
        }

        // String, Array
        return value.length >= min;
    }

    validateRequired(value) {
        return value != null;
    }

    validateNull(value) {
        return value == null;
    }

    validateLength(value, length) {
        return value.length == length;
    }

    validateArray(value)
    {
        return Array.isArray(value);
    }

    validateEquals(value, comparedValue) {

        if (Array.isArray(value) && Array.isArray(comparedValue))
        {
            return JSON.stringify(value) == JSON.stringify(comparedValue);
        };

        return value == comparedValue;
    }

    validateGreaterThan(value, comparedValue)
    {
        return value > comparedValue;
    }

    validateLessThan(value, comparedValue) {
        return value < comparedValue;
    }

    validateGreaterThanOrEquals(value, comparedValue)
    {
        return this.validateGreaterThan(value, comparedValue) || this.validateEquals(value, comparedValue);
    }

    validateLessThanOrEquals(value, comparedValue)
    {
        return this.validateLessThan(value, comparedValue) || this.validateEquals(value, comparedValue);
    }

    validateBetween(value, lowerValue, higherValue)
    {
        return this.validateLessThan(value, higherValue) && this.validateGreaterThan(value, lowerValue);
    }

    validateInArray(value, array)
    {
        return array.includes(value);
    }

}

export default Rules;
