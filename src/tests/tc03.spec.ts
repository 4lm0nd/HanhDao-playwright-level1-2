import { test, expect } from '../fixtures/base.fixture';
import { constant } from '../constants/constant';
import { EXPECTED_MESSAGES } from '../constants/messages';

const expectedMessage = EXPECTED_MESSAGES.searchError.success;

test('TC03 - Search withoutdestination', async ({ homePage }) => {

    console.log('Step 1: Open the Agoda home page');
    await homePage.open(constant.baseUrl);

    console.log('Step 2: click Search button without entering any destination');
    await homePage.clickSearchButton();
 
    console.log('Step 3: Verify Validation error message appears asking user to enter a destination');
    const actualMessage = await homePage.getSearchErrorMessage();
    await expect(actualMessage).toBe(expectedMessage);  
});