import { test, expect } from '../fixtures/base.fixture';
import { constant } from '../constants/constant';
import { DateUtils } from '../utils/date.utils';


test('TC02 - Check-out/check-in validation', async ({ homePage,basePage }) => {
    console.log('Step 1: Open the Agoda home page');
    await homePage.open(constant.baseUrl);

    console.log('Step 2: Open the check-in date field');
    await homePage.click(homePage.checkInDateInput);
    
    console.log('Step 3: Select a check-in date');
    await homePage.selectDate(10);
    await homePage.checkInDateInput.click();
    await basePage.isElementVisible(homePage.checkInDateInput);
    
    console.log('Step 4: Open the check-out date field');
    await homePage.click(homePage.checkOutDateInput);
    await basePage.isElementVisible(homePage.checkOutDateInput);
    
    console.log('Step 5: Verify that the check-out date before check-in are greyed out and cannot be selected');   
    await homePage.verifyDateIsDisabled(5);
 
});