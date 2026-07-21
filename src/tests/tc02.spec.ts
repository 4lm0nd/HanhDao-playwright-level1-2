import { test, expect } from '../fixtures/base.fixture';

test('TC02 - Check-out/check-in validation', async ({ homePage }) => {
    await homePage.checkInDateInput.click();
    await homePage.selectDateFromDatePicker(10);
    await homePage.verifyDateIsDisabled(5);
});