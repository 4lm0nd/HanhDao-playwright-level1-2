import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ResultsPage } from '../pages/results.page';
import { HotelSearchWorkflow } from '../workflows/searchHotels.workflow';
import { SearchHotelOptions } from '../workflows/searchHotels.workflow';

type PageFixtures = {
    homePage: HomePage;
    resultsPage: ResultsPage
    searchHotel: (options: SearchHotelOptions) => Promise<ResultsPage>;
    open: (path: string) => Promise<void>;
};


export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto('/');
        await use(new HomePage(page));

    },

    resultsPage: async ({ page }, use) => {
        await use(new ResultsPage(page));
    },

    searchHotel: async ({ homePage }, use) => {
        const workflow = new HotelSearchWorkflow(homePage);
        await use((options) => workflow.searchHoltel(options));
    },

});

export { expect } from '@playwright/test';
