import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  const listId = params.listId;

  const { data: votes, error } = await supabase
    .from("votes")
    .select("*")
    .eq("list_id", listId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return NextResponse.json(votes);
  }
}

export async function DELETE(request, { params }) {
  const listId = params.listId;

  const { error } = await supabase.from("votes").delete().eq("list_id", listId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(null, { status: 204 });
  }
}
