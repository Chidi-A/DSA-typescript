/**
 * PROBLEM: Find Closest Dinosaur Age Match (Medium)
 * Category: Linear Search with Optimization
 *
 * Description:
 * The Dinosaur Dating Service needs to match dinosaurs with similar ages.
 * Find the dinosaur with the age closest to the target age, but exclude
 * a specific dinosaur by ID (can't match with yourself!).
 *
 * If multiple dinosaurs have the same distance from target age,
 * return the one with the smaller ID.
 *
 * Example:
 * const dinosaurs = [
 *   { id: 101, species: "T-Rex", age: 65000000 },
 *   { id: 205, species: "Stegosaurus", age: 150000000 },
 *   { id: 303, species: "Velociraptor", age: 75000000 },
 *   { id: 412, species: "Triceratops", age: 68000000 }
 * ];
 *
 * findClosestAgeMatch(dinosaurs, 70000000, 303);
 * // Target: 70M, Exclude: Velociraptor (75M)
 * // Distances: T-Rex (5M), Stego (80M), Tricera (2M)
 * // Returns: { id: 412, species: "Triceratops", age: 68000000 }
 *
 *
 * Constraints:
 * - dinosaurs.length >= 2
 * - Array is NOT sorted
 * - Must exclude the dinosaur with excludeId
 * - If excludeId doesn't exist, still search all dinosaurs
 * - All ages and IDs are positive integers
 * - There will always be at least one valid match after exclusion
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * CLOSEST MATCH ALGORITHM (Linear Search with Tracking)
 * 
 * Goal: Find the dinosaur whose age is closest to target, excluding one dino
 * 
 * Steps:
 * 
 * 1. INITIALIZE TRACKING VARIABLES
 *    - closestMatch = null (will store the best match found)
 *    - smallestDifference = Infinity (will track the smallest age difference)
 * 
 2. ITERATE THROUGH ALL DINOSAURS
 *    For each dinosaur:
 *    
 *    a. SKIP EXCLUDED DINOSAUR
 *       - If current dinosaur's id === excludeId, skip it (continue)
 *    
 *    b. CALCULATE AGE DIFFERENCE
 *       - difference = |dinosaur.age - targetAge|
 *       - Use absolute value (we only care about distance, not direction)
 *    
 *    c. CHECK IF THIS IS THE BEST MATCH SO FAR
 *       Two conditions for updating:
 *       
 *       Condition 1: SMALLER DIFFERENCE
 *       - If difference < smallestDifference
 *       - This is closer! Update both tracking variables
 *       
 *       Condition 2: TIE (same difference, smaller ID wins)
 *       - If difference === smallestDifference AND current id < closestMatch.id
 *       - This ensures consistent tiebreaker
 *    
 *    d. UPDATE IF CONDITIONS MET
 *       - smallestDifference = difference
 *       - closestMatch = current dinosaur
 * 
 * 3. RETURN RESULT
 *    - After checking all dinosaurs, return closestMatch
 * 
 */

// ============================================================================
// SOLUTION: CLOSEST MATCH (LINEAR SEARCH WITH TRACKING)
// ============================================================================

interface Dinosaur {
  id: number;
  species: string;
  age: number;
}

export function findClosestAgeMatch(
  dinosaurs: Dinosaur[],
  targetAge: number,

  excludeId: number
): Dinosaur | null {
  let closestMatch: Dinosaur | null = null;
  let smallestDifference = Infinity;

  for (let i = 0; i < dinosaurs.length; i++) {
    const current = dinosaurs[i];

    // Skip the excluded dinosaur
    if (current.id === excludeId) {
      continue;
    }

    // Calculate absolute age difference
    const difference = Math.abs(current.age - targetAge);

    // Update if this is closer, OR same distance but smaller ID
    if (
      difference < smallestDifference ||
      (difference === smallestDifference && current.id < closestMatch!.id)
    ) {
      smallestDifference = difference;
      closestMatch = current;
    }
  }

  return closestMatch;
}

// ============================================================================
// COMPLEXITY ANALYSIS
// ============================================================================

/**
 * DETAILED COMPLEXITY ANALYSIS
 *
 * UNSORTED ARRAY (Main Solution):
 *
 * Time Complexity: O(n) where n = number of dinosaurs
 * - Must examine every dinosaur
 * - Cannot skip any (array is unsorted)
 * - Each comparison is O(1)
 * - Total: n × O(1) = O(n)
 *
 * Space Complexity: O(1)
 * - closestMatch: O(1) - reference to existing object
 * - smallestDifference: O(1) - single number
 * - loop variable i: O(1)
 * - No arrays or additional structures created
 *
 */
