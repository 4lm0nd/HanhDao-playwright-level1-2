import { test, expect } from '../fixtures/base.fixture';

const destination = 'Bangkok';
test('TC01 - Search destination', async ({ homePage }) => {
    await homePage.searchDestination(destination);
    await homePage.verifyAutocompleteDropdownContains(destination);
});