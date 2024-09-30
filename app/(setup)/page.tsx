import { InitialModal } from "@/components/modals/initial-modal";
import { pool } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await initialProfile();
  const client = await pool.connect()

    
  const result = await client.query('SELECT * FROM member WHERE profileId = $1', [profile.id])
  const server = result.rows[0]
  client.release()

  if (server){
    console.log("server", server);
    
    return redirect(`/servers/${server.serverid}`)
  }

  return <InitialModal />
}

export default SetupPage;