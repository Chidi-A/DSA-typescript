/**
 * LINKED LIST TASK 8: Copy List with Random Pointer (Hard)
 *
 * Problem:
 * Each node has 'next' AND 'random' pointer (to any node or null).
 * Create a DEEP COPY of the entire structure.
 *
 * Challenge: Random pointers can point anywhere - how to maintain relationships?
 *
 * Two Approaches:
 * 1. HashMap: O(n) space - map old nodes to new nodes
 * 2. Interweaving: O(1) space - insert copies between originals!
 */

import { RandomListNode } from './ListNode';

// ============================================================================
// APPROACH 1: HASHMAP (O(N) SPACE)
// ============================================================================

/**
 * Algorithm (HashMap):
 *
 * Pass 1: Create all new nodes, map old → new
 * Pass 2: Connect next and random using map
 *
 * Why HashMap?
 * - When we see old node's random pointer, we need its copy
 * - Map gives us: oldNode → newNode lookup
 *
 * Steps:
 * 1. First pass: Create all new nodes
 *    map.set(oldNode, new Node(oldNode.val))
 *
 * 2. Second pass: Wire connections
 *    newNode.next = map.get(oldNode.next)
 *    newNode.random = map.get(oldNode.random)
 *
 * 3. Return map.get(head)
 *
 * Complexity:
 * - Time: O(n) - two passes
 * - Space: O(n) - HashMap stores n nodes
 */

export function copyRandomList<T>(
  head: RandomListNode<T> | null,
): RandomListNode<T> | null {
  if (head === null) return null;

  const map = new Map<RandomListNode<T>, RandomListNode<T>>();

  // Pass 1: Create all nodes
  let current = head;
  while (current !== null) {
    map.set(current, new RandomListNode<T>(current.val));
    current = current.next!;
  }

  // Pass 2: Connect next and random
  current = head;
  while (current !== null) {
    const newNode = map.get(current)!;
    newNode.next = map.get(current.next!) || null;
    newNode.random = map.get(current.random!) || null;
    current = current.next!;
  }

  return map.get(head)!;
}

// ============================================================================
// APPROACH 2: INTERWEAVING (O(1) SPACE!)
// ============================================================================

/**
 * Algorithm (Interweaving - Clever!):
 *
 * Key Insight: Insert copies right after originals!
 * - Original: A → B → C
 * - Interweave: A → A' → B → B' → C → C'
 * - Now A.next = A', A.random.next = A.random's copy!
 *
 * Three Passes:
 *
 * 1. Insert copies:
 *    A → B → C
 *    becomes
 *    A → A' → B → B' → C → C'
 *
 * 2. Set random pointers:
 *    if A.random = C, then A'.random = C' = A.random.next
 *
 * 3. Separate lists:
 *    Restore original, extract copy
 *
 * Complexity:
 * - Time: O(n) - three passes
 * - Space: O(1) - no extra data structures! 🎯
 */
export function copyRandomListInterweave<T>(
  head: RandomListNode<T> | null,
): RandomListNode<T> | null {
  if (head === null) return null;

  // Pass 1: Insert copy after each node
  // A → B → C becomes A → A' → B → B' → C → C'
  let current: RandomListNode<T> | null = head;
  while (current !== null) {
    const copy: RandomListNode<T> = new RandomListNode<T>(current.val);
    copy.next = current.next;
    current.next = copy;
    current = copy.next;
  }

  // Pass 2: Set random pointers for copies
  // A'.random = A.random.next (the copy of A.random)
  current = head;
  while (current !== null) {
    if (current.random !== null) {
      current.next!.random = current.random.next;
    }
    current = current.next!.next;
  }

  // Pass 3: Separate lists
  const newHead = head.next;
  current = head;
  while (current !== null) {
    const copy: RandomListNode<T> = current.next!;
    current.next = copy.next;
    if (copy.next !== null) {
      copy.next = copy.next.next;
    }
    current = current.next;
  }

  return newHead;
}
