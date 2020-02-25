const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');
const fetch = require('node-fetch');
const { name, version } = require('../package.json');

// const getUrlFromCNAME = async () => {
//   let domainUrl = await fs.readFile('./CNAME', 'utf8');
//   domainUrl = domainUrl.replace(/(\r\n|\n|\r)/gm, '');
//   return `https://${domainUrl}/`;
// };

const integrityDigests = require('../bundle.integrity.manifest.json');

const moduleMapUrl = 'https://one-app-modules.s3.eu-west-2.amazonaws.com/module-map.json';

const doWork = async () => {
  try {
    const response = await fetch(moduleMapUrl);
    const moduleMapContent = await response.json();
    // const moduleMapContent = { key: uuidv4(), modules: {} };
    // const STATIC_ASSETS_URL = await getUrlFromCNAME();
    const STATIC_ASSETS_URL = 'https://one-app-modules.s3.eu-west-2.amazonaws.com/modules';
    moduleMapContent.key = uuidv4();

    moduleMapContent.modules[name] = {
      browser: {
        url: `${STATIC_ASSETS_URL}/${name}/${version}/${name}.browser.js`,
        integrity: integrityDigests.browser,
      },
      legacyBrowser: {
        url: `${STATIC_ASSETS_URL}/${name}/${version}/${name}.legacy.browser.js`,
        integrity: integrityDigests.legacyBrowser,
      },
      node: {
        url: `${STATIC_ASSETS_URL}/${name}/${version}/${name}.node.js`,
        integrity: integrityDigests.node,
      },
    };

    await fs.writeFile(
      './map/module-map.json', JSON.stringify(moduleMapContent, null, 2)
    );
  } catch (e) {
    console.log(e);
  }
};

doWork().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});
