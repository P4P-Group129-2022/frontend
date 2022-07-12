export type Author = {
  name: string;
  email: string;
}

export type StatusResponse = {
  status: string;
}

export type StageResponse = { fileName: string } | void

export type CommitResponse = {
  commitId: string,
  stats: {
    file: number,
    plus: number,
    minus: number
  }
};
