import Form from 'Form';
import Errors from 'Errors';
import moxios from 'moxios';
import sinon from 'sinon';

describe('Form', () => {

    beforeEach(function () {
        // import and pass your custom axios instance to this method
        moxios.install()
    });

    afterEach(function () {
        // import and pass your custom axios instance to this method
        moxios.uninstall()
    });

	/**
     * The form can store original data.
     * 
     * @return void
     */
    test("it can store its original data", () => {
        let form = new Form({
            name: 'Test'
        });

        expect(form.originalData.name).toBe('Test');
        // console.log(form.originalData);
    });

	/**
     * The form can receive custom properties.
     * 
     * @return void
     */
    test("it can receive custom properties", () => {
        let form = new Form({
            name: 'Test'
        });

        expect(form.name).toBe('Test');
        // console.log(form.name);
    });

	/**
     * The form has an Errors object.
     * 
     * @return void
     */
    test("it has an errors object", () => {
        let form = new Form;

        expect(form.errors).toBeInstanceOf(Errors);
        // console.log(form.errors);
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
        // console.log(form.headers);
    });

	/**
     * The form can store a file.
     * 
     * @return void
     */
    test("it can store a file", () => {
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

        // hasFiles property is ~changed
        expect(form.hasFiles).toBe(true);

        // formData object actually contains file
        expect(form.formData.get('file-name')).toBe('location-of-file.js')
        // console.log(form.formData.get('file-name'));

    });

    test('it_can_call_a_callback_before_submitting', () => {
        let form = new Form();
        let testInt = 0;

        form
            .beforeSubmit(() => {
                testInt++;
            })
            .get('/')

        expect(testInt).toBe(1);
    })

    test('it_can_call_a_callback_after_submitting', (done) => {
        let form = new Form();
        let testInt = 0;

        moxios.stubRequest('/', {
            status: 200,
            response: 'test'
        })

        let onFulfilled = sinon.spy()
        form
            .afterSubmit(response => {
                testInt = testInt + 1;
            })
            .get('/')
            .then(onFulfilled)

        moxios.wait(function () {
            // console.log(onFulfilled);
            let response = onFulfilled.getCall(0).args[0];
            expect(testInt).toBe(1);
            // console.log(response);
            done()
        })
    })

    test('it_can_call_a_callback_after_success', (done) => {
        let form = new Form();
        let testInt = 0;

        moxios.stubRequest('/', {
            status: 200,
            response: 'test'
        })

        let onFulfilled = sinon.spy()
        form
            .afterSuccess(response => {
                testInt = testInt + 1;
            })
            .get('/')
            .then(onFulfilled)

        moxios.wait(function () {
            // let response = onFulfilled.getCall(0).args[0];
            expect(testInt).toBe(1);
            done()
        })
    })

    test('it_can_call_a_callback_after_fail', (done) => {
        let form = new Form();
        let testInt = 0;

        moxios.stubRequest('/', {
            status: 404,
            response: 'test'
        })

        let onFulfilled = sinon.spy()
        form
            .afterFail(response => {
                testInt = testInt + 1;
            })
            .get('/')
            // Expected to fail - 404
            .catch(onFulfilled)

        moxios.wait(function () {
            // let response = onFulfilled.getCall(0).args[0];
            expect(testInt).toBe(1);
            done()
        })
    })

});
