import { test } from '../fixtures/base.fixture';
import { EXPECTED_MESSAGES } from '../constants/messages';
import { PromotionDialog } from '../pages/promotionDialog.page';

const expectedMessage1 = EXPECTED_MESSAGES.claimCoupon.success;
const expectedMessage2 = EXPECTED_MESSAGES.claimCoupon.alreadySave;


test('TC07 - Verify Claim Coupon', async ({ homePage }) => {
    const dealPage = await homePage.selectViewAll("accommodation");
    const promotionDialog = await dealPage.clickClaimButton();
    const actualMessage = await promotionDialog.getSaveCouponMessage();
    await promotionDialog.verifySaveCouponMessage(actualMessage, expectedMessage1, expectedMessage2);
});