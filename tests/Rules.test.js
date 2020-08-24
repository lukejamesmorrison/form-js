import Validator from '../src/Validator';
import Form from '../src/Form';

let validator = new Validator;
let rules = validator.rules;

const BOOLEANS = [true, false, 1, 0, '1', '0'];
const NUMBERS = [2, -4, 3.1, -5.2];
const STRING = 'test string';
const ARRAY = ['one', 'two'];
const OBJECT = { key: 'value' };

let INTEGERS = NUMBERS.splice(0, 2).concat(BOOLEANS.splice(2, 2));
let FLOATS = NUMBERS.splice(2, 2);

describe('Rules', () => {

    /**
     * Boolean
     */
    test('it can validate a boolean value', () => {
        // Validate for
        BOOLEANS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeTruthy();
        });

        // Validate against
        NUMBERS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeFalsy();
        });
        expect(rules.validateBoolean(STRING)).toBeFalsy();
        expect(rules.validateBoolean(ARRAY)).toBeFalsy();
        expect(rules.validateBoolean(OBJECT)).toBeFalsy();
    });


    /**
     * String
     */
    test('it can validate a string value', () => {
        // Validate for
        BOOLEANS.splice(-2).forEach(value => {
            expect(rules.validateString(value)).toBeTruthy(); // '1', '0'
        });
        expect(rules.validateString(STRING)).toBeTruthy();

        // Validate against
        BOOLEANS.splice(0, 4).forEach(value => {
            expect(rules.validateString(value)).toBeFalsy(); // true, false, 1, 0
        });
        NUMBERS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeFalsy();
        });
        expect(rules.validateBoolean(ARRAY)).toBeFalsy();
        expect(rules.validateBoolean(OBJECT)).toBeFalsy();
    });

    /**
     * Integer
     */
    test('it can validate an integer', () => {
        // Validate for
        INTEGERS.forEach(value => {
            expect(rules.validateInteger(value)).toBeTruthy();
        });

        // Validate against
        FLOATS.forEach(value => {
            expect(rules.validateInteger(value)).toBeTruthy();
        });
    });

    /**
     * Object
     */
    test('it can validate an object', () => {
        // Validate for
        expect(rules.validateObject(OBJECT)).toBeTruthy();

        // Validate against
        FLOATS.forEach(value => {
            expect(rules.validateObject(value)).toBeFalsy();
        });
        INTEGERS.forEach(value => {
            expect(rules.validateObject(value)).toBeFalsy();
        });
        expect(rules.validateObject(STRING)).toBeFalsy();
        expect(rules.validateObject(ARRAY)).toBeFalsy();
    });

    /**
     * Max
     */
    test('it can validate a max limit for a string', () => {
        expect(rules.validateMax(STRING, 15)).toBeTruthy();
        expect(rules.validateMax(STRING, 5)).toBeFalsy();
    })

    test('it can validate a max limit for an array', () => {
        expect(rules.validateMax(ARRAY, 3)).toBeTruthy();
        expect(rules.validateMax(ARRAY, 1)).toBeFalsy();
    })

    /**
     * Min
     */
    test('it can validate a min limit for a string', () => {
        expect(rules.validateMin(STRING, 15)).toBeFalsy();
        expect(rules.validateMin(STRING, 5)).toBeTruthy();
    })

    test('it can validate a min limit for an array', () => {
        expect(rules.validateMin(ARRAY, 3)).toBeFalsy();
        expect(rules.validateMin(ARRAY, 1)).toBeTruthy();
    })

    /**
     * Required
     */
    test('it can validate a required value', () => {
        expect(rules.validateRequired(null)).toBeFalsy();
        expect(rules.validateRequired('test')).toBeTruthy();
    })

    /**
     * Null
     */
    test('it can validate a null value', () => {
        expect(rules.validateNull(null)).toBeTruthy();
        expect(rules.validateNull('test')).toBeFalsy();

        expect(validator.validateSingleRule('field_name', null, 'null')).toBeTruthy();
    })

    /**
     * Length - Array & String
     */
    test('it can validate the length of a value', () => {
        expect(rules.validateLength(['one', 'two'], 2)).toBeTruthy();
        expect(rules.validateLength('test', 4)).toBeTruthy();

        expect(rules.validateLength(['one', 'two'], 3)).toBeFalsy();
        expect(rules.validateLength('test', 5)).toBeFalsy();

        expect(validator.validateSingleRule('field_name', 'test', 'length:4')).toBeTruthy();
        expect(validator.validateSingleRule('field_name', ['test', 'array'], 'length:2')).toBeTruthy();
    })

    /**
     * Array
     */
    test('it can validate an array', () => {
        expect(rules.validateArray(ARRAY)).toBeTruthy();
        expect(rules.validateArray(OBJECT)).toBeFalsy();
        expect(rules.validateArray(STRING)).toBeFalsy();
        expect(rules.validateArray(BOOLEANS[0])).toBeFalsy();
        expect(rules.validateArray(NUMBERS[0])).toBeFalsy();
    })

    /**
     * Equals
     */
    test('it can determine if a value is equal to another', () => {
        // Number
        expect(rules.validateEquals(2, 2)).toBeTruthy();
        expect(rules.validateEquals(2, 3)).toBeFalsy();
        
        // String
        expect(rules.validateEquals('t', 't')).toBeTruthy();
        expect(rules.validateEquals('t', 'test')).toBeFalsy();

        // Array
        expect(rules.validateEquals(['t'], ['t'])).toBeTruthy();
        expect(rules.validateEquals(['t'], ['t', 'e', 's', 't'])).toBeFalsy();
    })

    /**
     * Greater Than
     */
    test('it can determine if a value is greater than another', () => {
        expect(rules.validateGreaterThan(2,1)).toBeTruthy();
        expect(rules.validateGreaterThan(2,2)).toBeFalsy();
        expect(rules.validateGreaterThan(2, 3)).toBeFalsy();
    })

    /**
     * Less Than
     */
    test('it can determine if a value is less than another', () => {
        expect(rules.validateLessThan(1, 2)).toBeTruthy();
        expect(rules.validateLessThan(2, 2)).toBeFalsy();
        expect(rules.validateLessThan(3, 2)).toBeFalsy();
    })

    /**
     * Greater Than Or Equal To
     */
    test('it can determine if a value is greater than or equal to another', () => {
        expect(rules.validateGreaterThanOrEquals(2, 1)).toBeTruthy();
        expect(rules.validateGreaterThanOrEquals(2, 2)).toBeTruthy();
        expect(rules.validateGreaterThanOrEquals(2, 3)).toBeFalsy();
    })

    /**
     * Less Than Or Equal To
     */
    test('it can determine if a value is less than or equal to another', () => {
        expect(rules.validateLessThanOrEquals(1, 2)).toBeTruthy();
        expect(rules.validateLessThanOrEquals(2, 2)).toBeTruthy();
        expect(rules.validateLessThanOrEquals(3, 2)).toBeFalsy();
    })

    /**
     * Between
     */
    test('it can determine if a value is between two other values', () => {
        expect(rules.validateBetween(2, 1, 3)).toBeTruthy();
        expect(rules.validateBetween(2, 2, 3)).toBeFalsy();
        expect(rules.validateBetween(1, 2, 3)).toBeFalsy();
    })
    
    /**
     * In Array
     * 
     * This validation only supports String and Number values.
     */
    test('it can determine if a value is in an array', () => {
        expect(rules.validateInArray(2, [1,2,3])).toBeTruthy();
        expect(rules.validateInArray('t', [1, 'f', 3])).toBeFalsy();
    })

    /**
     * Different
     */
    test('it can determine if a value is different than the value of another field', () => {

        
        // String`
        var form = new Form({
            first: 'hello',
            second: 'world'
        });
        expect(rules.validateDifferent('hello', 'second', form.data())).toBeTruthy();

            
        // Number
        var form = new Form({
            first: 1,
            second: 2.0
        });
        expect(rules.validateDifferent(1, 'second', form.data())).toBeTruthy();

        // Array
        var form = new Form({
            first: [1],
            second: [2.0]
        });
        expect(rules.validateDifferent([1], 'second', form.data())).toBeTruthy();

        // Object
        var form = new Form({
            first: {first: 'hello', second: 'world'},
            second: {first: 'world', second: 'hello'}
        });
        expect(rules.validateDifferent(
            {first: 'hello', second: 'world'},
            'second',
            form.data()
        )).toBeTruthy();
    })

    /**
     * Confirmed
     */
    test('it can determine if a field is confirmed with another field', () => {

        var form = new Form({
            password: 'secret',
            password_confirmation: 'secret',
            other_field: 'super_secret'
        });

        expect(rules.validateConfirmed('password', form.data())).toBeTruthy();
        expect(rules.validateConfirmed('other_field', form.data())).toBeFalsy();
    });

    /**
     * Required If
     */
    test('it can determine if a field is required if another field has a specific value', () => {


        var fields = {
            has_company: true,
            company_id: 1,
        };

        expect(rules.validateRequiredIf('company_id', 'has_company', 'true', fields)).toBeTruthy();

        var fields = {
            has_company: true,
        };

        expect(rules.validateRequiredIf('company_id', 'has_company', 'true', fields)).toBeFalsy();

        var fields = {
            has_company: true,
            company_id: null
        };

        expect(rules.validateRequiredIf('company_id', 'has_company', 'true', fields)).toBeFalsy();
    })

    test('it can convert a string to a boolean', () => {
        expect(rules._convertStringToBoolean('true')).toBeTruthy();
        expect(rules._convertStringToBoolean(true)).toBeTruthy();
        expect(rules._convertStringToBoolean('false')).toBeFalsy();
        expect(rules._convertStringToBoolean(false)).toBeFalsy();

        expect(rules._convertStringToBoolean('t')).toBeTruthy();
        expect(rules._convertStringToBoolean(1)).toBeTruthy();
    })



});
