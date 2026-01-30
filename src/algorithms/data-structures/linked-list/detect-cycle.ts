/**
 * LINKED LIST TASK 3: Detect Cycle in Linked List (Easy-Medium)
 *
 * Problem:
 * Determine if a linked list has a cycle (a node that points back to a
 * previous node, creating an infinite loop).
 *
 * Examples:
 * Cycle: 1 → 2 → 3 → 4 → 5
 *                ↑_______↓
 *        (5 points back to 3)
 *
 * No Cycle: 1 → 2 → 3 → 4 → 5 → null
 *
 * Self-loop: 1 ⟲ (points to itself)
 *
 * Key Pattern: Floyd's Cycle Detection Algorithm (Tortoise and Hare)
 * - Same slow/fast pointer technique
 * - If there's a cycle, fast will eventually catch slow!
 * - Think: runners on a circular track - faster one laps slower one
 *
 * This is one of the most elegant algorithms in computer science!
 */

import { ListNode } from './ListNode';

// ============================================================================
// APPROACH 2: FLOYD'S CYCLE DETECTION (OPTIMAL!)
// ============================================================================

/**
 * Algorithm (Floyd's Cycle Detection - Slow/Fast Pointer):
 *
 * Key Insight:
 * - If there's a cycle, fast pointer will eventually catch slow pointer!
 * - Like two runners on a circular track - faster one will lap slower one
 *
 * Why it works:
 * - If no cycle: fast reaches null (list ends)
 * - If cycle exists: fast and slow both enter cycle
 *   - Fast gains 1 position per iteration (moves +2, slow moves +1)
 *   - Eventually fast catches slow (same as catching up on circular track)
 * * Steps:
 * 1. Initialize: slow = head, fast = head
 * 2. While fast and fast.next are not null:
 *    - Move slow 1 step: slow = slow.next
 *    - Move fast 2 steps: fast = fast.next.next
 *    - If slow === fast → cycle detected!
 * 3. If loop exits (fast reached null) → no cycle
 *
 * Complexity:
 * - Time: O(n) - worst case: visit each node, then loop C times in cycle
 * - Space: O(1) - only 2 pointers! 🎯
 */

export function hasCycle<T>(head: ListNode<T> | null): boolean {
  if (head === null || head.next === null) {
    return false;
  }

  let slow = head;
  let fast = head;

  // Move pointers until they meet or fast reaches end
  while (fast !== null && fast.next !== null) {
    slow = slow.next!;
    fast = fast.next!.next!;

    // If pointers meet, there's a cycle
    if (slow === fast) {
      return true;
    }
  }

  // Fast reached null → no cycle
  return false;
}
