import Errors from '../src/Errors';

describe('Errors', () => {

    test('it can record errors', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid'],
            age: ['A second error message for a different field']
        });

        expect(errors.errors.name).toStrictEqual(['The name field is invalid']);
        expect(errors.errors.age).toStrictEqual(['A second error message for a different field']);
    })

    test('it can return if an error for a field exists', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid']
        });

        expect(errors.has('name')).toBeTruthy();
    })

    test('it can return if any errors exist', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid']
        });

        expect(errors.any()).toBeTruthy();
    })

    test('it can return number of error fields', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid'],
            address: ['The address field is invalid']
        });

        expect(errors.size()).toBe(2);
    })

    test('it can return all errors for a given field', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid', 'Another error message']
        });

        expect(errors.get('name')).toBeInstanceOf(Array);
        expect(errors.get('name').length).toBe(2);
    })

    test('it can return first error message for a given field', () => {
        let errors = new Errors;
        let message = 'The name field is invalid';
        errors.record({
            name: [message]
        });

        expect(errors.getFirst('name')).toBe(message);
        expect(errors.first('name')).toBe(message);
    })

    test('it can return first error message', () => {
        let errors = new Errors;
        let message = 'The name field is invalid';
        errors.record({
            name: [message],
            age: ['This is another message from another field.']
        });

        expect(errors.first()).toBe(message);
    })

    test('it can return all errors for a given field', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid', 'Another error message'],
            age: ['Yet another message']
        });

        expect(errors.all()).toBeInstanceOf(Object);

        let error_field_names = Object.keys(errors.all());
        expect(error_field_names.includes('name')).toBeTruthy();
        expect(error_field_names.includes('age')).toBeTruthy();
    })

    test('it can clear errors for a given field', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid'],
            age: ['Another error message']
        });

        expect(errors.has('name')).toBeTruthy();
        expect(errors.has('age')).toBeTruthy();

        errors.clear('name');
        expect(errors.has('name')).toBeFalsy();
        expect(errors.has('age')).toBeTruthy();
    })

    test('it can clear all errors', () => {
        let errors = new Errors;
        errors.record({
            name: ['The name field is invalid'],
            age: ['Another error message']
        });

        errors.clear();
        expect(errors.any()).toBeFalsy();
    })

})



