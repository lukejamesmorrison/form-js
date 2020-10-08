import Rules from './Rules/Rules';
import DefaultMessages from './Messages';

/**
 * These rules do not depend on anything except the field's value.
 * Rules not in this list should evaluate false.
 */
const INDEPENDENT_RULES = [
    'Array',
    'Boolean',
    'Email',
    'Integer',
    'Length',
    'Null',
    'Numeric',
    'Object',
    'String',
    'Required',
    'Url'
];

/**
 * These rules depend on parameters. Rules not in this list should evaluate false.
 */
const DEPENDENT_RULES = [
    'Between',
    'Equal',
    'Gt',
    'Gte',
    'In',
    'Lt',
    'Lte',
    'Max',
    'Min',
];

/**
 * These rules may depend on parameters and are compared to other form fields. 
 * Rules not in this list should evaluate false.
 */
const COMPARISON_RULES = [
    'Confirmed',
    'Different',
    'Filled',
    'Same',
    'RequiredIf',
    'RequiredUnless',
    'RequiredWith',
    'RequiredWithAll',
];

/**
 * This class is responsible for validating form data.
 * 
 * @return void
 */
class Validator {

    constructor()
    {
        /**
		 * @property {object} The validator's rules.
		 */
        this.rules = new Rules;

        /**
		 * @property {object} The form's field data.
		 */
        this.formFields = {};
    }

    /**
     * Validate a value against its rules.
     *
     * @param {string} fieldname
     * @param {mixed} fieldValue The value to be validated.
     * @param {array} rules The rules to be used for validation.
     * @param {object} messages 
     * @return {object}
     */
    validate(fieldName, fieldValue, rules, messages = {})
    {
        let validations = {};

        rules.forEach(rule => {

            // Validate Custom Rule
            if(typeof rule === 'function') {
                let validationsForRule = this.validateCustomRule(fieldName, fieldValue, rule);

                if(typeof validationsForRule === 'string') {
                    let message = validationsForRule;
                    validations['custom'] = message;
                };
                
            // Validate Default Rule
            } else {
                let validationsForRule = this.validateDefaultRule(fieldName, fieldValue, rule);

                if(validationsForRule == false) {
                    let ruleName = this._getRuleName(rule);
                    let message = this._getMessageForRule(fieldName, rule, messages);
                    validations[ruleName] = message;
                };
            }  
        });

        let valid = Object.values(validations).every( validation => validation == true);

        return {valid, errors: validations};
    }

    /**
     * Get the message for a specified rule.
     *
     * @param {stirng} name The field name.
     * @param {string} rule The rule string including parameters.
     * @param {object} messages The messages searched. 
     */
    _getMessageForRule(name, rule, messages)
    {
        let ruleName = this._getRuleName(rule);
        let ruleParameters = this._getRuleParameters(rule);

        // If custom message exists
        if(messages[ruleName]) return messages[ruleName];

        // Else use default messages
        let message = DefaultMessages[ruleName];

        // Replace field name placeholder with readable rule name
        message = message.replace(':field', name.replace('_', ' '));

        // Replace parameters
        if(ruleParameters) {    
            ruleParameters.forEach((param, index) => {
                message = message.replace(`:param${index}`, param);
            });
        };
        
        return message;
    }

    /**
     * Validate a field against a custom rule.
     *
     * @param {string} fieldName The name of the field.
     * @param {mixed} fieldValue The value of the field.
     * @param {callback} rule The callback function representing the custom rule.
     * @return {boolean}
     */
    validateCustomRule(fieldName, fieldValue, rule) {
        return rule(fieldName, fieldValue, this._customRulesFailed)
    }

    /**
     * Returns a string for use with a custom validation rule.
     *
     * @param {string} message THe error message for a custom rule.
     * @return {string}
     */
    _customRulesFailed(message)
    {
        return message;
    }

