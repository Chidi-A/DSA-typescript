/**
 * PROBLEM: Find Dinosaur by Age (Medium)
 * Category: Binary Search
 *
 * Description:
 * The Dinosaur Research Lab maintains a sorted database of dinosaurs by their age
 * (in years, oldest first). Write a function that efficiently searches for a dinosaur
 * with the exact age. Return the dinosaur object if found, or null if not found.
 *
 * Challenge: Implement this as efficiently as possible given that the array is sorted!
 *
 * Example:
 * const dinosaurs = [
 *   { species: "Stegosaurus", age: 150000000 },
 *   { species: "Velociraptor", age: 75000000 },
 *   { species: "Triceratops", age: 68000000 },
 *   { species: "T-Rex", age: 65000000 },
 *   { species: "Ankylosaurus", age: 65000000 }  // Same age possible
 * ];
 *
 * findDinosaurByAge(dinosaurs, 68000000);
 * // Returns: { species: "Triceratops", age: 68000000 }
 *
 * findDinosaurByAge(dinosaurs, 70000000);
 * // Returns: null (no exact match)
 *
 * Constraints:
 * - dinosaurs.length >= 0
 * - Array is sorted by age in DESCENDING order (oldest → youngest)
 * - Ages can have duplicates (return first match)
 * - All ages are positive integers
 *
 * Key Insight: SORTED DATA = USE BINARY SEARCH! 🎯
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * BINARY SEARCH ALGORITHM (for Descending Order)
 * 
 * Why Binary Search?
 * - The array is SORTED by age (oldest → youngest)
 * - We can eliminate half the search space each step
 * - This makes it O(log n) instead of O(n)!
 * 
 * How it works:
 * 
 * 1. SET UP POINTERS
 *    - Left pointer at start (index 0) - oldest dinosaurs
 *    - Right pointer at end (last index) - youngest dinosaurs
 * 
 * 2. WHILE left ≤ right (still have elements to check)
 *    a. Calculate middle index: mid = (left + right) / 2
 *    b. Compare dinosaurs[mid].age with target age
 *    
 *    c. THREE CASES:
 *       - If ages match: Found it! Return dinosaur
 *       - If mid age > target: Target is to the RIGHT (younger)
 *         → Move left pointer: left = mid + 1
 *       - If mid age < target: Target is to the LEFT (older)
 *         → Move right pointer: right = mid - 1
 
*/

// ============================================================================
// SOLUTION: BINARY SEARCH (OPTIMAL)
// ============================================================================

interface Dinosaur {
  species: string;
  age: number;
}

export function findDinosaurByAge(
  dinosaurs: Dinosaur[],
  targetAge: number
): Dinosaur | null {
  if (dinosaurs.length === 0) {
    return null;
  }

  let left = 0;
  let right = dinosaurs.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midAge = dinosaurs[mid].age;

    if (midAge === targetAge) {
      return dinosaurs[mid];
    }

    if (midAge > targetAge) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return null;
}

// ============================================================================
// COMPLEXITY ANALYSIS SUMMARY
// ============================================================================

/**
 * TIME COMPLEXITY: O(log n)
 * 
 * Why logarithmic?
 * - Each comparison eliminates half the remaining elements
 * - After k comparisons, we have n / 2^k elements left
 * - We stop when n / 2^k = 1
 * - Solving: 2^k = n → k = log₂ n
 * 
 * SPACE COMPLEXITY: O(1)
 * 
 * Iterative version:
 * - Only uses 3 variables: left, right, mid
 * - No additional arrays or data structures
 * - Constant space regardless of input size
 
*/
