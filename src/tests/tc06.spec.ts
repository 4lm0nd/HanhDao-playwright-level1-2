import { test } from '../fixtures/base.fixture';
import { SortOption, SortOptions } from '../data/sortOption.enum';

const destination = 'Bangkok';
const suggestion = 'Bangkok, Thailand (City)';


test('TC06 - Sort price returns results', async ({ searchHotel }) => {
    const resultsPage = await searchHotel({
        destination: destination,
        suggestion: suggestion,
        checkInDate: 5,
        checkOutDate: 8,
    });

    await resultsPage.selectSortByOption(SortOptions.LowestPrice);
    await resultsPage.verifyPriceIsSorted(5);

});