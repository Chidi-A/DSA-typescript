/**
 * PROBLEM: Sort Dinosaurs by Age (Medium)
 * Category: Selection Sort
 *
 * Description:
 * The Dinosaur Museum wants to display dinosaurs from youngest to oldest.
 * Implement Selection Sort to sort an array of dinosaur objects by their
 * age in ascending order.
 *
 * Selection Sort works by finding the minimum element in the unsorted
 * portion and placing it at the beginning.
 *
 * Example:
 * const dinosaurs = [
 *   { name: "Rex", age: 25 },
 *   { name: "Stego", age: 18 },
 *   { name: "Trike", age: 30 },
 *   { name: "Velo", age: 12 },
 *   { name: "Anky", age: 22 }
 * ];
 *
 * selectionSort(dinosaurs);
 * // Returns: [
 * //   { name: "Velo", age: 12 },
 * //   { name: "Stego", age: 18 },
 * //   { name: "Anky", age: 22 },
 * //   { name: "Rex", age: 25 },
 * //   { name: "Trike", age: 30 }
 * // ]
 *
 * Constraints:
 * - dinosaurs.length >= 0
 * - All ages are positive integers
 * - Return a new sorted array
 * - Preserve all object properties
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * SELECTION SORT ALGORITHM - Step by Step
 *
 * Concept: "Select" the minimum element and put it in position
 * Like picking the youngest dinosaur each time!
 *
 * How it works:
 *
 * 1. DIVIDE ARRAY INTO TWO PARTS
 *    - Left side: Sorted portion (starts empty)
 *    - Right side: Unsorted portion (starts with all elements)
 *
 * 2. FOR EACH POSITION (i from 0 to n-1)
 *    a. ASSUME current position has minimum
 *       minIndex = i
 *
 *    b. SEARCH remaining unsorted portion (j from i+1 to n)
 *       - Compare each element with current minimum
 *       - If found smaller element, update minIndex
 *
 *    c. SWAP minimum with current position
 *       - Place smallest unsorted element in its final position
 *       - Expand sorted portion by one
 *
 * 3. REPEAT
 *    - After each iteration, one more element is in final position
 *    - Sorted portion grows from left to right
 *    - Continue until entire array is sorted
 */

// ============================================================================
// SOLUTION: SELECTION SORT
// ============================================================================

interface Dinosaur {
  name: string;
  age: number;
}

export function sortDinosaursByAge(dinosaurs: Dinosaur[]): Dinosaur[] {
  // Edge case: empty array
  if (dinosaurs.length === 0) {
    return [];
  }

  // Create copy to avoid mutating original
  const sortedDinosaurs = [...dinosaurs];

  // For each position in the array
  for (let i = 0; i < sortedDinosaurs.length; i++) {
    // Assume current position has minimum age
    let minIndex = i;

    // Search remaining unsorted portion for smaller age
    for (let j = i + 1; j < sortedDinosaurs.length; j++) {
      if (sortedDinosaurs[j].age < sortedDinosaurs[minIndex].age) {
        minIndex = j; // Found smaller age, update minimum
      }
    }

    // Swap minimum with current position (if different)
    if (minIndex !== i) {
      const temp = sortedDinosaurs[i];
      sortedDinosaurs[i] = sortedDinosaurs[minIndex];
      sortedDinosaurs[minIndex] = temp;
    }
  }

  return sortedDinosaurs;
}

/**
 * DETAILED COMPLEXITY ANALYSIS
 *
 * TIME COMPLEXITY: O(n²) - ALL CASES
 *
 * Why always O(n²)?
 * - Outer loop: n iterations (i from 0 to n-1)
 * - Inner loop: decreases each time
 *   - i=0: (n-1) comparisons
 *   - i=1: (n-2) comparisons
 *   - i=2: (n-3) comparisons
 *   - ...
 *   - i=n-2: 1 comparison
 * - Total: (n-1) + (n-2) + ... + 1 = n(n-1)/2 = O(n²)
 *
 *
 * SPACE COMPLEXITY: O(1)
 * - Only uses constant extra space
 * - Variables: i, j, minIndex, temp
 * - No additional arrays or data structures
 * - In-place sorting algorithm
 *
 */
