/**
 * PROBLEM: Reverse a String
 * Category: String Manipulation
 *
 * Description:
 * The Dinosaur Name Generator has a bug - it's creating names backwards!
 * Write a function that takes a dinosaur name and returns it reversed.
 *
 * Example:
 * reverseName("Tyrannosaurus");
 * // Returns: "suruasonnayrT"
 *
 * reverseName("Rex");
 * // Returns: "xeR"
 *
 * reverseName("T-Rex");
 * // Returns: "xeR-T"
 *
 * reverseName("");
 * // Returns: ""
 *
 * Constraints:
 * - name.length >= 0
 * - Name may contain letters, hyphens, spaces
 * - Preserve all characters including special chars
 * - Case-sensitive
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * STRING REVERSAL - The Concept
 *
 * Goal: Take a string and return it with characters in opposite order
 *
 * Example: "ABC" → "CBA"
 *
 * GENERAL APPROACH:
 *
 * 1. ACCESS CHARACTERS
 *    - Need to access each character in the string
 *    - Strings are indexed: "ABC"[0] = 'A', "ABC"[1] = 'B', "ABC"[2] = 'C'
 *
 * 2. REVERSE THE ORDER
 *    - First character becomes last
 *    - Second becomes second-to-last
 *    - Last becomes first
 *
 * 3. BUILD NEW STRING
 *    - Combine characters in reversed order
 *    - Return the result
 *
 * There are multiple ways to achieve this - each with tradeoffs!
 *
 */

/**
 * ============================================================================
 * METHOD 1: BUILT-IN METHODS (split → reverse → join)
 * ============================================================================
 *
 * Steps:
 * 1. SPLIT string into array of characters
 *    "ABC" → ['A', 'B', 'C']
 *
 * 2. REVERSE the array
 *    ['A', 'B', 'C'] → ['C', 'B', 'A']
 *
 * 3. JOIN array back into string
 *    ['C', 'B', 'A'] → "CBA"
 *
 * Pros:
 * - Simplest to write and understand
 * - One-liner
 * - Built-in methods are optimized
 *
 * Cons:
 * - Creates intermediate arrays
 * - Multiple function calls (overhead)
 */

export function reverseName(name: string): string {
  return name.split('').reverse().join('');
}

/**
 * ============================================================================
 * METHOD 2: FOR LOOP (iterate backwards)
 * ============================================================================
 *
 * Steps:
 * 1. CREATE empty result string
 *    reversed = ""
 *
 * 2. LOOP from end to beginning
 *    - Start at last index (length - 1)
 *    - Move backwards to index 0
 *    - i = length-1, length-2, ... 1, 0
 *
 * 3. APPEND each character to result
 *    - reversed += name[i]
 *    - Build string character by character
 *
 * 4. RETURN result
 *
 * Example with "ABC":
 * i=2: reversed = "" + "C" = "C"
 * i=1: reversed = "C" + "B" = "CB"
 * i=0: reversed = "CB" + "A" = "CBA"
 *
 * Pros:
 * - More control over the process
 * - No intermediate arrays
 * - Easy to understand
 *
 * Cons:
 * - String concatenation in loop (creates many intermediate strings)
 * - More verbose than built-in methods
 *
 */

export function reverseNameLoop(name: string): string {
  let reversed = '';

  for (let i = name.length - 1; i >= 0; i--) {
    reversed += name[i];
  }

  return reversed;
}

/**
 * ============================================================================
 * METHOD 3: RECURSION (divide and conquer)
 * ============================================================================
 *
 * Concept: "Reverse of 'ABC' = Reverse of 'BC' + 'A'"
 *
 * Steps:
 * 1. BASE CASE
 *    - If string has 0 or 1 character, it's already reversed
 *    - Return as-is
 *
 * 2. RECURSIVE CASE
 *    - Take first character: name[0]
 *    - Take rest of string: name.slice(1)
 *    - Recursively reverse the rest
 *    - Append first character at the end
 *
 * * Pros:
 * - Elegant and mathematical
 * - Demonstrates recursion concept
 * - No loops needed
 *
 * Cons:
 * - Uses call stack (memory overhead)
 * - Risk of stack overflow on very long strings
 * - Slower than iterative approaches
 */

export function reverseNameRecursion(name: string): string {
  if (name.length <= 1) {
    return name;
  }

  return reverseNameRecursion(name.slice(1)) + name[0];
}

/**
 * 
 * // ============================================================================
// COMPLEXITY COMPARISON
// ============================================================================

/**
 * COMPARISON TABLE:
 * 
 * ┌──────────────────┬─────────┬─────────┬──────────────────┬─────────────┐
 * │ Method           │  Time   │  Space  │  Readability     │ Performance │
 * ├──────────────────┼─────────┼─────────┼──────────────────┼─────────────┤
 * │ Built-in         │  O(n)   │  O(n)   │  ★★★★★ Easiest   │   ★★★★☆     │
 * │ For Loop         │  O(n)   │  O(n)   │  ★★★★☆ Clear     │   ★★★☆☆     │
 * │ Recursion        │  O(n)   │  O(n)   │  ★★★☆☆ Elegant   │   ★★☆☆☆     │
 * └──────────────────┴─────────┴─────────┴──────────────────┴─────────────┘
 * 
 * 
 * WHICH METHOD IS MOST EFFICIENT?
 *
 * All methods are O(n) time and O(n) space theoretically, BUT:
 *
 * 🏆 WINNER: Built-in Methods (split + reverse + join)
 *
 * Why?
 * 1. Uses native C++ implementations (V8 engine)
 * 2. Highly optimized by browser/Node.js vendors
 * 3. JIT (Just-In-Time) compiler optimizes these patterns
 * 4. One-liner with minimal overhead
 *
 * 🥈 RUNNER-UP: Loop with Array (optimized version)
 * - Avoids multiple string concatenations
 * - Good for understanding what's happening
 * * ❌ LEAST EFFICIENT: Recursion
 * - Call stack overhead
 * - Risk of stack overflow
 * - Multiple function calls
 * - Use only for educational purposes or very short strings
 *
 * RECOMMENDATION:
 * - Production code: Use built-in methods
 * - Learning/interviews: Know all approaches
 * - Performance-critical: Profile and measure!
 */
