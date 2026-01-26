/**
 * PROBLEM: Generate Binary Numbers (Medium)
 *
 * Problem:
 * Generate binary representations of numbers from 1 to n using a Queue.
 * The pattern: each binary number generates two children (append 0, append 1).
 *
 * Algorithm:
 * 1. Start with "1" in queue
 * 2. For n iterations:
 *    - Dequeue current number → add to result
 *    - Enqueue current + "0"
 *    - Enqueue current + "1"
 * 3. Return first n results
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

interface IQueue<T> {
  enqueue(item: T): void;
  dequeue(): T | null;
  isEmpty(): boolean;
  size(): number;
}

class ArrayQueue<T> implements IQueue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | null {
    return this.items.length > 0 ? this.items.shift()! : null;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

/**
 * Generate binary representations from 1 to n
 *
 * @param n - Generate binary for numbers 1 to n
 * @returns Array of binary strings in ascending order
 *
 * Time: O(n) - process exactly n numbers
 * Space: O(n) - queue grows to ~n elements, result array is n elements
 */
export function generateBinary(n: number): string[] {
  // Edge case: invalid input
  if (n <= 0) {
    return [];
  }

  const queue = new ArrayQueue<string>();
  const result: string[] = [];

  // Start with "1" (binary for decimal 1)
  queue.enqueue('1');
  // Generate exactly n binary numbers
  for (let i = 0; i < n; i++) {
    // Get next number from queue
    const current = queue.dequeue()!;

    // Add to result (this is the i+1 th number)
    result.push(current);

    // Generate two children for next level
    queue.enqueue(current + '0'); // Multiply by 2 in binary
    queue.enqueue(current + '1'); // Multiply by 2 and add 1
  }

  return result;
}

/**
 * Complexity Analysis
 * Time Complexity: O(n)
Loop runs exactly n times (one per number)
 * Each iteration:
 * Dequeue: O(1) amortized
 * Enqueue twice: O(1) each
 * String concatenation: O(L) where L = length of binary string
 * But L = O(log n) for number n
 * So concatenation is O(log n)
 * Total: O(n × log n) for string operations
 * But typically stated as O(n) since we process each of n numbers once
 * Space Complexity: O(n)
 * Result array: O(n) - stores n strings
 * Queue size: At most ~n elements (queue grows as we generate)
 * After processing k numbers, queue has ~2k unprocessed children
 * Maximum queue size ≈ n (in the worst case)
 * String lengths: O(n log n) total across all n strings
 * Each string is O(log n) bits long
 * Overall: O(n) space for the main data structures
 */
