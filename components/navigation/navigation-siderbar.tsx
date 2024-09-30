import { currentProfile } from "@/lib/current-profile"
import { pool } from "@/lib/db";
import { redirect } from "next/navigation";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NaviagtionItem } from "./navigation-item";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/")
  }

  const client = await pool.connect()
  const result = await client.query('SELECT s.id, s.name, s.imageurl, s.invitecode, s.profileid, s.createdat, s.updatedat FROM server s join member m on s.id = m.serverid WHERE m.profileId = $1', [profile.id])
  const servers = result.rows
  
  client.release()
  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator 
        className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto"/>
      <ScrollArea className="flex-1 w-full">
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NaviagtionItem
            id={server.id}
            imageUrl={server.imageurl}
            name={server.name} />
          </div>
        ))}
      </ScrollArea>
      <div className="flex pb-3 mt-auto items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]"
            }
          }}
        />
      </div>

    </div>
  )
}