    /**
     *  Validate a field against a defualt rule.
     *
     * @param {string} fieldName The field name.
     * @param {mixed} value  The field value.
     * @param {string} rule
     * @return {boolean}
     */
    validateDefaultRule(fieldName, value, rule)
    {
        let ruleName = this._getRuleName(rule);
        let ruleNameCapitalized = this._getPascalCaseRuleName(ruleName);

        if(!this._getSupportedRules().includes(ruleNameCapitalized))
        {
            console.warn(`Formjs does not currently support the '${ruleName}' rule.`)
            return false;
        };
        
        let ruleParameters = this._getRuleParameters(rule);

        switch (ruleName) {
            case 'array':
                return this.rules.validateArray(value);
                break;
            case 'between':
                return this.rules.validateBetween(value, ruleParameters[0], ruleParameters[1]);
                break;
            case 'boolean':
                return this.rules.validateBoolean(value);
                break;
            case 'confirmed':
                return this.rules.validateConfirmed(fieldName, this.formFields);
                break;
            case 'different':
                return this.rules.validateDifferent(value, ruleParameters[0], this.formFields);
                break;
            case 'email':
                return this.rules.validateEmail(value);
                break;
            case 'equal':
            case 'same':
                return this.rules.validateEquals(value, ruleParameters[0]);
                break;
            case 'filled':
                return this.rules.validateFilled(fieldName, this.formFields);
                break;
            case 'gt':
                return this.rules.validateGt(value, ruleParameters[0]);
                break;
            case 'gte':
                return this.rules.validateGte(value, ruleParameters[0]);
                break;
            case 'in':
                return this.rules.validateInArray(value, ruleParameters);
                break;
            case 'integer':
                return this.rules.validateInteger(value);
                break;
            case 'length':
                return this.rules.validateLength(value, ruleParameters[0]);
                break;
            case 'lt':
                return this.rules.validateLt(value, ruleParameters[0]);
                break;
            case 'lte':
                return this.rules.validateLte(value, ruleParameters[0]);
                break;
            case 'max':
                return this.rules.validateMax(value, ruleParameters[0]);
                break;
            case 'min':
                return this.rules.validateMin(value, ruleParameters[0]);
                break;
            case 'null':
                return this.rules.validateNull(value);
                break;
            case 'numeric':
                return this.rules.validateNumeric(value);
                break;
            case 'object':
                return this.rules.validateObject(value);
                break;
            case 'required':
                return this.rules.validateRequired(value);
                break;
            case 'required_if':
                return this.rules.validateRequiredIf(fieldName, ruleParameters[0], ruleParameters[1], this.formFields);
                break;
            case 'required_unless':
                return this.rules.validateRequiredUnless(fieldName, ruleParameters[0], ruleParameters[1], this.formFields);
                break;
            case 'required_with':
                return this.rules.validateRequiredWith(fieldName, ruleParameters, this.formFields);
                break;
            case 'required_with_all':
                return this.rules.validateRequiredWithAll(fieldName, ruleParameters, this.formFields);
                break;
            case 'string':
                return this.rules.validateString(value);
                break;
            case 'url':
                return this.rules.validateUrl(value);
                break;
        }
    }

    /**
     * Set the formData property to the provided data object.
     * 
     * @param {object} data
     * @return void
     */
    setData(data)
    {
        this.formFields = data;
    }

    /**
     * Parse rule name from rule string.
     *
     * @param {string} rule 
     * @return {string}
     */
    _getRuleName(rule) {
        return rule.split(':')[0];
    }

    /**
     * Parse rule parameters from rule string.
     *
     * @param {string} rule 
     * @return {array}
     */
    _getRuleParameters(rule)
    {
        let parameters = null;
        let parametersMatch = rule.match(/(?:.*[:])(?<parameters>.*)/);

        if (parametersMatch && parametersMatch.groups.parameters) {
            parameters = parametersMatch.groups.parameters.split(',');
        };

        return parameters;
    }

    /**
     * Convert snake case string to pascal case.
     * 
     * @param {string} name 
     */
    _getPascalCaseRuleName(name)
    {
        let words = name.split('_').map(word => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });

        return words.join('');
    }

    /**
     * Convert pascal case string to snake case.
     * 
     * @param {string} name 
     */
    _getSnakeCaseRuleName(name)
    {
        return name.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    /**
     * Get all supported rules.
     * 
     * @return {array}
     */
    _getSupportedRules()
    {
        return INDEPENDENT_RULES.concat(
            DEPENDENT_RULES,
            COMPARISON_RULES
        );
    }
}

export default Validator;
