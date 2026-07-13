import { test, expect } from '../fixtures/base.fixture';

const destination = 'Tokyo';
const suggestion = 'Tokyo, Japan (City)';

test('TC04 - Search returns results', async ({ homePage }) => {
    await homePage.searchDestination(destination);
    await homePage.selectAutocompleteItem(suggestion);      
    await homePage.selectDate(7);
    await homePage.selectDate(10);
    await homePage.selectOccupancyOption('adults', 2);
    await homePage.selectOccupancyOption('rooms', 1);
    const resultsPage = await homePage.clickSearch();    
    await resultsPage.verifySearchResults(destination);
});