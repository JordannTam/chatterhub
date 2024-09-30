import { currentProfile } from "@/lib/current-profile";
import { pool } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { Channel } from "@/types";

interface ServerSidebarProps {
  serverId: string;
}

export const ServerSiderbar = async ({
  serverId
} : ServerSidebarProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return auth().redirectToSignIn()
  }

  const client = await pool.connect()
  const result = await client.query('SELECT * FROM server WHERE id = $1', [serverId])
  const server = result.rows[0]
  const result_channel = await client.query('SELECT * FROM channel WHERE serverid = $1 ORDER BY createdAt ASC', [serverId])
  const channels:Channel[] = result_channel.rows
  const result_member = await client.query('SELECT * FROM member WHERE serverid = $1 ORDER BY role ASC', [serverId])
  const memberLs = result_member.rows  

  const members = memberLs.filter((member) => member.profileid !== profile.id)
  const textChannels = channels.filter((channel) => channel.type === "TEXT")
  const audioChannels = channels.filter((channel) => channel.type === "AUDIO")
  const videoChannels = channels.filter((channel) => channel.type === "VIDEO")
  const role = memberLs.find((member) => member.profileid === profile.id)?.role;

  client.release()

  if (!server) {
    return redirect("/")
  }

  return ( 
    <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]">
      <ServerHeader
        server={server}
        members={memberLs}
        channels={channels}
        profile={profile}
        role={role}
        />
    </div>
  );
}