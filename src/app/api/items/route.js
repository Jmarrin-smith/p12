import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

async function fetchImageUrl(itemName) {
  const searchTerm = encodeURIComponent(itemName);

  const apiKey = "<Openverse API token>";

  const response = await fetch(
    `https://api.openverse.org/v1/images/?q=${searchTerm}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch image from Openverse:", response.statusText);
    return null;
  }

  const data = await response.json();

  if (data.results && data.results.length > 0) {
    console.log("Fetched Image URL:", data.results[0].url); /
    return data.results[0].url; 
  }

  console.warn("No images found for:", itemName); 
  return null; 
}


export async function POST(request) {
  const { name, elo = 400, list_id } = await request.json();

  
  if (!name || !list_id) {
    return new NextResponse(
      JSON.stringify({ error: "Missing required fields (name, list_id)" }),
      { status: 400 }
    );
  }

  
  const image_url = await fetchImageUrl(name);

  
  const { data: newItem, error } = await supabase
    .from("items")
    .insert({
      name,
      elo,
      image_url, 
      list_id,
    })
    .select("*")
    .single();

  if (error) {
    console.error("Error adding item:", error.message); 
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(newItem), {
    status: 201,
  });
}
