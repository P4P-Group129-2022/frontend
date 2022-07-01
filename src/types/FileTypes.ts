export type File = {
  name: string;
  isFolder: boolean;
  contents?: string;
  folderContents?: File[];
}