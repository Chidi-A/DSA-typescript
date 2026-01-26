/**
 * PROBLEM: Sliding Window Maximum (Hard)
 *
 * Problem:
 * Given an array and window size k, find the maximum element in each
 * sliding window as it moves from left to right.
 *
 * Example:
 * nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
 *
 * Windows:
 * [1  3  -1] -3  5  3  6  7  → max = 3
 *  1 [3  -1  -3] 5  3  6  7  → max = 3
 *  1  3 [-1  -3  5] 3  6  7  → max = 5
 *  1  3  -1 [-3  5  3] 6  7  → max = 5
 *  1  3  -1  -3 [5  3  6] 7  → max = 6
 *  1  3  -1  -3  5 [3  6  7] → max = 7
 *
 * Result: [3, 3, 5, 5, 6, 7]
 *
 * Pattern: Monotonic Decreasing Deque
 * Similar to monotonic stack but needs removal from both ends!
 */

// ============================================================================
// DEQUE IMPLEMENTATION
// ============================================================================

/**
 * Deque (Double-Ended Queue)
 * Supports O(1) operations at both ends:
 * - Add/remove from front
 * - Add/remove from back
 */

class Deque<T> {
  private items: T[] = [];

  /**
   * Add element to the back - O(1)
   */
  pushBack(item: T): void {
    this.items.push(item);
  }

  /**
   * Add element to the front - O(1) amortized
   */
  pushFront(item: T): void {
    this.items.unshift(item);
  }

  /**
   * Remove element from the back - O(1)
   */
  popBack(): T | undefined {
    return this.items.pop();
  }

  /**
   * Remove element from the front - O(1) amortized
   */
  popFront(): T | undefined {
    return this.items.shift();
  }

  /**
   * Peek at front element - O(1)
   */
  front(): T | undefined {
    return this.items[0];
  }

  /**
   * Peek at back element - O(1)
   */
  back(): T | undefined {
    return this.items[this.items.length - 1];
  }

  /**
   * Check if empty - O(1)
   */
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * Get size - O(1)
   */
  size(): number {
    return this.items.length;
  }

  /**
   * Get all items (for debugging)
   */
  toArray(): T[] {
    return [...this.items];
  }
}

// ============================================================================
// APPROACH 1: BRUTE FORCE
// ============================================================================

/**
 * Algorithm (Brute Force):
 *
 * For each window position:
 * 1. Look at k elements in current window
 * 2. Find maximum among those k elements
 * 3. Add maximum to result
 *
 * Complexity:
 * - Time: O(n × k) - for each of n-k+1 windows, scan k elements
 * - Space: O(1) - no extra space besides result array
 *
 * Problems:
 * - Recalculates max for each window
 * - Doesn't reuse information from previous window
 * - Too slow for large inputs
 */

export function maxSlidingWindowBruteForce(
  nums: number[],
  k: number,
): number[] {
  if (nums.length === 0 || k === 0) {
    return [];
  }

  if (k === 1) {
    return [...nums];
  }

  const result: number[] = [];

  // For each window starting position
  for (let i = 0; i <= nums.length - k; i++) {
    // Find max in current window [i, i+k)
    let maxInWindow = nums[i];

    for (let j = i; j < i + k; j++) {
      maxInWindow = Math.max(maxInWindow, nums[j]);
    }

    result.push(maxInWindow);
  }

  return result;
}

// ============================================================================
// APPROACH 2: MONOTONIC DECREASING DEQUE (OPTIMAL!)
// ============================================================================

/**
 * Algorithm (Monotonic Deque):
 *
 * Key Insight:
 * - Maintain a deque of indices in DECREASING order of their values
 * - Front of deque = index of maximum element in current window
 * - Remove indices outside current window from front
 * - Remove indices with smaller values from back (they can never be max)
 *
 * Steps for each element at index i:
 *
 * 1. REMOVE OUT-OF-WINDOW INDICES (from front):
 *    - While deque.front() < i - k + 1:
 *      - popFront() (index is outside window)
 *
 * 2. MAINTAIN DECREASING ORDER (from back):
 *    - While nums[deque.back()] < nums[i]:
 *      - popBack() (smaller elements can't be max anymore)
 *
 * 3. ADD CURRENT INDEX:
 *    - pushBack(i)
 *
 * 4. RECORD MAXIMUM (when window is full):
 *    - If i >= k - 1:
 *      - result.push(nums[deque.front()])
 *
 * Why this works:
 * - Deque stores indices in decreasing order of values
 * - When we see a larger value, all smaller values to its left
 *   can NEVER be the maximum (they're both smaller AND will
 *   leave the window earlier)
 * - Front always has the maximum for current window
 *
 * Complexity:
 * - Time: O(n) - each element added/removed at most once
 * - Space: O(k) - deque stores at most k indices
 */

export function maxSlidingWindow(nums: number[], k: number): number[] {
  if (nums.length === 0 || k === 0) {
    return [];
  }

  if (k === 1) {
    return [...nums];
  }

  const deque = new Deque<number>(); // Stores indices
  const result: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // 1. Remove indices outside current window [i-k+1, i]
    while (!deque.isEmpty() && deque.front()! < i - k + 1) {
      deque.popFront();
    }

    // 2. Remove indices with smaller values than current
    //    (they can never be maximum)
    while (!deque.isEmpty() && nums[deque.back()!] < nums[i]) {
      deque.popBack();
    }

    // 3. Add current index
    deque.pushBack(i);

    // 4. If window is fully formed, record maximum
    if (i >= k - 1) {
      result.push(nums[deque.front()!]);
    }
  }

  return result;
}

// ============================================================================
// COMPLEXITY ANALYSIS
// ============================================================================

/**
 * COMPLEXITY COMPARISON:
 *
 * Brute Force:
 * ┌──────────────┬────────────┬────────────┬─────────────────────┐
 * │   Approach   │    Time    │   Space    │       Notes         │
 * ├──────────────┼────────────┼────────────┼─────────────────────┤
 * │ Brute Force  │  O(n × k)  │    O(1)    │ Recalc each window  │
 * │              │            │            │ Simple but slow     │
 * └──────────────┴────────────┴────────────┴─────────────────────┘
 *
 * Optimal (Deque):
 * ┌──────────────┬────────────┬────────────┬─────────────────────┐
 * │   Approach   │    Time    │   Space    │       Notes         │
 * ├──────────────┼────────────┼────────────┼─────────────────────┤
 * │ Monotonic    │    O(n)    │    O(k)    │ Each element        │
 * │ Deque        │            │            │ added/removed once  │
 * └──────────────┴────────────┴────────────┴─────────────────────┘
 *
 * Why Deque is optimal:
 * - Each element is added/removed at most once
 * - No repeated calculations within a window
 * - No need to sort indices (maintain order in deque)
 * - Simple, O(1) operations at both ends
 *
 * Conclusion:
 * - Deque is optimal for this problem
 * - Simple, efficient, and easy to understand
 *
 * Time Complexity: O(n) - each element added/removed at most once
 * Space Complexity: O(k) - deque stores at most k indices
 */
