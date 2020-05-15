# Form-js
A lightweight form package supporting files and HTTP requests. 

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![npm (scoped)](https://img.shields.io/npm/v/@lukejm/form-js.svg)

<!-- Form-js designed to work with Vue.js so there may be compatibility errors throughout. -->

## Installation

To intall run:

```
npm install form-js
```

And importing by adding:

```javascript
import Form from '@lukejm/form-js'
```

## Working with Data

A form should be instantiated like the following:

```javascript
let Form = new Form;
```

### Use with Vue
If you are using Vue.js, you must pass an object with default values for each form field you wish to use to maintain reactivity.

```javascript
let Form = new Form({
    first_name: null,
    last_name: null,
    //...
});
```

At any time, you may use `form.data()` to access the forms current data properties:

```javascript
    let currentData = form.data(); // {first_name: 'John', last_name: 'Smith',...}
```

If you are using files, use `form.getFormData()`:

```javascript
    let currentData = form.getFormData(); // {first_name: 'John', last_name: 'Smith',...}
```

## Working with Files

In order to work with files, you must use a listener to call the `addFiles(event)` method when a file input is changed:

### HTML
```html
    <input type="file" name="avatar" onChange="addFile(event)">
```

### Vue
```html
    <input type="file" name="avatar" @change="addFile($event)">
```

To check if a form has files:

```javascript
    let hasFiles = form.hasFiles(); // boolean
```

To access the forms file:
```javascript
    let files = form.getFiles(); // array[object]
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
    form.get('/users/john_smith')
    .then(response)
    .catch(errors);
```

### The Response

Form-js handles request logic internally.  The `response` received is the collection of response data send from the API stripped of request metadata.  

```javascript
    response = {
        first_name: 'john',
        last_name: 'smith'
    }
```

## Errors

### Catching Errors

Form-js handles request logic internally.  You should ensure that errors returned from the server are a keyed-array (object) of error objects.  

```javascript
    errors = {
        "first_name": [
            "The first name field is required",
            "The first name field should be of type String"
        ]
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

To access an error by key:

```javascript
    let error = form.errors.get('first_name') // Object
```

To access all errors:

```javascript
    let errors = form.errors.all(); // Object
```

## Flags

Several parameters are available to get and change form states:

| Flag                  |Default        | Description                                                       |
| -----                 | --------      | -------------                                                     |
| `form.submitting`     |  `(bool) False`      | `True` when form is submitting an HTTP request                    |
| `form.submittable`    | `(bool) True`        | Can the current form be submitted?                                |

## Hooks

Several hooks are available based on form state.  A `callback` should be passed as a parameter.

| Method                                | Description                                                       |
| -----                                 | -------------                                                     |
| `form.beforeSubmitting(callback)`     | Called ***before*** HTTP request is submitted                     |
| `form.afterSubmitting(callback)`      | Called ***after*** HTTP request is submitted                      |
| `form.afterSuccess(callback)`         | Called ***after*** HTTP request is successful                     |
| `form.afterFail(callback)`            | Called ***after*** HTTP request is has failed                     |

## Complete Example

```javascript
    let form = Form({
        email: 'johnsmith@example.com'
    })

    form.post('/users')
        .beforeSubmitting(() => console.log('beforeSubmit'))
        .afterSubmitting(() => console.log('afterSubmit'))
        .afterSuccess(() => console.log('afterSuccess'))
        .afterFail(() => console.log('afterFail'))
        .then(response => {
            console.log('response')
        })
        .catch(errror => {
            console.log('errors')
        })

        //  beforeSubmit
        //  afterSubmit
        //  afterSuccess || afterFail
        //  response || errors
```

## Thanks
Thank you Jeffrey Way for your Javascript tutorial on form objects.  It was a heavy influence for this package's early development.

## License
The Form-js library is open-sourced software licensed under the MIT license.

