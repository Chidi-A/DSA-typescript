/**
 * QUEUE TASK: Implement Stack Using Queues (Medium)
 *
 * Problem:
 * Implement a Stack data structure using only Queue operations.
 * A Stack follows LIFO (Last In, First Out) but a Queue follows FIFO.
 *
 * Required Operations:
 * - push(x): Push element x onto stack
 * - pop(): Remove and return the top element
 * - top(): Get the top element without removing it
 * - empty(): Return whether the stack is empty
 *
 * Constraints:
 * - Use only Queue operations: enqueue, dequeue, peek, isEmpty, size
 * - All operations must maintain Stack semantics
 *
 * Examples:
 * const stack = new MyStack();
 * stack.push(1);
 * stack.push(2);
 * stack.push(3);
 * stack.top();    // Returns: 3
 * stack.pop();    // Returns: 3
 * stack.empty();  // Returns: false
 */

// ============================================================================
// BASE QUEUE INTERFACE
// ============================================================================

interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | null;
  peek(): T | null;
  isEmpty(): boolean;
  size(): number;
}

// Simple array-based queue implementation for the Stack
export class ArrayQueue<T> implements IQueue<T> {
  private items: T[] = [];
  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | null {
    return this.items.length > 0 ? this.items.shift()! : null;
  }

  peek(): T | null {
    return this.items.length > 0 ? this.items[0] : null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

// ============================================================================
// APPROACH 1: TWO QUEUES (Push Heavy)
// ============================================================================

/**
 * Algorithm (Two Queues):
 *
 * Data Structure:
 * - Use two queues: queue1 (main) and queue2 (helper)
 *
 * Push (O(1)):
 * 1. Simply enqueue to queue1
 *
 * Pop (O(n)):
 * 1. Move all elements except last from queue1 to queue2
 * 2. Dequeue and return the last element from queue1
 * 3. Swap queue1 and queue2 references
 *
 * Top - O(n):
 * 1. Same as pop, but re-enqueue the last element to queue2
 * 2. Then swap queues
 *
 * Complexity:
 * - Time: push O(1), pop O(n), top O(n), empty O(1)
 * - Space: O(n) for storing elements across two queues
 *
 * Trade-off: Optimized for push operations (write-heavy workload)
 */

export class MyStackTwoQueues<T> {
  private queue1: IQueue<T>;
  private queue2: IQueue<T>;

  constructor() {
    this.queue1 = new ArrayQueue<T>();
    this.queue2 = new ArrayQueue<T>();
  }

  /**
   * Push element onto stack
   * Time: O(1) - just enqueue to main queue
   * Space: O(1)
   */
  push(x: T): void {
    this.queue1.enqueue(x);
  }

  /**
   * Remove and return top element
   * Time: O(n) - must move n-1 elements to helper queue
   * Space: O(1)
   */

  pop(): T | null {
    if (this.empty()) {
      return null;
    }

    // Move all but the last element to queue2
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue()!);
    }

    // The last element is the top of stack
    const topElement = this.queue1.dequeue()!;

    // Swap queues (queue2 becomes the new main queue)
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    return topElement;
  }

  /**
   * Get top element without removing
   * Time: O(n) - must move n-1 elements and restore the last one
   * Space: O(1)
   */

  top(): T | null {
    if (this.empty()) {
      return null;
    }

    // Move all but the last element to queue2
    while (this.queue1.size() > 1) {
      this.queue2.enqueue(this.queue1.dequeue()!);
    }

    // Peek at the last element
    const topElement = this.queue1.dequeue()!;

    // Add it back to queue2 to preserve it
    this.queue2.enqueue(topElement);

    // Swap queues
    [this.queue1, this.queue2] = [this.queue2, this.queue1];

    return topElement;
  }

  /**
   * Check if stack is empty
   * Time: O(1)
   * Space: O(1)
   */
  empty(): boolean {
    return this.queue1.isEmpty();
  }

  /**
   * Get current size
   * Time: O(1)
   * Space: O(1)
   */
  size(): number {
    return this.queue1.size();
  }
}

// ============================================================================
// APPROACH 2: ONE QUEUE (Pop Heavy)
// ============================================================================

