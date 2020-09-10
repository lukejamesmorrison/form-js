import Form from '../src/Form';
import sinon from 'sinon';
import moxios from 'moxios';
import laravelResponse from './ResponseStubs/Errors/laravel';


describe('options', () => {

    beforeEach(function () {
        moxios.install();

        moxios.stubRequest('/', {
            status: 200,
            response: laravelResponse.data
        });
    });

    afterEach(function () {
        moxios.uninstall()
    });

    test('validateOnSubmit is true (default)', (done) => {
        
        let form = new Form({
            first_name: {
                value: 'Jane',
                rules: 'required'
            }
        });

        let onFulfilled = sinon.spy();

        expect(form.isValid).toBeFalsy();
        form.submit('get', '/').then(onFulfilled);
        moxios.wait(() => {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });
        expect(form.isValid).toBeTruthy();
    })

    test('validateOnSubmit is false', (done) => {
        
        let form = new Form(
            {
                first_name: {
                    value: 'Jane',
                    rules: 'required'
                }
            },
            {
                validateOnSubmit: false
            }
        );

        let onFulfilled = sinon.spy();

        expect(form.isValid).toBeFalsy();
        form.submit('get', '/').then(onFulfilled);
        moxios.wait(() => {
            expect(onFulfilled.called).toBeTruthy();
            done();
        });
        expect(form.isValid).toBeFalsy();
    })

})
