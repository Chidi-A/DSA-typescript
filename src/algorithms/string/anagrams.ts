/**
 * PROBLEM: Group Anagram Species (Medium)
 * Category: Hash Map / String Manipulation
 *
 * Description:
 * The Dinosaur Classification System needs to group species names that are
 * anagrams of each other (contain the same letters in different order).
 *
 * Write a function that takes an array of dinosaur names and returns an
 * array of arrays, where each inner array contains names that are anagrams.
 *
 * Example:
 * groupAnagrams(["listen", "silent", "enlist", "abc", "cab", "bca", "def"]);
 * // Returns: [
 * //   ["listen", "silent", "enlist"],
 * //   ["abc", "cab", "bca"],
 * //   ["def"]
 * // ]
 *
 * groupAnagrams(["a", "b", "c"]);
 * // Returns: [["a"], ["b"], ["c"]]
 *
 * groupAnagrams(["Ankylosaurus", "aAnklyosurus"]);
 * // Returns: [["Ankylosaurus", "aAnklyosurus"]]
 * // (case-insensitive)
 *
 * groupAnagrams([]);
 * // Returns: []
 *
 * Constraints:
 * - names.length >= 0
 * - Case-insensitive comparison
 * - Order of groups doesn't matter
 * - Order within groups doesn't matter
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================
/**
 * ALGORITHM STEPS:
 *
 * 1. CREATE A HASH MAP
 *    - Key: sorted characters (anagram signature)
 *    - Value: array of strings with that signature
 *
 * 2. FOR EACH NAME:
 *    a. NORMALIZE (convert to lowercase for case-insensitive)
 *       - "Listen" → "listen"
 *
 *    b. CREATE KEY (sort characters)
 *       - "listen" → split: ['l','i','s','t','e','n']
 *                 → sort: ['e','i','l','n','s','t']
 *                 → join: "eilnst"
 *
 *    c. ADD TO GROUP
 *       - If key doesn't exist in map: create new array
 *       - Add original name to array for this key
 *
 * 3. EXTRACT ALL GROUPS
 *    - Return all values from the map
 *    - Each value is an array of anagrams
 */

// ============================================================================
// SOLUTION 1: USING SORTED STRING AS KEY
// ============================================================================

/**
 * Group anagrams using sorted string as key
 *
 * Time Complexity: O(n * k log k)
 * - n = number of names
 * - k = average length of names
 * - For each name: sort k characters → O(k log k)
 * - Total: n × O(k log k) = O(n * k log k)
 *
 * Space Complexity: O(n * k)
 * - Store all n names
 * - Hash map with n entries
 * - Keys: O(n * k) total space
 *
 */

export function groupAnagramsWithMap(names: string[]): string[][] {
  if (names.length === 0) return [];

  const groups = new Map<string, string[]>();

  for (const name of names) {
    const key = name.toLowerCase().split('').sort().join('');

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(name);
  }

  return Array.from(groups.values());
}
