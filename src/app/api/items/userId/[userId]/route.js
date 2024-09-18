import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

/**
 * @swagger
 * /api/items/user/{userId}:
 */
export async function GET(request) {
  const userId = request.nextUrl.pathname.split("/").pop();

  if (!userId) {
    return new NextResponse(
      JSON.stringify({ error: "Missing userId in the URL path" }),
      { status: 400 }
    );
  }

  const { data: items, error } = await supabase
    .from("items")
    .select("*")
    .eq("list_id", function () {
      this.from("lists").select("id").eq("user_id", userId);
    });

  if (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  } else {
    return NextResponse.json(items);
  }
}

/**
 * @swagger
 * /api/items/user/{userId}/{itemId}:
 */
export async function DELETE(request) {
  const userId = request.nextUrl.pathname.split("/")[4];
  const itemId = request.nextUrl.pathname.split("/").pop();

  if (!userId || !itemId) {
    return new NextResponse(
      JSON.stringify({ error: "Missing userId or itemId in the URL path" }),
      { status: 400 }
    );
  }

  const { data: list, error: listError } = await supabase
    .from("lists")
    .select("id")
    .eq("user_id", userId)
    .eq("id", function () {
      this.from("items").select("list_id").eq("id", itemId);
    })
    .single();

  if (listError) {
    return new NextResponse(JSON.stringify({ error: listError.message }), {
      status: 500,
    });
  } else if (!list) {
    return new NextResponse(
      JSON.stringify({ error: "Item not found or unauthorized" }),
      { status: 404 }
    );
  }

  const { data: deletedItem, error: deleteError } = await supabase
    .from("items")
    .delete()
    .eq("id", itemId)
    .single();

  if (deleteError) {
    return new NextResponse(JSON.stringify({ error: deleteError.message }), {
      status: 500,
    });
  } else {
    return new NextResponse(JSON.stringify(deletedItem), {
      status: 200,
    });
  }
}
