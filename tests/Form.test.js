import Form from 'Form';
import sinon from 'sinon';
import Errors from 'Errors';
import moxios from 'moxios';
import Validator from 'Validator';
import laravelResponse from './ResponseStubs/Errors/laravel';
import SectionNotDefinedException from '../src/Exceptions/SectionNotDefinedException';
import InvalidSectionOrderException from '../src/Exceptions/InvalidSectionOrderException';


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

    test('it can set default options', () => {
        let form = new Form;

        expect(form.options.validateOnSubmit).toBeTruthy();
    })

    test('it can set custom options', () => {
        let form = new Form({}, {
            validateOnSubmit: false
        });

        expect(form.options.validateOnSubmit).toBeFalsy();
    })

    test('it can set custom request config', () => {
        let form = new Form({}, {
            axios: {
                timeout: 1000,
            }
        });

        expect(form.getRequestConfig()).toStrictEqual({
            // Headers added by default
            headers: {},
            timeout: 1000,
        });
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

    test('it can validate the form then call a callable', () => {

        let full_name = '';
        let form = new Form({
            first_name: {
                value: 'Johnny',
                rules: 'string'
            },
            last_name: {
                value: 'Appleseed',
                rules: 'string'
            }
        });

        form.validateThen((data) => {
            full_name = `${data.first_name} ${data.last_name}`
        });

        expect(full_name).toBe('Johnny Appleseed');
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

        // PUT
        form.put('/').then(onFulfilled).catch(onFulfilled);
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
        expect(form.formData.get('file-name')).toBe('location-of-file.js');

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

    test('it can get field names in section', () => {
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

        expect(form.getSectionFields('address')).toStrictEqual(['street'])
    })

    test('it can add a field to a section', () => {
        let form = new Form;

        let first_name = {
            value: 'Jane',
            section: 'name'
        };

        form._addFieldToSection('first_name', first_name);

        expect(form.getSectionFields('name')).toStrictEqual(['first_name']);
    })

    test('it can assign fields to section from data during instantiation', () => {
        let form = new Form({
            first_name: {
                value: 'Jane',
                rules: 'required|string',
                section: 'name'
            },
            last_name: {
                value: 'Doe',
                rules: 'required|string',
                section: 'name'
            },
            street: {
                value: '123 Street',
                rules: 'required|string',
                section: 'address'
            }
        });

        expect(form.getSectionFields('name')).toStrictEqual(['first_name', 'last_name']);
        expect(form.getSectionFields('address')).toStrictEqual(['street']);
        expect(form.getSectionFields('preferences')).toStrictEqual([]);
    })

    test('it can have a custom rule', () => {

        let form = new Form({
            age: {
                value: 24,
                rules: [
                    'integer',
                    // Value is even
                    (fieldName, value, fail) => {
                        return value % 2 == 0 || fail('The age field must be even.');
                    }
                ]
            }
        });

        form.validate();

        expect(form.isValid).toBeTruthy();

        let form2 = new Form({
            age: {
                value: 24,
                rules: [
                    'integer',
                    // Value is odd
                    (fieldName, value, fail) => {
                        return value % 2 != 0 || fail('The age field must be odd.');
                    }
                ]
            }
        });

        form2.validate();

        expect(form2.isValid).toBeFalsy();
        expect(form2.errors.any()).toBeTruthy();

    });

    test('it can require strict sections', () => {

        let form = new Form({
            first_name: 'John',
            last_name: {
                value: 'Doe',
                rules: 'required'
            },
            street: '123 Test Street',
            city: 'Test City'
        }, {
            strictSections: true
        });

        form.defineSection('general', ['first_name', 'last_name']);
        form.defineSection('address', ['street']);

        expect(form.validate().valid).toBeFalsy();

        form.defineSection('general', ['first_name', 'last_name']);
        form.defineSection('address', ['street', 'city']);

        expect(form.validate().valid).toBeTruthy();
    });

    test('it can get FormData object', () => {

        let form = new Form({
            firstName: 'John'
        });

        expect(form.getFormData()).toBeInstanceOf(FormData);
        expect(form.getFormData().get('firstName')).toBe('John');
    })

    test('it can get an array from formData property', () => {
        let form = new Form({
            favoriteNumbers: [1,2]
        });

        // FormData will cast array values as strings
        expect(form.getFormData().getAll('favoriteNumbers[]')).toEqual(['1', '2']);
    })

    test('it will not store a null value in formData', () => {
        let form = new Form({
            field: null
        });

        // FormData will cast array values as strings
        expect(form.getFormData().get('field')).toBeNull();
    })

    test('it can be reset', () => {
        let form = new Form({
            firstName: 'John'
        });

        form.errors.record({
            firstName: ['the firstName error message']
        })

        expect(form.firstName).toEqual('John');
        expect(form.errors.any()).toBeTruthy();

        form.reset();

        expect(form.firstName).toBeNull();
        expect(form.errors.any()).toBeFalsy();
    })

    test('a current section is defined on instantiation', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        expect(form.currentSection).toBe('first');
    })

    test('it can set the current section', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        form.setCurrentSection('second');
        expect(form.currentSection).toBe('second');

        // Expect exception if section is not defined
        expect(() => form.setCurrentSection('third')).toThrow(SectionNotDefinedException);
        expect(form.currentSection).toBe('second');
    })

    test('it can get the current section', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        expect(form.getCurrentSection('second')).toBe('first');
    })

    test("it can get the form's sections", () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        expect(form.getSections()).toEqual(['first', 'second']);
    })

    test('it can get the section order', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        // Order should be defined on instantiation
        expect(form.getSections()).toEqual(['first', 'second']);
    })

    test('it can set a section order', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        form.orderSections(['second', 'first']);
        expect(form.getSections()).toEqual(['second', 'first']);

        // Check that exception is thrown in non-existant sections are provided.
        expect(() => form.orderSections(['second', 'first', 'third'])).toThrow(InvalidSectionOrderException);
        expect(form.getSections()).toEqual(['second', 'first']);
    });

    test('it can get section progress', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        form.setCurrentSection('second');
        expect(form.progress).toBe(50.00);
        expect(form.getProgress()).toBe(50.00);
    });

    test('it can move to next section', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        // verify initial state
        expect(form.getCurrentSection()).toBe('first');
        expect(form.getSections()).toEqual(['first', 'second']);
        expect(form.progress).toBe(0);

        form.nextSection();
        expect(form.getCurrentSection()).toBe('second');
        expect(form.progress).toBe(50.00);

        form.nextSection();
        expect(form.getCurrentSection()).toBe('second');
        expect(form.progress).toBe(50.00);
    });

    test('it can move to previous section', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        });

        // verify initial state
        expect(form.getSections()).toEqual(['first', 'second']);
        form.nextSection();
        expect(form.getCurrentSection()).toBe('second');
        expect(form.progress).toBe(50.00);

        form.previousSection();
        expect(form.getCurrentSection()).toBe('first');
        expect(form.progress).toBe(0);

        form.previousSection();
        expect(form.getCurrentSection()).toBe('first');
        expect(form.progress).toBe(0);
    });

});
