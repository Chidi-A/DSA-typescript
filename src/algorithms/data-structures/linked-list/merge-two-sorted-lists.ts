/**
 * LINKED LIST TASK 4: Merge Two Sorted Lists (Easy-Medium)
 *
 * Problem:
 * You are given the heads of two sorted linked lists. Merge them into
 * one sorted list and return the head of the merged list.
 *
 * Examples:
 * List1: 1 → 3 → 5 → null
 * List2: 2 → 4 → 6 → null
 * Result: 1 → 2 → 3 → 4 → 5 → 6 → null
 *
 * List1: 1 → 2 → 4 → null
 * List2: 1 → 3 → 4 → null
 * Result: 1 → 1 → 2 → 3 → 4 → 4 → null
 *
 * Key Patterns:
 * 1. Dummy Node - Simplifies head handling
 * 2. Two Pointers - Compare and link smaller node
 * 3. Merge Pattern - Foundation for merge sort
 *
 * This is the fundamental merge operation used in many algorithms!
 */

import { ListNode } from './ListNode';

// ============================================================================
// APPROACH 1: ITERATIVE WITH DUMMY NODE (OPTIMAL!)
// ============================================================================

/**
 * Algorithm (Iterative - Two Pointers with Dummy Node):
 *
 * Key Insight:
 * - Both lists are already sorted
 * - At each step, pick the smaller of the two current nodes
 * - Use dummy node to avoid special-casing the head
 *
 * Why Dummy Node?
 * - Without dummy: Need to handle "which is the head?" separately
 * - With dummy: Head is always dummy.next, simplifies code!
 *
 * Steps:
 * 1. Create dummy node (placeholder for result list head)
 * 2. Create current pointer = dummy
 * 3. While both lists have nodes:
 *    - Compare list1.val and list2.val
 *    - Link smaller node to current.next
 *    - Move that list's pointer forward
 *    - Move current forward
 * 4. Attach remaining nodes (one list is exhausted)
 * 5. Return dummy.next (skip dummy, it's just a placeholder)
 *
 *
 * Visual Walkthrough:
 * List1: 1 → 3 → 5
 * List2: 2 → 4 → 6
 *
 * Initial:
 *   dummy → null
 *   current = dummy
 *   list1 → 1, list2 → 2
 *
 * Step 1: Compare 1 vs 2, pick 1
 *   dummy → 1
 *   current = 1
 *   list1 → 3, list2 → 2
 *
 * Step 2: Compare 3 vs 2, pick 2
 *   dummy → 1 → 2
 *   current = 2
 *   list1 → 3, list2 → 4
 *
 * Step 3: Compare 3 vs 4, pick 3
 *   dummy → 1 → 2 → 3
 *   current = 3
 *   list1 → 5, list2 → 4
 *
 * Step 4: Compare 5 vs 4, pick 4
 *   dummy → 1 → 2 → 3 → 4
 *   current = 4
 *   list1 → 5, list2 → 6
 *
 * Step 5: Compare 5 vs 6, pick 5
 *   dummy → 1 → 2 → 3 → 4 → 5
 *   current = 5
 *   list1 → null, list2 → 6
 *
 * Step 6: list1 is null, attach remaining list2
 *   dummy → 1 → 2 → 3 → 4 → 5 → 6
 *
 * Return: dummy.next = 1 → 2 → 3 → 4 → 5 → 6 ✓
 *
 * Complexity:
 * - Time: O(n + m) - visit each node exactly once
 * - Space: O(1) - only pointers, no new nodes created
 */

export function mergeTwoLists<T>(
  list1: ListNode<T> | null,
  list2: ListNode<T> | null,
): ListNode<T> | null {
  // Create dummy node to simplify head handling
  const dummy = new ListNode<T>(null as any);
  let current = dummy;

  // While both lists have nodes
  while (list1 !== null && list2 !== null) {
    if (list1.val < list2.val) {
      // Link list1's node
      current.next = list1;
      list1 = list1.next;
    } else {
      // Link list2's node (handles equality too)
      current.next = list2;
      list2 = list2.next;
    }
    // Move current forward
    current = current.next;
  }
  // Attach remaining nodes (at most one list has nodes left)
  current.next = list1 !== null ? list1 : list2;

  // Return actual head (skip dummy)
  return dummy.next;
}
