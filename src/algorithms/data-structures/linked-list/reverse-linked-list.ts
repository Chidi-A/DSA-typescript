/**
 * LINKED LIST TASK 1: Reverse a Linked List (Easy-Medium)
 *
 * Problem:
 * Given the head of a singly linked list, reverse the list and return the new head.
 * You must reverse the list by changing the pointers, not by modifying node values.
 *
 * Visual Example:
 * Input:  1 → 2 → 3 → 4 → 5 → null
 * Output: 5 → 4 → 3 → 2 → 1 → null
 *
 * Key Concept:
 * - Reverse the direction of all "next" pointers
 * - What was the tail becomes the new head
 * - What was the head becomes the new tail (points to null)
 *
 * This is a fundamental linked list problem that teaches pointer manipulation.
 */

import { ListNode } from './ListNode';

// ============================================================================
// APPROACH 1: ITERATIVE (3 POINTERS)
// ============================================================================

/**
 * Algorithm (Iterative - 3 Pointers):
 *
 * Key Insight:
 * - We need to reverse each link: node.next should point backward
 * - But if we change current.next, we lose the rest of the list!
 * - Solution: Keep track of 3 nodes at a time
 *
 * Three Pointers:
 * - prev: Node before current (starts as null)
 * - current: Node we're currently reversing (starts as head)
 * - next: Node after current (save before we change current.next)
 *
 * Steps:
 * 1. Initialize: prev = null, current = head
 * 2. While current is not null:
 *    a. Save next: next = current.next
 *    b. Reverse link: current.next = prev
 *    c. Move prev forward: prev = current
 *    d. Move current forward: current = next
 * 3. Return prev (it's now the new head)
 *
 *
 * Visual Walkthrough (list: 1 → 2 → 3 → null):
 *
 * Initial:
 *   prev = null
 *   current = 1 → 2 → 3 → null
 *
 * Iteration 1:
 *   next = 2 → 3 → null
 *   1.next = null         (reverse link)
 *   prev = 1 → null
 *   current = 2 → 3 → null
 *
 * Iteration 2:
 *   next = 3 → null
 *   2.next = 1 → null     (reverse link)
 *   prev = 2 → 1 → null
 *   current = 3 → null
 *
 * Iteration 3:
 *   next = null
 *   3.next = 2 → 1 → null (reverse link)
 *   prev = 3 → 2 → 1 → null
 *   current = null
 *
 * Loop exits, return prev = 3 → 2 → 1 → null ✓
 *
 * Complexity:
 * - Time: O(n) - visit each node exactly once
 * - Space: O(1) - only 3 pointers, no recursion stack
 */

export function reverseList<T>(head: ListNode<T> | null): ListNode<T> | null {
  // Edge case: empty list or single node
  if (head === null || head.next === null) {
    return head;
  }

  let prev: ListNode<T> | null = null;
  let current: ListNode<T> | null = head;

  while (current !== null) {
    // Step 1: Save the next node (before we lose it)
    const next: ListNode<T> | null = current.next;

    // Step 2: Reverse the link (point backward)
    current.next = prev;

    // Step 3: Move prev and current forward
    prev = current;
    current = next;
  }

  return prev;
}

// ============================================================================
// COMPLEXITY ANALYSIS
// ============================================================================

/**
 * COMPLEXITY COMPARISON:
 *
 * Iterative (3 Pointers):
 * ┌────────────┬──────────┬──────────┬───────────────────────┐
 * │  Metric    │   Time   │  Space   │        Notes          │
 * ├────────────┼──────────┼──────────┼───────────────────────┤
 * │ Iterative  │   O(n)   │   O(1)   │ Optimal! Const space  │
 * └────────────┴──────────┴──────────┴───────────────────────┘
 *
 */
