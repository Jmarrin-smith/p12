import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request, { params }) {
  const userId = params.userId;

  const { data: votes, error } = await supabase
    .from("votes")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return NextResponse.json(votes);
  }
}

export async function DELETE(request, { params }) {
  const userId = params.userId;

  const { error } = await supabase.from("votes").delete().eq("user_id", userId);

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(null, { status: 204 });
  }
}
