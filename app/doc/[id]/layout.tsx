import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RoomProvider";

const DocLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params; // await params because it's a Promise now

  // Perform authentication check
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  );
};

export default DocLayout;
