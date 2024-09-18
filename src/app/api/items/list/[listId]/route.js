import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  const { listId } = params;

  // Get items with the specifiec list Id
  const { data: items, error } = await supabase
    .from("items")
    .select("*")
    .eq("list_id", listId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return NextResponse.json(items);
  }
}
