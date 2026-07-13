import { Locator, Page } from "@playwright/test";

export class BasePage {

    constructor(protected readonly page: Page) {}

     async click(button: Locator): Promise<void> {
        await button.click();
    }

    async typeText(input: Locator, text: string): Promise<void> {
        await input.fill(text);
}
    async getText(locator: Locator): Promise<string> {
        return (await locator.innerText()).trim();
    }

    async isElementVisible(locator: Locator): Promise<boolean> {
        return await locator.isVisible();
    }
    
    async isElementHidden(locator: Locator): Promise<boolean> {
        return await locator.isHidden();
    }

    async isElementEnabled(locator: Locator): Promise<boolean> {
        return await locator.isEnabled();
    }
    async isElementDisabled(locator: Locator): Promise<boolean> {
        return await locator.isDisabled();
    }   
    async getElementCount(locator: Locator): Promise<number> {
        return await locator.count();
    }   
}