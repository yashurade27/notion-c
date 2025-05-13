import { auth } from "@clerk/nextjs/server";
import { users } from "@clerk/clerk-sdk-node";
import liveblocks from "@/lib/liveblock";
import { adminDb } from "@/firebase-admin";

export const POST = async (req: Request) => {
  try {
    // Get Clerk auth
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized: Missing userId", { status: 401 });
    }

    const user = await users.getUser(userId);

    if (!user || !user.emailAddresses[0]?.emailAddress) {
      return new Response("Unauthorized: Missing user profile info", { status: 401 });
    }

    const email = user.emailAddresses[0].emailAddress;
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous";
    const image = user.imageUrl || "";

    // ✅ Log successful authorization
    console.log("✅ Authorized:", { userId, email });

    const { room } = await req.json();

    const session = liveblocks.prepareSession(email, {
      userInfo: {
        name: fullName,
        email: email,
        avatar: image,
      },
    });

    const usersInRoom = await adminDb
      .collection("rooms")
      .where("userId", "==", email)
      .get();

    const userInRoom = usersInRoom.docs.find((doc) => doc.id === room);

    if (!userInRoom?.exists) {
      session.allow(room, session.FULL_ACCESS);
      const { body: bodyString, status } = await session.authorize();
      if (status !== 200) {
        return new Response("Error generating Liveblocks token", { status: 500 });
      }

      return new Response(bodyString, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Still return session token if user already in room
    const { body: bodyString, status } = await session.authorize();
    return new Response(bodyString, {
      status: status,
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("❌ Error in POST /api/auth-endpoint:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
