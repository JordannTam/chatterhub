import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request,
  { params }: {params: {serverId: string}}) {
    const client = await pool.connect()

    try {
      const profile = await currentProfile()
      if (!profile) {
        return new NextResponse("Unauthorized", {status: 401})
      }

      if(!params.serverId) {
        return new NextResponse("Server ID Missing", {status: 400})
      }

      const result = await client.query(`UPDATE server SET invitecode = $1 WHERE id = $2 AND profileid = $3 RETURNING *`, [ uuidv4(), params.serverId, profile.id])
      const server = result?.rows[0]
      

      return NextResponse.json(server)

    } catch (error) {
      console.log("[SERVERS_POST]", error);
      return new NextResponse("Internal Error", {status: 500})
    } finally {
      client.release()
    }
  }
