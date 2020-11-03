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

/**
 * Valid date values.
 */
export const VALID_DATES = [
    new Date,
    '12 May 1992',
    '2011-10-05T14:48:00.000Z',
    1602276402
];

/**
 * Invalid date values.
 */
export const INVALID_DATES = [
    'today',
    'hey',
    [],
    {}
]

/**
 * Valid JSON values.
 */
export const VALID_JSON = [
    '{"field1": "name","field2": "12"}',
    '12',
    'true',
]

/**
 * Invalid JSON values.
 */
export const INVALID_JSON = [
    'test',
    12,
    { field: 'name'},
    [1,2]
]

/**
 * Valid IPv4 addresses.
 */
export const VALID_IPV4 = [
    '1.0.1.0',
    '8.8.8.8',
    '100.1.2.3',
    '172.15.1.2',
    '172.32.1.2',
    '192.167.1.2',
    '0.1.2.3', 
    '10.1.2.3',
    '172.16.1.2',
    '172.31.1.2',   
    '192.168.1.2',
    '255.255.255.255',
];

/**
 * Invalid IPv4 addresses.
 */
export const INVALID_IPV4 = [
    '.2.3.4',
    '1.2.3.',
    '1.2.3.256',
    '1.2.256.4',
    '1.256.3.4',
    '256.2.3.4',
    '1.2.3.4.5',
    '1..3.4',
];

/**
 * Valid IPv6 addresses.
 */
export const VALID_IPV6 = [
    '::', // 0:0:0:0:0:0:0:0
    '2001:db8::', // 2001:db8:0:0:0:0:0:0
    '::1234:5678', // 0:0:0:0:0:0:1234:5678
    '2001:db8::1234:5678', // 2001:db8:0:0:0:0:1234:5678
    '2001:db8:1::ab9:C0A8:102', // 2001:db8:1:0:0:ab9:C0A8:102
    '2001:db8:3333:4444:5555:6666:7777:8888',
    '2001:db8:3333:4444:CCCC:DDDD:EEEE:FFFF',
    '2001:0db8:0001:0000:0000:0ab9:C0A8:0102'
]

/**
 * Invalid IPv6 addresses.
 */
export const INVALID_IPV6 = [
    '',
    ':',
    '1234',
    '1234:5678',
    '1234:5678:1234',
    '1234:5678:1234:5678',
    '1234:5678:1234:5678:1234',
    '1234:5678:1234:5678:1234:5678',
    '1234:5678:1234:5678:1234:5678:1234',
]

/**
 * Valid alphabetic strings.
 */
export const VALID_ALPHA = [
    'valid'
]

/**
 * Invalid alphabetic strings.
 */
export const INVALID_ALPHA = [
    '123asd',
    'dsfds-dsfsd',
    'dsfds dsfsd'
]

/**
 * Valid alphabetic strings containing hyphens and underscores.
 */
export const VALID_ALPHADASH = [
    'valid',
    'val-id',
    'val_id'
]

/**
 * Inalid alphabetic strings containing hyphens and underscores.
 */
export const INVALID_ALPHADASH = [
    '123asd',
    'dsfds-dsfsd1',
    'dsfds_dsfsd1',
    'asd/sas',
    'asdsa$asdfs',
    'asdas&dsds',
    'dsfds dsfsd'
]

/**
 * Valid alphabetic strings containing hyphens and underscores.
 */
export const VALID_ALPHANUM = [
    'valid',
    'valid123',
    '123'
]

/**
 * Inalid alphabetic strings containing hyphens and underscores.
 */
export const INVALID_ALPHANUM = [
    'dsfds-dsfsd1',
    'dsfds_dsfsd1',
    'asd/sas',
    'asdsa$asdfs',
    'asdas&dsds',
    'dsfds dsfsd'
]
