import Form from 'Form';
import sinon from 'sinon';
import moxios from 'moxios';
import laravelResponse from './ResponseStubs/Errors/laravel';

describe('Errors', () => {

    beforeEach(() => {
        moxios.install()
    });

    afterEach(() => {
        moxios.uninstall()
    });

    test('it can get validation errors without sending HTTP request', (done) => {
        let form = new Form({
            first_name: {
                value: '',
                rules: 'required|min:5'
            },
            email: ''
        });

        let onFulfilled = sinon.spy();
        form.get('/').then(onFulfilled).catch(onFulfilled);

        moxios.wait(function () {
            // HTTP request should NOT be sent if form is invalid.
            expect(form.isValid).toBeFalsy();
            expect(form.errors.get('first_name')[0]).toEqual('The first_name field is required.');
            expect(form.errors.get('first_name')[1]).toEqual('The first_name field must be greater than 5.');
            done();
        });


    })

    test('it can correctly parse an error response from a Laravel server', (done) => {
        let form = new Form({
            first_name: '',
            email: ''
        })

        moxios.stubRequest('/', {
            status: 422,
            response: laravelResponse.data
        })

        let onFulfilled = sinon.spy();
        form.get('/').catch(onFulfilled);

        moxios.wait(function () {
            expect(form.errors.any()).toBeTruthy();
            expect(form.errors.getFirst('first_name')).toBe('A first name is required');
            expect(form.errors.get('first_name').length).toBe(2);
            expect(form.errors.get('email').length).toBe(2);
            done();
        });
    })


})



