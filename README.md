Snapshot test!!

Create an integration folder in the root of the project and create 3 files in this folder

1) jest.config.js
    
Add to file!
    module.exports = {
    preset: 'jest-puppeteer',
    testRegex: './*\\.test\\.js$',
    setupFilesAfterEnv: ['./setupTests.js']
    };


2) setupTests.js

Add to file!
    const { toMatchImageSnapshot } = require('jest-image-snapshot');
    expect.extend({ toMatchImageSnapshot });


3) app.test.js

Add to file!
    describe('addItemForm', () => {
    it('base example, visually looks correct', async () => {
    await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-base-example&viewMode=story');
    const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});

4) Commands for installing snapshot test and running the test

    yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test --dev
    
    /iframe.html?id=
    
    yarn test:integration
    
    yarn run jest:integration --updateSnapshot
