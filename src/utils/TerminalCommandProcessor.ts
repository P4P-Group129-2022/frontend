import { ConsolePrint } from "../types/TerminalTypes";
import {
  commitRepo,
  getRepoStatusForScenario,
  stageAllAndCommitRepo,
  stageAllFilesInRepo,
  stageFileInRepo
} from "../api/Api";
import { TERMINAL_COLORS } from "../theme/colors";
import HTTPStatusCode from "../constants/HTTPStatusCode";

const username = "testUser";
const noOutput = { value: "No output.", color: TERMINAL_COLORS.grey };

async function processGitStatus(): Promise<ConsolePrint> {
  const response = await getRepoStatusForScenario(username);

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
  const input = `git add ${fileNames.join(" ")}`;

  if (fileNames.length === 0) {
    return {
      input,
      output: [
        { value: "Nothing specified, nothing added." },
        { value: "hint: Maybe you wanted to say 'git add .'?" },
        { value: "hint: Turn this message off by running" },
        { value: "hint: \"git config advice.addEmptyPathspec false\"" },
      ]
    };
  } else if (fileNames.length === 1 && fileNames[0] === ".") {
    const response = await stageAllFilesInRepo(username);

    return {
      input,
      output: response.status === HTTPStatusCode.NO_CONTENT ? [noOutput] : [{
        value: "Error staging files.",
        color: TERMINAL_COLORS.red
      }]
    };
  } else {
    const responses = await Promise.all(fileNames.map(async (fileName) => stageFileInRepo(username, fileName)));
    const failedRequests = responses.filter(response => response.status !== HTTPStatusCode.NO_CONTENT);

    return {
      input,
      output: failedRequests.length === 0 ? [noOutput] : [{
        value: "Error staging files.",
        color: TERMINAL_COLORS.red
      }, {
        value: `Failed to stage ${failedRequests.length} files.`,
        color: TERMINAL_COLORS.red
      }, {
        value: `Failed files: ${failedRequests.map(response => response.data?.fileName).join(", ")}`,
      }]
    };
  }
}

async function processGitCommit(args: string[]): Promise<ConsolePrint> {
  const [commitArgs, ...rest] = args;
  const author = { name: "testUser", email: "hpar461@auckland.ac.nz" };
  const branchName = "main";

  if (commitArgs === "-m" || commitArgs === "-am") {
    // Automatically assume that the following argument is the commit message.
    const message = rest[0];
    const request = commitArgs === "-m" ? commitRepo : stageAllAndCommitRepo;
    const response = await request(username, message, author);

    const { commitId, stats } = response.data;
    const shortCommitId = commitId.substring(0, 7);
    const plural = (n: number) => n === 1 ? "" : "s";
    const statsString = [" " + stats.file + " file" + plural(stats.file)];
    if (stats.plus) {
      statsString.push(`${stats.plus} insertion${plural(stats.plus)}(+)`);
    }
    if (stats.minus) {
      statsString.push(`${stats.minus} deletion${plural(stats.minus)}(-)`);
    }

    return {
      input: `git commit ${args.join(" ")}`,
      output: response.status === HTTPStatusCode.CREATED ? [
        { value: `[${branchName} ${shortCommitId}] ${message.substring(1, message.length - 1)}` },
        { value: statsString.join(", ") },
      ] : [
        { value: "Error committing files." }
      ]
    };
  } else {
    return {
      input: "git commit",
      output: [
        commitArgs.includes("-") || commitArgs.includes("--")
          ? { value: "Unknown commit argument." }
          : { value: "No commit option specified." },
        { value: "hint: Use 'git commit -m' followed by a commit message to commit." },
        { value: "hint: Use 'git commit -am' followed by a commit message to stage all files and commit." },
      ]
    };
  }
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