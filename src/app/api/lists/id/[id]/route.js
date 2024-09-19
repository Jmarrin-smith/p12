import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  const listId = params.id;

  const { data: list, error } = await supabase
    .from("lists")
    .select("*")
    .eq("id", listId)
    .select("*")
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else if (!list) {
    return new NextResponse(JSON.stringify({ error: "List not found" }), {
      status: 404,
    });
  } else {
    return NextResponse.json(list);
  }
}

export async function DELETE(request, { params }) {
  const listId = params.id;

  const { error } = await supabase.from("lists").delete().eq("id", listId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(null, { status: 204 });
  }
}
