export type Author = {
  name: string;
  email: string;
}

export type CommitResponse = {
  commitId: string,
  stats: {
    file: number,
    plus: number,
    minus: number
  }
};
