/**
 * PROBLEM: Validate Dinosaur Code (Medium)
 * Category: String Validation
 *
 * Description:
 * The Dinosaur Database uses special codes for each species.
 * A valid code must follow these rules:
 * - Contains at least one uppercase letter
 * - Contains at least one lowercase letter
 * - Contains at least one digit
 * - Is between 6 and 12 characters long
 * - Only contains letters and digits (no special characters)
 *
 * Example:
 * isValidCode("Trex123");    // true  - Has upper, lower, digit, 7 chars
 * isValidCode("TREX123");    // false - No lowercase
 * isValidCode("trex123");    // false - No uppercase
 * isValidCode("TrexABC");    // false - No digit
 * isValidCode("Tx1");        // false - Too short (< 6 chars)
 * isValidCode("Trex123456789"); // false - Too long (> 12 chars)
 * isValidCode("Trex-123");   // false - Has special char
 * isValidCode("");           // false - Empty
 *
 * Constraints:
 * - code.length >= 0
 * - Code is a string
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * STRING VALIDATION ALGORITHM
 *
 * Goal: Check if a string meets multiple criteria
 *
 * VALIDATION REQUIREMENTS:
 * 1. Length: 6-12 characters
 * 2. Content: Only letters and digits
 * 3. Must have: At least one uppercase letter
 * 4. Must have: At least one lowercase letter
 * 5. Must have: At least one digit
 *
 * GENERAL APPROACH:
 *
 * STEP 1: CHECK LENGTH
 * - If length < 6 OR length > 12
 * - Return false immediately (fail fast)
 * - No point checking other rules if length is wrong
 *
 * STEP 2: INITIALIZE TRACKERS
 * - hasUpperCase = false
 * - hasLowerCase = false
 * - hasDigit = false
 * - These flags track what we've found so far
 *
 * STEP 3: ITERATE THROUGH EACH CHARACTER
 * - For each character in the code:
 *   a. Check if it's an uppercase letter (A-Z)
 *      → Set hasUpperCase = true
 *   b. Check if it's a lowercase letter (a-z)
 *      → Set hasLowerCase = true
 *   c. Check if it's a digit (0-9)
 *      → Set hasDigit = true
 *   d. If it's NONE of the above
 *      → It's an invalid character!
 *      → Return false immediately
 * STEP 4: FINAL CHECK
 * - After checking all characters:
 * - Return true ONLY if ALL three flags are true
 * - If any flag is still false, return false
 *
 * Example walkthrough with "Trex123":
 *
 * Length check: 7 chars → OK ✓ (6 ≤ 7 ≤ 12)
 *
 * Character checks:
 * 'T': Uppercase → hasUpperCase = true
 * 'r': Lowercase → hasLowerCase = true
 * 'e': Lowercase → hasLowerCase = true (already true)
 * 'x': Lowercase → hasLowerCase = true (already true)
 * '1': Digit → hasDigit = true
 * '2': Digit → hasDigit = true (already true)
 * '3': Digit → hasDigit = true (already true)
 *
 * Final check:
 * hasUpperCase = true ✓
 * hasLowerCase = true ✓
 * hasDigit = true ✓
 * All true → Return true!
 *
 * TWO APPROACHES TO IMPLEMENT:
 *
 * Approach 1: Manual Character Checking
 * - Loop through each character
 * - Use ASCII comparison (char >= 'A' && char <= 'Z')
 * - More control, no regex needed
 *
 * Approach 2: Regular Expressions (Regex)
 * - Use pattern matching
 * - More concise but requires regex knowledge
 * - /[A-Z]/ for uppercase, /[a-z]/ for lowercase, /[0-9]/ for digit
 */

// ============================================================================
// METHOD 1: WITHOUT REGEX (Manual Checking)
// ============================================================================

/**
 * Validate dinosaur code WITHOUT using regex
 *
 * Approach: Manual character checking using ASCII comparisons
 *
 * Time Complexity: O(n) where n = code.length
 * - Length check: O(1)
 * - Loop through all characters: O(n)
 * - Each character check: O(1)
 * - Total: O(n)
 *
 * Space Complexity: O(1)
 * - Only uses three boolean flags
 * - No additional data structures
 * - Loop variable: O(1)
 */
export function isValidCode(code: string): boolean {
  if (code.length < 6 || code.length > 12) {
    return false;
  }

  let hasUpperCase = false;
  let hasLowerCase = false;
  let hasDigit = false;

  for (let i = 0; i < code.length; i++) {
    const char = code[i];

    if (char >= 'A' && char <= 'Z') {
      hasUpperCase = true;
    } else if (char >= 'a' && char <= 'z') {
      hasLowerCase = true;
    } else if (char >= '0' && char <= '9') {
      hasDigit = true;
    } else {
      return false;
    }
  }

  return hasUpperCase && hasLowerCase && hasDigit;
}

// ============================================================================
// METHOD 2: WITH REGEX (Regular Expressions)
// ============================================================================

/**
 * Validate dinosaur code USING regex
 *
 * Approach: Pattern matching with regular expressions
 *
 * Time Complexity: O(n) where n = code.length
 * - Length check: O(1)
 * - Each regex test: O(n) - scans entire string
 * - Three regex tests: 3 × O(n) = O(3n) = O(n)
 * - Total: O(n)
 *
 * Space Complexity: O(1)
 * - Regex patterns are constants
 * - No additional data structures
 */
export function isValidCodeRegex(code: string): boolean {
  // STEP 1: Check length constraints
  if (code.length < 6 || code.length > 12) {
    return false;
  }
  // STEP 2: Check requirements using regex patterns
  const hasUpperCase = /[A-Z]/.test(code); // Has at least one A-Z
  const hasLowerCase = /[a-z]/.test(code); // Has at least one a-z
  const hasDigit = /[0-9]/.test(code); // Has at least one 0-9

  // STEP 3: Optional - ensure only alphanumeric characters
  // This check is implicit in manual version (we reject others in loop)
  const onlyAlphanumeric = /^[A-Za-z0-9]+$/.test(code);

  // STEP 4: Return true only if all requirements met
  return hasUpperCase && hasLowerCase && hasDigit && onlyAlphanumeric;
}
