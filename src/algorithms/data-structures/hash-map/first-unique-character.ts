/**
 * PROBLEM: First Unique Character (Easy-Medium)
 * Category: Hash Map / Frequency Counting / Queue
 *
 * Description:
 * In a dinosaur name, find the first character that appears only once.
 * Return the first non-repeating character or null if all characters repeat.
 *
 * Example:
 * firstUnique("triceratops");
 * // Returns: "t"
 * // t appears once, it's first
 *
 * firstUnique("stegosaurus");
 * // Returns: "t"
 * // s:3, t:1, e:1, g:1... t is first unique
 *
 * firstUnique("aabbcc");
 * // Returns: null
 * // All characters repeat
 *
 * firstUnique("abcabc");
 * // Returns: null
 *
 * firstUnique("aabbccdde");
 * // Returns: "e"
 *
 * Constraints:
 * - name.length >= 0
 * - Case-sensitive
 * - Return first unique character
 * - Return null if none
 *
 * Why this problem is important:
 * - Teaches frequency counting with HashMap
 * - Shows importance of preserving order
 * - Demonstrates Queue + HashMap combination
 * - Common in streaming/real-time scenarios
 */

// ============================================================
// APPROACH 1: TWO-PASS (Classic & Most Intuitive)
// ============================================================

/**
 * ALGORITHM (Plain English):
 *
 * Pass 1: Count how many times each character appears
 * Pass 2: Find first character with count of 1
 *
 * 1. Create empty frequency Map
 * 2. First pass: iterate through string
 *    - For each character, increment its count in Map
 * 3. Second pass: iterate through string again (in order!)
 *    - For each character, check if count === 1
 *    - Return first character with count 1
 * 4. If no unique character found, return null
 */

export function firstUnique(name: string): string | null {
  if (name.length === 0) {
    return null;
  }
  const frequencyMap = new Map<string, number>();

  for (const char of name) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);
  }

  for (let i = 0; i < name.length; i++) {
    if (frequencyMap.get(name[i]) === 1) {
      return name[i];
    }
  }

  return null;
}

/**
 * COMPLEXITY ANALYSIS - Two-Pass:
 *
 * Time Complexity: O(n)
 * - First pass: O(n) to count all characters
 * - Second pass: O(n) to find first unique (worst case scan entire string)
 * - Total: O(n + n) = O(2n) = O(n)
 *
 * Note: We scan string twice, but it's still O(n), not O(n²)!
 *
 * Space Complexity: O(k)
 * - k = number of unique characters in string
 * - Map stores at most k entries
 * - In worst case: k = n (all different characters)
 * - For English alphabet: k ≤ 26 (constant)
 * - But for Unicode/general strings: O(n) worst case
 */

// ============================================================
// APPROACH 2: ONE-PASS WITH QUEUE (Advanced!)
// ============================================================

/**
 * ALGORITHM (Plain English):
 *
 * Key insight: Use Queue to track order + Map for frequencies
 *
 * 1. Create empty frequency Map and empty Queue
 * 2. For each character in string:
 *    a. Update frequency in Map
 *    b. If this is first occurrence (count === 1):
 *       - Add to back of queue
 *    c. Clean up front of queue:
 *       - While front character has count > 1, remove it
 *       - Queue always has only potentially unique chars at front
 * 3. After processing all characters:
 *    - Front of queue is first unique (or queue is empty)
 * 4. If no unique character found, return null
 */

export function firstUniqueQueue(name: string): string | null {
  if (name.length === 0) {
    return null;
  }
  const frequencyMap = new Map<string, number>();
  const queue: string[] = [];

  for (const char of name) {
    frequencyMap.set(char, (frequencyMap.get(char) || 0) + 1);

    if (frequencyMap.get(char) === 1) {
      queue.push(char);
    }

    while (queue.length > 0 && frequencyMap.get(queue[0])! > 1) {
      queue.shift();
    }
  }

  return queue.length > 0 ? queue[0] : null;
}

/**
 * COMPLEXITY ANALYSIS - One-Pass with Queue:
 *
 * Time Complexity: O(n)
 * - Single pass through string: O(n)
 * - Queue operations:
 *   - Each character added at most once: O(n) total
 *   - Each character removed at most once: O(n) total
 *   - queue.shift() is O(1) amortized
 * - Total: O(n)
 * Space Complexity: O(k)
 * - k = unique characters
 * - Map: O(k)
 * - Queue: O(k) at most (only unique candidates)
 * - Total: O(k)
 */
