import Validator from '../src/Validator';
import Messages from '../src/Messages';

let validator = new Validator;

describe('Messages', () => {

    test('each rule has a default message', () => {
        let rules = validator._getSupportedRules();
        let messageNames = Object.keys(Messages);

        rules.forEach(name => {
            var snakeName = validator._getSnakeCaseRuleName(name);
            expect(messageNames.includes(snakeName)).toBeTruthy();
        })
    })

})
