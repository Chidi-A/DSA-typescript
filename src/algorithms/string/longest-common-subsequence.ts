/**
 * PROBLEM: Longest Common Subsequence (Hard)
 * Category: Dynamic Programming / String Algorithms
 *
 * Description:
 * Two dinosaur species share common DNA sequences, indicating evolutionary
 * relationship. Find the Longest Common Subsequence (LCS) between two DNA strings.
 *
 * A subsequence is a sequence that appears in the same order but not
 * necessarily consecutive. For example, "ACE" is a subsequence of "ABCDE".
 *
 * Example:
 * longestCommonSubsequence("AGGTAB", "GXTXAYB");
 * // Returns: 4
 * // LCS is "GTAB"
 * // AGGTAB  →  [G]--[T]-[AB]
 * // GXTXAYB →  [G]XT[X]A[Y][B]
 *
 * longestCommonSubsequence("ABCDGH", "AEDFHR");
 * // Returns: 3
 * // LCS is "ADH"
 *
 * longestCommonSubsequence("ABC", "DEF");
 * // Returns: 0 (no common subsequence)
 *
 * longestCommonSubsequence("ABC", "ABC");
 * // Returns: 3 (entire string)
 *
 * Constraints:
 * - dna1.length, dna2.length >= 0
 * - Case-sensitive
 * - Return the length of LCS
 */

/**
// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================
*/
/**
 * APPROACH 1: DYNAMIC PROGRAMMING (OPTIMAL!)
 * ============================================================================
 *
 * KEY INSIGHT:
 * Build solution from smaller subproblems!
 *
 * SUBPROBLEM DEFINITION:
 * LCS(i, j) = Length of LCS of dna1[0...i-1] and dna2[0...j-1]
 *
 * RECURRENCE RELATION:
 *
 * If dna1[i-1] === dna2[j-1] (characters match):
 *   LCS(i, j) = 1 + LCS(i-1, j-1)
 *   "Add this character to LCS of previous characters"
 *
 * Else (characters don't match):
 *   LCS(i, j) = max(LCS(i-1, j), LCS(i, j-1))
 *   "Take best result from excluding one character"
 *
 * BASE CASE:
 * LCS(0, j) = 0 (empty first string)
 * LCS(i, 0) = 0 (empty second string)
 *
 *
 * ALGORITHM STEPS:
 *
 * 1. CREATE DP TABLE
 *    - 2D array: dp[m+1][n+1]
 *    - m = length of dna1, n = length of dna2
 *    - Extra row/column for empty string base case
 *
 * 2. INITIALIZE BASE CASES
 *    - dp[0][j] = 0 for all j (first string empty)
 *    - dp[i][0] = 0 for all i (second string empty)
 *
 *  3. FILL DP TABLE (bottom-up)
 *    For i from 1 to m:
 *      For j from 1 to n:
 *        If dna1[i-1] === dna2[j-1]:
 *          dp[i][j] = 1 + dp[i-1][j-1]
 *        Else:
 *          dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 *
 * 4. RETURN dp[m][n]
 *    - Bottom-right cell has final answer
 */

export function longestCommonSubsequence(dna1: string, dna2: string): number {
  const m = dna1.length;
  const n = dna2.length;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (dna1[i - 1] === dna2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
