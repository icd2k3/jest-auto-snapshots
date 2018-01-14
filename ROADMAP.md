This is just a place to collect ideas for new features and gaps in current functionality

## Versions 2.x.x

- Add option to use `mount` instead of `shallow` in enzyme
- Add option to _always_ inject certain features regardless of if they're required or not

## Version 3

- Sunset react-docgen and write a custom purpose-built AST parser for determining props. _Or_, better yet, figure out a way to determine propTypes directly via `Component.propTypes` (this may involve submitting a PR to the package, see this [issue](https://github.com/facebook/prop-types/issues/145))
