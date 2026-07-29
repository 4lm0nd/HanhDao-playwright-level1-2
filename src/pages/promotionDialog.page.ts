import { expect, Locator, Page } from '@playwright/test';

export class PromotionDialog {
    readonly page: Page;
    readonly promotionDialog: Locator;
    readonly dialogTitle: Locator;
    constructor(page: Page) {
        this.page = page;
        this.promotionDialog = page.locator('div[role="dialog"] h2');

        this.dialogTitle = this.page.locator('h2').filter({
            hasText: /Coupon successfully collected|This coupon is already saved/i
        });
    }

    async verifySaveCouponMessage(actualMessage: string, expectMessage1: string, expectedMessage2: string): Promise<void> {
        const messageRegex = new RegExp(`(?:${expectMessage1}|${expectedMessage2})`);
        expect(actualMessage).toMatch(messageRegex);
    }

    async getSaveCouponMessage(): Promise<string> {
        await this.dialogTitle.waitFor({ state: 'visible', timeout: 15000 });
        const promotionMessage = await this.dialogTitle.innerText();
        return promotionMessage.trim();

    }

}