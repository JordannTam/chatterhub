import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const { name, imageUrl } = await req.json()
    const profile = await currentProfile()

    if (!profile) {
      return new NextResponse("Unauthorized", {status: 401})
    }

    const client = await pool.connect()

    const result = await client.query('INSERT INTO server (profileId, name, imageUrl, inviteCode) VALUES ($1, $2, $3, $4) RETURNING *', 
      [profile.id, name, imageUrl, uuidv4()])
    const server = result.rows[0]

    await client.query('INSERT INTO channel (name, profileId, serverId) VALUES ($1, $2, $3)', 
      ['general', profile.id, server.id])
    await client.query('INSERT INTO member (profileId, role, serverId) VALUES ($1, $2, $3)',
      [profile.id, 'ADMIN', server.id]
    )

    return NextResponse.json(server)

    
  } catch (error) {
    console.log("[SERVERS_POST]", error);
    return new NextResponse("Internal Error", {status: 500})
  }
}