/**
 * PROBLEM: Find K Most Frequent Dinosaurs (Medium)
 * Category: Hash Map / Frequency Counting / Bucket Sort
 *
 * Description:
 * The Dinosaur Census collected sighting data. Find the k most frequently
 * sighted dinosaur species.
 *
 * Example:
 * topKFrequent(["Rex", "Stego", "Rex", "Velo", "Rex", "Stego", "Anky"], 2);
 * // Returns: ["Rex", "Stego"]
 * // Rex: 3 times, Stego: 2 times, Velo: 1 time, Anky: 1 time
 *
 * topKFrequent([1, 1, 1, 2, 2, 3], 2);
 * // Returns: [1, 2]
 *
 * topKFrequent([1], 1);
 * // Returns: [1]
 *
 * Constraints:
 * - sightings.length >= 1
 * - 1 <= k <= number of unique elements
 * - If tie, return any of the tied elements
 * - Order of result doesn't matter
 */

/**
 * ALGORITHM (Plain English):
 *
 * 1. Count frequencies:
 *    - Create a Map to store each element and its count
 *    - Iterate through array, increment count for each element
 *
 * 2. Sort by frequency:
 *    - Convert Map to array of [element, frequency] pairs
 *    - Sort pairs by frequency in descending order
 *
 * 3. Extract top k:
 *    - Take first k pairs from sorted array
 *    - Extract just the elements (not frequencies)
 *    - Return as result array
 *
 */

export function topKFrequent<T>(sightings: T[], k: number): T[] {
  if (sightings.length === 0 || k <= 0) {
    return [];
  }

  const frequencyMap = new Map<T, number>();

  for (const sighting of sightings) {
    frequencyMap.set(sighting, (frequencyMap.get(sighting) || 0) + 1);
  }

  const sortedFrequencies = Array.from(frequencyMap.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  return sortedFrequencies.slice(0, k).map((entry) => entry[0]);
}

// ============================================================
// APPROACH 2: BUCKET SORT (OPTIMAL!)
// ============================================================
/**
 * ALGORITHM (Plain English):
 *
 * Key insight: Frequency is limited!
 * - Max frequency any element can have is n (all elements same)
 * - So frequencies range from 1 to n
 * - We can use frequency as index in bucket array
 *
 * 1. Count frequencies (same as before):
 *    - Build frequency map
 *
 * 2. Create buckets:
 *    - Create array of size n+1 (index 0 to n)
 *    - Each bucket[i] stores elements with frequency i
 *    - Put each element into its frequency bucket
 *
 * 3. Collect top k:
 *    - Start from highest frequency bucket (n) going down
 *    - Collect elements until we have k elements
 *    - Return result
 */

export function topKFrequentBucketSort<T>(sightings: T[], k: number): T[] {
  if (sightings.length === 0 || k <= 0) {
    return [];
  }

  const frequencyMap = new Map<T, number>();

  for (const sighting of sightings) {
    frequencyMap.set(sighting, (frequencyMap.get(sighting) || 0) + 1);
  }

  const buckets: T[][] = Array(sightings.length + 1)
    .fill(null)
    .map(() => []);

  for (const [species, frequency] of frequencyMap.entries()) {
    buckets[frequency].push(species);
  }

  const result: T[] = [];
  for (let freq = buckets.length - 1; freq >= 0 && result.length < k; freq--) {
    if (buckets[freq].length > 0) {
      result.push(...buckets[freq]);
    }
  }

  return result.slice(0, k);
}
