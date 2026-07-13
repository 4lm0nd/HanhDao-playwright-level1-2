import { test, expect } from '../fixtures/base.fixture';
import { EXPECTED_MESSAGES } from '../constants/messages';

const expectedMessage = EXPECTED_MESSAGES.searchError.success;

test('TC03 - Search withoutdestination', async ({ homePage }) => {    
    await homePage.click(homePage.searchButton);
    const actualMessage = await homePage.getSearchErrorMessage();
    await homePage.verifySearchErrorMessage(actualMessage,expectedMessage);
});