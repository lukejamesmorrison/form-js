import Rules from './Rules';

class Validator {

    constructor(formData = {})
    {
        this.formData = formData;
        this.rules = new Rules;
        this.errors = {};
    }

    /**
     * 
     * @param {mixed} value The value to be validated.
     * @param {array} rules The rules to be used for validation.
     */
    validate(value, rules)
    {
        let validations = {};

        rules.forEach(rule => {
            let validationsForRule = this.validateSingleRule(value, rule);
            validations[rule] = validationsForRule;
        });

        let valid = Object.values(validations).every(validation => {
            return validation == true
        });

        return {valid, validations};
    }

    validateSingleRule(value, rule)
    {
        let ruleName = this._getRuleName(rule);
        let ruleParameters = this._getRuleParameters(rule);

        // let ruleSet = {
        //     string: this.rules.validateString(value),
        //     integer: this.rules.validateInteger(value),
        //     boolean: this.rules.validateBoolean(value),
        //     required: this.rules.validateRequired(value),
        //     null: this.rules.validateNull(value),
        //     max: this.rules.validateMax(value, ruleParameters[0]),
        //     min: this.rules.validateMin(value, ruleParameters[0]),
        //     length: this.rules.validateLength(value, ruleParameters[0])
        // };

        if (ruleName == 'string') {
            return this.rules.validateString(value);
        };

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

        if (ruleName == 'length') {
            return this.rules.validateLength(value, ruleParameters[0]);
        }

        if (ruleName == 'array') {
            return this.rules.validateArray(value);
        }

        if (ruleName == 'equal') {
            return this.rules.validateEquals(value, ruleParameters[0]);
        }

        if (ruleName == 'gt') {
            return this.rules.validateGreaterThan(value, ruleParameters[0]);
        }

        if (ruleName == 'gte') {
            return this.rules.validateGreaterThanOrEquals(value, ruleParameters[0]);
        }

        if (ruleName == 'lt') {
            return this.rules.validateLessThan(value, ruleParameters[0]);
        }

        if (ruleName == 'lte') {
            return this.rules.validateLessThanOrEquals(value, ruleParameters[0]);
        }

        if (ruleName == 'between') {
            return this.rules.validateBetween(value, ruleParameters[0], ruleParameters[1]);
        }

        if(ruleName == 'in') {
            return this.rules.validateInArray(value, ruleParameters);
        }


        return false;
    }

    _getRuleName(rule) {
        return rule.split(':')[0];
    }

    _getRuleParameters(rule)
    {
        let parameters = null;
        let parametersMatch = rule.match(/(?:.*[:])(?<parameters>.*)/);

        if (parametersMatch && parametersMatch.groups.parameters) {
            parameters = parametersMatch.groups.parameters.split(',');
        };

        return parameters;
    }

}

export default Validator;
