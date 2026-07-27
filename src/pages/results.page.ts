import { expect, Locator, Page } from '@playwright/test';


export class ResultsPage {
    readonly page: Page;
    readonly hotelCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.hotelCards = page.locator('[data-element-name="property-card-info"]');

    }

    async verifySearchResults(destination: string, index: number): Promise<void> {
        await expect.poll(async () => await this.hotelCards.count(), {
            timeout: 10000,
            message: 'No hotel cards were loaded within 10 seconds.'
        }).toBeGreaterThan(0);


        for (let i = 0; i < index; i++) {
            await expect(this.hotelCards.nth(i)).toBeVisible();
            await expect(this.page.locator('[data-selenium= "area-city-text"]').nth(i)).
                toContainText(destination, { timeout: 10000 });
        }

    }


}