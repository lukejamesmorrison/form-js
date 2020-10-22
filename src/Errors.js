/**
 * This class is responsible for managing a form's errors.
 */
class Errors {

    constructor()
    {
        /**
         * @property {object} The collection of errors.
         */
        this.errors = {};
    }

    /**
     * Determine if an errors exist for the given field.
     *
     * @param {string} field
     * @return {boolean}
     */
    has(field)
    {
        return this.errors.hasOwnProperty(field);
    }

    /**
     * Determine if we have any errors.
     *
     * @return {boolean}
     */
    any()
    {
        return this.size() > 0;
    }

    /**
     * Determine the number of errors.
     *
     * @return {number}
     */
    size()
    {
        return Object.keys(this.errors).length;
    }

     /**
     * Retreive all error messages for the given field.
     *
     * @param {string} field
     * @return {string|null}
     */
    get(field)
    {
        if(this.errors[field]) {
            return this.errors[field];
        };
    }

    /**
     * Retreive the first error message for the given field.
     *
     * @param {string} field
     * @param {boolean} all
     * @return {string|null}
     */
    getFirst(field)
    {
        if(this.errors[field]) {
            return this.errors[field][0];
        };
    }

    /**
     * Retreive the first error message.
     *
     * @return {string|null}
     */
    first(field = null)
    {
        if(field) {
            return this.getFirst(field);
        } else {
            if(this.size() > 0) {
                return Object.values(this.errors)[0][0]; // errors -> first error -> first message
            };
        }
    }

    /**
     * Retreive all errors.
     *
     * @return {object}
     */
    all()
    {
        return this.errors;
    }

    /**
     * Record the new errors.
     *
     * @param {object} errors
     * @return void
     */
    record(errors)
    {
        this.errors = errors;
    }

    /**
     * Clear one or all error fields.
     *
     * @param {string|null} field
     * @return void
     */
    clear(field = null)
    {
        if (field) {
            delete this.errors[field];
            return;
        };
        this.errors = {};
    }
};

export default Errors;
