# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.3] - 2020-08-XX

### Added
- Add new rules: `different`, `confirmed`, `required_if`.
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

### Removed

[Unreleased]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.3...HEAD
[0.3.3]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.3...HEAD
[0.3.2]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.2...0.3.3
[0.2.0]: https://github.com/lukejamesmorrison/form-js/compare/v0.2.0...v0.3.2