"use client";


import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";

export const MembersModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal()

  const isModalOpen = isOpen && type === "members"
  const { server, members } = data

  return ( 
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Manage Members
          </DialogTitle>
          <DialogDescription
            className="text-center text-zinc-500">
            { members?.length } Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          { members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar />
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
   );
}