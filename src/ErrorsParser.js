/**
 * This class is responsible for parsing a response's errors in order 
 * to be recorded on the form.
 */
class ErrorsParser {

    /**
     * Get formatted errors from HTTP response errors.
     *
     * @param {Response} response 
     * @return {object}
     */
    getErrors(response)
    {
        this.originalData = response;

        // If response has data property
        if(response.data) {
            // If data has errors property
            if(response.data.errors && (typeof response.data.errors == 'object')) {
                return response.data.errors;
            }
        };

        return {};
    }

}

export default ErrorsParser;
