import { test, expect } from '../fixtures/base.fixture';

test('TC02 - Check-out/check-in validation', async ({ homePage,basePage }) => {  
    await homePage.click(homePage.checkInDateInput);      
    await homePage.selectDate(10);    
    await homePage.verifyDateIsDisabled(5); 
});