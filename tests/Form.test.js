import Form from 'Form';
import sinon from 'sinon';
import Errors from 'Errors';
import moxios from 'moxios';
import Validator from 'Validator';
import laravelResponse from './ResponseStubs/Errors/laravel';


describe('Form', () => {

    beforeEach(function () {
        moxios.install()
    });

    afterEach(function () {
        moxios.uninstall()
    });

    test("it can store its original data from an object", () => {
        let form = new Form({
            name: {
                value: 'Test'
            }
        });
        expect(form.originalData.name).toBe('Test');
    });

    test("it can store its original data from a string", () => {
        let form = new Form({
            name: 'Test'
        });

        expect(form.originalData.name).toBe('Test');
    });

    test("it can store its original data from a number", () => {
        let form = new Form({
            age: 12
        });

        expect(form.originalData.age).toBe(12);
    });

    test("it can store its original data from a boolean", () => {
        let form = new Form({
            excited: true
        });

        expect(form.originalData.excited).toBe(true);
    });

    test("it can store its original data from a null value", () => {
        let form = new Form({
            excited: null
        });

        expect(form.originalData.excited).toBeNull();
    });

    test("it can store its original data from an array", () => {
        let form = new Form({
            lucky_numbers: []
        });

        expect(form.originalData.lucky_numbers).toStrictEqual([]);

        let form2 = new Form({
            lucky_numbers: [1, 2]
        });

        expect(form2.originalData.lucky_numbers).toStrictEqual([1, 2]);
    });

    test("it can store its original data from an empty object", () => {
        let form = new Form({
            excited: {}
        });

        expect(form.originalData.excited).toStrictEqual({});
    });

    test("it can store its original data from an object not containing a value key", () => {
        let advancedObject = {
            users: {
                john: {
                    age: 12
                }
            }
        };
        let form = new Form(advancedObject);

        expect(form.originalData.users).toStrictEqual(advancedObject.users);

        let validationObject = {
            first_name: {
                value: 'John',
                age: 12
            }
        };

        let form2 = new Form(validationObject);

        expect(form2.originalData.first_name).toBe('John');

    })

    test("it can receive custom properties", () => {
        let form = new Form({
            name: {
                value: 'Test'
            }
        });

        expect(form.name).toBe('Test');
    });

    test('it can store rules for a property', () => {
        let form = new Form({
            name: {
                value: 'Test',
                rules: 'string|max:8'
            }
        });

        expect(form.rules['name']).toEqual(['string', 'max:8']);
    })

    test('it can validate a rule for a property', () => {
        let form = new Form({
            name: {
                value: 'Test',
                rules: 'string'
            }
        });

        expect(form.validate().valid).toBeTruthy();
    })

    test('it can validate multiple rules for a property', () => {
        let form = new Form({
            name: {
                value: 'Test',
                rules: 'string|max:5'
            },
            address: {
                value: '123 Street'
            }
        });

        expect(form.validate().valid).toBeTruthy();
    })

    test('it can validate multiple properties', () => {
        let form = new Form({
            name: {
                value: 'Test',
                rules: 'string|max:5'
            },
            age: {
                value: 10,
                rules: ['min:9']
            }
        });

        expect(form.validate().valid).toBeTruthy();
    })


    /**
     * The form has a Validator object.
     * 
     * @return void
     */
    test("it has a validator object", () => {
        let form = new Form;

        expect(form.validator).toBeInstanceOf(Validator);
    });

	/**
     * The form has an Errors object.
     * 
     * @return void
     */
    test("it has an errors object", () => {
        let form = new Form;

        expect(form.errors).toBeInstanceOf(Errors);
    });

	/**
     * The form can store headers.
     * 
     * @return void
     */
    test("it can store headers", () => {
        let form = new Form;
        form.headers['test-header'] = 'testHeader';

        expect(form.headers['test-header']).toBe('testHeader');
    });

    test('it can send a request', (done) => {
        let form  = new Form;

        moxios.stubRequest('/', {
            status: 200,
            response: laravelResponse.data
        });
        
        let onFulfilled = sinon.spy();

        // Submit
        form.submit('get', '/').then(onFulfilled).catch(onFulfilled);
        moxios.wait(function () {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });

        // GET
        form.get('/').then(onFulfilled).catch(onFulfilled);
        moxios.wait(function () {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });

        // POST
        form.post('/').then(onFulfilled).catch(onFulfilled);
        moxios.wait(function () {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });

        // PATCH
        form.patch('/').then(onFulfilled).catch(onFulfilled);
        moxios.wait(function () {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });

        // DELETE
        form.delete('/').then(onFulfilled).catch(onFulfilled);
        moxios.wait(function () {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });

        // PUT
        form.put('/').then(onFulfilled).catch(onFulfilled);
        moxios.wait(function () {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });
    })

    /**
     * The form can store a file from an HTML file input.
     * 
     * @return void
     */
    test("it can store a file from an HTML file input", () => {
        let event = {
            name: 'file-name',
            files: [
                'location-of-file.js'
            ]
        };
        let form = new Form;
        form.addFile(event);

        // header is set
        expect(form.headers['Content-Type']).toBe('multipart/form-data');

        // hasFiles property is changed to true
        expect(form.hasFiles).toBe(true);

        // formData object actually contains file
        expect(form.formData.get('file-name')).toBe('location-of-file.js')
        // console.log(form.formData.get('file-name'));

    });

	/**
     * The form can store a file from a Vue component.
     * 
     * @return void
     */
    test("it can store a file from a Vue component", () => {
        let event = {
            target: {
                name: 'file-name',
                files: [
                    'location-of-file.js'
                ]
            }
        };
        let form = new Form;
        form.addFile(event);

        // header is set
        expect(form.headers['Content-Type']).toBe('multipart/form-data');

        // hasFiles property is changed to true
        expect(form.hasFiles).toBe(true);

        // formData object actually contains file
        expect(form.formData.get('file-name')).toBe('location-of-file.js')
        // console.log(form.formData.get('file-name'));

    });

    test('it can call a callback before submitting', () => {
        let form = new Form();
        let testInt = 0;

        form
            .beforeSubmit(() => {
                testInt++;
            })
            .get('/');

        expect(testInt).toBe(1);
    })

    test('it can call a callback after submitting', (done) => {
        let form = new Form();
        let testInt = 0;

        moxios.stubRequest('/', {
            status: 200,
            response: 'test'
        })

        let onFulfilled = sinon.spy();
        form
            .afterSubmit(response => {
                testInt++;
            })
            .get('/')
            .then(onFulfilled);

        moxios.wait(function () {
            // let response = onFulfilled.getCall(0).args[0];
            expect(testInt).toBe(1);
            done();
        })
    })

    test('it can call a callback after success', (done) => {
        let form = new Form();
        let testInt = 0;

        moxios.stubRequest('/', {
            status: 200,
            response: 'test'
        })

        let onFulfilled = sinon.spy()
        form
            .afterSuccess(response => {
                testInt++;
            })
            .get('/')
            .then(onFulfilled);

        moxios.wait(function () {
            // let response = onFulfilled.getCall(0).args[0];
            expect(testInt).toBe(1);
            done();
        })
    })

    test('it can call a callback after fail', (done) => {
        let form = new Form();
        let testInt = 0;

        moxios.stubRequest('/', {
            status: 404,
            response: 'test'
        })

        let onFulfilled = sinon.spy();
        form
            .afterFail(response => {
                testInt++;
            })
            // Expected to fail - 404
            .get('/').catch(onFulfilled);

        moxios.wait(function () {
            // let response = onFulfilled.getCall(0).args[0];
            expect(testInt).toBe(1);
            done();
        })
    })

    test('it can set a messages property with custom messages', () => {
        let form = new Form({
            first_name: {
                value: 'Test',
                rules: 'string|max:5',
                messages: {
                    string: 'This is the custom string message',
                    max: 'This is the custom max message'
                }
            }
        });

        expect(Object.keys(form.messages.first_name).length).toBe(2);
        expect(form.messages.first_name.string).toBe('This is the custom string message');
        expect(form.messages.first_name.max).toBe('This is the custom max message');
    })

    test('it can display custom messages over default messages', () => {
        let form = new Form({
            first_name: {
                value: 'Test',
                rules: 'min:5',
                messages: {
                    min: 'This is the custom min message'
                }
            }
        });
        
        form.validate();
        expect(form.errors.getFirst('first_name')).toBe('This is the custom min message');
    })

    test('it can get submitting state', () => {
        let form = new Form;

        form.submitting = true;
        expect(form.isSubmitting()).toBeTruthy();
    })

    test('it can get submittable state', () => {
        let form = new Form;
        
        form.submittable = true;
        expect(form.isSubmittable()).toBeTruthy();
    })

    test('it can define a section', () => {
        let form = new Form({
            field_one: 'first name',
            field_two: 'last name'
        });

        form.defineSection('names', ['field_one', 'field_two']);

        expect(Object.keys(form.sections).includes('names'));
        expect(form.sections.names.fields).toStrictEqual(['field_one', 'field_two']);
    })

    test('it can validate a section', () => {

        let form = new Form({
            name: {
                value: 'Jane Doe',
                rules: 'required|string'
            },
            street: {
                value: '123 Street',
                rules: 'required|string'
            }
        });

        form.defineSection('address', ['street']);

        expect(form.isValid).toBeFalsy();
        expect(form.sectionIsValid('address')).toBeFalsy();

        form.validateSection('address');

        expect(form.isValid).toBeFalsy();
        expect(form.sectionIsValid('address')).toBeTruthy();
    })

});
