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
    'Required'
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
 * These rules may contain parameters and are compared to form fields. 
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
 */
class Validator {

    constructor()
    {
        this.rules = new Rules;
        this.formData = {};
        this.errors = {};
    }

    /**
     * 
     * Validate a value against its rules.
     *
     * @param {string} fieldname
     * @param {mixed} fieldValue The value to be validated.
     * @param {array} rules The rules to be used for validation.
     */
    validate(fieldName, fieldValue, rules, messages = {})
    {
        let validations = {};

        rules.forEach(rule => {
            let validationsForRule = this.validateSingleRule(fieldName, fieldValue, rule);
            if(validationsForRule == false) {
                let message = this._getMessageForRule(fieldName, rule, messages);
                validations[this._getRuleName(rule)] = message;
            };
        });

        let valid = Object.values(validations).every(validation => {
            return validation == true
        });

        return {valid, errors: validations};
    }

    _getMessageForRule(name, rule, messages)
    {
        let ruleName = this._getRuleName(rule);
        let ruleParameters = this._getRuleParameters(rule);

        // If custom message exists
        if(messages[ruleName])
        {
            return messages[ruleName];
        };

        // console.log(ruleName);

        // Else use default messages
        let message = DefaultMessages[ruleName];

        // Replace field name with readable rule name
        message = message.replace(':field', name.replace('_', ' '));

        // Replace parameters
        if(ruleParameters)
        {    
            ruleParameters.forEach((param, index) => {
                message = message.replace(`:param${index}`, param);
            })
        }
        
        return message;
    }

    /**
     * 
     *  Validate a value against a single rule.
     *
     * @param {string} name
     * @param {mixed} value 
     * @param {mixed} rule 
     */
    validateSingleRule(name, value, rule)
    {
        let ruleName = this._getRuleName(rule);
        let ruleNameCapitalized = this._getPascalCaseRuleName(ruleName);

        if(!this._getSupportedRules().includes(ruleNameCapitalized))
        {
            console.warn(`Formjs does not currently support the '${ruleName}' rule.`)
            return false;
        };
        
        let ruleParameters = this._getRuleParameters(rule);

        if (ruleName == 'string') {
            return this.rules.validateString(value);
        };

        if(ruleName == 'email') {
            return this.rules.validateEmail(value);
        }

        if(ruleName == 'filled') {
            return this.rules.validateFilled(name, this.formData);
        }

        if (ruleName == 'integer') {
            return this.rules.validateInteger(value);
        };

        if (ruleName == 'boolean') {
            return this.rules.validateBoolean(value);
        };

        if (ruleName == 'object') {
            return this.rules.validateObject(value);
        };

        if(ruleName == 'max')
        {
            return this.rules.validateMax(value, ruleParameters[0]);
        }

        if (ruleName == 'min') {
            return this.rules.validateMin(value, ruleParameters[0]);
        }

        if (ruleName == 'required') {
            return this.rules.validateRequired(value);
        }

        if (ruleName == 'null') {
            return this.rules.validateNull(value);
        }

        if (ruleName == 'numeric') {
            return this.rules.validateNumeric(value);
        }

        if (ruleName == 'length') {
            return this.rules.validateLength(value, ruleParameters[0]);
        }

        if (ruleName == 'array') {
            return this.rules.validateArray(value);
        }

        if (ruleName == 'equal' || ruleName == 'same') {
            return this.rules.validateEquals(value, ruleParameters[0]);
        }

        if (ruleName == 'gt') {
            return this.rules.validateGt(value, ruleParameters[0]);
        }

        if (ruleName == 'gte') {
            return this.rules.validateGte(value, ruleParameters[0]);
        }

        if (ruleName == 'lt') {
            return this.rules.validateLt(value, ruleParameters[0]);
        }

        if (ruleName == 'lte') {
            return this.rules.validateLte(value, ruleParameters[0]);
        }

        if (ruleName == 'between') {
            return this.rules.validateBetween(value, ruleParameters[0], ruleParameters[1]);
        }

        if(ruleName == 'in') {
            return this.rules.validateInArray(value, ruleParameters);
        }

        if(ruleName == 'different') {
            return this.rules.validateDifferent(value, ruleParameters[0], this.formData);
        }

        if(ruleName == 'confirmed') {
            return this.rules.validateConfirmed(name, this.formData);
        }

        if(ruleName == 'required_if') {
            return this.rules.validateRequiredIf(name, ruleParameters[0], ruleParameters[1], this.formData);
        }

        if(ruleName == 'required_unless') {
            return this.rules.validateRequiredUnless(name, ruleParameters[0], ruleParameters[1], this.formData);
        }

        if(ruleName == 'required_with') {
            return this.rules.validateRequiredWith(name, ruleParameters, this.formData);
        }

        if(ruleName == 'required_with_all') {
            return this.rules.validateRequiredWithAll(name, ruleParameters, this.formData);
        }
    }

    /**
     * Set the formData property to the provided data object.
     * 
     * 
     * @param {object} data 
     */
    setData(data)
    {
        this.formData = data;
    }

    /**
     * 
     * Parse rule name from rule string.
     *
     * @param {string} rule 
     */
    _getRuleName(rule) {
        return rule.split(':')[0];
    }

    /**
     * 
     * Parse rule parameters from rule string.
     *
     * @param {string} rule 
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

    _getPascalCaseRuleName(name)
    {
        let words = name.split('_').map(word => {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });

        return words.join('');
    }

    _getSnakeCaseRuleName(name)
    {
        return name.split(/(?=[A-Z])/).join('_').toLowerCase();
    }

    _getSupportedRules()
    {
        return INDEPENDENT_RULES.concat(
            DEPENDENT_RULES,
            COMPARISON_RULES
        );
    }
}

export default Validator;
