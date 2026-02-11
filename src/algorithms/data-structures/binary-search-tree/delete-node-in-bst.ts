// ============================================================
// BST Task: Delete Node in BST (Hard)
// ============================================================

/*
PROBLEM:
Delete a node with given key in a BST and return the new root.
The tree structure must remain a valid BST.
Write a function deleteNode(root, key) that deletes the node.

EXAMPLE:
      5
     / \
    3   7
   / \   \
  2   4   8

deleteNode(root, 3)
→     5
     / \
    4   7  (or 2, both valid)
   /     \
  2       8

deleteNode(root, 7)
→     5
     / \
    3   8
   / \
  2   4

CONSTRAINTS:
- Number of nodes: 0 <= n <= 10^4
- Node values are unique
*/

import { TreeNode } from './TreeNode';

// ============================================================
// ALGORITHM (Plain English)
// ============================================================

/*
1. SEARCH for the node to delete using BST property
   - If key < node.val → go left
   - If key > node.val → go right
   - If key === node.val → found it, delete this node

2. DELETION has THREE CASES:

   CASE 1: Node has NO children (leaf node)
   - Simply remove it (return null)
   
   CASE 2: Node has ONE child
   - Replace node with its child
   - Return the child (bypasses deleted node)
   
   CASE 3: Node has TWO children (HARDEST)
   - Find successor (smallest node in right subtree) OR
   - Find predecessor (largest node in left subtree)
   - Replace node's value with successor/predecessor
   - Delete the successor/predecessor (it has ≤ 1 child)

3. RECURSIVELY update the tree structure
*/

// ============================================================
// Solution 1: Using Successor (Smallest in Right Subtree)
// Time: O(h) | Space: O(h)
// ============================================================

export function deleteNode(
  root: TreeNode | null,
  key: number
): TreeNode | null {
  if (root === null) return null;

  // Search for the node
  if (key < root.val) {
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNode(root.right, key);
  } else {
    // Found the node to delete
    // CASE 1: No children (leaf node)
    if (root.left === null && root.right === null) {
      return null;
    }

    // CASE 2: One child
    if (root.left === null) {
      return root.right;
    }
    if (root.right === null) {
      return root.left;
    }

    // CASE 3: Two children
    // Find successor (smallest in right subtree)
    const successor = findMin(root.right);
    root.val = successor.val;
    // Delete successor from right subtree
    root.right = deleteNode(root.right, successor.val);
  }

  return root;
}

// Helper: Find minimum node (leftmost)
export function findMin(node: TreeNode): TreeNode {
  while (node.left !== null) {
    node = node.left;
  }
  return node;
}

// ============================================================
// Solution 2: Using Predecessor (Largest in Left Subtree)
// Time: O(h) | Space: O(h)
// ============================================================

export function deleteNodePredecessor(
  root: TreeNode | null,
  key: number
): TreeNode | null {
  if (root === null) return null;

  if (key < root.val) {
    root.left = deleteNodePredecessor(root.left, key);
  } else if (key > root.val) {
    root.right = deleteNodePredecessor(root.right, key);
  } else {
    // CASE 1 & 2: Zero or one child
    if (root.left === null) return root.right;
    if (root.right === null) return root.left;

    // CASE 3: Two children
    // Find predecessor (largest in left subtree)
    const predecessor = findMax(root.left);
    root.val = predecessor.val;
    root.left = deleteNodePredecessor(root.left, predecessor.val);
  }

  return root;
}

// Helper: Find maximum node (rightmost)
export function findMax(node: TreeNode): TreeNode {
  while (node.right !== null) {
    node = node.right;
  }
  return node;
}

// ============================================================
// Solution 3: Iterative (More Complex)
// Time: O(h) | Space: O(1)
// ============================================================

