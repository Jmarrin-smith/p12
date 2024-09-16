import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  const userId = params.user_id;

  const { data: lists, error } = await supabase
    .from("lists")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else if (lists.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: "No lists found for that user" }),
      { status: 404 }
    );
  } else {
    return NextResponse.json(lists);
  }
}

export async function DELETE(request, { params }) {
  const userId = params.user_id;

  const { data: deletedLists, error } = await supabase
    .from("lists")
    .delete()
    .eq("user_id", userId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(
      JSON.stringify({
        message: `Deleted ${deletedLists.length} lists for user with ID ${userId}`,
      }),
      { status: 200 }
    );
  }
}
