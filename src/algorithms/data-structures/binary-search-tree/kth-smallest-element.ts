import { TreeNode } from './TreeNode';

// ============================================================
// BST Task: Kth Smallest Element (Medium)
// ============================================================

/*
PROBLEM:
Find the kth smallest element in a BST (1-indexed).
Write a function kthSmallest(root, k) that returns the value.

EXAMPLE:
Tree:     5
         / \
        3   7
       / \
      2   4

kthSmallest(root, 1) → 2 (smallest)
kthSmallest(root, 3) → 4
kthSmallest(root, 5) → 7 (largest)

CONSTRAINTS:
- 1 <= k <= n <= 10^4
- k is valid
*/

// ============================================================
// ALGORITHM (Plain English)
// ============================================================

/*
APPROACH 1 & 2: In-Order Traversal
1. In-order traversal visits nodes in sorted order (left → root → right)
2. Count nodes as we visit them
3. When count reaches k, that's our answer

APPROACH 3: Augmented BST (for frequent queries)
1. Store size of each subtree in the node
2. Use size to navigate directly to kth element
3. If k <= leftSize → go left
4. If k == leftSize + 1 → current node is answer
5. If k > leftSize + 1 → go right, search for (k - leftSize - 1)
*/

// ============================================================
// Solution 1: In-Order Recursive
// Time: O(k) best, O(n) worst | Space: O(h)
// ============================================================

export function kthSmallest(root: TreeNode | null, k: number): number {
  let count = 0;
  let result = 0;

  function inOrder(node: TreeNode | null): void {
    if (node === null || count >= k) return;

    inOrder(node.left);

    count++;
    if (count === k) {
      result = node.val;
      return;
    }

    inOrder(node.right);
  }

  inOrder(root);
  return result;
}

// ============================================================
// Solution 2: In-Order Iterative (Stack)
// Time: O(k) best, O(n) worst | Space: O(h)
// ============================================================

export function kthSmallestIterative(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;
  let count = 0;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop()!;
    count++;

    if (count === k) return current.val;

    current = current.right;
  }

  return -1;
}

// ============================================================
// Solution 3: Augmented BST (for frequent queries)
// Time: O(h) | Space: O(1)
// ============================================================

class AugmentedTreeNode {
  val: number;
  left: AugmentedTreeNode | null;
  right: AugmentedTreeNode | null;
  size: number;

  constructor(val: number = 0) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.size = 1;
  }
}

export function kthSmallestAugmented(
  root: AugmentedTreeNode | null,
  k: number
): number {
  if (root === null) return -1;

  const leftSize = root.left ? root.left.size : 0;

  if (k <= leftSize) {
    return kthSmallestAugmented(root.left, k);
  } else if (k === leftSize + 1) {
    return root.val;
  } else {
    return kthSmallestAugmented(root.right, k - leftSize - 1);
  }
}

export function buildAugmentedBST(
  root: TreeNode | null
): AugmentedTreeNode | null {
  if (root === null) return null;

  const node = new AugmentedTreeNode(root.val);
  node.left = buildAugmentedBST(root.left);
  node.right = buildAugmentedBST(root.right);

  const leftSize = node.left ? node.left.size : 0;
  const rightSize = node.right ? node.right.size : 0;
  node.size = leftSize + rightSize + 1;

  return node;
}

// ============================================================
// COMPLEXITY & OPTIMIZATION
// ============================================================

/*
  COMPLEXITY:
  - In-Order: O(H + k) time, O(h) space
  - Augmented: O(h) time, O(1) space (after O(n) preprocessing)
  
  FREQUENT QUERIES OPTIMIZATION:
  1. Augmented BST: O(h) per query, maintains sizes on updates
  2. Cache array: O(1) per query, but only for static trees
  3. Morris traversal: O(k) time with O(1) space
  */
