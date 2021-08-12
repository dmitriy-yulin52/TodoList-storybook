Snapshot test!!

В корне проекта создать папку integration и в этой папке создать 3 файла.

1) jest.config.js

И добавить в файл вот этот код!
module.exports = {
preset: 'jest-puppeteer',
testRegex: './*\\.test\\.js$',
setupFilesAfterEnv: ['./setupTests.js']
};


2) setupTests.js

И добавить в файл вот этот код!
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });


3) app.test.js

И добавить в файл вот этот код!
describe('addItemForm', () => {
it('base example, visually looks correct', async () => {
// APIs from jest-puppeteer
await page.goto('http://localhost:9009/iframe.html?id=todolist-additemform--add-item-form-base-example&viewMode=story');
const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});
