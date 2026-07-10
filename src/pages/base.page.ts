import { Locator, Page } from "@playwright/test";

export abstract class BasePage {

    constructor(protected readonly page: Page) {}

    async open(path: string): Promise<void> {
        await this.page.goto(path);
    }

     async click(button: Locator): Promise<void> {
        await button.click();
    }
}