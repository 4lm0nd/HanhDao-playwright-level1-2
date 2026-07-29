import { test } from '../fixtures/base.fixture';
import { EXPECTED_MESSAGES } from '../constants/messages';

const expectedMessage = EXPECTED_MESSAGES.searchError.success;

test('TC03 - Search without destination', async ({ homePage }) => {
    await homePage.searchButton.click();
    const actualMessage = await homePage.getSearchErrorMessage();
    await homePage.verifySearchErrorMessage(actualMessage, expectedMessage);
});