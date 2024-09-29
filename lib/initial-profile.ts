import { auth, currentUser } from "@clerk/nextjs/server"
import { pool } from "./db";



export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    return auth().redirectToSignIn()
  }
  const client = await pool.connect()

  try {

    const res = await client.query('SELECT * from profile where userId = $1', [user.id]);
    
    const profile = res.rows[0]
    if (profile) {
      return profile
    }
    const email = user.emailAddresses[0].emailAddress; // Assuming the first email is the primary one
    const imageUrl = user.imageUrl || ''; // Assuming imageUrl is nullable
    const result = await client.query('INSERT INTO profile (userId, name, imageUrl, email) VALUES ($1, $2, $3, $4) RETURNING *', [user.id, `${user.firstName} ${user.lastName}`, imageUrl, email])
    const newProfile = result.rows[0]    

    return newProfile
  } catch (error) {
    console.error('Error creating or fetching profile:', error);
    throw error;
  } finally {
    client.release()
  }
}