/**
 * PROBLEM: Sort Dinosaurs by Weight (Easy)
 * Category: Bubble Sort
 *
 * Description:
 * The Dinosaur Zoo needs to arrange dinosaurs by weight for a parade.
 * Implement Bubble Sort to sort an array of dinosaur weights in ascending
 * order (lightest to heaviest).
 *
 * Bubble Sort works by repeatedly "bubbling" the largest unsorted element
 * to its correct position by comparing adjacent elements and swapping them
 * if they're in the wrong order.
 *
 * Example:
 * const weights = [850, 120, 450, 200, 680, 90];
 * bubbleSort(weights);
 * // Returns: [90, 120, 200, 450, 680, 850]
 *
 * Constraints:
 * - weights.length >= 0
 * - All weights are positive integers
 * - Return a new sorted array (don't modify original)
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * BUBBLE SORT ALGORITHM - Step by Step
 *
 * Analogy: Like bubbles rising to the surface!
 * The largest values "bubble up" to the end of the array.
 *
 * How it works:
 *
 * 1. START WITH UNSORTED ARRAY
 *    - Create a copy (don't modify original)
 *    - Example: [850, 120, 450, 200, 680, 90]
 *
 * 2. OUTER LOOP (i from 0 to n-1)
 *    - Makes n passes through the array
 *    - After each pass, one more element is in final position
 *    - Pass 1: Largest element moves to end
 *    - Pass 2: Second largest moves to second-to-last
 *    - Continue until all elements sorted
 *
 * 3. INNER LOOP (j from 0 to n-i-2)
 *    - Compare adjacent pairs: arr[j] and arr[j+1]
 *    - Why n-i-1? Because last i elements are already sorted!
 *
 * 4. COMPARE AND SWAP
 *    - If arr[j] > arr[j+1]: SWAP them
 *    - This moves larger elements toward the end
 *    - Smaller elements gradually move toward the beginning
 *
 * 5. REPEAT
 *    - After each complete pass, the largest unsorted element
 *      is in its final position
 *    - Continue until no more passes needed
 */

// ============================================================================
// SOLUTION: BUBBLE SORT
// ============================================================================

export function sortDinosaursByWeight(weights: number[]): number[] {
  // Edge case: empty array
  if (weights.length === 0) {
    return [];
  }

  // Create copy to avoid mutating original
  const sortedWeights = [...weights];

  // Outer loop: n passes
  for (let i = 0; i < sortedWeights.length; i++) {
    // Inner loop: compare adjacent elements
    // Stop at length-i-1 because last i elements are already sorted
    for (let j = 0; j < sortedWeights.length - i - 1; j++) {
      // If current element > next element, swap them
      if (sortedWeights[j] > sortedWeights[j + 1]) {
        // Traditional swap using temp variable
        const temp = sortedWeights[j];
        sortedWeights[j] = sortedWeights[j + 1];
        sortedWeights[j + 1] = temp;
      }
    }
  }
  return sortedWeights;
}

// ============================================================================
// COMPLEXITY ANALYSIS
// ============================================================================

/**
 * TIME COMPLEXITY:
 * - Outer loop: n iterations
 * - Inner loop: (n-1) + (n-2) + ... + 1 iterations
 * - Total comparisons: n(n-1)/2 = (n² - n)/2
 * - Simplified: O(n²)
 *
 * * All cases: O(n²)
 * - Best case: O(n²) - still does all comparisons
 * - Average case: O(n²)
 * - Worst case: O(n²) - reverse sorted
 *
 * SPACE COMPLEXITY:
 * - Only uses constant extra space
 * - temp/swap variables: O(1)
 * - Loop counters: O(1)
 * - Array copy is output, not counted as extra space
 *
 * NUMBER OF SWAPS:
 * - Best case: 0 swaps (already sorted)
 * - Average case: O(n²/2) swaps
 * - Worst case: O(n²) swaps (reverse sorted
 *
 * CHARACTERISTICS:
 * - Stable: Yes (equal elements maintain relative order)
 * - In-place: Yes (only uses O(1) extra space)
 * - Adaptive: Yes (with optimization, faster for nearly-sorted)
 * - Online: No (needs entire dataset)
 */
