import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET /api/list - Get all items in the database
export async function GET(request) {
  const { data: items, error } = await supabase.from("items").select("*");

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return NextResponse.json(items);
  }
}

// POST /api/list - Create a new item
export async function POST(request) {
  // Body contains name, elo (optional), image_url (optional), and list_id
  const { name, elo = 400, image_url, list_id } = await request.json();

  // Basic validation
  if (!name || !list_id) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required fields (name, list_id)" }),
      { status: 400 }
    );
  }

  const { data: newItem, error } = await supabase
    .from("items")
    .insert({
      name,
      elo,
      image_url,
      list_id,
    })
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(JSON.stringify(newItem), {
      status: 201,
    });
  }
}
