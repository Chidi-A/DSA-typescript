/**
 * PROBLEM: Find All Occurrences of "saur" (Medium)
 * Category: Pattern Matching / String Search
 *
 * Description:
 * The Dinosaur Research Team wants to analyze how many times the suffix
 * "saur" (meaning "lizard" in Greek) appears in dinosaur names.
 *
 * Write a function that returns an array of all starting indices where
 * the pattern is found. Search should be case-insensitive.
 *
 * Example:
 * findAllOccurrences("Tyrannosaurus", "saur");
 * // Returns: [8] - "saur" found at index 8
 *
 * findAllOccurrences("Stegosaurus Rex", "saur");
 * // Returns: [7] - "saur" found at index 7
 *
 * findAllOccurrences("The Brontosaurus and Allosaurus are cool", "saur");
 * // Returns: [15, 33] - "saur" found at indices 15 and 33
 *
 * findAllOccurrences("DINOSAUR dinosaur DiNoSaUr", "saur");
 * // Returns: [4, 13, 22] - case-insensitive, all found
 *
 * findAllOccurrences("No matches here", "xyz");
 * // Returns: [] - empty array when no matches
 *
 * Constraints:
 * - text.length >= 0
 * - pattern.length >= 1
 * - Case-insensitive search
 * - Return empty array if no matches
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * PATTERN MATCHING ALGORITHM
 *
 * Goal: Find ALL positions where a pattern appears in text
 *
 * 1. PREPARE TEXT AND PATTERN
 *    - Convert both to same case (lowercase)
 *    - This makes search case-insensitive
 *    - Original text: "DiNoSaUr" → "dinosaur"
 *    - Pattern: "SAUR" → "saur"
 *
 * 2. CHECK EDGE CASES
 *    - If text is shorter than pattern: impossible to find
 *    - Return empty array immediately
 *
 * 3. SLIDE THROUGH TEXT (Sliding Window)
 *    - Check each possible starting position
 *    - For each position i, check if pattern matches
 *    - If match found, save index i
 *
 * 4. RETURN ALL MATCHES
 *    - Array of indices where pattern starts
 *
 * DETAILED ALGORITHM STEPS:
 *
 * Example: Find "saur" in "Tyrannosaurus"
 *
 * STEP 1: NORMALIZE CASE
 * text = "Tyrannosaurus" → "tyrannosaurus" (lowercase)
 * pattern = "saur" → "saur" (already lowercase)
 *
 * STEP 2: EDGE CASE CHECK
 * text.length = 13, pattern.length = 4
 * 13 >= 4, so continue
 *
 * STEP 3: SLIDING WINDOW SEARCH
 *
 * We need to check positions 0 through (13 - 4) = 9
 *
 * Position 0: "tyra" vs "saur" ✗ No match
 * Position 1: "yran" vs "saur" ✗ No match
 * Position 2: "rann" vs "saur" ✗ No match
 * Position 3: "anno" vs "saur" ✗ No match
 * Position 4: "nnos" vs "saur" ✗ No match
 * Position 5: "nosa" vs "saur" ✗ No match
 * Position 6: "osau" vs "saur" ✗ No match
 * Position 7: "saur" vs "saur" ✗ No match (different characters)
 * Position 8: "saur" vs "saur" ✓ MATCH! Add 8 to results
 * Position 9: "auru" vs "saur" ✗ No match
 *
 * STEP 4: RETURN RESULTS
 * results = [8]
 *
 * Visual representation:
 * Text:     t y r a n n o s a u r u s
 * Index:    0 1 2 3 4 5 6 7 8 9 10 11 12
 * Pattern:                  s a u r
 *                           ↑
 *                       Match at 8!
 *
 * HANDLING OVERLAPPING PATTERNS:
 *
 * Example: Find "AA" in "AAAA"
 *
 * Non-overlapping (standard):
 * Position 0: "AA" ✓ Match at 0
 * Position 2: "AA" ✓ Match at 2
 * Results: [0, 2]
 *
 * Overlapping (bonus):
 * Position 0: "AA" ✓ Match at 0
 * Position 1: "AA" ✓ Match at 1 (overlaps with first!)
 * Position 2: "AA" ✓ Match at 2
 * Results: [0, 1, 2]
 *
 * The key is to move forward by 1 each time (index + 1)
 * instead of skipping past the match (index + pattern.length)
 */

// ============================================================================
// METHOD 1: MANUAL SEARCH (Using Loop)
// ============================================================================

/**
 * Find all occurrences using manual loop and substring comparison
 *
 * Approach: Sliding window with substring comparison
 *
 * Time Complexity: O(n * m) where n = text length, m = pattern length
 * - Outer loop: runs (n - m + 1) times ≈ O(n)
 * - substring() and comparison: O(m)
 * - Total: O(n * m)
 * - Example: text=1000 chars, pattern=10 chars → ~10,000 operations
 *
 * Space Complexity: O(k) where k = number of matches
 * - result array stores k indices
 * - lowerText and lowerPattern: O(n + m) for copies
 * - Total: O(n + k)
 *
 * Pros:
 * - Explicit and easy to understand
 * - Full control over the search process
 * - Easy to modify for special cases
 *
 * Cons:
 * - More verbose
 * - Manual implementation of search logic
 *
 */

export function findAllOccurrences(text: string, pattern: string): number[] {
  // Convert to lowercase for case-insensitive search
  const lowerText = text.toLowerCase();
  const lowerPattern = pattern.toLowerCase();
  const result: number[] = [];

  // Edge case: pattern longer than text
  if (text.length < pattern.length) {
    return result;
  }
  // Slide through text, checking each position
  // Stop when remaining text is shorter than pattern
  for (let i = 0; i <= lowerText.length - lowerPattern.length; i++) {
    // Extract substring of same length as pattern
    const substring = lowerText.substring(i, i + lowerPattern.length);

    // Compare with pattern
    if (substring === lowerPattern) {
      result.push(i); // Found match at index i
    }
  }

  return result;
}

// ============================================================================
// METHOD 2: BUILT-IN METHODS (Using indexOf)
// ============================================================================

/**
 * Find all occurrences using built-in indexOf method
 *
 * Approach: Repeatedly call indexOf with increasing start position
 *
 * Time Complexity: O(n * m)
 * - Each indexOf call: O(n) in worst case
 * - Called k times (for k matches)
 * - Total: O(k * n) ≈ O(n * m)
 *
 * Space Complexity: O(k) where k = number of matches
 * - result array stores k indices
 * - lowerText and lowerPattern: O(n + m)
 * - Total: O(n + k)
 *
 * Pros:
 * - More concise (fewer lines)
 * - Uses optimized native implementation
 * - Easier to read and understand intent
 *
 * Cons:
 * - Less explicit about how search works
 * - Relies on understanding indexOf behavior
 *
 */
export function findAllOccurrencesBuiltIn(
  text: string,
  pattern: string
): number[] {
  const lowerText = text.toLowerCase();
  const lowerPattern = pattern.toLowerCase();
  const result: number[] = [];

  let index = lowerText.indexOf(lowerPattern);
  while (index !== -1) {
    result.push(index);
    index = lowerText.indexOf(lowerPattern, index + 1);
  }

  return result;
}
