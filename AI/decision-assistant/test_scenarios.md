# Test Scenarios – Laptop Decision Assistant

## Test 1: Ambiguous Request

**Input:** I need a good laptop.

**Expected:** The assistant should ask the user to specify requirements such as budget, RAM, rating, and battery life.

**Actual:** The assistant asked for the missing requirements without calling the recommendation tool.

**Status:** PASS

## Test 2: Impossible Request

**Input:** I need a laptop under ₹20,000 with at least 64GB RAM.

**Expected:** The system should return no matching laptops and must not invent alternatives.

**Actual:** The Python function returned no matching laptops. The assistant explained that the constraints could not be satisfied.

**Status:** PASS

## Test 3: Multiple Constraints

**Input:** I need a laptop within ₹60,000, at least 16GB RAM, and 8 hours of battery life.

**Expected:** Return laptops satisfying all three constraints, ranked by rating + battery hours.

**Actual:** Three matching laptops were returned and correctly ranked.

**Status:** PASS

## Test 4: Budget-Only Request

**Input:** Find me the best laptop within ₹45,000.

**Expected:** Return all laptops within the budget and rank them by rating + battery hours.

**Actual:** Four matching laptops were returned. Laptop B received the highest score of 11.3.

**Status:** PASS

## Test 5: Rating-Only Request

**Input:** Find laptops with a rating of at least 4.5.

**Expected:** Return all laptops with a rating of 4.5 or higher, ranked by rating + battery hours.

**Actual:** Four matching laptops were returned and correctly ranked. Laptop I achieved the highest score of 19.5.

**Status:** PASS

---

## Test Summary

- Total scenarios: 4
- Passed: 4
- Failed: 0
