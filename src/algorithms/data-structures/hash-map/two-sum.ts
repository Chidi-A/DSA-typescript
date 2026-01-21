/**
 * PROBLEM: Two Sum
 * Category: Hash Map / Two Pointers
 *
 * Description:
 * Given an array of dinosaur ages and a target sum, find two different
 * dinosaurs whose ages add up to the target. Return their indices.
 * Each age can only be used once.
 *
 * Example:
 * twoSum([10, 20, 30, 40], 50);
 * // Returns: [1, 2]
 * // ages[1] + ages[2] = 20 + 30 = 50
 *
 * twoSum([2, 7, 11, 15], 9);
 * // Returns: [0, 1]
 * // ages[0] + ages[1] = 2 + 7 = 9
 *
 * twoSum([1, 2, 3], 10);
 * // Returns: null
 * // No two ages sum to 10
 *
 * twoSum([5, 5, 10], 10);
 * // Returns: [0, 1]
 * // 5 + 5 = 10 (two different indices)
 *
 * Constraints:
 * - ages.length >= 2
 * - Exactly one solution exists OR return null
 * - Can't use same element twice
 * - Return any valid pair of indices
 *
 */

// ============================================================
// APPROACH: HASH MAP (OPTIMAL!)
// ============================================================
/**
 * ALGORITHM (Plain English):
 *
 * The KEY INSIGHT: "Complement Pattern"
 *
 * For each number, instead of checking ALL other numbers,
 * we ask: "Have I seen the number that would complete this pair?"
 *
 * 1. Create empty Map to store: value → index
 * 2. For each element at index i:
 *    a. Calculate complement = target - ages[i]
 *    b. Check if complement exists in Map
 *       - If YES: Return [map.get(complement), i]
 *       - If NO: Store current number in Map for future lookups
 * 3. If loop completes, return null
 *
 */

export function twoSum(
  ages: number[],
  target: number
): [number, number] | null {
  if (ages.length < 2) {
    return null;
  }

  const map = new Map<number, number>();

  for (let i = 0; i < ages.length; i++) {
    const complement = target - ages[i];

    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }

    map.set(ages[i], i);
  }

  return null;
}

/**
 * COMPLEXITY ANALYSIS - Hash Map:
 *
 * Time Complexity: O(n)
 * - Single pass through array: n iterations
 * - Each Map.has() operation: O(1) average
 * - Each Map.set() operation: O(1) average
 * - Total: O(n) linear time
 *
 * This is OPTIMAL - we must look at each element at least once!
 *
 * Space Complexity: O(n)
 * - Map stores up to n elements (worst case)
 * - If no solution found, map contains all elements
 * - Trade-off: use O(n) space to get O(n) time
 */
