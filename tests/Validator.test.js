import Validator from 'Validator.js';

let validator = new Validator;

describe('Validator', () => {

    test('it can validate a value based on a rule', () => {
        let validString = validator.validateSingleRule('This is a string', 'string');
        let validObject = validator.validateSingleRule({key: "value"}, 'object');

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
    })
});
