import { test, expect } from '../fixtures/base.fixture';

const destination = 'Bangkok';
const suggestion = 'Bangkok, Thailand (City)';

test('TC05 - Search returns results', async ({ searchHotel }) => {
    const resultsPage = await searchHotel({
        destination: destination,
        suggestion: suggestion,
        checkInDate: 5,
        checkOutDate: 8,
    });

    const expectedMaxPrice = await resultsPage.adjustSliderPrice(30)
    await resultsPage.verifyPrice(expectedMaxPrice)

});