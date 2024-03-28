const fs = require('fs');
const xml2js = require('xml2js');

function readJUnitXml(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            xml2js.parseString(data, (parsingError, result) => {
                if (parsingError) {
                    reject(parsingError);
                    return;
                }

                const testSuites = result.testsuites.testsuite || []; // Handle empty suites

                for (const suite of testSuites) {
                    const failedTests = parseInt(suite.$.failures || 0, 10);
                    const flakyTests = parseInt(suite.$.skipped || 0, 10);

                    console.log(`Suite: ${suite.$.name}`);
                    console.log(`  - Failed tests: ${failedTests}`);
                    console.log(`  - Flaky tests: ${flakyTests}`);
                }

                resolve();
            });
        });
    });
}

const filePath = 'test-results/results.xml';

readJUnitXml(filePath)
    .then(() => console.log('Successfully read JUnit XML file'))
    .catch((error) => console.error('Error reading JUnit XML file:', error));
