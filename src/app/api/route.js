/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns a test message
 *     description: A simple endpoint to test the API setup
 *     responses:
 *       200:
 *         description: A test message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, API: This is for testing only.
 */
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: `Hello, Ape- I mean hello, API: 
    This is for testing only.`,
  });
}
