#!/usr/bin/env node

const { Spectral } = require('@stoplight/spectral');
const { readParsable } = require('@stoplight/spectral/fs/reader');
const { readRulesFromRulesets } = require('@stoplight/spectral/rulesets/reader');
const { snakeCaseFunction } = require('./peopledoc/functions/snakeCase/index.js');
const { oas2Functions, rules } = require('@stoplight/spectral/rulesets/oas2');
const { stylish } = require ('@stoplight/spectral/formatters');
const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-s, --specification <Uri>', 'API Specification URI or path')
  .parse(process.argv);

if (!commander.specification){
  throw new Error('Specification needed. See --help for usage');
}

const spectral = new Spectral();

// load swagger functions
spectral.addFunctions(oas2Functions());

// Load peopledoc functions
spectral.addFunctions({
  snakeCase: snakeCaseFunction,
});

// load swagger rules
rules().then((swaggerRules) => {
  spectral.addRules(swaggerRules);
  // load peopledoc rules
  readRulesFromRulesets('peopledoc/ruleset.json').then((rules) => {
    spectral.addRules(rules)
    // run spectral
    readParsable(commander.specification, 'utf8').then((spec) => {
      spectral.run(spec.data).then(results => {
        // console.log(JSON.stringify(results, null, 4));
        console.log(stylish(results))
      });
    })
  });
});
