/**
 * PROBLEM: Subarray Sum Equals K (Medium-Hard)
 * Category: Hash Map / Prefix Sum / Cumulative Sum
 *
 * Description:
 * Count how many continuous subarrays sum to exactly k.
 * A subarray is a contiguous part of the array.
 *
 * Example:
 * subarraySum([1, 2, 3, 4, 5], 9);
 * // Returns: 2
 * // Subarrays: [2,3,4] and [4,5]
 *
 * subarraySum([1, 1, 1], 2);
 * // Returns: 2
 * // Subarrays: [1,1] at index 0-1, and [1,1] at index 1-2
 *
 * subarraySum([1, -1, 0], 0);
 * // Returns: 3
 * // Subarrays: [-1, 1], [0], [-1, 1, 0]
 *
 * subarraySum([1, 2, 3], 7);
 * // Returns: 0
 *
 * Constraints:
 * - arr.length >= 0
 * - Array can contain negative numbers
 * - k can be any integer
 */

// ============================================================
// APPROACH 1: BRUTE FORCE (For Understanding)
// ============================================================

/**
 * ALGORITHM (Plain English):
 *
 * Try every possible subarray:
 * 1. For each starting position i
 * 2.   For each ending position j (where j >= i)
 * 3.     Calculate sum from i to j
 * 4.     If sum equals k, increment count
 * 5. Return count
 */

export function subarraySumBruteForce(nums: number[], k: number): number {
  if (nums.length === 0) {
    return 0;
  }

  let count = 0;

  // Try every starting position
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    // Try every ending position from i onwards
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]; // Add current element to sum

      if (sum === k) {
        count++; // Found a subarray!
      }
    }
  }

  return count;
}

/**
 * COMPLEXITY ANALYSIS - Brute Force:
 *
 * Time Complexity: O(n²)
 * - Outer loop: n iterations
 * - Inner loop: 1 + 2 + 3 + ... + n = n(n+1)/2 iterations
 * - Total: O(n²)
 *
 * Space Complexity: O(1)
 * - Only using a few variables
 *
 * Why it's too slow:
 * - For n=10,000: need ~50 million operations
 * - For large arrays, this times out
 * - Can we do better? YES! With prefix sums + HashMap
 */

// ============================================================
// APPROACH 2: PREFIX SUM + HASH MAP (OPTIMAL!)
// ============================================================

/**
 * THE KEY INSIGHT - Prefix Sum Technique
 *
 * What is a prefix sum?
 * - prefixSum[i] = sum of all elements from index 0 to i
 *
 * Example: [1, 2, 3, 4, 5]
 * prefixSum[0] = 1
 * prefixSum[1] = 1+2 = 3
 * prefixSum[2] = 1+2+3 = 6
 * prefixSum[3] = 1+2+3+4 = 10
 * prefixSum[4] = 1+2+3+4+5 = 15
 * How to get subarray sum?
 * Sum from index i to j = prefixSum[j] - prefixSum[i-1]
 *
 * Example: Sum from index 1 to 3 (elements [2,3,4])
 * = prefixSum[3] - prefixSum[0]
 * = 10 - 1
 * = 9 ✓
 *
 * THE MAGIC FORMULA:
 * If subarray from i+1 to j sums to k, then:
 *   prefixSum[j] - prefixSum[i] = k
 *
 * Rearranging:
 *   prefixSum[i] = prefixSum[j] - k
 *
 * So at position j, we ask:
 * "Have I seen prefix sum (currentSum - k) before?"
 * If yes, those positions form valid subarrays!
 */

/**
 * ALGORITHM (Plain English):
 *
 * Use HashMap to track prefix sums we've seen:
 *
 * 1. Create Map to store: prefixSum → count of occurrences
 * 2. Initialize: Map.set(0, 1)
 *    - This handles subarrays starting from index 0
 *    - "We've seen sum 0 once (before array starts)"
 *
 * 3. Initialize: prefixSum = 0, count = 0
 *
 * 4. For each element in array:
 *    a. Add element to prefixSum
 *    b. Check if (prefixSum - k) exists in Map
 *       - If yes: those positions create subarrays summing to k
 *       - Add the count of those occurrences to result
 *    c. Store current prefixSum in Map (increment count)
 *
 * 5. Return count
 */

export function subarraySum(nums: number[], k: number): number {
  if (nums.length === 0) {
    return 0;
  }
  let count = 0;
  let prefixSum = 0;

  const prefixMap = new Map<number, number>();
  prefixMap.set(0, 1);

  for (const num of nums) {
    prefixSum += num;
    if (prefixMap.has(prefixSum - k)) {
      count += prefixMap.get(prefixSum - k)!;
    }
    prefixMap.set(prefixSum, (prefixMap.get(prefixSum) || 0) + 1);
  }
  return count;
}

/**
 * COMPLEXITY ANALYSIS - Prefix Sum + HashMap:
Time Complexity: O(n)
- Single pass through array: n iterations
- Each Map operation (has, get, set): O(1) average
- Total: O(n) - OPTIMAL!

Space Complexity: O(n)
- Map stores up to n different prefix sums (worst case)
- Example: [1, 2, 3, 4, 5] has 6 unique prefix sums (including 0)
- Trade-off: use O(n) space to get O(n) time
Why this is optimal:
- Must look at each element at least once: Ω(n)
- We achieve exactly O(n)
- Can't do better than this!
*/
