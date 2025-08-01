const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        // all page locators go here
        this.page = page;
        this.itemsList = page.locator('div.cart-item');
        this.totalAmount = page.locator('#cartTotal');
        this.checkoutBtn = page.locator('#checkoutBtn');
    }

    async getItemCount() {
        return await this.itemsList.count();
    }

    async updateQuantity(index, qty) {
        const qtyField = this.itemsList.nth(index).locator('input[type="number"]');
        await qtyField.fill(qty.toString());
    }

    async removeItem(index) {
        const removeButton = this.itemsList.nth(index).locator('button:has-text("Remove")');
        await removeButton.click();
    }

    async getTotalText() {
        const totalText = await this.totalAmount.textContent();
        return totalText ? totalText.trim() : '';
    }

    async isCheckoutEnabled() {
        return await this.checkoutBtn.isEnabled();
    }
}

module.exports = CartPage;
