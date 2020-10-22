import Form from '../src/Form';
import * as DEFAULTS from './defaults';
import Validator from '../src/Validator';

let validator = new Validator;
let rules = validator.rules;

let mockFile = new File([''], 'file-name.js', {
    type: 'image/jpeg',
    lastModified: 1575297668218
});

describe('Rules', () => {

    /**
     * After
     */
    test('it can validate if a date is after another date', () => {

        let fields = {
            before: '13 May 1992',
            field: '12 May 1992',
            after: '11 May 1992' 
        };

        expect(rules.validateAfter('field', 'before', fields)).toBeFalsy();
        expect(rules.validateAfter('field', 'field', fields)).toBeFalsy();
        expect(rules.validateAfter('field', 'after', fields)).toBeTruthy();
    });

    /**
     * Array
     */
    test('it can validate an array', () => {
        expect(rules.validateArray(DEFAULTS.ARRAY)).toBeTruthy();
        expect(rules.validateArray(DEFAULTS.OBJECT)).toBeFalsy();
        expect(rules.validateArray(DEFAULTS.STRING)).toBeFalsy();
        expect(rules.validateArray(DEFAULTS.BOOLEANS[0])).toBeFalsy();
        expect(rules.validateArray(DEFAULTS.NUMBERS[0])).toBeFalsy();
    });

    /**
     * Boolean
     */
    test('it can validate a boolean value', () => {
        DEFAULTS.BOOLEANS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeTruthy();
        });

        DEFAULTS.NUMBERS.forEach(value => {
            expect(rules.validateBoolean(value)).toBeFalsy();
        });
        expect(rules.validateBoolean(DEFAULTS.STRING)).toBeFalsy();
        expect(rules.validateBoolean(DEFAULTS.ARRAY)).toBeFalsy();
        expect(rules.validateBoolean(DEFAULTS.OBJECT)).toBeFalsy();
    });

    /**
     * Before
     */
    test('it can validate if a date is before another date', () => {

        let fields = {
            before: '13 May 1992',
            field: '12 May 1992',
            after: '11 May 1992' 
        };

        expect(rules.validateBefore('field', 'before', fields)).toBeTruthy();
        expect(rules.validateBefore('field', 'field', fields)).toBeFalsy();
        expect(rules.validateBefore('field', 'after', fields)).toBeFalsy();
    });

    /**
     * Date
     */
    test('it can validate a date', () => {
        DEFAULTS.VALID_DATES.forEach(date => {
            expect(rules.validateDate(date)).toBeTruthy();
        });

        DEFAULTS.INVALID_DATES.forEach(date => {
            expect(rules.validateDate(date)).toBeFalsy();
        });
    })

    test('it can validate if a date equals another date', () => {
        var fields = {
            first: new Date('12 May 1992'),
            second: new Date('12 May 1992'),
            third: new Date('13 May 1992')
        };

        expect(rules.validateDateEquals('first', 'second', fields)).toBeTruthy();
        expect(rules.validateDateEquals('first', 'third', fields)).toBeFalsy();
    })

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

     /**
     * File
     */
    test('it can validate a file is of a specfic type', () => {

        let file = mockFile;
        expect(rules.validateFile('avatar', { avatar: file })).toBeTruthy();
    })

    /**
     * Filled
     */
    test('it can validate a filled field', () => {

        // It should pass if key is present and value is not empty
        expect(rules.validateFilled('email', {
            email: 'email@example.com',
        })).toBeTruthy();

        // It should fail if field is not present
        expect(rules.validateFilled('email', {})).toBeFalsy();

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
     * JSON
     */
    test('it can validate a json string', () => {

        DEFAULTS.VALID_JSON.forEach(item => {
            expect(rules.validateJson(item)).toBeTruthy();
        });

        DEFAULTS.INVALID_JSON.forEach(item => {
            expect(rules.validateJson(item)).toBeFalsy();
        });
    })

    /**
     * IP
     */
    test('it can validate an ip address', () => {
        let VALID_IPS = DEFAULTS.VALID_IPV4.concat(DEFAULTS.VALID_IPV6);
        let INVALID_IPS = DEFAULTS.INVALID_IPV4.concat(DEFAULTS.INVALID_IPV6);

        VALID_IPS.forEach(item => {
            expect(rules.validateIp(item)).toBeTruthy();
        });

        INVALID_IPS.forEach(item => {
            expect(rules.validateIp(item)).toBeFalsy();
        });
    })

    /**
     * IPv4
     */
    test('it can validate an ipv4 address', () => {
        DEFAULTS.VALID_IPV4.forEach(item => {
            expect(rules.validateIpv4(item)).toBeTruthy();
        });

        DEFAULTS.INVALID_IPV4.forEach(item => {
            expect(rules.validateIpv4(item)).toBeFalsy();
        });
    })

    /**
     * IPv6
     */
    test('it can validate an ipv6 address', () => {
        DEFAULTS.VALID_IPV6.forEach(item => {
            expect(rules.validateIpv6(item)).toBeTruthy();
        });

        DEFAULTS.INVALID_IPV6.forEach(item => {
            expect(rules.validateIpv6(item)).toBeFalsy();
        });
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
        expect(rules.validateInteger('1')).toBeTruthy();
        expect(rules.validateInteger('0')).toBeTruthy();

        // Validate against
        DEFAULTS.FLOATS.forEach(value => {
            expect(rules.validateInteger(value)).toBeTruthy();
        });

        expect(rules.validateInteger('s')).toBeFalsy();
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

        expect(validator.validateDefaultRule('field_name', 'null', {field_name: null})).toBeTruthy();
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

        expect(validator.validateDefaultRule('field_name', 'length:4', {field_name: 'test'})).toBeTruthy();
        expect(validator.validateDefaultRule('field_name', 'length:2', {field_name: ['test', 'array']})).toBeTruthy();
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
        // String
        expect(rules.validateDifferent('first', 'second', {
            first: 'hello',
            second: 'world'
        })).toBeTruthy();

        // Number
        expect(rules.validateDifferent('first', 'second', {
            first: 1,
            second: 2.0
        })).toBeTruthy();

        // Array
        expect(rules.validateDifferent('first', 'second', {
            first: [1],
            second: [2.0]
        })).toBeTruthy();

        // Object
        expect(rules.validateDifferent('first', 'second', {
            first: {first: 'hello', second: 'world'},
            second: {first: 'world', second: 'hello'}
        })).toBeTruthy();
    })

    /**
     * Confirmed
     */
    test('it can determine if a field is confirmed with another field', () => {

        let fields = {
            password: 'secret',
            password_confirmation: 'secret',
            other_field: 'super_secret',
            another_field: 'secret',
            another_field_confirmation: 'seeeecret'
        };

        // Truthy scenario
        expect(rules.validateConfirmed('password', fields)).toBeTruthy();

        // No confirmation field for provided field name
        expect(rules.validateConfirmed('other_field', fields)).toBeFalsy();

        // Confirmed field value does not match
        expect(rules.validateConfirmed('another_field', fields)).toBeFalsy();
    });

    /**
     * Required If
     */
    test('it can determine if a field is required if another field has a specific value', () => {

        // Truthy scenario
        expect(rules.validateRequiredIf('company_id', 'has_company', 'true', {
            has_company: true,
            company_id: 1,
        })).toBeTruthy();

        // Field is not present
        expect(rules.validateRequiredIf('company_id', 'has_company', 'true', {
            has_company: true,
        })).toBeFalsy();

        // Field is null
        expect(rules.validateRequiredIf('company_id', 'has_company', 'true', {
            has_company: true,
            company_id: null
        })).toBeFalsy();
    })

    /**
     * Required Unless
     */
    test('it can determine if a field is required uness another field has a specific value', () => {


        // If field does not equal, then otherField is required
        expect(rules.validateRequiredUnless('company_id', 'has_company', 'true', {
            has_company: false,
            company_id: 1,
        })).toBeTruthy();

        // If field does equal, otherField is NOT required
        expect(rules.validateRequiredUnless('company_id', 'has_company', 'true', {
            has_company: true,
        })).toBeTruthy();

        // If field does not equal, otherField cannot be null
        expect(rules.validateRequiredUnless('company_id', 'has_company', 'true', {
            has_company: false,
            company_id: null
        })).toBeFalsy();
    })

    /**
     * Required With
     */
    test('it can determine if a field is required with other fields', () => {

        // Truthy scenario
        expect(rules.validateRequiredWith('cars', ['has_cars'], {
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        })).toBeTruthy();

        // Field has falsy value
        expect(rules.validateRequiredWith('cars', ['has_cars'], {
            has_cars: true,
            cars: [],
        })).toBeFalsy();

        // Field is not present
        expect(rules.validateRequiredWith('cars', ['has_cars'], {
            has_cars: true,
        })).toBeFalsy();
    });

    /**
     * Required With All
     */
    test('it can determine if a field is required with all other fields', () => {

        // Truthy scenario
        expect(rules.validateRequiredWithAll('cars', ['has_cars'], {
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        })).toBeTruthy();

        // Field has falsy value
        expect(rules.validateRequiredWithAll('cars', ['has_cars', 'loves_cars'], {
            has_cars: true,
            cars: [],
        })).toBeFalsy();

        // Field is not present
        expect(rules.validateRequiredWithAll('cars', ['has_cars'], {
            has_cars: true,
        })).toBeFalsy();

    });

    test('it can validate a url', () => {
        DEFAULTS.VALID_URLS.forEach(url => {
            expect(rules.validateUrl(url)).toBeTruthy();
        })

        DEFAULTS.INVALID_URLS.forEach(url => {
            expect(rules.validateUrl(url)).toBeFalsy();
        })
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
