import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request) {
  // Get all lists in the database
  const { data: lists, error } = await supabase.from("lists").select("*");

  if (error) {
    // 500 server error if cannot connect to DB
    return (
      new NextResponse(JSON.stringify({ error: error.message })),
      {
        status: 500,
      }
    );
  } else return NextResponse.json(lists);
}

/**
 * @swagger
 * /api/lists:
 */
export async function POST(request) {
  //body conatains list_name and user_id
  const { list_name, user_id } = await request.json();

  if (!list_name || !user_id) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required fields" }),
      { status: 400 }
    );
  }

  const { data: newList, error } = await supabase
    .from("lists")
    .insert({ list_name, user_id })
    .select("*")
    .single();

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    console.log(newList);
    return new NextResponse(
      `New list, "${list_name}", created with id: ${newList.id}`,
      {
        status: 201,
      }
    );
  }
}
