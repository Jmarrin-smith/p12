import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  const listName = params.name; // Extract the list name from the URL parameter

  const { data: lists, error } = await supabase
    .from("lists")
    .select("*")
    .eq("list_name", listName);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    }); // 500 Internal Server Error
  } else if (lists.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: "No lists found with that name" }),
      { status: 404 }
    ); // 404 Not Found
  } else {
    return NextResponse.json(lists); // 200 OK with the list data (potentially an array of lists)
  }
}

// Probably will not use! Just made this incase as its boilerplate anyway.
export async function DELETE(request, { params }) {
  const listName = params.name;

  const { data: deletedLists, error } = await supabase
    .from("lists")
    .delete()
    .eq("list_name", listName);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(
      JSON.stringify({
        message: `Deleted ${deletedLists.length} lists with name '${listName}'`,
      }),
      { status: 200 }
    );
  }
}
