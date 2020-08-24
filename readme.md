# Form-js
A form package supporting files, HTTP requests as well as handling for client and server-side validation. 

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![npm (scoped)](https://img.shields.io/npm/v/@lukejm/form-js.svg)
![CircleCI](https://img.shields.io/circleci/build/github/lukejamesmorrison/form-js)
![npm](https://img.shields.io/npm/dt/@lukejm/form-js)

<!-- Form-js designed to work with Vue.js so there may be compatibility errors throughout. -->

- [Installation](#installation)
- [Getting Started](#getting-started)
- [Making Requests](#making-requests)
- [Getting Responses](#getting-responses)
- [Validation](#validation)
- [Validation Rules](#validation-rules)
- [Accessing Errors](#accessing-errors)
- [Flags and Hooks](#flags-and-hooks)
- [Options (Coming Soon)](#options)
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
    first_name: {
        value: null,
        rules: 'string',
        messages: {
            string: 'This is a custom error message for string validation on the first_name field'
        }
    }
});
```

If you do not wish to use client-side validation, you can simply declare your form fields as default values.  These default values may be a `string`, `number`, `boolean`, `null`, an `array`, or an `object` as long as it does not have a `value` key:
```javascript
let Form = new Form({
    first_name: 'Steve',    // String
    last_name: null,        // Null
    age: 12,                // Number
    authorized: true,           // Boolean
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
Form-js uses Axios in order to send HTTP requests.

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

Form-js offers a mechanism for both client-side and server-side validation.  By defining rules on your form object, the appropriate fields will be validated before an AJAX request is sent.  If client-side validation passes, the Form object will then await a response from the server.  If further validation errors are persisted, the Form will register these as required.

### Client-side Validation

In order to leverage client-side validation, you should provide rules for the appropriate fields when instantiating a new Form object. Rules may be defined as a string separating rules by a `|` character, or by defining them in an array:

**String**
```javascript
let Form = new Form({
    first_name: {
        value: null,
        rules: 'string|required|min:3'
    },
    //...
});
```
**Array**
```javascript
let Form = new Form({
    first_name: {
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

#### different:field
The field under validation must have a different value than the field provided.

#### equal:*value*
The given field must match the field under validation. Alias for `same`.

#### gt:*value*
The field under validation must be greater than the given field.

#### gte:*value*
The field under validation must be greater than or equal to the given field.

#### in:*foo,bar*
The field under validation must be included in the given list of values.

#### integer
The field under validation must be an `integer`.

#### lt:*value*
The field under validation must be less than the given field.

#### lte:*value*
The field under validation must be less than or equal to the given field.

#### max:*value*
The field under validation must be less than or equal to a maximum value.

#### min:*value*
The field under validation must be greater than or equal to a minimum value.

#### object
The field under validation must be an `object`.

#### required
The field under validation must be present in the input data and not empty. A field is considered "empty" if one of the following conditions are true:
- The value is `null`.
- The value is an empty `string`.
- The value is an empty `array` (length of `0`).

#### required_if:*anotherfield*,*value*

The field under validation must be present and not empty if the *anotherfield* field is equal to any *value*.This rule supports `string`, `number` and `boolean` types.

#### length:*value*
The field under validation must have a length matching the given value. For `string` data, value corresponds to the number of characters. For `numeric` data, value corresponds to a given integer value (the attribute must also have the numeric or integer rule). For an `array`, size corresponds to the length of the array.

#### null
The field under validation should be null.

#### same:*value*
The given field must match the field under validation.

#### string
The field under validation must be a `string`.

### Server-side Validation

Form-js handles request logic internally.  You should ensure that errors are formatted as an object where field names are keys and the values are arrays of message strings specific to that error.  

```javascript
Response: {
    data: {
        errors: {
            first_name: [
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
    let hasError = form.errors.has('first_name') // Boolean
```

To access the first error for a given key (field):

```javascript
    let error = form.errors.getFirst('first_name') // String
```

To access all errors for a given key (field):
```javascript
    let error = form.errors.get('first_name') // Array[String]
```

To access all errors current registered in Form:

```javascript
    let errors = form.errors.all(); // Object
```

## Flags and Hooks

Several parameters are available to get and change form states:

| Flag                      | Default              | Description                                                       |
| -----                     | --------             | -------------                                                     |
| `form.isSubmitting()`     | `(bool) False`       | `True` when form is submitting an HTTP request                    |
| `form.isSubmittable()`    | `(bool) True`        | Can the current form be submitted?                                |

Several hooks are available based on form state.  A `callback` should be passed as a parameter.

| Hook                                  | Description                                                   |
| -----                                 | -------------                                                 |
| `form.beforeSubmitting(callback)`     | Called *before* HTTP request is submitted                     |
| `form.afterSubmitting(callback)`      | Called *after* HTTP request is submitted                      |
| `form.afterSuccess(callback)`         | Called *after* HTTP request is successful                     |
| `form.afterFail(callback)`            | Called *after* HTTP request has failed                        |


### Options
Coming Soon

I am currently adding the ability to extend and modify Form-js.  Sit tight!

## Complete Example

```javascript
    let form = Form({
        email: {
            value: 'johnsmith@example.com',
            rules: 'required|string|email',
            messages: {
                string: 'Sorry but your email address is probably not that weird.',
                email: 'Hmmm, this doesn\'t look like a real email address!'
            }
        },
        //...
    })

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

## Thanks
Thank you Jeffrey Way for your Javascript tutorial on form objects.  It was a heavy influence for this package's early development.

## License
The Form-js library is open-sourced software licensed under the MIT license.

