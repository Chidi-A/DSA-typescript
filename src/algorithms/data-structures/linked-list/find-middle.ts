/**
 * LINKED LIST TASK 2: Find Middle of Linked List (Easy)
 *
 * Problem:
 * Find the middle node of a linked list. If there are two middle nodes
 * (even length), return the second one.
 *
 * Examples:
 * Odd length:  1 → 2 → 3 → 4 → 5 → null  →  middle = 3 (index 2)
 * Even length: 1 → 2 → 3 → 4 → 5 → 6 → null  →  middle = 4 (index 3, second middle)
 *
 * Key Pattern: Floyd's Tortoise and Hare (Slow/Fast Pointer)
 * - Slow pointer moves 1 step at a time
 * - Fast pointer moves 2 steps at a time
 * - When fast reaches the end, slow is at the middle!
 *
 * This is one of the most elegant linked list algorithms.
 * Master this pattern - it's used in many problems!
 */

import { ListNode } from './ListNode';

// ============================================================================
// APPROACH 1: SLOW/FAST POINTER (OPTIMAL!)
// ============================================================================

/**
 * Algorithm (Slow/Fast Pointer - Floyd's Tortoise and Hare):
 *
 *  Key Insight:
 * - If fast moves 2x speed of slow, when fast reaches end,
 *   slow will be at middle!
 * - Think of a race: when fast finishes 2 laps, slow finishes 1 lap (halfway)
 *
 * Steps:
 * 1. Initialize two pointers: slow = head, fast = head
 * 2. While fast and fast.next are not null:
 *    - Move slow one step: slow = slow.next
 *    - Move fast two steps: fast = fast.next.next
 * 3. Return slow (it's now at the middle)
 *
 * Why it works:
 * - For odd length n: fast moves n//2 times, slow at index n//2 (exact middle)
 * - For even length n: fast moves n//2 times, slow at index n//2 (second middle)
 *
 * Visual Walkthrough (list: 1 → 2 → 3 → 4 → 5):
 *
 * Initial:
 *   slow → 1 → 2 → 3 → 4 → 5 → null
 *   fast → 1 → 2 → 3 → 4 → 5 → null
 *
 * Step 1:
 *   slow moves 1: slow → 2
 *   fast moves 2: fast → 3
 *        1 → 2 → 3 → 4 → 5 → null
 *           slow    fast
 *
 * Step 2:
 *   slow moves 1: slow → 3
 *   fast moves 2: fast → 5
 *        1 → 2 → 3 → 4 → 5 → null
 *                slow        fast
 *
 * Step 3:
 *   fast.next is null, loop exits
 *   Return slow = 3 ✓ (middle!)
 *
 * Complexity:
 * - Time: O(n/2) = O(n) - fast traverses entire list in n/2 steps
 * - Space: O(1) - only 2 pointers
 */

export function findMiddle<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Edge case: empty list
  if (head === null) {
    return null;
  }

  let slow = head;
  let fast = head;

  // Move fast 2x speed of slow
  // Stop when fast can't move 2 more steps
  while (fast !== null && fast.next !== null) {
    slow = slow.next!;
    fast = fast.next!.next!;
  }

  // slow is now at the middle
  return slow;
}
