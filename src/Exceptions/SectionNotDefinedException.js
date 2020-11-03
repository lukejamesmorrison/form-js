/**
 * This exception is to be thrown when a section is referenced 
 * but is not currently defined on the form.
 */
class SectionNotDefinedException extends Error {

    constructor(message) {
        super(message)
        this.name = "SectionNotDefinedException";
        this.date = new Date();
    }
}

export default SectionNotDefinedException;
