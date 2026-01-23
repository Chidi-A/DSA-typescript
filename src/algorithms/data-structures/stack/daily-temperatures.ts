/**
 * PROBLEM: Daily Temperatures (Medium-Hard)
 * Category: Stack / Monotonic Stack / Next Greater Element
 *
 * Description:
 * Given daily temperatures, for each day, determine how many days
 * until a warmer temperature. If no warmer day exists, use 0.
 *
 * Example:
 * dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]);
 * // Returns: [1, 1, 4, 2, 1, 1, 0, 0]
 *
 * Breakdown:
 * Day 0 (73°): next warmer is day 1 (74°) → wait 1 day
 * Day 1 (74°): next warmer is day 2 (75°) → wait 1 day
 * Day 2 (75°): next warmer is day 6 (76°) → wait 4 days
 * Day 3 (71°): next warmer is day 5 (72°) → wait 2 days
 * Day 4 (69°): next warmer is day 5 (72°) → wait 1 day
 * Day 5 (72°): next warmer is day 6 (76°) → wait 1 day
 * Day 6 (76°): no warmer day → 0
 * Day 7 (73°): no warmer day → 0
 *
 * dailyTemperatures([30, 40, 50, 60]);
 * // Returns: [1, 1, 1, 0]
 * // Each day is warmer than previous
 * dailyTemperatures([60, 50, 40, 30]);
 * // Returns: [0, 0, 0, 0]
 * // Never gets warmer (decreasing)
 *
 * Constraints:
 * - temps.length >= 1
 * - Temperatures are integers
 * - 30 <= temps[i] <= 100
 *
 * Why this problem is HARD:
 * - Requires understanding monotonic stack
 * - Non-obvious optimization
 * - Classic "next greater element" pattern
 * - Foundation for many harder problems
 */

/**
 * ALGORITHM (Plain English):
 *
 * Use stack to track indices of days waiting for warmer temperature:
 *
 * 1. Create empty stack (stores indices)
 * 2. Create result array filled with 0s
 *
 * 3. For each day i (temperature temps[i]):
 *
 *    a. WHILE stack is not empty AND
 *       current temp > temp at stack top:
 *
 *       - Pop index from stack (this day found its warmer day!)
 *       - Calculate wait: i - poppedIndex
 *       - Store in result[poppedIndex]
 *
 *    b. Push current index i onto stack
 *       (this day is waiting for its warmer day)
 *
 * 4. Days still in stack have no warmer day (already 0)
 * 5. Return result
 */

export function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[] = [];

  const result = new Array(temperatures.length).fill(0);

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const index = stack.pop()!;
      result[index] = i - index;
    }

    stack.push(i);
  }
  return result;
}

/**
 * COMPLEXITY ANALYSIS - Monotonic Stack:
 *
 * Time Complexity: O(n)
 * - Each element pushed onto stack ONCE: O(n)
 * - Each element popped from stack ONCE: O(n)
 * - Total: O(n + n) = O(2n) = O(n)
 *
 * Key insight: Even though there's a while loop inside for loop,
 * each index is processed at most twice (one push, one pop).
 * This is amortized O(1) per element!
 *
 * Space Complexity: O(n)
 * - Stack can have at most n elements
 * - Worst case: decreasing temperatures (all indices on stack)
 * - Example: [60, 50, 40, 30] → stack = [0, 1, 2, 3]
 *
 */
