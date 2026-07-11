import { test as base } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { BasePage } from '../pages/base.page';

type PageFixtures = {
    homePage: HomePage;
    basePage: BasePage;
};

export const test = base.extend<PageFixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    }
});

export { expect } from '@playwright/test';