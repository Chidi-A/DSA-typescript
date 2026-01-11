/**
 * PROBLEM: Find Dinosaur by Species (Easy)
 * Category: Linear Search
 *
 * Description:
 * The Dinosaur Museum has a list of dinosaurs with their species names and ID numbers.
 * Write a function that searches for a dinosaur by its ID and returns the dinosaur object.
 * If not found, return null.
 *
 * Example:
 * const dinosaurs = [
 *   { id: 101, species: "T-Rex", age: 65000000 },
 *   { id: 205, species: "Stegosaurus", age: 150000000 },
 *   { id: 303, species: "Velociraptor", age: 75000000 },
 *   { id: 412, species: "Triceratops", age: 68000000 }
 * ];
 *
 * findDinosaurById(dinosaurs, 303);
 * // Returns: { id: 303, species: "Velociraptor", age: 75000000 }
 *
 * findDinosaurById(dinosaurs, 999);
 * // Returns: null
 *
 * Constraints:
 * - dinosaurs.length >= 0
 * - IDs are unique but NOT sorted
 * - All IDs are positive integers
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * Algorithm Steps:
 *
 * 1. VALIDATE INPUT
 *    - Check if the dinosaurs array is empty
 *    - If empty, return null immediately (no dinosaurs to search)
 *
 * 2. ITERATE THROUGH ARRAY
 *    - Start at the first dinosaur (index 0)
 *    - Look at each dinosaur one by one
 *
 * 3. CHECK EACH DINOSAUR
 *    - Compare the current dinosaur's ID with the target ID
 *    - If they match, we found it!
 *
 * 4. RETURN RESULT
 *    - If match found: return the entire dinosaur object
 *    - If we reach the end without finding it: return null
 *
 * Why this works:
 * - We check every element sequentially (Linear Search)
 * - IDs are NOT sorted, so we can't use Binary Search
 * - We stop as soon as we find a match (early exit optimization)
 */

// ============================================================================
// SOLUTION: LINEAR SEARCH
// ============================================================================

interface Dinosaur {
  id: number;
  species: string;
  age: number;
}

export function findDinosaurById(
  dinosaurs: Dinosaur[],
  targetId: number
): Dinosaur | null {
  if (dinosaurs.length === 0) {
    return null;
  }

  for (let i = 0; i < dinosaurs.length; i++) {
    if (dinosaurs[i].id === targetId) {
      return dinosaurs[i];
    }
  }

  return null;
}

// ============================================================================
// COMPLEXITY ANALYSIS
// ============================================================================

/**
 * DETAILED COMPLEXITY ANALYSIS
 *
 * Time Complexity: O(n) where n = number of dinosaurs
 *
 * Breakdown:
 * - Empty check: O(1)
 * - Loop: O(n) in worst case
 *   - Best case: O(1) - target is first element
 *   - Average case: O(n/2) ≈ O(n) - target in middle
 *   - Worst case: O(n) - target at end or doesn't exist
 *
 * Space Complexity: O(1)
 *
 * Breakdown:
 * - Loop variable i: O(1)
 * - No additional arrays or objects created
 * - Return value is a reference to existing object: O(1)
 *
 * Why not faster?
 * - IDs are NOT sorted, so we can't use Binary Search O(log n)
 * - Must check each element sequentially
 * - Could use a HashMap for O(1) lookup, but requires O(n) space
 *
 * Alternative approaches:
 * 1. Sort + Binary Search: O(n log n) sort + O(log n) search
 *    - Only worth it for multiple searches
 * 2. Hash Map: O(n) to build + O(1) per lookup
 *    - Good for multiple searches, but O(n) space
 */
