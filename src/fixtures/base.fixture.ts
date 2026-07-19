import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ResultsPage } from '../pages/results.page';


type PageFixtures = {
    homePage: HomePage;
    resultsPage: ResultsPage
    open: (path: string) => Promise<void>;
    searchHotel: (options: SearchHotelOptions) => Promise<ResultsPage>;
};

type SearchHotelOptions = {
    destination: string;
    suggestion: string;
    checkInDate?: number;
    checkOutDate?: number;
};


export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto('/');
        await use(new HomePage(page));
        searchHotel: (options: SearchHotelOptions) => Promise<ResultsPage>;
    },

    resultsPage: async ({ page }, use) => {
        await use(new ResultsPage(page));
    },

});

export { expect } from '@playwright/test';
