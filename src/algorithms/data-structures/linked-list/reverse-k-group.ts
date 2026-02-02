/**
 * LINKED LIST TASK 10: Reverse Nodes in K-Group (Hard)
 *
 * Problem: Reverse nodes k at a time. Leave remaining nodes (< k) as-is.
 *
 * Examples:
 *   1→2→3→4→5, k=2  →  2→1→4→3→5
 *   1→2→3→4→5, k=3  →  3→2→1→4→5
 *
 * Challenge: Must reverse in-place, handle partial groups
 */

import { ListNode } from './ListNode';

// ============================================================================
// SOLUTION: THREE-STEP PROCESS PER GROUP
// ============================================================================

/**
 * Algorithm:
 *
 * For each group of k nodes:
 * 1. Check if k nodes exist ahead
 * 2. Reverse those k nodes
 * 3. Reconnect with previous and next groups
 *
 * Key Challenges:
 * - Don't reverse if < k nodes remain
 * - Maintain connections between groups
 * - Track multiple pointers simultaneously
 *
 * Visual (k=2):
 *   dummy → 1 → 2 → 3 → 4 → 5
 *
 *   Group 1: Reverse [1,2]
 *   dummy → 2 → 1 → 3 → 4 → 5
 *
 *   Group 2: Reverse [3,4]
 *   dummy → 2 → 1 → 4 → 3 → 5 ✓
 *
 * Complexity:
 * - Time: O(n) - each node processed once
 * - Space: O(1) - only pointers
 */

export function reverseKGroup<T>(
  head: ListNode<T> | null,
  k: number,
): ListNode<T> | null {
  if (head === null || k <= 1) return head;

  const dummy = new ListNode<T>(null as any);
  dummy.next = head;
  let prevGroupEnd = dummy;

  while (true) {
    // Step 1: Check if k nodes exist
    const kthNode = getKth(prevGroupEnd, k);
    if (kthNode === null) break; // Less than k nodes remain

    // Step 2: Reverse the k-node group
    const nextGroupStart = kthNode.next;
    const [newGroupHead, newGroupTail] = reverseSegment(
      prevGroupEnd.next!,
      nextGroupStart,
    );

    // Step 3: Connect reversed group
    prevGroupEnd.next = newGroupHead;
    newGroupTail.next = nextGroupStart;
    prevGroupEnd = newGroupTail;
  }

  return dummy.next;
}

/**
 * Helper: Get kth node from current position
 */
function getKth<T>(current: ListNode<T> | null, k: number): ListNode<T> | null {
  while (current !== null && k > 0) {
    current = current.next;
    k--;
  }
  return current;
}

/**
 * Helper: Reverse segment from start (inclusive) to end (exclusive)
 * Returns [newHead, newTail]
 */
function reverseSegment<T>(
  start: ListNode<T>,
  end: ListNode<T> | null,
): [ListNode<T>, ListNode<T>] {
  let prev: ListNode<T> | null = end;
  let current: ListNode<T> | null = start;
  const tail = start; // First node becomes tail

  while (current !== end) {
    const next: ListNode<T> | null = current!.next!;
    current!.next = prev;
    prev = current;
    current = next;
  }

  return [prev!, tail];
}
