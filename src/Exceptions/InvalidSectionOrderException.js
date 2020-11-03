/**
 * This exception is to be thrown when a custom section order is 
 * defined but one or more provided section name do not 
 * currently exist on the Form object.
 */
class InvalidSectionOrderException extends Error {

    constructor(message) {
        super(message)
        this.name = "InvalidSectionOrderExpection";
        this.date = new Date();
    }
}

export default InvalidSectionOrderException;
