/**
 * PROBLEM: Remove Duplicates from Unsorted Array
 * Category: Hash Set / Two Pointers
 *
 * Description:
 * A dinosaur tracking system has duplicate IDs due to a bug. The array is NOT sorted.
 * Write a function that removes duplicates in-place and returns the new length.
 *
 * Important: Modify the original array and return the count of unique elements.
 * Order of unique elements doesn't need to match original.
 *
 * Example:
 * const arr = [4, 2, 5, 2, 1, 4, 3];
 * const newLength = removeDuplicates(arr);
 * // Returns: 5
 * // arr is now: [4, 2, 5, 1, 3, ...]
 * // (first 5 elements are unique, rest don't matter)
 *
 * Constraints:
 * - arr.length >= 0
 * - Array is NOT sorted
 * - Modify the original array
 * - Return count of unique elements
 * - O(n) time, O(n) space allowed (for Set)
 */

// ============================================================
// APPROACH 1: HASH SET + TWO POINTERS (OPTIMAL FOR UNSORTED)
// ============================================================
/**
 * ALGORITHM (Plain English):
 *
 * Since array is unsorted, we need to track what we've seen:
 * 1. Use a Set to track unique elements seen so far
 * 2. Use two pointers: slow (write position) and fast (read position)
 * 3. Both start at index 0
 * 4. For each element at fast:
 *    - If not seen before: add to Set, write to slow position, increment slow
 *    - If seen before: skip it (just increment fast)
 * 5. Return slow (number of unique elements written)
 */

export function removeDuplicatesUnsorted(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }

  const seen = new Set<number>();
  let slow = 0;

  for (let fast = 0; fast < arr.length; fast++) {
    if (!seen.has(arr[fast])) {
      seen.add(arr[fast]);
      arr[slow] = arr[fast];
      slow++;
    }
  }

  return slow;
}

/**
 * COMPLEXITY ANALYSIS:
 *
 * Time Complexity: O(n)
 * - Single pass through array
 * - Set.has() and Set.add() are O(1) average
 * - Each element processed exactly once
 *
 * Space Complexity: O(n)
 * - Set stores up to n unique elements in worst case
 * - If all elements are unique, Set contains all n elements
 * - Trade-off: we use extra space to achieve O(n) time
 *
 * Why we need Set for unsorted:
 * - Unlike sorted arrays, duplicates can be anywhere
 * - We can't just compare with previous element
 * - Need to track ALL elements seen so far
 */

// ============================================================
// APPROACH 2: SORT FIRST (Alternative)
// ============================================================
/**
 * ALGORITHM (Plain English):
 *
 * Convert unsorted to sorted problem:
 * 1. Sort the array first: O(n log n)
 * 2. Use the two-pointer technique from sorted version: O(n)
 * 3. Total: O(n log n) time, O(1) space (if in-place sort)
 *
 * Trade-off:
 * - Approach 1 (Set): O(n) time, O(n) space
 * - Approach 2 (Sort): O(n log n) time, O(1) space
 *
 * When to use which:
 * - If speed is critical: Use Set approach (faster)
 * - If memory is limited: Use sort approach (less space)
 * - For small arrays: Both are fine
 * - For large arrays: Set is usually better (modern systems have plenty of RAM)
 */

export function removeDuplicatesUnsortedViaSorting(arr: number[]): number {
  if (arr.length === 0) {
    return 0;
  }
  arr.sort((a, b) => a - b);

  let slow = 0;
  for (let fast = 1; fast < arr.length; fast++) {
    if (arr[fast] !== arr[slow]) {
      slow++;
      arr[slow] = arr[fast];
    }
  }

  return slow + 1;
}
