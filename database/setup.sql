CREATE TYPE member_type AS ENUM('ADMIN', 'MODERATOR', 'GUEST');
CREATE TYPE channel_type AS ENUM('TEXT', 'AUDIO', 'VIDEO');

CREATE TABLE Profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  imageUrl TEXT,
  email TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Server (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  imageUrl TEXT,
  inviteCode VARCHAR(255) UNIQUE NOT NULL,
  profileId UUID NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_profile FOREIGN KEY(profileId) REFERENCES Profile(id) ON DELETE CASCADE
);

CREATE TABLE Member (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role member_type DEFAULT 'GUEST',  -- Assuming 'GUEST' as a default enum value
    profileId UUID NOT NULL,
    serverId UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_profile_member FOREIGN KEY(profileId) REFERENCES Profile(id) ON DELETE CASCADE,
    CONSTRAINT fk_server_member FOREIGN KEY(serverId) REFERENCES Server(id) ON DELETE CASCADE
);

CREATE TABLE Channel (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    type channel_type DEFAULT 'TEXT',  -- Assuming 'TEXT' as a default enum value
    profileId UUID NOT NULL,
    serverId UUID NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_profile_channel FOREIGN KEY(profileId) REFERENCES Profile(id) ON DELETE CASCADE,
    CONSTRAINT fk_server_channel FOREIGN KEY(serverId) REFERENCES Server(id) ON DELETE CASCADE
);
