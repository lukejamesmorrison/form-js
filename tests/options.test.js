import sinon from 'sinon';
import moxios from 'moxios';
import Form from '../src/Form';
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

    test('it will not count final section towards progress if finalSectionForReview is false', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        },
        {
            finalSectionForReview: false
        });

        form.setCurrentSection('second');
        expect(form.getProgress()).toBe(50.00);
    });

    test('it will count final section towards progress if finalSectionForReview is true', () => {
        let form = new Form({
            firsName: {
                value: 'John',
                section: 'first'
            },
            address: {
                value: '123 Street',
                section: 'second'
            }
        },
        {
            finalSectionForReview: true
        });

        form.setCurrentSection('second');
        expect(form.getProgress()).toBe(100.00);
    });

})
