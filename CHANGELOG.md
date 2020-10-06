# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.9] - 2020-10-06

### Added
- Form Section documentation.

### Changed
- `first()` method of `Error` object now accepts an optional `field` argument and can be used as an alias for the `getFirst()` method.

## [0.3.8] - 2020-09-10

### Added
- New validation rules: `url`.
- Form Sections.
- Code coverage for test suite.
- Form options.
- `options.js` to store default form options.
- Config options can now be attached to HTTP request. See [Request Config](https://www.npmjs.com/package/axios#request-config)

### Changed
- `Form` now has multiple methods to handle validation: `validate`, `validateSection`, `validateField`.

### Fixed
- Docblock inconsistencies and formatting.
- Form headers are now correctly attached to axios request.


## [0.3.7] - 2020-08-27

### Fixed
- Integer rule now works with *numeric* string values.

## [0.3.6] - 2020-08-27

### Added
- New validation rules: `email`, `filled`, `numeric`
- Unsupported rules are now caught before validation and will return false.

### Changed
- Extract default values from test and place in `defaults.js`.

### Fixed
- Default error messages now display field name with spaces instead of underscores.

## [0.3.5] - 2020-08-24

### Fixed
- Versioning inconsistencies

## [0.3.4] - 2020-08-24

### Changed
- Updated package description
- Updated dependencies

## [0.3.3] - 2020-08-24

### Added
- Add new rules: `different`, `confirmed`, `required_if`, `required_unless`, `required_with`, `required_with_all`.
- Add `setData()` method to `Validator` to allow for more advanced field validation.


### Changed
- `Validator` method `validateSingleRule` now accepts 3 parameters.  The first is the field name to be validated, the second is the field value and the third is the name of the rule to be used.

## [0.3.2] - 2020-08-04
### Added
- Add `CHANGELOG.md`.

### Changed
- `Form._setPropertyFromString()` is now `Form._setPropertyFromSimpleValue()`.

### Fixed
- Form can now accept simple default values of types: `string`, `number`, `boolean` as well as an `array` or `object`. Objects may be set as data however *MUST NOT* contain a `value` key. This key is reserved to identify fields with default values and validation logic.
- Files can now be added correctly using native HTML file input onChange event.

[Unreleased]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.8...HEAD
[0.3.8]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.8...HEAD
[0.3.7]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.7...HEAD
[0.3.6]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.5...0.3.6
[0.3.5]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.5...0.3.6
[0.3.4]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.4...0.3.5
[0.3.3]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.3...0.3.4
[0.3.2]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.2...0.3.3
[0.2.0]: https://github.com/lukejamesmorrison/form-js/compare/v0.2.0...v0.3.2
