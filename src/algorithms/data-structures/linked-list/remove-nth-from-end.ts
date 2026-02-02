/**
 * LINKED LIST TASK 5: Remove Nth Node From End (Medium)
 *
 * Problem:
 * Given the head of a linked list, remove the nth node from the END
 * of the list and return the new head.
 *
 * Examples:
 * Input:  1 → 2 → 3 → 4 → 5, n = 2
 * Output: 1 → 2 → 3 → 5 (removed 4, which is 2nd from end)
 *
 * Input:  1 → 2, n = 2
 * Output: 2 (removed 1, which is head)
 *
 * Input:  1, n = 1
 * Output: null (removed only node)
 *
 * Key Pattern: Two Pointers with Gap
 * - Maintain n-node gap between fast and slow pointers
 * - When fast reaches end, slow is at node BEFORE target
 * - Can solve in ONE PASS without counting length!
 *
 * Challenge: "From the end" makes this tricky without knowing length
 * Solution: The gap technique!
 */

import { ListNode } from './ListNode';

// ============================================================================
// APPROACH 1: TWO-POINTER WITH GAP (OPTIMAL!)
// ============================================================================

/**
 * Algorithm (Two-Pointer One-Pass with Gap):
 * Key Insight:
 * - If we maintain n-node gap between two pointers
 * - When front pointer reaches end, back pointer is at (length - n)
 * - That's exactly n nodes from the end!
 * Why This Works:
 * - List length = L
 * - Nth from end = position (L - n) from start
 * - If fast is n nodes ahead of slow
 * - When fast reaches position L, slow is at position (L - n)!
 *
 *  Steps:
 * 1. Use dummy node (simplifies removing head)
 * 2. Initialize slow = dummy, fast = dummy
 * 3. Move fast n+1 steps ahead (to create n-node gap to node BEFORE target)
 * 4. If fast becomes null, we're removing head (special case)
 * 5. Move both pointers until fast reaches end
 * 6. Now slow is at node BEFORE the target
 * 7. Remove target: slow.next = slow.next.next
 * 8. Return dummy.next
 *
 * Visual Walkthrough (list: 1→2→3→4→5, n=2, remove 4):
 *
 * Step 1: Create dummy, set both pointers
 *   dummy → 1 → 2 → 3 → 4 → 5 → null
 *   slow,fast
 *
 * Step 2: Move fast n+1 = 3 steps ahead
 *   dummy → 1 → 2 → 3 → 4 → 5 → null
 *   slow         fast
 *   (Gap = 3 nodes, so slow will be 1 before target)
 *
 * Step 3: Move both until fast reaches end
 *   Iteration 1:
 *     dummy → 1 → 2 → 3 → 4 → 5 → null
 *            slow         fast
 *
 *   Iteration 2:
 *     dummy → 1 → 2 → 3 → 4 → 5 → null
 *                slow         fast
 *
 *   Iteration 3:
 *     dummy → 1 → 2 → 3 → 4 → 5 → null
 *                    slow         fast
 *
 * Step 4: Remove node (slow.next = slow.next.next)
 *   slow is at 3, slow.next is 4 (target)
 *   Set slow.next = 5
 *   dummy → 1 → 2 → 3 → 5 → null
 *
 * Return: dummy.next = 1 → 2 → 3 → 5 ✓
 *
 * Edge Case - Removing Head (n = 5, list: 1→2→3→4→5):
 * - Move fast 6 steps ahead → fast becomes null!
 * - This means we're removing the head
 * - Return dummy.next = head.next
 *
 * Complexity:
 * - Time: O(L) where L = list length - single pass!
 * - Space: O(1) - only pointers
 */

export function removeNthFromEnd<T>(
  head: ListNode<T> | null,
  n: number,
): ListNode<T> | null {
  // Use dummy node to handle removing head gracefully
  const dummy = new ListNode<T>(null as any);
  dummy.next = head;

  let slow = dummy;
  let fast = dummy;

  // Move fast n+1 steps ahead to create gap
  // +1 because we want slow to be BEFORE the node to remove
  for (let i = 0; i <= n; i++) {
    fast = fast.next!;
  }

  // Move both pointers until fast reaches end
  while (fast !== null) {
    slow = slow.next!;
    fast = fast.next!;
  }

  // slow is now at node before the target
  // Remove target node
  slow.next = slow.next!.next;

  // Return new head (might have changed if we removed original head)
  return dummy.next;
}
