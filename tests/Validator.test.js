import Validator from 'Validator.js';
import { VALID_DATES } from './defaults';

let validator = new Validator;

describe('Validator', () => {

    test('it can validate a value based on a default rule', () => {
        let validString = validator.validateDefaultRule('field_name', 'string', {field_name: 'This is a string'});
        let validObject = validator.validateDefaultRule('field_name', 'object', {field_name: {key: "value"}});

        expect(validString).toBeTruthy();
        expect(validObject).toBeTruthy();
    });

    test('it can validate a value based on a custom rule', () => {
        let rule = (name, value, fail) => {
            return value % 2 == 0 || fail(`Failed rule for ${name} field.`);
        }
        let validEven = validator.validateCustomRule('field_name', rule, {field_name: 24});
        let invalidEven = validator.validateCustomRule('field_name', rule, {field_name: 23});
        
        expect(validEven).toBeTruthy();
        expect(invalidEven).toBe('Failed rule for field_name field.');
    });



    test('it can validate a value based on multiple rules', () => {
        let validationTrue = validator.validate(
            'field_name', 
            ['string', 'min:10'],
            {field_name: 'This is a string with more than 10 characters'}
        );
        let validationFalse = validator.validate(
            'field_name', 
            ['string', 'max:10'],
            {field_name: 'This is a string with more than 10 characters'}
        );

        expect(validationTrue.valid).toBeTruthy();
        expect(validationFalse.valid).toBeFalsy();
    });

    test('it can get a rule name', () => {
        let rule = 'between:12,45';
        expect(validator._getRuleName(rule)).toEqual('between');
    })

    test('it can get rule parameters', () => {
        let rule = 'between:12,45';
        expect(validator._getRuleParameters(rule)).toEqual(['12', '45']);
    })

    test('it can validate all rules', () => {

        /**
         * Tests should be truthy to prove that the correct rule is applied and validated.
         */
        
        // After
        expect(validator.validate('field', ['after:other_field'], {
            field: '12 May 1992', 
            other_field: '11 May 1992'
        }).valid).toBeTruthy();

        // Alpha
        expect(validator.validate('field_name', ['alpha'], {field_name: 'hello world'}).valid).toBeTruthy();

        // AlphaDash
        expect(validator.validate('field_name', ['alpha_dash'], {field_name: 'hello-world'}).valid).toBeTruthy();

        // AlphaNum
        expect(validator.validate('field_name', ['alpha_num'], {field_name: 'hello world 123'}).valid).toBeTruthy();

        // Array
        expect(validator.validate('field_name', ['array'], {field_name: [1,2]}).valid).toBeTruthy();

        // Before
        expect(validator.validate('field', ['before:other_field'], {
            field: '11 May 1992', 
            other_field: '12 May 1992'
        }).valid).toBeTruthy();

        // Between
        expect(validator.validate('field_name', ['between:1,3'], {field_name: '2'}).valid).toBeTruthy();

        // Boolean
        expect(validator.validate('field_name', ['boolean'], {field_name: false}).valid).toBeTruthy();

        // Confirmed
        expect(validator.validate('password', ['confirmed'], {
            password: 'secret',
            password_confirmation: 'secret',
        }).valid).toBeTruthy();

        expect(validator.validate('other_field', ['confirmed'], {
            password: 'secret'
        }).valid).toBeFalsy();

        // Date
        expect(validator.validate('field_name', ['date'], {field_name: '12 May 1992'}).valid).toBeTruthy();

        // Date Equals
        expect(validator.validate('first', ['date_equals:second'], {
            first:  new Date('12 May 1992'),
            second:  new Date('12 May 1992')
        }).valid).toBeTruthy();

        // Different
        expect(validator.validate('first', ['different:second'], {
            first: 'hello',
            second: 'world'
        }).valid).toBeTruthy();

        expect(validator.validate('first', ['different:second'], {
            first: 'hello',
            second: 'hello'
        }).valid).toBeFalsy();

        // Email
        expect(validator.validate('field_name', ['email'], {field_name: 'email@example.com'}).valid).toBeTruthy();
        expect(validator.validate('field_name', ['email'], {field_name: null}).valid).toBeFalsy();

        // Equals
        expect(validator.validate('field_name', ['equal:2'], {field_name: 2}).valid).toBeTruthy();

        // File
        let file = new File([''], 'avatar.jpeg', {
            type: 'image/jpeg',
            lastModified: 1575297668218
        });

        expect(validator.validate('avatar', ['file'], {avatar: file}).valid).toBeTruthy();

        // Filled
        expect(validator.validate('email', ['filled'], {email: 'email@example.com'}).valid).toBeTruthy();

        // Greater Than
        expect(validator.validate('field_name', ['gt:1'], {field_name: 2}).valid).toBeTruthy();

        // Greater Than Or Equals
        expect(validator.validate('field_name', ['gte:2'], {field_name: 2}).valid).toBeTruthy();

        // In
        expect(validator.validate('field_name', ['in:foo,bar'], {field_name: 'foo'}).valid).toBeTruthy();

        // Integer
        expect(validator.validate('field_name', ['integer'], {field_name: -12}).valid).toBeTruthy();

        // IP
        expect(validator.validate('field_name', ['ip'], {field_name: '192.168.0.1'}).valid).toBeTruthy();
        expect(validator.validate('field_name', ['ip'], {field_name: '2001:db8:3333:4444:CCCC:DDDD:EEEE:FFFF'}).valid).toBeTruthy();

        // IPv4
        expect(validator.validate('field_name', ['ipv4'], {field_name: '192.168.0.1'}).valid).toBeTruthy();

        // IPv6
        expect(validator.validate('field_name', ['ipv6'], {field_name: '2001:db8:3333:4444:CCCC:DDDD:EEEE:FFFF'}).valid).toBeTruthy();

        // JSON
        expect(validator.validate('field_name', ['json'], {field_name: '{"hey": "there"}'}).valid).toBeTruthy();

        // Length
        expect(validator.validate('field_name', ['length:4'], {field_name: 'test'}).valid).toBeTruthy();

        // Less Than
        expect(validator.validate('field_name', ['lt:3'], {field_name: 2}).valid).toBeTruthy();

        // Less Than Or Equals
        expect(validator.validate('field_name', ['lte:2'], {field_name: 2}).valid).toBeTruthy();

        // Max
        expect(validator.validate('field_name', ['max:5'], {field_name: 4}).valid).toBeTruthy();

        // Min
        expect(validator.validate('field_name', ['min:3'], {field_name: 4}).valid).toBeTruthy();

        // Null
        expect(validator.validate('field_name', ['null'], {field_name: null}).valid).toBeTruthy();

        // Numeric
        expect(validator.validate('field_name', ['numeric'], {field_name: 1}).valid).toBeTruthy();

        // Object
        expect(validator.validate('field_name', ['object'], {field_name: new Object}).valid).toBeTruthy();

        // Required
        expect(validator.validate('field_name', ['required'], {field_name: 'test'}).valid).toBeTruthy();

        // Required If
        expect(validator.validate('company_id', ['required_if:has_company,true'], {
            has_company: true,
            company_id: 1,
        }).valid).toBeTruthy();

        // Required Unless
        expect(validator.validate('company_id', ['required_unless:has_company,true'], {
            has_company: true,
            company_id: 1,
        }).valid).toBeTruthy();

        expect(validator.validate('company_id', ['required_unless:has_company,false'], {
            has_company: true,
        }).valid).toBeFalsy();

        // Required With
        expect(validator.validate('cars', ['required_with:has_cars'], {
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        }).valid).toBeTruthy();

        expect(validator.validate('cars', ['required_with:has_cars'], {
            has_cars: true,
        }).valid).toBeFalsy();

        // Required With All
        expect(validator.validate('cars', ['required_with_all:has_cars,loves_cars'], {
            loves_cars: true,
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        }).valid).toBeTruthy();

        expect(validator.validate('cars', ['required_with_all:has_cars,loves_cars'], {
            has_cars: true,
            cars: ['toyota camry', 'honda civic']
        }).valid).toBeFalsy();

        expect(validator.validate('cars', ['required_with_all:has_cars'], {
            has_cars: true,
        }).valid).toBeFalsy();

        // Same
        expect(validator.validate('field_name', ['same:2'], {field_name: 2}).valid).toBeTruthy();

        // String
        expect(validator.validate('field_name', ['string'], {field_name: 'test'}).valid).toBeTruthy();

        // URL
        expect(validator.validate('field_name', ['url'], {field_name: 'https://google.com'}).valid).toBeTruthy();
    })


    test('it can set form data', () => {

        var validator = new Validator;
        validator.setData({
            test: 'field'
        });

        expect(validator.formFields.test).toBe('field');
    })

    test('it can covert snake case to pascal case', () => {

         expect(validator._getPascalCaseRuleName('required_if')).toBe('RequiredIf');
    })

    test('it can covert pascal case to snake case', () => {

         expect(validator._getSnakeCaseRuleName('RequiredIf')).toBe('required_if');
    })
});
