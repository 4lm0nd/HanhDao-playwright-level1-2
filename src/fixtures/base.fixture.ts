import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { BasePage } from '../pages/base.page';
import { constant } from '../constants/constant';


type PageFixtures = {
    homePage: HomePage;
    basePage: BasePage;
    open: (path: string) => Promise<void>;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await page.goto('/');
        await use(new HomePage(page));
    },

    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },

    open: async ({ page }, use) => {
        await use(async (path = '/') => {
            await page.goto(path);
        });
    }
});

export { expect } from '@playwright/test';
