import { test, expect } from '../fixtures/base.fixture';
import { constant } from '../constants/constant';
import { DateUtils } from '../utils/date.utils';

test('TC02 - Check-out/check-in validation', async ({ homePage }) => {
    console.log('Step 1: Open the Agoda home page');
    await homePage.open(constant.baseUrl);

    console.log('Step 2: Click on the check-in date field');
    await homePage.click(homePage.checkInDateInput);

    console.log('Step 3: Select a check-in date');
    await homePage.click(homePage.checkInDateInput);
    await homePage.selectDate(10);

    console.log('Step 4: Select a check-out date before the check-in date');
    await homePage.click(homePage.checkOutDateInput);
    
    console.log('Step 5: Verify that the check-out date before check-in are greyed out and cannot be selected');   
     homePage.verifyDateIsDisabled(5);
 
});