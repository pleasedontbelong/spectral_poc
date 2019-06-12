"use strict";

module.exports.snakeCaseFunction = (targetValue, options) => {
  const rule_match = "[a-z]+[A-Z].*"
  if (targetValue && targetValue.match && targetValue.match(new RegExp(rule_match))) {
    return [
      {
        message: `Use instead of!`,
      },
    ];
  }
};
