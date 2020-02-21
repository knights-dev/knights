module.exports = {
    extends: ['stylelint-config-standard'],
    plugins: ['stylelint-scss'],
    rules: {
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['function', 'if', 'for', 'each', 'include', 'mixin', 'content'],
            },
        ],
        'declaration-block-no-shorthand-property-overrides': true,
        'declaration-colon-newline-after': null,
        'declaration-empty-line-before': null,
        indentation: 4,
        linebreaks: 'unix',
        'no-eol-whitespace': null,
        'no-missing-end-of-source-newline': null,
    },
};
