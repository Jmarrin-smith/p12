import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * @swagger
 * /api/votes:
 *   get:
 *     summary: Get all votes
 *     description: Retrieves all votes from the database.
 *     responses:
 *       200:
 *         description: A list of votes.
 *       500:
 *         description: Internal server error.
 *   post:
 *     summary: Create a new vote
 *     description: Creates a new vote in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who cast the vote.
 *               listId:
 *                 type: integer
 *                 description: The ID of the list the vote belongs to.
 *               item1Id:
 *                 type: integer
 *                 description: The ID of the first item in the vote.
 *               item2Id:
 *                 type: integer
 *                 description: The ID of the second item in the vote.
 *               winnerId:
 *                 type: integer
 *                 description: The ID of the winning item.
 *               eloChangeItem1:
 *                 type: integer
 *                 description: The Elo change for the first item.
 *               eloChangeItem2:
 *                 type: integer
 *                 description: The Elo change for the second item.
 *     responses:
 *       201:
 *         description: Vote created successfully.
 *       400:
 *         description: Bad request - missing required fields.
 *       500:
 *         description: Internal server error.
 */

export async function GET() {
  const { data: votes, error } = await supabase.from("votes").select("*");

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return NextResponse.json(votes);
  }
}

export async function POST(request) {
  const {
    userId,
    listId,
    item1Id,
    item2Id,
    winnerId,
    eloChangeItem1,
    eloChangeItem2,
  } = await request.json();

  if (!userId || !listId || !item1Id || !item2Id || !winnerId) {
    return new NextResponse(
      JSON.stringify({
        error: "Missing required fields for creating a vote.",
      }),
      { status: 400 }
    );
  }

  const { data: newVote, error } = await supabase
    .from("votes")
    .insert({
      userId,
      listId,
      item1Id,
      item2Id,
      winnerId,
      eloChangeItem1,
      eloChangeItem2,
    })
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(JSON.stringify(`Vote created successfully`), {
      status: 201,
    });
  }
}
