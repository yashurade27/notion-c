import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/RoomProvider";

const DocLayout = async ({ children, params }: {
  children: React.ReactNode;
  params: { id: string };
}) => {
  // Await params to ensure we get the dynamic `id`
  const { id } = await params;

  // Perform authentication check
  const { userId } = await auth();

  // If user is not authenticated, throw an error
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
