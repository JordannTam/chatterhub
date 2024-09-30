import { currentProfile } from "@/lib/current-profile";
import { pool } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string
  }
}

const InviteCodePage = async ({
  params
}: InviteCodePageProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return auth().redirectToSignIn()
  }

  if (!params.inviteCode) {
    return redirect("/")
  }
  

  const client = await pool.connect()

  const result = await client.query('SELECT s.id FROM server s join member m ON s.profileid = m.profileid WHERE invitecode = $1 AND m.profileid = $2', [params.inviteCode, profile.id])
  const existingServer = result.rows?.[0]

  

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  const result_server = await client.query('SELECT * FROM server WHERE invitecode = $1', [params.inviteCode])
  const server = result_server.rows[0]

  

  if (server) {
    await client.query(`INSERT INTO member (profileId, serverId) VALUES ($1, $2)`, [profile.id, server.id])
    client.release()
    return redirect(`/servers/${server.id}`)
  }

  client.release()

  return redirect("/")
}
 
export default InviteCodePage;