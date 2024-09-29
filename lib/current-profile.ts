import { auth } from "@clerk/nextjs/server";
import { pool } from "./db";

export const currentProfile = async () => {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const client = await pool.connect()
  const result = await client.query('SELECT * FROM profile WHERE userId = $1', [userId])
  const profile = result.rows[0]

  return profile

}