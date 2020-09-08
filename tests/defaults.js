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

/**
 * Valid URL strings.
 */
export const VALID_URLS = [
    "http://✪df.ws/123",
    "ftp://foo.bar/baz",
    "http://userid:password@example.com:8080",
    "http://userid:password@example.com:8080/",
    "http://userid@example.com",
    "http://userid@example.com/",
    "http://userid@example.com:8080",
    "http://userid@example.com:8080/",
    "http://userid:password@example.com",
    "http://userid:password@example.com/",
    "http://142.42.1.1/",
    "http://142.42.1.1:8080/",
    "http://➡.ws/䨹",
    "http://⌘.ws",
    "http://⌘.ws/",
    "http://foo.com/blah_(wikipedia)#cite-1",
    "http://foo.com/blah_(wikipedia)_blah#cite-1",
    "http://foo.com/unicode_(✪)_in_parens",
    "http://foo.com/(something)?after=parens",
    "http://☺.damowmow.com/",
    "http://code.google.com/events/#&product=browser",
    "http://j.mp",
    "http://foo.bar/?q=Test%20URL-encoded%20stuff",
    "http://مثال.إختبار",
    "http://例子.测试"
];

/**
 * Invalid URL strings.
 */
export const INVALID_URLS = [
    "http://",
    "http://.",
    "http://..",
    "http://../",
    "http://?",
    "http://??",
    "http://??/",
    "http://#",
    "http://##",
    "http://##/",
    "http://foo.bar?q=Spaces should be encoded",
    "//",
    "//a",
    "///a",
    "///",
    "http:///a",
    "foo.com",
    "rdar://1234",
    "h://test",
    "http:// shouldfail.com",
    ":// should fail",
    "http://foo.bar/foo(bar)baz quux",
    "ftps://foo.bar/",
    "http://-error-.invalid/",
    // "http://a.b--c.de/",
    "http://-a.b.co",
    "http://a.b-.co",
    "http://0.0.0.0",
    "http://10.1.1.0",
    "http://10.1.1.255",
    "http://224.1.1.1",
    "http://1.1.1.1.1",
    "http://123.123.123",
    "http://3628126748",
    "http://.www.foo.bar/",
    // "http://www.foo.bar./",
    "http://.www.foo.bar./",
    "http://10.1.1.1",
    "http://10.1.1.254"
];
