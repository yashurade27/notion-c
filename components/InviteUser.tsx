"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { inviteUserToDocument } from "@/actions/actions";
import { toast } from "sonner";
import { Input } from "./ui/input";

const InviteUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleInvite = async (e: FormEvent) => {
    e.preventDefault();

    const roomId = pathname.split("/").pop();
    if (!roomId) {
      toast.error("Invalid room ID");
      return;
    }

    startTransition(async () => {
      const { success } = await inviteUserToDocument(roomId, email);
      if (success) {
        setIsOpen(false);
        setEmail("");
        toast.success("User invited successfully");
      } else {
        toast.error("Error inviting user");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant="outline">
        <DialogTrigger asChild>
          <button type="button">Invite</button>
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite a User to collabrate!</DialogTitle>
          <DialogDescription>
            Enter the email address of the user you want to invite to this
            document.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleInvite} className="flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter email address"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <DialogFooter className="justify-end gap-2">
            <Button type="submit" variant="outline" disabled={isPending}>
              {isPending ? "Inviting..." : "Invite"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
