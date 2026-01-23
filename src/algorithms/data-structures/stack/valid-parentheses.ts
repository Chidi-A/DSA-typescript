/**
 * PROBLEM: Valid Parentheses (Easy)
 * Category: Stack / Matching & Pairing
 *
 * Description:
 * Check if a string of multiple bracket types is valid.
 * Valid means every opening bracket has a matching closing bracket
 * in the correct order.
 *
 * Bracket types: (), [], {}
 *
 * Example:
 * isValidParentheses("()[]{}");
 * // Returns: true
 *
 * isValidParentheses("([{}])");
 * // Returns: true (properly nested)
 *
 * isValidParentheses("([)]");
 * // Returns: false
 * // Wrong order: [ closes before ( closes
 *
 * isValidParentheses("((()))");
 * // Returns: true
 *
 * isValidParentheses("(((");
 * // Returns: false (missing closing brackets)
 *
 * isValidParentheses("))(");
 * // Returns: false (extra closing bracket)
 *
 * Constraints:
 * - str.length >= 0
 * - String contains only bracket characters
 * - Empty string is valid
 */

// ============================================================
// ALGORITHM (Plain English)
// ============================================================

/**
 * ALGORITHM:
 *
 * 1. Create empty stack
 * 2. Create mapping: closing bracket → opening bracket
 *    { ')': '(', ']': '[', '}': '{' }
 * 3. For each character in string:
 *    a. If it's a closing bracket:
 *       - Pop from stack (get most recent opening)
 *       - Check if it matches this closing bracket
 *       - If no match OR stack was empty → invalid
 *    b. If it's an opening bracket:
 *       - Push onto stack
 *
 * 4. After processing all characters:
 *    - If stack is empty → valid (all matched)
 *    - If stack has items → invalid (unmatched openings)
 */

export function isValidParentheses(str: string): boolean {
  if (str.length === 0) {
    return true;
  }

  const stack: string[] = [];

  const matchingBracket: { [key: string]: string } = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (const char of str) {
    if (char in matchingBracket) {
      const top = stack.pop();

      if (top !== matchingBracket[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}

/**
 * COMPLEXITY ANALYSIS:
 *
 * Time Complexity: O(n)
 * - n = length of string
 * - Single pass through string: O(n)
 * - Each push/pop operation: O(1)
 * - Total: O(n)
 *
 * Space Complexity: O(n)
 * - Worst case: all opening brackets
 * - Example: "(((((" → stack has n elements
 * - Best case: O(1) for balanced string like "()()()"
 * - Average: O(n/2) = O(n)
 */
