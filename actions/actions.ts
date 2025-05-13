"use server";

import { adminDb } from "@/firebase-admin";
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
