const { test, expect } = require('@playwright/test');
const CartPage = require('./pages/CartPage');
const config = require('./utils/config');

test.describe("Cart Page Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(config.baseURL);
    });

    test("Verify items are displayed in cart", async ({ page }) => {
        let cart = new CartPage(page);
        const count = await cart.getItemCount();
        expect(count).toBeGreaterThan(0);
    });

    test("Update quantity should update total", async ({ page }) => {
        let cart = new CartPage(page);
        const initialTotal = await cart.getTotalText();
        await cart.updateQuantity(0, 3);
        const updatedTotal = await cart.getTotalText();
        expect(updatedTotal).not.toEqual(initialTotal);
    });

    test("Remove item should decrease count", async ({ page }) => {
        let cart = new CartPage(page);
        const initialCount = await cart.getItemCount();
        await cart.removeItem(0);
        const newCount = await cart.getItemCount();
        // known bug: sometimes UI doesn't update count
        expect(newCount).toBeLessThan(initialCount);
    });

    test("Checkout button should be disabled when cart is empty", async ({ page }) => {
        let cart = new CartPage(page);
        const count = await cart.getItemCount();
        for (let i = 0; i < count; i++) {
            await cart.removeItem(0);
        }
        const isEnabled = await cart.isCheckoutEnabled();
        expect(isEnabled).toBeFalsy();
    });

    test("Edge case: setting quantity to 0 does nothing (known issue)", async ({ page }) => {
        let cart = new CartPage(page);
        const initialCount = await cart.getItemCount();
        expect(initialCount).toBeGreaterThan(0);

        await cart.updateQuantity(0, 0);

        const countAfterUpdate = await cart.getItemCount();
        const totalAfterUpdate = await cart.getTotalText();
        expect(countAfterUpdate).toBe(initialCount);
        expect(totalAfterUpdate).toBeDefined();
    });
});
