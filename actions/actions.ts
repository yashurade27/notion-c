"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblock";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  const authInstance = await auth();
  if (!authInstance.userId) {
    throw new Error("Unauthorized: User is not authenticated.");
  }

  const doCollectionRef = adminDb.collection("documents");
  const docsRef = await doCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    .doc(authInstance.userId)
    .collection("rooms")
    .doc(docsRef.id)
    .set({
      userId: authInstance.userId,
      role: "owner",
      createdAt: new Date(),
      roomId: docsRef.id,
    });

  return {
    docId: docsRef.id,
  };
}

export async function deleteDocument(roomId:string) {
  console.trace("deleteDocument triggered");
  const authInstance = await auth();
  if (!authInstance.userId) {
    throw new Error("Unauthorized: User is not authenticated.");
  }
  console.log("Deleting document with ID:", roomId);
  try {
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
    .collection("rooms")
    .where("roomId", "==", roomId)
    .get();

    const batch = adminDb.batch();
    query.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
    await liveblocks.deleteRoom(roomId);

    console.log("Document deleted successfully");
    return { success: true };

  } catch (error) {
    console.error("Error deleting document:", error);
    return { success: false };
  }
}


export async function inviteUserToDocument(roomId: string, email: string) {
  const authInstance = await auth();
  if (!authInstance.userId) {
    throw new Error("Unauthorized: User is not authenticated.");
  }

  console.log("Inviting user with email:", email, roomId);
  try {
    // 🔍 Find the user by email
    const invitedUserSnap = await adminDb
      .collection("users")
      .where("email", "==", email)
      .limit(1)
      .get();

    if (invitedUserSnap.empty) {
      throw new Error("No user found with that email.");
    }

    const invitedUser = invitedUserSnap.docs[0];
    const invitedUserId = invitedUser.id;

    // ✅ Add room to the invited user's "rooms" subcollection
    await adminDb
      .collection("users")
      .doc(invitedUserId)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: invitedUserId,
        role: "editor",
        createdAt: new Date(),
        roomId: roomId,
      });

    return { success: true };
  } catch (error) {
    console.error("Error inviting user:", error);
    return { success: false };
  }
}
