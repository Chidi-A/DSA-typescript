/**
 * LINKED LIST - Core Node Structure & Utilities
 *
 * This file contains:
 * 1. ListNode class - Basic singly linked list node
 * 2. RandomListNode class - Node with random pointer (for copy problems)
 * 3. Helper functions for creating, testing, and debugging linked lists
 *
 * A Linked List is a linear data structure where elements are stored in nodes.
 * Each node contains:
 * - Data (val)
 * - Pointer to next node (next)
 *
 * Advantages over arrays:
 * - O(1) insertion/deletion at known positions
 * - Dynamic size (no resizing needed)
 * - Efficient memory use (no wasted capacity)
 *
 * Disadvantages:
 * - O(n) access by index (no random access)
 * - Extra memory for pointers
 * - No cache locality
 */

// ============================================================================
// BASIC LIST NODE
// ============================================================================

/**
 * Singly Linked List Node
 *
 * Visual representation:
 * [val | next] -> [val | next] -> [val | next] -> null
 *
 * @template T - Type of value stored in the node
 */
export class ListNode<T = number> {
  val: T;
  next: ListNode<T> | null;

  constructor(val: T, next: ListNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}

// ============================================================================
// RANDOM POINTER NODE (for Copy List with Random Pointer)
// ============================================================================

/**
 * Node with random pointer
 * Used in "Copy List with Random Pointer" problem
 *
 * Each node has:
 * - val: the node's value
 * - next: pointer to next node
 * - random: pointer to ANY node in the list (or null)
 */

export class RandomListNode<T = number> {
  val: T;
  next: RandomListNode<T> | null;
  random: RandomListNode<T> | null;

