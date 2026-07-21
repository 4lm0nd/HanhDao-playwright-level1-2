import { test } from '../fixtures/base.fixture';

const destination = 'Tokyo';
const suggestion = 'Tokyo, Japan (City)';

test('TC04 - Search returns results', async ({ homePage }) => {
    await homePage.searchDestination(destination);
    await homePage.selectAutocompleteItem(suggestion);
    await homePage.selectDate({
        checkInDate: 7,
        checkOutDate: 10,
    }),
        await homePage.selectOccupancy({ rooms: 1, adults: 2, });
    const resultsPage = await homePage.clickSearch();
    await resultsPage.verifySearchResults(destination, 3);
});