/**
 * This class is currently a placeholder.  In the future, it will 
 * act as the concrete representation of a 'Rule' class.
 */
class BaseRule {

    /**
     * @param {string} rule 
     */
    constructor(fieldName, parameters = [], comparedFields = [], formFields = {})
    {
        this.name = _getRuleName()
        this.parameters = _getRuleParameters()
    }

    /**
     * Parse rule name from rule string.
     */
    _getRuleName() {
        return this.originalData.split(':')[0];
    }

    /**
     * Parse rule parameters from rule string.
     */
    _getRuleParameters()
    {
        let parameters = null;
        let parametersMatch = this.originalData.match(/(?:.*[:])(?<parameters>.*)/);

        if (parametersMatch && parametersMatch.groups.parameters) {
            parameters = parametersMatch.groups.parameters.split(',');
        };

        return parameters;
    }

    /**
     * Get message for specific rule.  If a message is not provided upon 
     * instantiation, a default rule messages will be generated.
     *
     * @param {string} message
     */
    _getRulesMessage(message)
    {
        
    }
}
