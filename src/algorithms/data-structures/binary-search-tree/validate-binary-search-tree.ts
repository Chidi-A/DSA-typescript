import { TreeNode } from './TreeNode';

// ============================================================
// BST Task 1: Validate Binary Search Tree (Easy-Medium)
// ============================================================

/*
PROBLEM:
A valid BST has these properties:
1. Left subtree values < node value
2. Right subtree values > node value
3. Left and right subtrees are also BSTs

Write a function isValidBST(root) that returns true/false.

EXAMPLES:
     5           Valid BST
    / \
   3   7
  / \
 2   4

     5           INVALID! 6 > 5 but in left subtree
    / \
   3   7
  / \
 2   6

   5             INVALID! Duplicates not allowed
  /
 5
*/

// ============================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================

/*
APPROACH 1: Range Checking (Min/Max Bounds) - OPTIMAL

1. Start at the root with range [-Infinity, +Infinity]
2. For each node, check if its value is within the valid range
3. For the left child:
   - Update the max bound to be the parent's value (exclusive)
   - Keep the same min bound
   - This ensures all left descendants are < parent
4. For the right child:
   - Update the min bound to be the parent's value (exclusive)
   - Keep the same max bound
   - This ensures all right descendants are > parent
5. Recursively validate all nodes with their updated ranges
6. Return true if all nodes satisfy their range constraints


APPROACH 2: In-Order Traversal

1. Perform an in-order traversal (left -> root -> right)
2. In a valid BST, in-order traversal produces sorted ascending order
3. Keep track of the previous node's value
4. If current node <= previous node, BST is invalid
5. Return true if all nodes are in strictly ascending order
*/

// ============================================================
// Solution 1: Range Checking (Optimal)
// Time: O(n) | Space: O(h)
// ============================================================

export function isValidBST(root: TreeNode | null): boolean {
  function validate(node: TreeNode | null, min: number, max: number): boolean {
    if (node === null) return true;
    if (node.val <= min || node.val >= max) return false;
    return (
      validate(node.left, min, node.val) && validate(node.right, node.val, max)
    );
  }
  return validate(root, -Infinity, Infinity);
}

// ============================================================
// Solution 2: In-Order Traversal (Recursive)
// Time: O(n) | Space: O(h)
// ============================================================

export function isValidBSTInOrder(root: TreeNode | null): boolean {
  let prev: number | null = null;

  function inOrder(node: TreeNode | null): boolean {
    if (node === null) return true;
    if (!inOrder(node.left)) return false;
    if (prev !== null && node.val <= prev) return false;
    prev = node.val;
    return inOrder(node.right);
  }

  return inOrder(root);
}

// Alternative: Iterative in-order traversal using stack
export function isValidBSTIterative(root: TreeNode | null): boolean {
  const stack: TreeNode[] = [];
  let current: TreeNode | null = root;
  let prev: number | null = null;

  while (stack.length > 0 || current !== null) {
    while (current !== null) {
      stack.push(current);
      current = current.left;
    }

    current = stack.pop()!;
    if (prev !== null && current.val <= prev) return false;
    prev = current.val;
    current = current.right;
  }

  return true;
}