  constructor(
    val: T,
    next: RandomListNode<T> | null = null,
    random: RandomListNode<T> | null = null,
  ) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Create a linked list from an array
 *
 * @param arr - Array of values
 * @returns Head of the linked list, or null if array is empty
 *
 * Time: O(n)
 * Space: O(n) for the nodes
 *
 * @example
 * createList([1, 2, 3])
 * // Returns: 1 -> 2 -> 3 -> null
 */
export function createList<T>(arr: T[]): ListNode<T> | null {
  if (arr.length === 0) {
    return null;
  }

  const head = new ListNode<T>(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode<T>(arr[i]);
    current = current.next;
  }

  return head;
}

/**
 * Convert linked list to array (for testing and debugging)
 *
 * @param head - Head of the linked list
 * @returns Array of values
 *
 * Time: O(n)
 * Space: O(n) for the result array
 *
 * @example
 * const list = createList([1, 2, 3]);
 * toArray(list);  // Returns: [1, 2, 3]
 */

export function toArray<T>(head: ListNode<T> | null): T[] {
  const result: T[] = [];
  let current = head;

  while (current !== null) {
    result.push(current.val);
    current = current.next;
  }

  return result;
}

/**
 * Print linked list to console (for debugging)
 *
 * @param head - Head of the linked list
 * @param label - Optional label to print before the list
 *
 * @example
 * const list = createList([1, 2, 3]);
 * printList(list);           // Output: 1 -> 2 -> 3 -> null
 * printList(list, "List:");  // Output: List: 1 -> 2 -> 3 -> null
 */
export function printList<T>(
  head: ListNode<T> | null,
  label: string = '',
): void {
  const values: string[] = [];
  let current = head;

  while (current !== null) {
    values.push(String(current.val));
    current = current.next;
  }

  const listStr = values.length > 0 ? values.join(' -> ') + ' -> null' : 'null';

  console.log(label ? `${label} ${listStr}` : listStr);
}

/**
 * Get the length of a linked list
 *
 * @param head - Head of the linked list
 * @returns Number of nodes in the list
 *
 * Time: O(n)
 * Space: O(1)
 */
export function getLength<T>(head: ListNode<T> | null): number {
  let length = 0;
  let current = head;

  while (current !== null) {
    length++;
    current = current.next;
  }

  return length;
}

/**
 * Get node at specific index (0-based)
 *
 * @param head - Head of the linked list
 * @param index - Target index
 * @returns Node at index, or null if index out of bounds
 *
 * Time: O(n)
 * Space: O(1)
 *
 * @example
 * const list = createList([10, 20, 30]);
 * getNodeAt(list, 1);  // Returns: node with val=20
 */
export function getNodeAt<T>(
  head: ListNode<T> | null,
  index: number,
): ListNode<T> | null {
  let current = head;
  let i = 0;

  while (current !== null && i < index) {
    current = current.next;
    i++;
  }

  return current;
}

/**
 * Compare two linked lists for equality
 *
 * @param list1 - First list
 * @param list2 - Second list
 * @returns True if lists have same values in same order
 *
 * Time: O(n)
 * Space: O(1)
 */
export function areListsEqual<T>(
  list1: ListNode<T> | null,
  list2: ListNode<T> | null,
): boolean {
  let curr1 = list1;
  let curr2 = list2;

  while (curr1 !== null && curr2 !== null) {
    if (curr1.val !== curr2.val) {
      return false;
    }
    curr1 = curr1.next;
    curr2 = curr2.next;
  }

  // Both should be null (same length)
  return curr1 === null && curr2 === null;
}

/**
 * Insert value at beginning of list
 *
 * @param head - Current head
 * @param val - Value to insert
 * @returns New head
 *
 * Time: O(1)
 * Space: O(1)
 */
export function insertAtHead<T>(head: ListNode<T> | null, val: T): ListNode<T> {
  return new ListNode<T>(val, head);
}

/**
 * Insert value at end of list
 *
 * @param head - Current head
 * @param val - Value to insert
 * @returns Head of the list
 *
 * Time: O(n)
 * Space: O(1)
 */
export function insertAtTail<T>(head: ListNode<T> | null, val: T): ListNode<T> {
  const newNode = new ListNode<T>(val);

  if (head === null) {
    return newNode;
  }

  let current = head;
  while (current.next !== null) {
    current = current.next;
  }
  current.next = newNode;

  return head;
}

/**
 * Create a linked list with cycle for testing
 *
 * @param arr - Array of values
 * @param pos - Position where cycle starts (-1 for no cycle)
 * @returns Head of the list with cycle
 *
 * @example
 * createListWithCycle([1, 2, 3, 4], 1)
 * // Creates: 1 -> 2 -> 3 -> 4 -> (back to 2)
 */
export function createListWithCycle<T>(
  arr: T[],
  pos: number,
): ListNode<T> | null {
  if (arr.length === 0) {
    return null;
  }

  const head = createList(arr);

  if (pos < 0 || pos >= arr.length) {
    return head; // No cycle
  }

  // Find tail and cycle start node
  let tail = head;
  let cycleNode = head;
  let index = 0;

  while (tail!.next !== null) {
    if (index === pos) {
      cycleNode = tail;
    }
    tail = tail!.next;
    index++;
  }

  // Create cycle
  if (pos === 0) {
    tail!.next = head;
  } else {
    tail!.next = cycleNode;
  }

  return head;
}

/**
 * Visualize linked list structure with indices
 *
 * @param head - Head of the linked list
 *
 * @example
 * visualizeList(createList([10, 20, 30]))
 * // Output:
 * // Index:  0    1    2
 * // Value: 10 -> 20 -> 30 -> null
 */
export function visualizeList<T>(head: ListNode<T> | null): void {
  if (head === null) {
    console.log('List: null');
    return;
  }

  const values: string[] = [];
  const indices: string[] = [];
  let current = head;
  let index = 0;

  while (current !== null) {
    values.push(String(current.val).padStart(4));
    indices.push(String(index).padStart(4));
    current = current!.next!;
    index++;
  }

  console.log('Index: ' + indices.join('  '));
  console.log('Value: ' + values.join(' ->') + ' -> null');
}
