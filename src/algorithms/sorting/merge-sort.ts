/**
 * PROBLEM: Sort Dinosaurs by Species Alphabetically (Medium-Hard)
 * Category: Merge Sort
 *
 * Description:
 * The Dinosaur Encyclopedia needs species names sorted alphabetically.
 * Implement Merge Sort to sort an array of dinosaur species names in
 * ascending alphabetical order.
 *
 * Merge Sort uses the divide-and-conquer approach: split the array in half,
 * recursively sort each half, then merge them back together.
 *
 * Example:
 * const species = [
 *   "Triceratops",
 *   "Allosaurus",
 *   "Stegosaurus",
 *   "Velociraptor",
 *   "Brachiosaurus",
 *   "Ankylosaurus"
 * ];
 *
 * mergeSort(species);
 * // Returns: [
 * //   "Allosaurus",
 * //   "Ankylosaurus",
 * //   "Brachiosaurus",
 * //   "Stegosaurus",
 * //   "Triceratops",
 * //   "Velociraptor"
 * // ]
 *
 * Constraints:
 * - species.length >= 0
 * - All species names are strings
 * - Sort case-insensitively (treat "Trex" same as "trex")
 * - Return a new sorted array
 */

/**
// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================
* ============================================================================
 * PART 1: MERGE SORT FUNCTION (Main Recursive Function)
 * ============================================================================
 * 
 * Algorithm Steps:
 * 
 * 1. BASE CASE (Stop Dividing)
 *    - If array has 0 or 1 element, it's already sorted!
 *    - Return the array as-is
 *    - This is where recursion stops
 * 
 * 2. DIVIDE (Split the Problem)
 *    - Find middle index: mid = length / 2
 *    - Split array into two halves:
 *      • Left half: elements from start to mid
 *      • Right half: elements from mid to end
 * 
 * 3. CONQUER (Recursive Sort)
 *    - Recursively sort left half
 *    - Recursively sort right half
 *    - Trust that recursion will sort them!
 * 
 * 4. COMBINE (Merge Sorted Halves)
 *    - Call merge() function to combine sorted halves
 *    - Return the merged result
 * 
 * ============================================================================
 * PART 2: MERGE FUNCTION (Combines Two Sorted Arrays)
 * ============================================================================
 * 
 * Purpose: Take two SORTED arrays and merge them into one sorted array
 * 
 * Algorithm Steps:
 * 
 * 1. CREATE EMPTY RESULT ARRAY
 *    - This will hold our merged sorted elements
 * 
 * 2. INITIALIZE TWO POINTERS
 *    - i = 0 (pointer for left array)
 *    - j = 0 (pointer for right array)
 * 
 * 3. COMPARE AND MERGE (Main Loop)
 *    While both arrays have elements remaining:
 *    
 *    a. COMPARE elements at current pointers
 *       - Compare left[i] with right[j]
 *       - Use case-insensitive comparison!
 *    
 *    b. ADD SMALLER ELEMENT to result
 *       - If left[i] is smaller:
 *         • Add left[i] to result
 *         • Move i forward (i++)
 *       - Else:
 *         • Add right[j] to result
 *         • Move j forward (j++)
 * 
 * 4. ADD REMAINING ELEMENTS
 *    - One array will run out first
 *    - Add all remaining elements from the other array
 *    - They're already sorted, so just concatenate!
 * 
 * 5. RETURN MERGED RESULT
 * 
 */

// ============================================================================
// SOLUTION: MERGE SORT
// ============================================================================

export function sortDinosaursBySpecies(species: string[]): string[] {
  if (species.length <= 1) {
    return species;
  }

  const mid = Math.floor(species.length / 2);
  const left = species.slice(0, mid);
  const right = species.slice(mid);

  return merge(sortDinosaursBySpecies(left), sortDinosaursBySpecies(right));
}

function merge(left: string[], right: string[]): string[] {
  const result: string[] = [];
  let i = 0;
  let j = 0;

  // Compare elements from both arrays
  while (i < left.length && j < right.length) {
    if (left[i].toLowerCase() < right[j].toLowerCase()) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}

// ============================================================================
// COMPLEXITY ANALYSIS
// ============================================================================

/**
 * DETAILED TIME COMPLEXITY ANALYSIS
 *
 * Why O(n log n)?
 *
 * 1. DIVIDING PHASE (log n levels)
 *    - Each level splits arrays in half
 *    - Level 0: 1 array of size n
 *    - Level 1: 2 arrays of size n/2
 *    - Level 2: 4 arrays of size n/4
 *    - Level 3: 8 arrays of size n/8
 *    - ...
 *    - Level k: n arrays of size 1 (base case)
 *
 *    How many levels? When do we reach size 1?
 *    - n / 2^k = 1
 *    - n = 2^k
 *    - k = log₂ n
 *    - Therefore: log n levels!
 *
 * 2. MERGING PHASE (O(n) per level)
 *    - At each level, we merge all elements
 *    - Level 0: merge n elements (from two n/2 arrays)
 *    - Level 1: merge n elements (from four n/4 arrays)
 *    - Level 2: merge n elements (from eight n/8 arrays)
 *    - Each level processes all n elements once
 *    - Cost per level: O(n)
 *
 * 3. TOTAL: O(n) work × log n levels = O(n log n)
 *
 * SPACE COMPLEXITY: O(n)
 *
 * Two sources of space usage:
 *
 * 1. Recursive call stack: O(log n)
 *    - Maximum depth = log n
 *    - Each call stores local variables
 *
 * 2. Temporary arrays: O(n)
 *    - merge() creates new arrays
 *    - At any time, temporary storage = O(n)
 *
 * Total: O(n) dominates O(log n)
 */
