import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * @swagger
 * /api/votes:
 */
export async function GET(request) {
  // Get all votes in the database
  const { data: votes, error } = await supabase.from("votes").select("*");

  if (error) {
    // 500 server error if cannot connect to DB
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return NextResponse.json(votes);
  }
}

/**
 * @swagger
 * /api/votes:
 */
export async function POST(request) {
  // Body contains user_id, list_id, item1_id, item2_id, and winner_id
  const { user_id, list_id, item1_id, item2_id, winner_id } =
    await request.json();

  // Basic validation - ensure required fields are present
  if (!user_id || !list_id || !item1_id || !item2_id || !winner_id) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400 }
    );
  }

  const elo_change_item_1 = 0;
  const elo_change_item_2 = 0;

  const { data: newVote, error } = await supabase
    .from("votes")
    .insert({
      user_id,
      list_id,
      item1_id,
      item2_id,
      winner_id,
      elo_change_item_1,
      elo_change_item_2,
    })
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(JSON.stringify(newVote), {
      status: 201,
    });
  }
}
