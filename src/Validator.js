class Validator {

    constructor()
    {
        //
    }

    /**
     * 
     * @param {mixed} value 
     */
    validateBoolean(value)
    {
        let acceptable = [true, false, 1, 0, '1', '0'];
        return acceptable.includes(value);
    }

    validateString(value)
    {
        return (typeof value === 'string');
    }

    validateInteger(value)
    {
        return Number.isInteger(value);
    }
    // Integer
    // Required
    // Null
    // NotNull
    // Length (String, array)
    // Array
    // Equals
    // GreaterThan
    // Less Than
}

export default Validator;
