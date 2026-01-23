/**
 * PROBLEM: Evaluate Reverse Polish Notation (Medium)
 * Category: Stack / Expression Evaluation / Calculator
 *
 * Description:
 * Evaluate an arithmetic expression in Reverse Polish Notation (RPN).
 * In RPN, operators come after operands (postfix notation).
 *
 * Example: 3 4 + means 3 + 4 = 7
 *
 * Examples:
 * evalRPN(["2", "1", "+", "3", "*"]);
 * // Returns: 9
 * // (2 + 1) * 3 = 9
 *
 * evalRPN(["4", "13", "5", "/", "+"]);
 * // Returns: 6
 * // 4 + (13 / 5) = 4 + 2 = 6 (integer division)
 *
 * evalRPN(["10", "6", "9", "3", "/", "-", "*"]);
 * // Returns: 30
 * // 10 * (6 - (9 / 3)) = 10 * (6 - 3) = 10 * 3 = 30
 *
 * evalRPN(["5"]);
 * // Returns: 5 (just a number)
 *
 * Constraints:
 * - Valid operators: +, -, *, /
 * - Division is integer division (truncate toward zero)
 * - Valid expression guaranteed
 * - Numbers can be negative
 *
 * Why this problem is important:
 * - Teaches expression evaluation
 * - How calculators work internally
 * - Foundation for compiler design
 * - Understanding different notations
 */

// ============================================================
// ALGORITHM (Plain English)
// ============================================================

/**
 * ALGORITHM:
 *
 * 1. Create empty stack for numbers
 * 2. For each token in the expression:
 *
 *    a. If token is a number:
 *       - Convert to integer
 *       - Push onto stack
 *
 *    b. If token is an operator (+, -, *, /):
 *       - Pop two numbers from stack (b first, then a)
 *       - Calculate: a operator b
 *       - Push result back onto stack
 *
 * 3. After processing all tokens:
 *    - Stack has exactly one number
 *    - That's the final result!
 */

export function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  const operators = new Set(['+', '-', '*', '/']);

  for (const token of tokens) {
    if (operators.has(token)) {
      const b = stack.pop()!;
      const a = stack.pop()!;

      let result: number;

      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          result = Math.trunc(a / b);
          break;
        default:
          throw new Error(`Unknown operator: ${token}`);
      }

      stack.push(result);
    } else {
      stack.push(Number(token));
    }
  }

  return stack[0];
}

/**
 * COMPLEXITY ANALYSIS:
 *
 * Time Complexity: O(n)
 * - n = number of tokens
 * - Process each token exactly once
 * - Each push/pop is O(1)
 * - Total: O(n)
 *
 * Space Complexity: O(n)
 * - Stack stores intermediate results
 * - Worst case: all tokens are numbers
 * - Example: ["1", "2", "3", "4", "5"] → stack has 5 elements
 * - In practice: much less due to operators consuming operands
 * - Average: O(n/2) = O(n)
 */
