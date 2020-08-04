# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.3.2] - 2020-08-04
### Added
- Add `CHANGELOG.md`

### Changed
- `Form._setPropertyFromString()` is now `Form._setPropertyFromSimpleValue()`

### Fixed
- Form can now accept simple default values of types: `string`, `number`, `boolean` as well as an `array` or `object`. Objects may be set as data however *MUST NOT* contain a `value` key. This key is reserved to identify fields with default values and validation logic.
- Files can now be added correctly using native HTML file input onChange event.

### Removed

[Unreleased]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.2...HEAD
[0.3.2]: https://github.com/lukejamesmorrison/form-js/compare/v0.3.2...HEAD
[0.2.0]: https://github.com/lukejamesmorrison/form-js/compare/v0.2.0...v0.3.2
