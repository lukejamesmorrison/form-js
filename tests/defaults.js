/**
 * This file contains default values for test data.
 */

/**
 * Boolean values.
 */
export const BOOLEANS = [true, false, 1, 0, '1', '0'];

/**
 * Numeric values.
 */
export const NUMBERS = [2, -4, 3.1, -5.2];

/**
 * String.
 */
export const STRING = 'test string';

/**
 * Array.
 */
export const ARRAY = ['one', 'two'];

/**
 * Object.
 */
export const OBJECT = { key: 'value' };

/**
 * Integers.
 */
export const INTEGERS = NUMBERS.splice(0, 2).concat(BOOLEANS.splice(2, 2));

/**
 * Floats.
 */
export const FLOATS = NUMBERS.splice(2, 2);

/**
 * Valid Email Addresses.
 */
export const VALID_EMAILS = [
    'email@example.com',
    'email@dev.example.com'
];

/**
 * Invalid Email Addresses.
 */
export const INVALID_EMAILS = [
    'example.com',
    '@example.com',
    'email@example',
    'email@'
];
