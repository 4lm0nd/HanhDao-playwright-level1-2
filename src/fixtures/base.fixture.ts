import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { BasePage } from '../pages/base.page';
import { ResultsPage } from '../pages/results.page';


type PageFixtures = {
    homePage: HomePage;
    resultsPage: ResultsPage
    open: (path: string) => Promise<void>;
    searchHotel: (options: SearchHotelOptions) => Promise<void>;
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
    },

    resultsPage: async ({ page }, use) => {
        await use(new ResultsPage(page));
    },


    searchHotel: async ({ homePage }, use) => {
        await use(async ({
            destination,
            suggestion,
            checkInDate,
            checkOutDate,
        }: SearchHotelOptions) => {
            await homePage.searchDestination(destination);
            await homePage.selectAutocompleteItem(suggestion);
            await homePage.selectDate(checkInDate);
            await homePage.selectDate(checkOutDate);
            await homePage.clickSearch();
        });
    },

});

export { expect } from '@playwright/test';
