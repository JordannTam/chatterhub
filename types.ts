
export type Profile = {
  id: string,
  userid: string,
  name: string,
  imageurl: string,
  email: string,
  createdat: string,
  updatedat: string
}

export type Server = {
  id: string,
  name: string,
  imageurl: string,
  invitecode: string,
  profileid: string,
  createdat: string,
  updatedat: string,
}

export type Member = {
  id: string,
  role: 'ADMIN' | 'MODERATOR' | 'GUEST',
  profileid: string,
  serverid: string,
  createdat: object,
  updatedat: object,
}

export type Channel = {
  id: string,
  name: string,
  type: 'TEXT' | 'AUDIO' | 'VIDEO',
  profileId: string,
  serverId: string,
  createdAt: object,
  updatedAt: object
}


// CREATE TABLE Profile (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   userId VARCHAR(255) UNIQUE NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   imageUrl TEXT,
//   email TEXT,
//   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE Server (
//   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//   name VARCHAR(255) NOT NULL,
//   imageUrl TEXT,
//   inviteCode VARCHAR(255) UNIQUE NOT NULL,
//   profileId UUID NOT NULL,
//   createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   CONSTRAINT fk_profile FOREIGN KEY(profileId) REFERENCES Profile(id) ON DELETE CASCADE
// );

// CREATE TABLE Member (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     role member_type DEFAULT 'GUEST',  -- Assuming 'GUEST' as a default enum value
//     profileId UUID NOT NULL,
//     serverId UUID NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT fk_profile_member FOREIGN KEY(profileId) REFERENCES Profile(id) ON DELETE CASCADE,
//     CONSTRAINT fk_server_member FOREIGN KEY(serverId) REFERENCES Server(id) ON DELETE CASCADE
// );

// CREATE TABLE Channel (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     name VARCHAR(255) NOT NULL,
//     type channel_type DEFAULT 'TEXT',  -- Assuming 'TEXT' as a default enum value
//     profileId UUID NOT NULL,
//     serverId UUID NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     CONSTRAINT fk_profile_channel FOREIGN KEY(profileId) REFERENCES Profile(id) ON DELETE CASCADE,
//     CONSTRAINT fk_server_channel FOREIGN KEY(serverId) REFERENCES Server(id) ON DELETE CASCADE
// );
