import { currentProfile } from "@/lib/current-profile"
import { pool } from "@/lib/db";
import { redirect } from "next/navigation";

export const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/")
  }

  const client = await pool.connect()
  const result = await client.query('SELECT * FROM server WHERE profileId = $1', [profile.id])
  const servers = result.rows
  return (
    <div
      className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      Sidebar
    </div>
  )
}