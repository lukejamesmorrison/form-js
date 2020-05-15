import Validator from 'Validator.js';

let validator = new Validator;

describe.only('Validator', () => {

    test('it can validate a value based on a rule', () => {
        let validString = validator.validateSingleRule('This is a string', 'string');
        let validObject = validator.validateSingleRule({key: "value"}, 'object');

        expect(validString).toBeTruthy();
        expect(validObject).toBeTruthy();
    });

    test('it can validate a value based on multiple rules', () => {
        let validationTrue = validator.validate('This is a string with more than 10 characters', ['string', 'min:10']);
        let validationFalse = validator.validate('This is a string with more than 10 characters', ['string', 'max:10']);

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

    test.only('it can validate all rules', () => {

        /**
         * Tests should be truthy to prove that the correct rule is applied and validated.
         */

        // Boolean
        expect(validator.validate(false, ['boolean']).valid).toBeTruthy();

        //String
        expect(validator.validate('test', ['string']).valid).toBeTruthy();

        //Integer
        expect(validator.validate(-12, ['integer']).valid).toBeTruthy();

        //Object
        expect(validator.validate({}, ['object']).valid).toBeTruthy();

        //Max
        expect(validator.validate(4, ['max:5']).valid).toBeTruthy();

        //Min
        expect(validator.validate(4, ['min:3']).valid).toBeTruthy();

        //Required
        expect(validator.validate('test', ['required']).valid).toBeTruthy();

        //Null
        expect(validator.validate(null, ['null']).valid).toBeTruthy();

        //Length
        expect(validator.validate('test', ['length:4']).valid).toBeTruthy();

        //Array
        expect(validator.validate([1,2], ['array']).valid).toBeTruthy();

        //Equals
        expect(validator.validate(2, ['equal:2']).valid).toBeTruthy();

        //Greater Than
        expect(validator.validate(2, ['gt:1']).valid).toBeTruthy();

        //Greater Than Or Equals
        expect(validator.validate(2, ['gte:2']).valid).toBeTruthy();

        //Less Than
        expect(validator.validate(2, ['lt:3']).valid).toBeTruthy();

        //Less Than Or Equals
        expect(validator.validate(2, ['lte:2']).valid).toBeTruthy();

        //Between
        expect(validator.validate('foo', ['in:foo,bar']).valid).toBeTruthy();
    })
});
