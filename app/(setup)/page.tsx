import { InitialModal } from "@/components/modals/initial-modal";
import { pool } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";
import { useDebugValue } from "react";

const SetupPage = async () => {
  const profile = await initialProfile();
  const client = await pool.connect()

  try {
    useDebugValue(profile);
    
    const result = await client.query('SELECT * FROM server WHERE profileId = $1', [profile.id])
    const server = result.rows[0]
    client.release()

    if (server){
      return redirect(`/server/${server.id}`)
    }

  } catch (error) {
    console.error(error);
  }
  

  return <InitialModal />
}

export default SetupPage;