/**
 * LINKED LIST TASK 9: Merge K Sorted Lists (Hard)
 *
 * Problem: Merge K sorted linked lists into one sorted list
 *
 * Example:
 *   [1→4→7, 2→5→8, 3→6→9]
 *   → 1→2→3→4→5→6→7→8→9
 *
 * Three Approaches:
 * 1. Brute Force: Collect all, sort - O(N log N)
 * 2. Divide & Conquer: Merge pairs - O(N log K) ✓ Best!
 * 3. Min Heap: Track minimums - O(N log K)
 */

import { ListNode, createList } from './ListNode';
import { mergeTwoLists } from './merge-two-sorted-lists';

// ============================================================================
// APPROACH 1: BRUTE FORCE (COLLECT ALL → SORT)
// ============================================================================

/**
 * Algorithm:
 * 1. Collect all values into array
 * 2. Sort array
 * 3. Build new linked list
 *
 * Complexity:
 * - Time: O(N log N) where N = total nodes
 * - Space: O(N) for array
 *
 * Drawback: Doesn't use fact that lists are already sorted!
 */
export function mergeKListsBruteForce<T>(
  lists: Array<ListNode<T> | null>,
): ListNode<T> | null {
  const values: T[] = [];

  // Collect all values
  for (const head of lists) {
    let current = head;
    while (current !== null) {
      values.push(current.val);
      current = current.next;
    }
  }

  if (values.length === 0) return null;

  // Sort
  values.sort((a, b) => (a as any) - (b as any));

  // Build list
  return createList(values);
}

// ============================================================================
// APPROACH 2: DIVIDE & CONQUER (OPTIMAL!)
// ============================================================================

/**
 * Algorithm (Merge Pairs Recursively):
 *
 * Key Insight: Reuse mergeTwoLists repeatedly!
 *
 * Strategy:
 * - Merge lists[0] + lists[1]
 * - Merge lists[2] + lists[3]
 * - ...
 * - Recursively merge the results
 *
 * Visual (K=4):
 *   [L1, L2, L3, L4]
 *        ↓ Round 1
 *   [L1+L2, L3+L4]
 *        ↓ Round 2
 *   [L1+L2+L3+L4]
 *
 * Complexity:
 * - Time: O(N log K) where N=total nodes, K=number of lists
 *   - log K levels (divide by 2 each time)
 *   - O(N) work per level (merge all nodes)
 * - Space: O(log K) for recursion stack
 *
 * Why Better Than Brute Force?
 * - O(N log K) < O(N log N) when K << N
 * - Uses sorted property effectively!
 */
export function mergeKLists<T>(
  lists: Array<ListNode<T> | null>,
): ListNode<T> | null {
  if (lists.length === 0) return null;
  return mergeKListsHelper(lists, 0, lists.length - 1);
}

function mergeKListsHelper<T>(
  lists: Array<ListNode<T> | null>,
  left: number,
  right: number,
): ListNode<T> | null {
  // Base case: single list
  if (left === right) {
    return lists[left];
  }

  // Divide
  const mid = Math.floor((left + right) / 2);

  // Conquer
  const leftList = mergeKListsHelper(lists, left, mid);
  const rightList = mergeKListsHelper(lists, mid + 1, right);

  // Combine
  return mergeTwoLists(leftList, rightList);
}
