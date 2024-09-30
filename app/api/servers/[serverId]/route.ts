import { currentProfile } from "@/lib/current-profile";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request, 
  { params }
  : { params: { serverId: string }}) {

  const client = await pool.connect()

  try {
    const profile = await currentProfile()
    const { name, imageUrl } = await req.json()

    if (!profile) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const result = await client.query('UPDATE server SET name = $1, imageurl = $2 WHERE id = $3 AND profileid = $4 RETURNING *', [name, imageUrl, params.serverId, profile.id])
    const server = result?.rows[0]
    
    return NextResponse.json(server)
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", {status: 500})
  } finally {
    client.release()
  }
}