export function deleteNodeIterative(
  root: TreeNode | null,
  key: number
): TreeNode | null {
  let parent: TreeNode | null = null;
  let current: TreeNode | null = root;
  let isLeftChild = false;

  // Find node and its parent
  while (current !== null && current.val !== key) {
    parent = current;
    if (key < current.val) {
      isLeftChild = true;
      current = current.left;
    } else {
      isLeftChild = false;
      current = current.right;
    }
  }

  if (current === null) return root; // Key not found

  // CASE 1: Leaf node
  if (current.left === null && current.right === null) {
    if (current === root) return null;
    if (isLeftChild) parent!.left = null;
    else parent!.right = null;
  }
  // CASE 2: One child
  else if (current.left === null || current.right === null) {
    const child = current.left !== null ? current.left : current.right;
    if (current === root) return child;
    if (isLeftChild) parent!.left = child;
    else parent!.right = child;
  }
  // CASE 3: Two children
  else {
    const successor = findMin(current.right);
    current.val = successor.val;
    current.right = deleteNode(current.right, successor.val);
  }

  return root;
}

// ============================================================
// STRATEGIES FOR TWO CHILDREN CASE
// ============================================================

/*
  When node has TWO children, replace with:
  
  STRATEGY 1: SUCCESSOR (Smallest in Right Subtree)
  - Go right once, then left until null
  - Successor is always >= all left subtree nodes
  - Successor is always <= all right subtree nodes
  - Properties:
    ✓ Successor has NO left child (by definition)
    ✓ Easy to delete (has ≤ 1 child)
    ✓ Maintains BST property
  
  STRATEGY 2: PREDECESSOR (Largest in Left Subtree)
  - Go left once, then right until null
  - Predecessor is always <= all right subtree nodes
  - Predecessor is always >= all left subtree nodes
  - Properties:
    ✓ Predecessor has NO right child (by definition)
    ✓ Easy to delete (has ≤ 1 child)
    ✓ Maintains BST property
  
  EXAMPLE:
        5
       / \
      3   7
     / \   \
    2   4   8
  
  Delete 5 (root with two children):
  
  Option A - Successor (min in right = 7):
        7
       / \
      3   8
     / \
    2   4
  
  Option B - Predecessor (max in left = 4):
        4
       / \
      3   7
     /     \
    2       8
  
  BOTH ARE VALID! Choice doesn't affect correctness, only tree shape.
  
  COMPARISON:
  - Successor: More commonly used
  - Predecessor: Sometimes preferred for balance
  - Alternating: Can help maintain better balance
  - Random choice: Best for average-case balance
  */

// ============================================================
// COMPLEXITY ANALYSIS
// ============================================================

/*
  TIME COMPLEXITY: O(h) where h = height
  - Search for node: O(h)
  - Find successor/predecessor: O(h)
  - Delete successor/predecessor: O(h)
  - Total: O(h)
  - Best case (balanced): O(log n)
  - Worst case (skewed): O(n)
  
  SPACE COMPLEXITY: O(h)
  - Recursive call stack: O(h)
  - Iterative version: O(1)
  
  WHY O(h) TWICE IS STILL O(h):
  - We go down to find node: h steps
  - We might go down again to find successor: h steps
  - But successor is in subtree, so total path ≤ 2h = O(h)
  
  WORST CASE SCENARIO:
        10
       /
      9
     /
    8    Delete 10 → need to find predecessor (1)
   ...   This takes O(n) in skewed tree
   /
  1
  */

// ============================================================
// Example Usage
// ============================================================

/*
  Initial tree:
        5
       / \
      3   7
     / \   \
    2   4   8
  
  deleteNode(root, 3):
  1. Find node 3 (has two children)
  2. Find successor = 4 (min in right subtree of 3)
  3. Replace 3 with 4
  4. Delete old 4 node
  Result:
        5
       / \
      4   7
     /     \
    2       8
  
  deleteNode(root, 7):
  1. Find node 7 (has one child)
  2. Replace 7 with its child 8
  Result:
        5
       / \
      3   8
     / \
    2   4
  */
