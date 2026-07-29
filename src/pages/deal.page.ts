import { Page, test } from '@playwright/test';
import { PromotionDialog } from './promotionDialog.page';

export class DealPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickClaimButton(): Promise<PromotionDialog> {
        return await test.step('Click Claim Coupon button and wait for home page to load', async () => {
            const context = this.page.context();
            const pagePromise = context.waitForEvent('page');
            const claimButton = this.page.getByRole('button', { name: /claim coupon/i }).first();
            await claimButton.scrollIntoViewIfNeeded();
            await claimButton.click();
            const newTab = await pagePromise;
            await newTab.waitForLoadState('domcontentloaded');
            return new PromotionDialog(newTab);

        });
    }
}