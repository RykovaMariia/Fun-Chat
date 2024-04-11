module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'no-descending-specificity': null,
    'annotation-no-unknown': null,
    'selector-class-pattern': null,
    'at-rule-no-unknown': null,
    'comment-no-empty': null,
    'function-no-unknown': null,
    'no-invalid-position-at-import-rule': [
      true,
      {
        ignoreAtRules: ['use', 'forward'],
      },
    ],
    'scss/at-extend-no-missing-placeholder': null,
    'scss/at-if-no-null': true,
    'scss/at-import-partial-extension': 'never',
    'scss/at-rule-no-unknown': true,
    'scss/comment-no-empty': true,
    'scss/declaration-nested-properties-no-divided-groups': true,
    'scss/function-quote-no-quoted-strings-inside': true,
    'scss/function-unquote-no-unquoted-strings-inside': true,
    'scss/no-duplicate-mixins': true,
    'scss/no-global-function-names': true,
    'scss/operator-no-newline-after': true,
    'scss/operator-no-newline-before': true,
    'scss/operator-no-unspaced': true,
    'scss/double-slash-comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['between-comments', 'stylelint-commands'],
      },
    ],
    'scss/at-else-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-else-closing-brace-space-after': 'always-intermediate',
    'scss/at-else-empty-line-before': 'never',
    'scss/at-else-if-parentheses-space-before': 'always',
    'scss/at-function-parentheses-space-before': 'never',
    'scss/at-if-closing-brace-newline-after': 'always-last-in-chain',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',
    'scss/at-mixin-argumentless-call-parentheses': 'never',
    'scss/at-mixin-parentheses-space-before': 'never',
    'scss/at-rule-conditional-no-parentheses': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
  },
};