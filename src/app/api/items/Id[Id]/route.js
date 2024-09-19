import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(request, { params }) {
  const { id } = params;
  const { elo } = await request.json();

  if (!elo || !id) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required fields (elo, id)" }),
      { status: 400 }
    );
  }

  const { data: updatedItem, error } = await supabase
    .from("items")
    .update({ elo })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("Error updating item:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(updatedItem), {
    status: 200,
  });
}
