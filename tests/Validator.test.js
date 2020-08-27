import Validator from 'Validator.js';

let validator = new Validator;

describe('Validator', () => {

    test('it can validate a value based on a rule', () => {
        let validString = validator.validateSingleRule('field_name', 'This is a string', 'string');
        let validObject = validator.validateSingleRule('field_name', {key: "value"}, 'object');

        expect(validString).toBeTruthy();
        expect(validObject).toBeTruthy();
    });

    test('it can validate a value based on multiple rules', () => {
        let validationTrue = validator.validate(
            'field_name',
            'This is a string with more than 10 characters', 
            ['string', 'min:10']
        );
        let validationFalse = validator.validate(
            'field_name',
            'This is a string with more than 10 characters', 
            ['string', 'max:10']
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

        // Boolean
        expect(validator.validate('field_name', false, ['boolean']).valid).toBeTruthy();

        // Email
        expect(validator.validate('field_name', 'email@example.com', ['email']).valid).toBeTruthy();

        // Filled
        validator.setData({
            email: 'email@example.com',
        });
        expect(validator.validate('email', 'email@example.com', ['filled']).valid).toBeTruthy();

        // String
        expect(validator.validate('field_name', 'test', ['string']).valid).toBeTruthy();

        // Integer
        expect(validator.validate('field_name', -12, ['integer']).valid).toBeTruthy();

        // Object
        expect(validator.validate('field_name', {}, ['object']).valid).toBeTruthy();

        // Max
        expect(validator.validate('field_name', 4, ['max:5']).valid).toBeTruthy();

        // Min
        expect(validator.validate('field_name', 4, ['min:3']).valid).toBeTruthy();

        // Required
        expect(validator.validate('field_name', 'test', ['required']).valid).toBeTruthy();

        // Null
        expect(validator.validate('field_name', null, ['null']).valid).toBeTruthy();

        // Numeric
        expect(validator.validate('field_name', 1, ['numeric']).valid).toBeTruthy();

        // Length
        expect(validator.validate('field_name', 'test', ['length:4']).valid).toBeTruthy();

        // Array
        expect(validator.validate('field_name', [1,2], ['array']).valid).toBeTruthy();

        // Equals
        expect(validator.validate('field_name', 2, ['equal:2']).valid).toBeTruthy();

        // Greater Than
        expect(validator.validate('field_name', 2, ['gt:1']).valid).toBeTruthy();

        // Greater Than Or Equals
        expect(validator.validate('field_name', 2, ['gte:2']).valid).toBeTruthy();

        // Less Than
        expect(validator.validate('field_name', 2, ['lt:3']).valid).toBeTruthy();

        // Less Than Or Equals
        expect(validator.validate('field_name', 2, ['lte:2']).valid).toBeTruthy();

        // Between
        expect(validator.validate('field_name', '2', ['between:1,3']).valid).toBeTruthy();

        // In
        expect(validator.validate('field_name', 'foo', ['in:foo,bar']).valid).toBeTruthy();

        // Same
        expect(validator.validate('field_name', 2, ['same:2']).valid).toBeTruthy();

        // Different
        validator.setData({
            first: 'hello',
            second: 'world'
        });
        expect(validator.validate('first', 'hello', ['different:second']).valid).toBeTruthy();
        expect(validator.validate('first', 'world', ['different:second']).valid).toBeFalsy();

        // Confirmed
        validator.setData({
            password: 'secret',
            password_confirmation: 'secret',
            other_field: 'super_secret'
        });
        expect(validator.validate('password', 'secret', ['confirmed']).valid).toBeTruthy();
        expect(validator.validate('other_field', 'super_secret', ['confirmed']).valid).toBeFalsy();

        // Required If
        validator.setData({
            has_company: true,
            company_id: 1,
        });
        expect(validator.validate('company_id', 1, ['required_if:has_company,true']).valid).toBeTruthy();

        // Required Unless
        validator.setData({
            has_company: true,
            company_id: 1,
        });
        expect(validator.validate('company_id', 1, ['required_unless:has_company,true']).valid).toBeTruthy();

        validator.setData({
            has_company: true,
        });
        expect(validator.validate('company_id', 1, ['required_unless:has_company,false']).valid).toBeFalsy();

        // Required With
        validator.setData({
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        });
        expect(validator.validate('cars', ['toyota camry', 'honda civic'], ['required_with:has_cars']).valid).toBeTruthy();

        validator.setData({
            has_cars: true,
        });
        expect(validator.validate('cars', ['toyota camry', 'honda civic'], ['required_with:has_cars']).valid).toBeFalsy();

        // Required With All
        validator.setData({
            loves_cars: true,
            has_cars: true,
            cars: ['toyota camry', 'honda civic'],
        });
        expect(validator.validate('cars', ['toyota camry', 'honda civic'], ['required_with_all:has_cars,loves_cars']).valid).toBeTruthy();

        validator.setData({
            has_cars: true,
            cars: ['toyota camry', 'honda civic']
        });
        expect(validator.validate('cars', ['toyota camry', 'honda civic'], ['required_with_all:has_cars,loves_cars']).valid).toBeFalsy();

        validator.setData({
            has_cars: true,
        });
        expect(validator.validate('cars', ['toyota camry', 'honda civic'], ['required_with_all:has_cars']).valid).toBeFalsy();
    })

    

    test('it can set form data', () => {

        validator.setData({
            test: 'field'
        });

        expect(validator.formData.test).toBe('field');
    })

    test('it can covert snake case to pascal case', () => {

         expect(validator._getPascalCaseRuleName('required_if')).toBe('RequiredIf');
    })

    test('it can covert pascal case to snake case', () => {

         expect(validator._getSnakeCaseRuleName('RequiredIf')).toBe('required_if');
    })
});
