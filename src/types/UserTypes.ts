export type User = {
  username: string,
  email: string,
  name: string,
  avatarUrl: string,
  completedPreTest: boolean,
}

export type DBUserResponse = {
  userFromDB: DBUser
}

export type DBUser = {
  githubUsername: string,
  email: string,
  displayName: string,
  completedPreTest: boolean,
}