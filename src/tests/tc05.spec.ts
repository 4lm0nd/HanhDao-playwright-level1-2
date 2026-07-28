import { test } from '../fixtures/base.fixture';

const destination = 'Bangkok';
const suggestion = 'Bangkok, Thailand (City)';


test('TC05 - Filter price returns results', async ({ searchHotel }) => {
    test.setTimeout(90 * 1000);
    const resultsPage = await searchHotel({
        destination: destination,
        suggestion: suggestion,
        checkInDate: 5,
        checkOutDate: 8,
    });

    const expectedMaxPrice = await resultsPage.adjustSliderPrice(30)
    await resultsPage.verifyPriceIsFiltered(expectedMaxPrice)

});