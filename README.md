# POC for spectral

## Intro

This is just a simple POC used to test spectral for creating custom rules and check an API specification against those rules.

Basically this is just a node script that uses some of the (probably unpublished/undocumented) modules and functions from spectral to load our custom rulesets and run the validation on a YAML or JSON specification file.

## Install

```
npm install
```

## Run

```
./index.js -s some_spec_file.yml
```

or 

```
./index.js -s https://some.spec/file.yml
```

the script is quite simple to understand. It just loads the swagger functions and rulesets (oas2), then loads our custom rulesets (in this POC we only have une function and one ruleset) and checks the specification file against all those rules and prints out the result.

## Documentation

You can find more documentation on spectral's README and some examples in: https://github.com/stoplightio/spectral/blob/master/docs/js-api.md