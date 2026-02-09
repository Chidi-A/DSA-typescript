// ============================================================
// BST Task: Lowest Common Ancestor (Easy-Medium)
// ============================================================

import { TreeNode } from './TreeNode';

// ============================================================
// ALGORITHM (Plain English)
// ============================================================

/*
BST APPROACH:
1. Start at root
2. If both p and q are less than current node → LCA is in left subtree
3. If both p and q are greater than current node → LCA is in right subtree
4. Otherwise → current node is the LCA (split point)

REGULAR TREE APPROACH:
1. Recursively search left and right subtrees for p and q
2. If both found in different subtrees → current node is LCA
3. If only one side found → that side contains the LCA
*/

// ============================================================
// Solution 1: BST Version (Optimal)
// Time: O(h) | Space: O(1) iterative, O(h) recursive
// ============================================================

export function lowestCommonAncestor(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode | null {
  let current = root;

  while (current !== null) {
    // Both nodes in left subtree
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    }
    // Both nodes in right subtree
    else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    }
    // Split point found - current is LCA
    else {
      return current;
    }
  }

  return null;
}

export function lowestCommonAncestorRecursive(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode | null {
  if (root === null) return null;

  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestorRecursive(root.left, p, q);
  }
  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestorRecursive(root.right, p, q);
  }
  return root;
}

// ============================================================
// Solution 2: Regular Binary Tree (No BST Property)
// Time: O(n) | Space: O(h)
// ============================================================

export function lowestCommonAncestorBT(
  root: TreeNode | null,
  p: TreeNode,
  q: TreeNode
): TreeNode | null {
  if (root === null || root === p || root === q) return root;

  const left = lowestCommonAncestorBT(root.left, p, q);
  const right = lowestCommonAncestorBT(root.right, p, q);

  // Found in both subtrees → current node is LCA
  if (left !== null && right !== null) return root;

  // Return whichever side found the nodes
  return left !== null ? left : right;
}

// ============================================================
// COMPLEXITY & COMPARISON
// ============================================================

/*
BST VERSION:
- Time: O(h) - only traverse one path from root to LCA
- Space: O(1) iterative, O(h) recursive (call stack)
- Best: O(log n) balanced tree
- Worst: O(n) skewed tree

REGULAR TREE VERSION:
- Time: O(n) - may visit all nodes
- Space: O(h) - recursion stack

WHY BST IS MORE EFFICIENT:
✓ Uses BST property to eliminate half the tree at each step
✓ Only follows ONE path, never backtracks
✓ No need to explore both subtrees
✗ Regular tree must check both subtrees at each node
*/

// ============================================================
// Example Usage
// ============================================================

/*
Tree:       6
           / \
          2   8
         / \ / \
        0  4 7  9
          / \
         3   5

lowestCommonAncestor(root, node2, node8) → node6
lowestCommonAncestor(root, node2, node4) → node2
lowestCommonAncestor(root, node3, node5) → node4
lowestCommonAncestor(root, node0, node5) → node2
*/
