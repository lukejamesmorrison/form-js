import Form from '../src/Form';
import * as DEFAULTS from './defaults';
import Validator from '../src/Validator';

let validator = new Validator;
let rules = validator.rules;

describe('Rules', () => {

    /**
     * Boolean
     */
    test('it can validate a boolean value', () => {
        // Validate for
        DEFAULTS.BOOLEANS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeTruthy();
        });

        // Validate against
        DEFAULTS.NUMBERS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeFalsy();
        });
        expect(rules.validateBoolean(DEFAULTS.STRING)).toBeFalsy();
        expect(rules.validateBoolean(DEFAULTS.ARRAY)).toBeFalsy();
        expect(rules.validateBoolean(DEFAULTS.OBJECT)).toBeFalsy();
    });

    /**
     * Email
     */
    test('it can validate an email address', () => {

        DEFAULTS.VALID_EMAILS.forEach(email => {
            expect(rules.validateEmail(email)).toBeTruthy();
        });

        DEFAULTS.INVALID_EMAILS.forEach(email => {
            expect(rules.validateEmail(email)).toBeFalsy();
        });
    })

    test('it can validate a filled field', () => {

        // It should pass if key is present and value is not empty
        var fields = {
            email: 'email@example.com',
        };
        expect(rules.validateFilled('email', fields)).toBeTruthy();

        // It should fail if field is not present
        var fields = {};
        expect(rules.validateFilled('email', fields)).toBeFalsy();

        // it should fail if value is not filled
        var fields = {
            email: '',
            phone: null,
        };
        expect(rules.validateFilled('email', fields)).toBeFalsy();
        expect(rules.validateFilled('phone', fields)).toBeFalsy();

        // it should pass if field value is a boolean or number
        var fields = {
            important: false,
            followers: 0
        };
        expect(rules.validateFilled('important', fields)).toBeTruthy();
        expect(rules.validateFilled('followers', fields)).toBeTruthy();
    })

    /**
     * String
     */
    test('it can validate a string value', () => {
        // Validate for
        DEFAULTS.BOOLEANS.splice(-2).forEach(value => {
            expect(rules.validateString(value)).toBeTruthy(); // '1', '0'
        });
        expect(rules.validateString(DEFAULTS.STRING)).toBeTruthy();

        // Validate against
        DEFAULTS.BOOLEANS.splice(0, 4).forEach(value => {
            expect(rules.validateString(value)).toBeFalsy(); // true, false, 1, 0
        });
        DEFAULTS.NUMBERS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeFalsy();
        });
        expect(rules.validateBoolean(DEFAULTS.ARRAY)).toBeFalsy();
        expect(rules.validateBoolean(DEFAULTS.OBJECT)).toBeFalsy();
    });

    /**
     * Integer
     */
    test('it can validate an integer', () => {
        // Validate for
        DEFAULTS.INTEGERS.forEach(value => {
            expect(rules.validateInteger(value)).toBeTruthy();
        });

        // Validate against
        DEFAULTS.FLOATS.forEach(value => {
            expect(rules.validateInteger(value)).toBeTruthy();
        });
    });

    /**
     * Object
     */
    test('it can validate an object', () => {
        // Validate for
        expect(rules.validateObject(DEFAULTS.OBJECT)).toBeTruthy();

        // Validate against
        DEFAULTS.FLOATS.forEach(value => {
            expect(rules.validateObject(value)).toBeFalsy();
        });
        DEFAULTS.INTEGERS.forEach(value => {
            expect(rules.validateObject(value)).toBeFalsy();
        });
        expect(rules.validateObject(DEFAULTS.STRING)).toBeFalsy();
        expect(rules.validateObject(DEFAULTS.ARRAY)).toBeFalsy();
    });

    /**
     * Max
     */
    test('it can validate a max limit for a string', () => {
        expect(rules.validateMax(DEFAULTS.STRING, 15)).toBeTruthy();
        expect(rules.validateMax(DEFAULTS.STRING, 5)).toBeFalsy();
    })

    test('it can validate a max limit for an array', () => {
        expect(rules.validateMax(DEFAULTS.ARRAY, 3)).toBeTruthy();
        expect(rules.validateMax(DEFAULTS.ARRAY, 1)).toBeFalsy();
    })

    /**
     * Min
     */
    test('it can validate a min limit for a string', () => {
        expect(rules.validateMin(DEFAULTS.STRING, 15)).toBeFalsy();
        expect(rules.validateMin(DEFAULTS.STRING, 5)).toBeTruthy();
    })

    test('it can validate a min limit for an array', () => {
        expect(rules.validateMin(DEFAULTS.ARRAY, 3)).toBeFalsy();
        expect(rules.validateMin(DEFAULTS.ARRAY, 1)).toBeTruthy();
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
     * Numberic
     */
    test('it can validate a numeric value', () => {
        DEFAULTS.NUMBERS.forEach(value => {
            expect(rules.validateNumeric(value)).toBeTruthy();
        });

        expect(rules.validateNumeric(DEFAULTS.ARRAY)).toBeFalsy();
        expect(rules.validateNumeric(DEFAULTS.OBJECT)).toBeFalsy();
        expect(rules.validateNumeric(DEFAULTS.STRING)).toBeFalsy();
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
        expect(rules.validateArray(DEFAULTS.ARRAY)).toBeTruthy();
        expect(rules.validateArray(DEFAULTS.OBJECT)).toBeFalsy();
        expect(rules.validateArray(DEFAULTS.STRING)).toBeFalsy();
        expect(rules.validateArray(DEFAULTS.BOOLEANS[0])).toBeFalsy();
        expect(rules.validateArray(DEFAULTS.NUMBERS[0])).toBeFalsy();
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
        expect(rules.validateGt(2,1)).toBeTruthy();
        expect(rules.validateGt(2,2)).toBeFalsy();
        expect(rules.validateGt(2, 3)).toBeFalsy();
    })

    /**
     * Less Than
     */
    test('it can determine if a value is less than another', () => {
        expect(rules.validateLt(1, 2)).toBeTruthy();
        expect(rules.validateLt(2, 2)).toBeFalsy();
        expect(rules.validateLt(3, 2)).toBeFalsy();
    })

    /**
     * Greater Than Or Equal To
     */
    test('it can determine if a value is greater than or equal to another', () => {
        expect(rules.validateGte(2, 1)).toBeTruthy();
        expect(rules.validateGte(2, 2)).toBeTruthy();
        expect(rules.validateGte(2, 3)).toBeFalsy();
    })

    /**
     * Less Than Or Equal To
     */
    test('it can determine if a value is less than or equal to another', () => {
        expect(rules.validateLte(1, 2)).toBeTruthy();
        expect(rules.validateLte(2, 2)).toBeTruthy();
        expect(rules.validateLte(3, 2)).toBeFalsy();
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

    /**
     * Required Unless
     */
    test('it can determine if a field is required uness another field has a specific value', () => {


        // If field does not equal, then otherField is required
        var fields = {
            has_company: false,
            company_id: 1,
        };

        expect(rules.validateRequiredUnless('company_id', 'has_company', 'true', fields)).toBeTruthy();

        // If field does equal, otherField is NOT required
        var fields = {
            has_company: true,
        };

        expect(rules.validateRequiredUnless('company_id', 'has_company', 'true', fields)).toBeTruthy();

        // If field does not equal, otherField cannot be null
        var fields = {
            has_company: false,
            company_id: null
        };

        expect(rules.validateRequiredUnless('company_id', 'has_company', 'true', fields)).toBeFalsy();
    })

    /**
     * Required With
     */
    test('it can determine if a field is required with other fields', () => {

        var fields = {
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        };
        expect(rules.validateRequiredWith('cars', ['has_cars'], fields)).toBeTruthy();

        var fields = {
            has_cars: true,
            cars: [],
        };
        expect(rules.validateRequiredWith('cars', ['has_cars'], fields)).toBeFalsy();

        var fields = {
            has_cars: true,
        };
        expect(rules.validateRequiredWith('cars', ['has_cars'], fields)).toBeFalsy();

    });

    /**
     * Required With All
     */
    test('it can determine if a field is required with all other fields', () => {

        var fields = {
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        };
        expect(rules.validateRequiredWithAll('cars', ['has_cars'], fields)).toBeTruthy();

        var fields = {
            has_cars: true,
            cars: [],
        };
        expect(rules.validateRequiredWithAll('cars', ['has_cars', 'loves_cars'], fields)).toBeFalsy();

        var fields = {
            has_cars: true,
        };
        expect(rules.validateRequiredWithAll('cars', ['has_cars'], fields)).toBeFalsy();

    });

    test('it can convert a string to a boolean', () => {
        expect(rules._convertStringToBoolean('true')).toBeTruthy();
        expect(rules._convertStringToBoolean(true)).toBeTruthy();
        expect(rules._convertStringToBoolean('false')).toBeFalsy();
        expect(rules._convertStringToBoolean(false)).toBeFalsy();

        expect(rules._convertStringToBoolean('t')).toBeTruthy();
        expect(rules._convertStringToBoolean(1)).toBeTruthy();
    })
});