/**
 * Algorithm (One Queue):
 *
 * Key Insight: Make push expensive instead of pop by rotating the queue!
 *
 * Push (O(n)):
 * 1. Get current size n
 * 2. Enqueue the new element
 * 3. Rotate queue n times (dequeue from front, enqueue to back)
 * 4. Now the new element is at the front (top of stack)
 *
 * Pop (O(1)):
 * 1. Simply dequeue from front
 *
 * Top - O(1):
 * 1. Peek at front
 *
 * Complexity:
 * - Time: push O(n), pop O(1), top O(1), empty O(1)
 * - Space: O(n) for storing elements in one queue
 *
 * Trade-off: Optimized for pop/top operations (read-heavy workload)
 */

export class MyStackOneQueue<T> {
  private queue: IQueue<T>;

  constructor() {
    this.queue = new ArrayQueue<T>();
  }

  /**
   * Push element onto stack
   * Time: O(n) - must rotate entire queue
   * Space: O(1)
   *
   * Visual example:
   * Queue: [1, 2] → push(3)
   * Step 1: enqueue → [1, 2, 3]
   * Step 2: rotate 2 times (n=2):
   *   - Rotate 1: [2, 3, 1]
   *   - Rotate 2: [3, 2, 1]
   * Now 3 is at front!
   */
  push(x: T): void {
    const n = this.queue.size();

    // Add new element to back
    this.queue.enqueue(x);

    // Rotate n times to move new element to front
    for (let i = 0; i < n; i++) {
      this.queue.enqueue(this.queue.dequeue()!);
    }
  }

  /**
   * Remove and return top element
   * Time: O(1) - just dequeue from front
   * Space: O(1)
   */
  pop(): T | null {
    if (this.empty()) {
      return null;
    }
    return this.queue.dequeue();
  }

  /**
   * Get top element without removing
   * Time: O(1) - just peek at front
   * Space: O(1)
   */
  top(): T | null {
    if (this.empty()) {
      return null;
    }
    return this.queue.peek();
  }

  /**
   * Check if stack is empty
   * Time: O(1)
   * Space: O(1)
   */
  empty(): boolean {
    return this.queue.isEmpty();
  }

  /**
   * Get current size
   * Time: O(1)
   * Space: O(1)
   */
  size(): number {
    return this.queue.size();
  }
}

// ============================================================================
// COMPARISON & ANALYSIS
// ============================================================================

/**
 * COMPLEXITY COMPARISON:
 *
 * Two Queues Approach:
 * ┌───────────┬──────────┬──────────┬────────────────────┐
 * │ Operation │   Time   │  Space   │       Notes        │
 * ├───────────┼──────────┼──────────┼────────────────────┤
 * │ push(x)   │   O(1)   │   O(1)   │ Just enqueue       │
 * │ pop()     │   O(n)   │   O(1)   │ Move n-1 elements  │
 * │ top()     │   O(n)   │   O(1)   │ Move + restore     │
 * │ empty()   │   O(1)   │   O(1)   │ Just check         │
 * └───────────┴──────────┴──────────┴────────────────────┘
 *
 * One Queue Approach:
 * ┌───────────┬──────────┬──────────┬────────────────────┐
 * │ Operation │   Time   │  Space   │       Notes        │
 * ├───────────┼──────────┼──────────┼────────────────────┤
 * │ push(x)   │   O(n)   │   O(1)   │ Rotate n times     │
 * │ pop()     │   O(1)   │   O(1)   │ Just dequeue       │
 * │ top()     │   O(1)   │   O(1)   │ Just peek          │
 * │ empty()   │   O(1)   │   O(1)   │ Just check         │
 * └───────────┴──────────┴──────────┴────────────────────┘
 *
 * WHEN TO USE:
 * - Two Queues: Write-heavy workload (many pushes, few pops)
 * - One Queue: Read-heavy workload (few pushes, many pops/tops)
 *
 * KEY INSIGHTS:
 * 1. Converting FIFO (Queue) to LIFO (Stack) requires reordering
 * 2. You can make either push or pop expensive, but not both O(1)
 * 3. One queue is more space-efficient (no helper queue needed)
 * 4. Two queues is easier to understand initially
 */
