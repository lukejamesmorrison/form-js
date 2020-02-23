import Validator from 'Validator.js';

let validator = new Validator;

const BOOLEANS = [true, false, 1, 0, '1', '0'];
const NUMBERS = [2, -4, 3.1, -5.2];
const STRING = 'test string';
const ARRAY = ['one', 'two'];
const OBJECT = {key: 'value'};

console.log(NUMBERS.splice(2, 2));
let INTEGERS = NUMBERS.splice(0,2).concat(BOOLEANS.splice(2,2));
let FLOATS = NUMBERS.splice(2,2);

describe.only('Validator', () => {
    
    test('it can validate a boolean value', () => 
    {
        // Validate for
        BOOLEANS.forEach(value => {
            expect(validator.validateBoolean(value)).toBeTruthy();
        });

        // Validate against
        NUMBERS.forEach(value => {
            expect(validator.validateBoolean(value)).toBeFalsy();
        });
        expect(validator.validateBoolean(STRING)).toBeFalsy();
        expect(validator.validateBoolean(ARRAY)).toBeFalsy();
        expect(validator.validateBoolean(OBJECT)).toBeFalsy();
    });

    test('it can validate a string value', () =>
    {
        // Validate for
        BOOLEANS.splice(4, 2).forEach(value => {
            expect(validator.validateString(value)).toBeTruthy(); // '1', '0'
        });
        expect(validator.validateString(STRING)).toBeTruthy();

        // Validate against
        BOOLEANS.splice(0, 4).forEach(value => {
            expect(validator.validateString(value)).toBeFalsy(); // true, false, 1, 0
        });
        NUMBERS.forEach(value => {
            expect(validator.validateBoolean(value)).toBeFalsy();
        });
        expect(validator.validateBoolean(ARRAY)).toBeFalsy();
        expect(validator.validateBoolean(OBJECT)).toBeFalsy();
    });

    test.only('it can validate an integer', () =>
    {
        // Validate for
        INTEGERS.forEach(value => {
            expect(validator.validateInteger(value)).toBeTruthy();
        });

        // Validate against
        FLOATS.forEach(value => {
            expect(validator.validateInteger(value)).toBeTruthy();
        });
    });
});
