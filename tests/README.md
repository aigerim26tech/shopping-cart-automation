# Shopping_Cart_Automation
## Overview
This repository contains automated UI tests for the shopping cart page:  
[https://gb-saa-test.vercel.app/](https://gb-saa-test.vercel.app/)  

The goal of this project was to show how I approach automation when requirements are ambiguous and functionality is still evolving — similar to what happens in real projects.

---

## Tools & Framework
- **Playwright (JavaScript)** for end-to-end UI automation
- **Page Object Model (POM)** for better locator management and reusability
- Ready to integrate into CI/CD pipelines

---

## Project Structure
shopping-cart-automation/
    tests/
        pages/
            CartPage.js     // Page Object for cart interactions
    CartTest.spec.js        // Test cases for cart
    utils/
    config.js               // Base URL and other constants
    playwright.config.js    // Playwright runner config
    README.md
---

## Test Scenarios
1. **Update Quantity Updates Total**  
   - Changing an item quantity updates the total price accordingly.
2. **Remove Item Updates Cart**  
   - Removing an item decreases the cart item count.
3. **Checkout Button Disabled When Cart Is Empty**  
   - Removing all items disables the checkout button.
4. **Basic UI Verification**  
   - Verifies that cart items, total display, and checkout button are visible.
5. **Edge Case: Quantity = 0 (Known Issue)**  
   - Setting quantity to `0` currently has no effect.  
     Observed behavior: quantity remains unchanged, which I logged as a bug for future fixes.

---

## Assumptions
- Cart total should equal `sum(price × quantity)` for all items.
- Removing an item should immediately update the item list and total.
- The checkout button should only be enabled when there are items in the cart.
- Navigation links (Home, Products, Profile) are placeholders, so I excluded them from testing.
- Handling invalid quantities (0, negative, very large) is expected in future releases.

---

## Known Issues Observed
1. The initial total always shows `$105.99`, unrelated to actual items.  
2. Removing an item sometimes doesn’t update totals or item count.  
3. Checkout button logic appears inverted:
   - Disabled when items are present  
   - Green when empty but still disabled  
4. Quantity = 0 does nothing (no validation or reset).  
5. The Travel Mug “Remove” button behaves differently compared to other items.

---

## How to Run Tests
### **1. Run via CLI**
```bash
# Install dependencies
npm install
# Run all tests
npx playwright test
# Run in headed mode (see browser actions)
npx playwright test --headed
# Run a specific test file
npx playwright test tests/CartTest.spec.js

### **2. Run from VS Code**
# Install the "Playwright Test for VSCode" extension (by Microsoft)
# Open any test file (e.g., tests/cart.test.js)
# Hover over the test name and click "Run | Debug"
# Or use the Testing Panel (beaker icon) to run or debug tests

---

## Suggestions for Improvement
-Fix cart total calculation logic.
-Ensure remove buttons always update both DOM and total.
-Clarify checkout button enabling/disabling rules.
-Add validation for invalid quantities.
-Add unique, stable selectors for more reliable automation.

## Performance Testing (Concept)
For future performance testing:
Tool: Apache JMeter
Scenario: Simulate multiple concurrent users adding/removing items and attempting checkout.
Metrics Collected:
Response time for cart updates
Error rate under load
Checkout latency under heavy usage
Approach: Create a JMeter test plan using cart API endpoints (when available), configure thread groups for concurrent virtual users, and analyze results with Summary Report and Graph Results.

## Testing Approach & Considerations

### Approach
- I focused on the most critical cart functions first (item quantity changes, removal of items, checkout button state).
- Used Page Object Model to separate locators and actions from test logic, making tests easier to maintain and extend.
- Wrote each test as independent and idempotent, so they can run individually or as part of a suite without dependencies.
- Tests are designed to run in headless and headed modes, and can be integrated into CI/CD pipelines.

### Considerations
- The cart page has known issues (incorrect total calculation, checkout button behavior, quantity = 0 handling). Instead of skipping these, I automated them as-is and documented failures as *known issues* to demonstrate QA thinking.
- Since navigation links (Home, Products, Profile) are placeholders, they were excluded from scope.
- For performance testing, I considered *Apache JMeter* to simulate multiple users and measure cart update performance, but limited this assignment to a conceptual approach.
- Chose Playwright for fast setup, built-in assertions, cross-browser support, and simple debugging via VS Code.

