import { ServerSiderbar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { pool } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const ServerIdLayout = async ({
  children,
  params,
} : {
  children: React.ReactNode,
  params: {
    serverId: string
  }
}) => {
  const profile = await currentProfile()

  if (!profile) {
    return auth().redirectToSignIn()
  }

  const client = await pool.connect()
  const result = await client.query('SELECT * FROM member WHERE serverid = $1 AND profileid = $2 ', [params.serverId, profile.id])
  const server = result.rows[0]
  client.release()

  if (!server) {
    return redirect("/")
  }

  return ( 
    <div className="h-full">
      <div 
      className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSiderbar serverId={params.serverId} />
      </div>
      <main className="h-full md:pl-60">
      {children}
      </main>
    </div>
  );
}

export default ServerIdLayout;