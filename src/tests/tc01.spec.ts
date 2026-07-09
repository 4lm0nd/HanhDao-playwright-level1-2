import { test, expect } from '../fixtures/base.fixture';
import { constant } from '../constants/constant';

const destination = 'Bangkok';
test('TC01 - Search destination', async ({ homePage }) => {

    console.log('Step 1: Open the Agoda home page');
    await homePage.open(constant.baseUrl);

    console.log('Step 2: Search for a destination');
    await homePage.searchDestination(destination);

    console.log('Step 3: Verify the autocomplete dropdown is displayed');
    await expect(homePage.autocompleteDropdown).toBeVisible();

    console.log('Step 4: Verify the autocomplete dropdown contains the expected destination');
    await expect(homePage.autocompleteDropdown).toContainText(destination);
});