const libReport = require('istanbul-lib-report');
const reports = require('istanbul-reports');
const libCoverage = require('istanbul-lib-coverage');

// coverageMap, for instance, obtained from istanbul-lib-coverage
const coverageObject = require('../.nyc_output/out.json')
const coverageMap = libCoverage.createCoverageMap(coverageObject);

const configWatermarks = {
  statements: [50, 80],
  functions: [50, 80],
  branches: [50, 80],
  lines: [50, 80]
};

// create a context for report generation
const context = libReport.createContext({
  dir: 'coverage',
  // The summarizer to default to (may be overridden by some reports)
  // values can be nested/flat/pkg. Defaults to 'pkg'
  defaultSummarizer: 'nested',
  watermarks: configWatermarks,
  coverageMap,
})

// create an instance of the relevant report class, passing the
// report name e.g. json/html/html-spa/text
const report = reports.create('html', {
  skipEmpty: false,
  skipFull: false
})

// call execute to synchronously create and write the report to disk
report.execute(context)