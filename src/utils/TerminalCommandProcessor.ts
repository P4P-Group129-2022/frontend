import { ConsolePrint } from "../types/TerminalTypes";
import { getRepoStatusForScenario } from "../api/Api";
import { TERMINAL_COLORS } from "../theme/colors";

async function processGitStatus(): Promise<ConsolePrint> {
  const response = await getRepoStatusForScenario("test1");

  const onBranchMain = `On branch main`;
  const nothingToCommit = `nothing to commit, working tree clean`;
  const changesNotStaged = `Changes not staged for commit:`;
  const changesToCommit = `Changes to be committed:`;
  const useGitAdd = `  (use "git add <file>..." to update what will be committed)`;
  const useGitRestoreUnstaged = `  (use "git restore <file>..." to discard changes in working directory)`;
  const useGitRestoreStaged = `  (use "git restore --staged <file>..." to unstage)`;
  const modifiedMain = `        modified:   main.py`;
  const noChangesAddedToCommit = `\nno changes added to commit (use "git add" and/or "git commit -a")`;

  switch (response.data.status) {
    case "modified":
      return {
        input: "git status",
        output: [
          { value: onBranchMain },
          { value: changesToCommit },
          { value: useGitRestoreStaged },
          { value: modifiedMain, color: TERMINAL_COLORS.green },
        ]
      };
    case "*modified":
      return {
        input: "git status",
        output: [
          { value: onBranchMain },
          { value: changesNotStaged },
          { value: useGitAdd },
          { value: useGitRestoreUnstaged },
          { value: modifiedMain, color: TERMINAL_COLORS.red },
          { value: noChangesAddedToCommit },
        ]
      };
    case "unmodified":
      return {
        input: "git status",
        output: [
          { value: onBranchMain },
          { value: nothingToCommit },
        ]
      };
    default:
      return {
        input: "git status",
        output: [
          { value: "Unknown isomorphic git status return value:" },
          { value: `Value: ${response.data.status}` },
        ]
      };
  }
}

async function processGitAdd(fileNames: string[]): Promise<ConsolePrint> {
  // please implement these when you connect it with the backend.
  return { input: "git add", output: [{ value: `"git add" not implemented yet.` }] };
}

async function processGitCommit(args: string[]): Promise<ConsolePrint> {
  // please implement these when you connect it with the backend.
  return { input: "git commit", output: [{ value: `"git commit" not implemented yet.` }] };
}

async function processGitPush(args: string[]): Promise<ConsolePrint> {
  // please implement these when you connect it with the backend.
  return { input: "git push", output: [{ value: `"git push" not implemented yet.` }] };
}

export async function processCommands(command: string): Promise<ConsolePrint> {
  const [commandType, gitCommand, ...args] = command.split(/\s+(?=(?:[^'"]*['"][^'"]*['"])*[^'"]*$)/);

  if (commandType !== "git") {
    return { input: command, output: [{ value: `"${command}" is not a git command.` }] };
  } else {
    switch (gitCommand) {
      case "status":
        return processGitStatus();
      case "add":
        return processGitAdd(args);
      case "commit":
        return processGitCommit(args);
      case "push":
        return processGitPush(args);
      default:
        return {
          input: command,
          output: [{
            value: `"${commandType} ${gitCommand}" is either not a valid git command or it hasn't been implemented yet.`
          }]
        };
    }
  }
}