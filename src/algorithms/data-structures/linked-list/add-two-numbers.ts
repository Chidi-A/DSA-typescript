/**
 * LINKED LIST TASK 7: Add Two Numbers (Medium)
 *
 * Problem:
 * Two non-negative integers are stored in REVERSE order in linked lists.
 * Each node contains a single digit. Add them and return sum as linked list.
 *
 * Examples:
 *   2 → 4 → 3  (342)
 * + 5 → 6 → 4  (465)
 * ───────────
 *   7 → 0 → 8  (807)
 *
 *   9 → 9 → 9  (999)
 * + 1          (1)
 * ───────────
 *   0 → 0 → 0 → 1  (1000)
 *
 * Key Insight: Numbers stored in reverse = addition from right to left naturally!
 */

import { ListNode } from './ListNode';

// ============================================================================
// SOLUTION: DIGIT-BY-DIGIT WITH CARRY
// ============================================================================

/**
 * Algorithm:
 *
 * Like elementary school addition, but lists are already reversed!
 *
 * Steps:
 * 1. Use dummy node for result
 * 2. Track carry (starts at 0)
 * 3. While l1 OR l2 OR carry exists:
 *    - sum = carry + (l1.val if exists) + (l2.val if exists)
 *    - digit = sum % 10
 *    - carry = sum / 10 (integer division)
 *    - Create node with digit
 *    - Move all pointers forward
 * 4. Return dummy.next
 *
 * Visual Example: 342 + 465
 *
 *   2 → 4 → 3
 *   5 → 6 → 4
 *
 * Step 1: 2+5+0 = 7, carry=0 → [7]
 * Step 2: 4+6+0 = 10, carry=1 → [7,0]
 * Step 3: 3+4+1 = 8, carry=0 → [7,0,8]
 * Done! Result: 7 → 0 → 8 ✓
 *
 * Complexity:
 * - Time: O(max(m,n)) - process longer list
 * - Space: O(max(m,n)) - result list length
 */
export function addTwoNumbers(
  l1: ListNode<number> | null,
  l2: ListNode<number> | null,
): ListNode<number> | null {
  const dummy = new ListNode<number>(0);
  let current = dummy;
  let carry = 0;

  while (l1 !== null || l2 !== null || carry > 0) {
    // Add current digits + carry
    let sum = carry;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }

    // Extract digit and carry
    carry = Math.floor(sum / 10);
    const digit = sum % 10;

    // Create node and move forward
    current.next = new ListNode<number>(digit);
    current = current.next;
  }

  return dummy.next;
}
