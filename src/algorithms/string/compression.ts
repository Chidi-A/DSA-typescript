/**
 * PROBLEM: Compress Dinosaur DNA Sequence (Medium-Hard)
 * Category: String Compression / Run-Length Encoding
 *
 * Description:
 * Dinosaur DNA sequences can be very long! Implement Run-Length Encoding
 * to compress sequences. RLE replaces consecutive repeated characters with
 * the character followed by the count.
 *
 * Example:
 * compressDNA("AAABBC");
 * // Returns: "A3B2C" (3 A's, 2 B's, 1 C)
 *
 * compressDNA("AAAAAAAAAATTTTGGGGCCCC");
 * // Returns: "A10T4G4C4"
 *
 * compressDNA("ABCDEF");
 * // Returns: "ABCDEF" (no repeats, stays same)
 *
 * compressDNA("AABBCCDDEE");
 * // Returns: "A2B2C2D2E2"
 *
 * decompressDNA("A3B2C");
 * // Returns: "AAABBC" (expands back)
 *
 * Rules:
 * - Only compress if character repeats 2+ times
 * - Single characters stay as-is (not "A1")
 * - Case-sensitive
 *
 * Constraints:
 * - sequence.length >= 0
 * - DNA contains A, T, G, C (and possibly others)
 * - Must be reversible: decompressDNA(compressDNA(s)) === s
 */

// ============================================================================
// ALGORITHM IN PLAIN ENGLISH
// ============================================================================

/**
 * RUN-LENGTH ENCODING (RLE) ALGORITHM
 *
 * WHAT IS RLE?
 * A simple form of data compression where sequences of identical
 * characters are replaced with: character + count
 *
 * Example: "AAAA" → "A4" (4 A's)
 *
 * ============================================================================
 * PART 1: COMPRESSION ALGORITHM
 * ============================================================================
 *
 * Goal: Transform "AAABBC" → "A3B2C"
 *
 * STEP-BY-STEP PROCESS:
 *
 * 1. INITIALIZE
 *    - compressed = "" (empty result string)
 *    - i = 0 (position in input)
 *
 * 2. WHILE there are characters left:
 *    a. GET CURRENT CHARACTER
 *       - currentChar = sequence[i]
 *       - This is the character we're counting
 *
 *    b. COUNT CONSECUTIVE OCCURRENCES
 *       - count = 0
 *       - While sequence[i] === currentChar:
 *         • count++
 *         • i++
 *       - Keep going until different character found
 *
 *    c. BUILD COMPRESSED OUTPUT
 *       - Add the character: compressed += currentChar
 *       - If count > 1: Add the count: compressed += count
 *       - If count === 1: Skip the count (just the character)
 *
 * 3. RETURN compressed string
 *
 * Visual Example: "AAABBC"
 *
 * Step 1: i=0
 *   currentChar = 'A'
 *   Count A's: position 0,1,2 → count=3, i=3
 *   Output: "A3"
 *
 * Step 2: i=3
 *   currentChar = 'B'
 *   Count B's: position 3,4 → count=2, i=5
 *   Output: "A3B2"
 *
 * Step 3: i=5
 *   currentChar = 'C'
 *   Count C's: position 5 → count=1, i=6
 *   Output: "A3B2C" (no count for 1)
 *
 * Step 4: i=6 (end of string)
 *   Exit loop
 *   Final: "A3B2C"
 *
 * ============================================================================
 * PART 2: DECOMPRESSION ALGORITHM
 * ============================================================================
 *
 * Goal: Transform "A3B2C" → "AAABBC"
 *
 * STEP-BY-STEP PROCESS:
 *
 * 1. INITIALIZE
 *    - decompressed = "" (empty result)
 *    - i = 0 (position in compressed string)
 *
 * 2. WHILE there are characters left:
 *    a. READ CHARACTER
 *       - char = compressed[i]
 *       - i++
 *
 *    b. READ COUNT (if exists)
 *       - countStr = ""
 *       - While next character is a digit:
 *         • countStr += compressed[i]
 *         • i++
 *       - If countStr is empty: count = 1
 *       - Else: count = parseInt(countStr)
 *
 *    c. EXPAND CHARACTER
 *       - Repeat char 'count' times
 *       - decompressed += char.repeat(count)
 *
 * 3. RETURN decompressed string
 *
 * Visual Example: "A3B2C"
 *
 * Step 1: i=0
 *   char = 'A', i=1
 *   Read digits: '3', i=2
 *   count = 3
 *   Output: "AAA"
 *
 * Step 2: i=2
 *   char = 'B', i=3
 *   Read digits: '2', i=4
 *   count = 2
 *   Output: "AAABB"
 *
 * Step 3: i=4
 *   char = 'C', i=5
 *   No digits, count = 1
 *   Output: "AAABBC"
 *
 * Step 4: i=5 (end)
 *   Final: "AAABBC" ✓
 *
 * KEY INSIGHT: Handle multi-digit numbers!
 * "A10" means 10 A's, not A and 1 and 0
 * Need to read ALL consecutive digits
 */

export function compressDNA(sequence: string): string {
  if (sequence.length === 0) {
    return '';
  }

  let compressed = '';
  let i = 0;

  while (i < sequence.length) {
    const currentChar = sequence[i];
    let count = 0;

    while (i < sequence.length && sequence[i] === currentChar) {
      count++;
      i++;
    }

    compressed += currentChar;

    if (count > 1) {
      compressed += count;
    }
  }

  return compressed;
}

export function decompressDNA(compressed: string): string {
  if (compressed.length === 0) {
    return '';
  }

  let decompressed = '';
  let i = 0;

  while (i < compressed.length) {
    const char = compressed[i];
    i++;

    let countStr = '';
    while (i < compressed.length && /\d/.test(compressed[i])) {
      countStr += compressed[i];
      i++;
    }

    const count = countStr ? parseInt(countStr, 10) : 1;

    decompressed += char.repeat(count);
  }

  return decompressed;
}
