/**
 * PROBLEM: Rotate Dinosaur Formation (Easy)
 * Category: Array Manipulation / Rotation
 *
 * Description:
 * The dinosaurs are standing in a line for a parade. They need to rotate
 * their formation by k positions to the right.
 *
 * Example:
 * rotateArray(["Rex", "Stego", "Trike", "Velo", "Anky"], 2);
 * // Returns: ["Velo", "Anky", "Rex", "Stego", "Trike"]
 * // Move last 2 to front
 *
 * rotateArray([1, 2, 3, 4, 5], 1);
 * // Returns: [5, 1, 2, 3, 4]
 *
 * rotateArray([1, 2, 3], 5);
 * // Returns: [2, 3, 1]
 * // k=5 is same as k=2 (5 % 3 = 2)
 *
 * rotateArray([1], 100);
 * // Returns: [1]
 * // Single element stays same
 *
 * Constraints:
 * - dinosaurs.length >= 0
 * - k >= 0
 * - k might be larger than array length
 * - Don't modify original array
 */

// ============================================================================
// METHOD 1: SLICE AND CONCATENATE
// ============================================================================

/**
 * Rotate array using slice and concat
 *
 * Time Complexity: O(n) where n = array length
 * - slice(-k): O(k)
 * - slice(0, -k): O(n - k)
 * - concat: O(n)
 * - Total: O(n)
 *
 * Space Complexity: O(n)
 * - Creates two new arrays from slicing
 * - Creates final concatenated array
 * - Total: O(n) extra space
 *
 */

export function rotateArray<T>(dinosaurs: T[], k: number): T[] {
  if (dinosaurs.length === 0 || k === 0) {
    return dinosaurs.slice();
  }

  k = k % dinosaurs.length;

  if (k === 0) {
    return dinosaurs.slice();
  }

  return dinosaurs.slice(-k).concat(dinosaurs.slice(0, -k));
}

// ============================================================================
// METHOD 2: TRIPLE REVERSE (OPTIMAL!)
// ============================================================================

/**
 * Rotate array using triple reverse (MOST EFFICIENT!)
 *
 * Time Complexity: O(n)
 * - Three reverse operations
 * - Each reverse: O(n/2) ≈ O(n)
 * - Total: 3 × O(n) = O(n)
 *
 * Space Complexity: O(1) if done in-place, O(n) for new array
 * - Can reverse in-place with only O(1) extra space!
 * - Here we create copy first to not modify original
 * - If modification allowed: TRUE O(1) space!
 *
 * This is the BEST algorithm for in-place rotation!
 *
 */

export function rotateArrayTripleReverse<T>(dinosaurs: T[], k: number): T[] {
  if (dinosaurs.length === 0) {
    return [];
  }

  k = k % dinosaurs.length;

  if (k === 0) {
    return dinosaurs.slice();
  }

  const result = [...dinosaurs];

  function reverseInPlace(arr: T[], start: number, end: number): void {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  reverseInPlace(result, 0, result.length - 1);

  reverseInPlace(result, 0, k - 1);

  reverseInPlace(result, k, result.length - 1);

  return result;
}
