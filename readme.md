# Form-js
A form package supporting files and HTTP requests with client and server-side validation.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![npm (scoped)](https://img.shields.io/npm/v/@lukejm/form-js.svg)
![CircleCI](https://img.shields.io/circleci/build/github/lukejamesmorrison/form-js)
![npm](https://img.shields.io/npm/dt/@lukejm/form-js)

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Making Requests](#making-requests)
- [Getting Responses](#getting-responses)
- [Validation](#validation)
- [Accessing Errors](#accessing-errors)
- [Sections](#sections)
- [Flags and Hooks](#flags-and-hooks)
- [Options](#options)
- [Future Features](#future-features)
- [Upgrade Guide](/upgrade.md)

## Installation

To install run:

```
npm install @lukejm/form-js
```

And import by adding:

```javascript
import Form from '@lukejm/form-js'
```

## Getting Started

A form should be instantiated like the following, passing in default values, rules and error messages as required:

```javascript
let Form = new Form({
    firstName: {
        value: null,
        rules: 'string',
        messages: {
            string: 'This is a custom error message for string validation on the first name field.'
        }
    }
});
```

If you do not wish to use client-side validation, you can simply declare your form fields as default values.  These default values may be a `string`, `number`, `boolean`, `null`, an `array`, or an `object` as long as it does not have a `value` key:
```javascript
let Form = new Form({
    firstName: 'Steve',    // String
    lastName: null,        // Null
    age: 12,                // Number
    authorized: true,       // Boolean
    luckyNumbers: [1, 13],  // Array
    foodPreferences: {      // Object (without `value` key)
        vegan: false,
        vegetarian: true
    }
});
```

### Accessing Form Data

At any time, you may use `form.data()` to access the forms current data properties:

```javascript
let currentData = form.data(); // {first_name: 'John', last_name: 'Smith',...}
```

If you are using files, use `form.getFormData()`:

```javascript
let currentData = form.getFormData(); // {first_name: 'John', last_name: 'Smith',...}
```

## Working with Files

In order to work with files, you must use a listener to call the `addFile(event)` method when a file input is changed:

### HTML
```html
<input type="file" name="avatar" onChange="addFile(this)">
```

### Vue
```html
<input type="file" name="avatar" @change="addFile">
```

To check if a form has files:

```javascript
let hasFiles = form.hasFiles(); // Boolean
```

To access the forms file:
```javascript
let files = form.getFiles(); // Array[Object]
```

***The form type and headers will automatically be updated when you add your first file.***

## Making Requests
Form-js uses [Axios](https://github.com/axios/axios) to handle HTTP requests.

A form may be submitted by using the `submit(method, endpoint)` method:

```javascript
form.submit('get', '/users');
```

Form-js has helpers for the following HTTP request types:
```javascript
form.get('/users');
form.post('/users');
form.put('/users');
form.patch('/users');
form.delete('/users');
```

## Getting Responses

Form-js extends Axios and many of the native methods have been maintained.

```javascript
form.get('/users/john_smith/posts')
.then(response)
.catch(errors);
```

### The Response

Form-js handles request logic internally.  The `response` received is in the same format as an [Axios response object](https://github.com/axios/axios#response-schema).

## Validation

- [Validation Rules](#validation-rules)
- [Custom Validation Rules](#custom-validation-rules)
- [Server Side Validation](#server-side-validation)

Form-js offers a mechanism for both client-side and server-side validation.  By defining rules on your form object, the appropriate fields will be validated before an AJAX request is sent.  If client-side validation passes, the Form object will then await a response from the server.  If further validation errors are persisted, the Form will register these as required.

### Client-side Validation

In order to leverage client-side validation, you should provide rules for the appropriate fields when instantiating a new Form object. Rules may be defined as a string separating rules by a `|` character, or by defining them in an array:

**String**
```javascript
let Form = new Form({
    firstName: {
        value: null,
        rules: 'string|required|min:3'
    },
    //...
});
```
**Array**
```javascript
let Form = new Form({
    firstName: {
        value: null,
        rules: ['string', 'required', 'min:3']
    },
    //...
});
```

### Validation Rules
Validation rules are influenced by many of [Laravel's validation rules](https://laravel.com/docs/7.x/validation#available-validation-rules). There are more validation rules on the way!

#### array
The field under validation must be a Javascript `array`.

#### between:*min,max*
The field under validation must have a size between the given min and max.

#### boolean
The field under validation must be able to be cast as a `boolean`. Accepted input are `true`, `false`, `1`, `0`, `"1"`, and `"0"`.

#### date
The field under validation must be a valid `Date` object or date string in accordance with the native Javscript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object.

#### date_equals:*field*
The field under validation must be a date equal to another field.

#### different:*field*
The field under validation must have a different value than the field provided.

#### email
The field under validation must be formatted as an e-mail address.

#### equal:*value*
The given field must match the field under validation. Alias for `same`.

#### filled
The field under validation must not be empty when it is present.

#### File
The field under validation must be a file.

#### gt:*value*
The field under validation must be greater than the given field.

#### gte:*value*
The field under validation must be greater than or equal to the given field.

#### in:*foo,bar*
The field under validation must be included in the given list of values.

#### integer
The field under validation must be an `integer`.

#### length:*value*
The field under validation must have a length matching the given value. For `string` data, value corresponds to the number of characters. For `numeric` data, value corresponds to a given integer value (the attribute must also have the numeric or integer rule). For an `array`, size corresponds to the length of the array.

#### lt:*value*
The field under validation must be less than the given field.

#### lte:*value*
The field under validation must be less than or equal to the given field.

#### max:*value*
The field under validation must be less than or equal to a maximum value.

#### min:*value*
The field under validation must be greater than or equal to a minimum value.

#### null
The field under validation must be null.

#### numeric
The field under validation must be numberic.

#### object
The field under validation must be an `object`.

#### required
The field under validation must be present in the input data and not empty. A field is considered "empty" if one of the following conditions are true:
- The value is `null`.
- The value is an empty `string`.
- The value is an empty `array` (length of `0`).

#### required_if:*anotherfield*,*value*

The field under validation must be present and not empty if the *anotherfield* field is equal to any *value*.This rule supports `string`, `number` and `boolean` types.

#### required_unless:*anotherfield*,*value*

The field under validation must be present and not empty unless the *anotherfield* field is equal to any *value*. This rule supports `string`, `number` and `boolean` types.

#### required_with:*foo*,*bar*

The field under validation must be present and not empty *only if* any of the other specified fields are present.

#### required_with_all:*foo*,*bar*

The field under validation must be present and not empty *only if* all of the other specified fields are present.

#### same:*value*
The given field must match the field under validation.

#### string
The field under validation must be a `string`.

#### url
The field under validation must be a valid URL.

### Custom Validation Rules

Form-js supports custom rule definitions for your form fields. At this time only inline definitions are supported and are defined as anonymous functions. A custom rule takes 3 arguments: `fieldName` which is the name of the field, `fieldValue` which is the value of the field and `fail` which is a callback called when the rule fails.  It requires an error message as its only arguement.

```javascript

let form = new Form({
    age: {
        value: 24,
        rules: [
            // A rule that will verify that the field is an even value
            (fieldName, fieldValue, fail) => {
                return fieldValue % 2 === 0 || fail(`Your custom error message for ${fieldName} field.`);
            }
        ]
    }
})
```

### Server-side Validation

Form-js handles request logic internally.  You should ensure that errors are formatted as an object where field names are keys and the values are arrays of message strings specific to that error.  

```javascript
Response: {
    data: {
        errors: {
            firstName: [
                "The first name field is required",
                "The first name field should be of type String"
            ]
        }
    }
}
    
```

### Accessing Errors

To see if the form has any errors, you can use the following function:

```javascript
let hasErrors = form.errors.any(); // Boolean
```

If you wish to see if the form has an error with a specific key:

```javascript
let hasError = form.errors.has('firstName') // Boolean
```

To access the first error of the form or the first error for a specific field:

```javascript
// First error of form
let error = form.errors.first() // String
// First error of first_name field
let error = form.errors.first('firstName') // String
```

To access all errors for a given field:
```javascript
let error = form.errors.get('firstName') // Array[String]
```

To access all errors current registered:

```javascript
let errors = form.errors.all(); // Object
```

## Sections

Form-js supports distinct sections, each capable of validation on their own. Validation can be conducted per section for instances where form progress is dependant on fields being valid prior to moving to next section.

### Definition

**On Instantiation**

```javascript
let Form = new Form({
    street: {
        value: '',
        rules: 'string|required',
        section: 'address'
    }
});
```

**Method**

```javascript
// The array of field names belonging to the section
let fields = ['street', 'city', 'state', 'country', 'postalCode'];

// Define an 'address' section with defined fields
form.defineSection('address', fields);
```

### Validation

You may validate a section on its own:

```javascript
form.validateSection('address') // Object
```

To check if a section is valid:

```javascript
form.sectionIsValid('address') // Boolean
```

**Note**: All fields will be validated on form submission even if section is currently valid.

## Flags and Hooks

Several parameters are available to get and change form states:

| Flag                      | Default              | Description                                                       |
| -----                     | --------             | -------------                                                     |
| `form.submitting`         | `(bool) False`       | `True` when form is submitting an HTTP request                    |
| `form.submittable`        | `(bool) True`        | Can the current form be submitted?                                |

Several hooks are available based on form state.  A `callback` should be passed as a parameter.

| Hook                                  | Description                                                   |
| -----                                 | -------------                                                 |
| `form.beforeSubmitting(callback)`     | Called *before* HTTP request is submitted                     |
| `form.afterSubmitting(callback)`      | Called *after* HTTP request is submitted                      |
| `form.afterSuccess(callback)`         | Called *after* HTTP request is successful                     |
| `form.afterFail(callback)`            | Called *after* HTTP request has failed                        |


### Options
Form-js offers several customizable options.  You may instantiate a new `Form` object with a second parameter: `options`:

```javascript
let form = new Form(
    fields,
    {
        validateOnSubmit: false,
        axios: {
            timeout: 1000
        }
    }
)
```

The following options are supported:

| Option                     | Default              | Description                                                        |
| -----                      | --------             | -------------                                                      |
| `validateOnSubmit`         | `(bool) true`        | Should form conduct a field validation prior to submitting?  The form will not be validated when submitted if set to `false`. |
| `strictSections`           | `(bool) false`       | Should all form fields belong to form sections? Form validation will fail if set to `true` when fields do not belong to [Sections](#sections). |

By defining an `axios` key, you are able to use all of the available [Axios Request Configurations](https://github.com/axios/axios#request-config).

## Complete Example

```javascript
let form = new Form(
    // Fields
    {
        email: {
            value: 'johnsmith@example.com',
            rules: 'required|string|email',
            messages: {
                string: 'Sorry but your email address is probably not that weird.',
                email: 'Hmmm, this doesn\'t look like a real email address!'
            },
            section: 'general'
        }
    },
    // Options
    {
        validateOnSubmit: false,
        axios: {
            timeout: 1000
        }
    }
)

form.post('/users')
    .beforeSubmitting(() => console.log('beforeSubmit'))
    .afterSubmitting(() => console.log('afterSubmit'))
    .afterSuccess(() => console.log('afterSuccess'))
    .afterFail(() => console.log('afterFail'))
    .then(response => {
        console.log('response')
    })
    .catch(error => {
        console.log('error')
    })

    //  beforeSubmit
    //  afterSubmit
    //  afterSuccess || afterFail
    //  response || error
```

## Future Features
- Ability to add global custom rules.
- More rules!

## License
The Form-js library is open-sourced software licensed under the MIT license.

