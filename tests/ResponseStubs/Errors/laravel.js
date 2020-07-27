/**
 * A Laravel error response.
 */
export default {
    config: {},
    data: {
        errors: {
            email: ['An email is required', 'A valid email is required'],
            first_name: ['A first name is required', 'A first name should be of type String']
        },
        message: 'The given data is invalid.'
    }
}
