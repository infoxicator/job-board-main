const fs = require('fs-extra');
const uuidv4 = require('uuid/v4');
const { name, version } = require('../package.json');

const getUrlFromCNAME = async () => {
  let domainUrl = await fs.readFile('./CNAME', 'utf8');
  domainUrl = domainUrl.replace(/(\r\n|\n|\r)/gm, '');
  return `https://${domainUrl}/`;
};

const integrityDigests = require('../bundle.integrity.manifest.json');

const doWork = async () => {
  const moduleMapContent = { key: uuidv4(), modules: {} };
  const STATIC_ASSETS_URL = await getUrlFromCNAME();

  moduleMapContent.modules[name] = {
    browser: {
      url: `${STATIC_ASSETS_URL}${version}/${name}.browser.js`,
      integrity: integrityDigests.browser,
    },
    legacyBrowser: {
      url: `${STATIC_ASSETS_URL}${version}/${name}.legacy.browser.js`,
      integrity: integrityDigests.legacyBrowser,
    },
    node: {
      url: `${STATIC_ASSETS_URL}${name}/${version}/${name}.node.js`,
      integrity: integrityDigests.node,
    },
  };

  await fs.writeFile(
    './map/module.map.json', JSON.stringify(moduleMapContent, null, 2)
  );
};

doWork().catch((err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});
