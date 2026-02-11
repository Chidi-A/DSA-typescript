// ============================================================
// BST Task: Convert Sorted Array to BST (Easy)
// ============================================================

/*
PROBLEM:
Convert a sorted array into a height-balanced BST.
A height-balanced BST has left and right subtree heights differing by at most 1.
Write a function sortedArrayToBST(nums) that creates the BST.

EXAMPLE:
sortedArrayToBST([1, 2, 3, 4, 5, 6, 7])
→       4
       / \
      2   6
     / \ / \
    1  3 5  7

sortedArrayToBST([1, 2, 3])
→     2
     / \
    1   3

CONSTRAINTS:
- 1 <= nums.length <= 10^4
- Array is sorted in ascending order
- Multiple valid answers possible
*/

import { TreeNode } from './TreeNode';

// ============================================================
// ALGORITHM (Plain English)
// ============================================================

/*
1. Choose middle element as root (ensures balance)
2. Recursively build left subtree from left half
3. Recursively build right subtree from right half
4. Base case: empty subarray returns null

KEY INSIGHT: Middle element ensures equal/near-equal subtrees
- Left subtree gets elements [left, mid-1]
- Right subtree gets elements [mid+1, right]
- Both subtrees differ in size by at most 1
*/

// ============================================================
// Solution: Recursive Middle Element
// Time: O(n) | Space: O(log n)
// ============================================================

export function sortedArrayToBST(nums: number[]): TreeNode | null {
  function helper(left: number, right: number): TreeNode | null {
    if (left > right) return null;

    // Choose middle element as root
    const mid = Math.floor((left + right) / 2);
    const node = new TreeNode(nums[mid]);

    // Recursively build subtrees
    node.left = helper(left, mid - 1);
    node.right = helper(mid + 1, right);

    return node;
  }

  return helper(0, nums.length - 1);
}

// ============================================================
// PROOF OF HEIGHT-BALANCE
// ============================================================

/*
DEFINITION: Tree is height-balanced if for every node, 
|height(left) - height(right)| <= 1

PROOF:
1. At each step, we divide array in half (or near-half)
2. For array of size n:
   - Left subtree has ⌊(n-1)/2⌋ elements
   - Right subtree has ⌊(n-1)/2⌋ or ⌈(n-1)/2⌉ elements
3. Sizes differ by at most 1
4. Heights of subtrees built from sizes differing by 1 differ by at most 1
5. By induction, entire tree is height-balanced

EXAMPLE [1,2,3,4,5,6,7]:
- Root: 4 (mid of 7 elements)
- Left [1,2,3]: 3 elements → height 2
- Right [5,6,7]: 3 elements → height 2
- Difference: |2 - 2| = 0 ✓

EXAMPLE [1,2,3,4,5,6]:
- Root: 3 or 4 (depending on mid calculation)
- If 3: Left [1,2]: 2 elements, Right [4,5,6]: 3 elements
- Heights: 2 and 2 → Difference: 0 ✓
*/

// ============================================================
// COMPLEXITY ANALYSIS
// ============================================================

/*
TIME COMPLEXITY: O(n)
- Visit each element exactly once
- Create one node per element
- Total: n nodes created

SPACE COMPLEXITY: O(log n)
- Recursion stack depth = height of tree
- Height of balanced BST = log₂(n)
- Each call uses O(1) space
- Total: O(log n) call stack

Note: If counting output tree space, it's O(n) for n nodes
*/

// ============================================================
// HEIGHT OF RESULTING TREE
// ============================================================

/*
HEIGHT: ⌈log₂(n+1)⌉ - 1 = Θ(log n)

DERIVATION:
- Complete binary tree with n nodes has height h where:
  2^h ≤ n < 2^(h+1)
- Taking log: h ≤ log₂(n) < h+1
- Height h = ⌊log₂(n)⌋

EXAMPLES:
- n=1: height=0 (single node)
- n=3: height=1 (root + 2 children)
- n=7: height=2 (perfect tree with 3 levels)
- n=15: height=3 (perfect tree with 4 levels)
- n=8: height=3 (not perfect, but balanced)

COMPARISON:
- Balanced BST: O(log n) height
- Skewed BST: O(n) height
- This algorithm guarantees O(log n) ✓
*/

// ============================================================
// Helper: Visualize tree structure
// ============================================================

export function getHeight(node: TreeNode | null): number {
  if (node === null) return -1;
  return 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

export function isBalanced(node: TreeNode | null): boolean {
  if (node === null) return true;

  const leftHeight = getHeight(node.left);
  const rightHeight = getHeight(node.right);

  return (
    Math.abs(leftHeight - rightHeight) <= 1 &&
    isBalanced(node.left) &&
    isBalanced(node.right)
  );
}

// ============================================================
// Example Usage
// ============================================================

/*
  [1, 2, 3, 4, 5, 6, 7]
  Mid = 4 (index 3)
      4
     / \
  Left: [1,2,3] → builds subtree with root 2
  Right: [5,6,7] → builds subtree with root 6
  
  Final tree:
         4
        / \
       2   6
      / \ / \
     1  3 5  7
  
  Height: 2
  Balanced: ✓
  */
