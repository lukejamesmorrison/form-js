# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2021-01-21

The first offically stable release of Form-js!

### Changed

- Bump axios from 0.19.2 to 0.21.1 
- Bump ini from 1.3.5 to 1.3.8

## [0.4.2] - 2020-11-02

### Added
- Added rules: `alpha`, `alpha_dash`, `alpha_num`.
- Added `getCurrentSection()` and `setCurrentSection()` methods on `Form`. Returns the section's name as a `string`.
- Added `orderSections()` method on `Form` to allow custom order of sections to be defined. They will otherwise be recorded in the order that they are assigned to the form.
- Added `nextSection()` and `previousSection()` methods allow `Form` section to move forwards and backwards (progress is updated as well).
- Added `updateProgress()` method will be called when the form's current section changes.
- Added `progress` property gives access to form's current completion progress.
- Added `finalSectionForReview` option will determine whether final section should be considered for form completion progress.
- Added `InvalidSectionOrderException` to be thrown when the `sectionOrder()` on the `Form` is called with non-existance section(s).
- Added `SectionNotDefinedException` to be thrown when a section is referenced but does not currently exist on the `Form` object.

### Fixed
- Validator now returns `false` (by default) if rule method does not exist on `Rule` object.
- Validator now correctly calls `date` and `date_equals` rules.
- Fixed `_isAdvancedObject()` on `Form` returning opposite boolean value expected.
- Documentation now show correct method chaining in `Complete Example` section.

## [0.4.1] - 2020-10-22

### Added
- New rules: `after`, `before`, `json`, `ip`, `ipv4`, `ipv6`. 

### Changed
- Improved existing test coverage.

### Fixed
- `comfirmed` rule now verfies that confimation field exists AND matches value.
-  Documentation for `hasFiles` property on `Form` now shows property instead of method.

### Removed
- `getFiles()` method documentation for `Form` as it is unused.

## [0.4.0] - 2020-10-13

### Added
- `strictSections` option to declare if all form fields should belong to sections.
- Ability to use custom rules.
- New rules `date`, `date_equals`, `file`.

### Changed
- `Validator`'s `validateSingleRule()` method has been split into two methods to accomodate custom rules.
- `addFiles()` on `Form` now sets files as attributes like other fields. 
- `validate()` method on `Validator` has been refactored to accept 4 parameters: `fieldName`, `rules`, `formData`, `messages`.  This ensures all rules have access to the form's data.
- `validateDefaultRule()` and `validateCustomRule()` methods on `Validator` now accept 3 parameters: `fieldName`, `rule`, `formData` to be consistent with `validate()` method.
- Refactored test suite to be consistent with latest source code refactor.

### Fixed
- Inline documentation.

## [0.3.9] - 2020-10-06

### Added
- Form Section documentation.

### Changed
- `first()` method of `Error` object now accepts an optional `field` argument and can be used as an alias for the `getFirst()` method.
- `Validator` now uses `switch` statements to determine which rule to apply for validation.

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

[Unreleased]: https://github.com/lukejamesmorrison/form-js/compare/v0.4.2...HEAD
[0.4.2]: https://github.com/lukejamesmorrison/form-js/compare/v0.4.1...0.4.2
[0.4.1]: https://github.com/lukejamesmorrison/form-js/compare/v0.4.0...0.4.1
[0.4.0]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.9...0.4.0
[0.3.9]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.8...0.3.9
[0.3.8]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.7...0.3.8
[0.3.7]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.6...0.3.7
[0.3.6]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.5...0.3.6
[0.3.5]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.5...0.3.6
[0.3.4]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.4...0.3.5
[0.3.3]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.3...0.3.4
[0.3.2]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.2...0.3.3
[0.2.0]: https://github.com/lukejamesmorrison/form-js/compare/v0.2.0...v0.3.2
