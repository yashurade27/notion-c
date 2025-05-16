import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react/suspense";
import { collectionGroup, query, where } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useEffect, useState } from "react";

const useOwner = () => {
  const { user } = useUser();
  const room = useRoom();
  const [isOwner, setIsOwner] = useState(false);

  // Only construct query when user and room are ready
  const q =
    user && room?.id
      ? query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
      : null;

  const [usersInRoom, loading] = useCollection(q);

  useEffect(() => {
    if (loading || !usersInRoom) return;

    const owners = usersInRoom.docs.filter(
      (doc) => doc.data().role === "owner"
    );

    const isCurrentUserOwner = owners.some(
      (owner) => owner.data().userId === user?.id // Compare to Clerk user ID
    );

    setIsOwner(isCurrentUserOwner);
  }, [usersInRoom, user, loading]);

  return isOwner;
};

export default useOwner;
