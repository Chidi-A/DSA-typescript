/**
 * LINKED LIST TASK 6: Palindrome Linked List (Medium)
 *
 * Problem:
 * Determine if a linked list is a palindrome - reads the same forward
 * and backward.
 *
 * Examples:
 * 1 → 2 → 3 → 2 → 1  →  Palindrome ✓ (reads same both ways)
 * 1 → 2 → 2 → 1      →  Palindrome ✓ (even length)
 * 1 → 2 → 3          →  Not palindrome ✗
 * 1                  →  Palindrome ✓ (single node)
 *
 * Challenge: Can you do it in O(n) time and O(1) space?
 *
 * Key Pattern Combination:
 * 1. Find middle (slow/fast pointer)
 * 2. Reverse second half
 * 3. Compare first half with reversed second half
 *
 * This problem beautifully combines multiple techniques!
 */

import { ListNode } from './ListNode';
import { reverseList } from './reverse-linked-list';

// ============================================================================
// APPROACH 1: REVERSE SECOND HALF (OPTIMAL O(1) SPACE!)
// ============================================================================

/**
 * Algorithm (Find Middle + Reverse + Compare):
 *
 * Key Insight:
 * - A palindrome is symmetric: first half mirrors second half
 * - We can't go backward in a singly linked list
 * - Solution: Reverse second half, then compare!
 *
 * Steps:
 * 1. Find middle using slow/fast pointer
 * 2. Reverse the second half starting from middle
 * 3. Compare first half with reversed second half node by node
 * 4. If all match → palindrome!
 * 5. (Optional) Restore list by reversing second half again
 * Visual Walkthrough (list: 1 → 2 → 3 → 2 → 1):
 *
 * Step 1: Find middle
 *   1 → 2 → 3 → 2 → 1
 *           ↑
 *         middle
 *
 * Step 2: Reverse second half
 *   Before: 1 → 2 → 3 → 2 → 1
 *   After:  1 → 2 → 3 ← 2 ← 1
 *           first     second
 *
 * Step 3: Compare
 *   first:  1 → 2 → 3
 *   second: 1 → 2
 *
 *   Compare 1 == 1 ✓
 *   Compare 2 == 2 ✓
 *   second becomes null → all matched!
 *
 * Return: true ✓
 *
 * Why it works for odd/even length:
 * - Odd (1→2→3→2→1): middle = 3, compare [1,2] vs [1,2]
 * - Even (1→2→2→1): middle = 2(second), compare [1,2] vs [1,2]
 * - Middle node doesn't need comparison (always matches itself)
 *
 * Complexity:
 * - Time: O(n) - three passes: find middle, reverse, compare
 * - Space: O(1) - only pointers! 🎯
 */

export function isPalindrome<T>(head: ListNode<T> | null): boolean {
  if (head === null || head.next === null) {
    return true; // Empty or single node is palindrome
  }

  // Step 1: Find middle using slow/fast pointer
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next!;
    fast = fast.next!.next!;
  }

  // slow is now at middle (or second middle for even length)

  // Step 2: Reverse second half
  let secondHalf = reverseList(slow);

  // Step 3: Compare first half with reversed second half
  let firstHalf = head;

  while (secondHalf !== null) {
    if (firstHalf!.val !== secondHalf.val) {
      return false; // Mismatch found
    }
    firstHalf = firstHalf!.next!;
    secondHalf = secondHalf!.next;
  }

  return true; // All matched!
}
