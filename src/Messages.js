
/**
 * This file hold the default error messages for each validation rule.
 */
export default {

    after: 'The :field field must be a date after the :param0 field date.',

    alpha: 'The :field field must only contain alphabetic characters.',

    alpha_dash: 'The :field field must only contain alphabetic characters, hypens and underscores.',

    alpha_num: 'The :field field must only contain alphanumeric characters.',

    array: 'The :field field must be of type Array.',

    before: 'The :field field must be a date before the :param0 field date.',

    between: 'The :field field must be between :param0 and :param1.',

    boolean: 'The :field field must be of type Boolean.',

    confirmed: 'The :field field must be confirmed.',

    date: 'The :field field must be a valid Date object or date string.',

    date_equals: 'The :field field must be the same date as the :param0 field.',

    different: 'The :field field value must be different than the :param0 field value.',
    
    email: 'The :field field must be a valid email address.',

    equal: 'The :field field must be equal to :param0.',

    filled: 'The :field field must be present and not be empty.',

    file: 'The :field field must be a file.',

    gt: 'The :field field must be greater than :param0.',

    gte: 'The :field field must be greater than or equal to :param0.',

    in: 'The :field field must be in the given array.',

    integer: 'The :field field must be of type Integer.',

    ip: 'The :field field must be a valid IP address.',

    ipv4: 'The :field field must be a valid IPv4 address.',

    ipv6: 'The :field field must be a valid IPv6 address.',

    json: 'The :field field must be a valid JSON string.',

    length: 'The :field field must be of length :param0.',

    lt: 'The :field field must be less than :param0.',

    lte: 'The :field field must be less than or equal to :param0.',

    max: 'The :field field must be less than :param0.',

    min: 'The :field field must be greater than :param0.',

    null: 'The :field field must be null.',

    numeric: 'The :field field must be a number',

    object: 'The :field field must be of type Object.',

    required: 'The :field field is required.',

    required_if: 'The :field field is required if the :param0 field equals :param1.',

    required_unless: 'The :field field is required unless the :param0 field equals :param1.',

    required_with: 'The :field field is required with at least one of the listed fields.',

    required_with_all: 'The :field field is required with all of the listed fields.',

    same: 'The :field field must be equal to :param0.',

    string: 'The :field field must be of type String.',

    url: 'The :field field must be a valid URL.',
}
