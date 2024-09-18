import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
export async function GET(request) {
  const { userId } = auth();

  if (userId) {
    try {
      const user = await clerkClient.users.getUser(userId);
      const username = user.username;
      const user_id = user.id;
      return NextResponse.json({ username, user_id }, { status: 200 });
    } catch (error) {
      return new NextResponse("Error fetching user data.", { status: 500 });
    }
  } else {
    return new NextResponse("Please log in.", { status: 401 });
  }
}
