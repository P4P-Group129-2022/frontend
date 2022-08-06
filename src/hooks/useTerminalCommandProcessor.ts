import { ConsolePrint } from "../types/TerminalTypes";
import {
  branch, checkout,
  commitRepo,
  getRepoStatusForScenario, pushRepo,
  stageAllAndCommitRepo,
  stageAllFilesInRepo,
  stageFileInRepo
} from "../api/Api";
import { TERMINAL_COLORS } from "../theme/colors";
import HTTPStatusCode from "../constants/HTTPStatusCode";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { ScenarioContext } from "../contexts/ScenarioContextProvider";

export const useTerminalCommandProcessor = () => {
  const { user: { username, name, email }, accessToken } = useContext(UserContext);
  const noOutput = { value: "No output.", color: TERMINAL_COLORS.grey };
  const { checkAndAdvanceScenario } = useContext(ScenarioContext);

  async function processGitStatus(): Promise<ConsolePrint> {
    console.log(username);
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
    const author = { name, email };
    const branchName = "main";

    if (commitArgs === "-m" || commitArgs === "-am") {
      // Automatically assume that the following argument is the commit message.
      const message = rest[0].slice(1, -1);
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
          { value: `[${branchName} ${shortCommitId}] ${message}` },
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

  async function processGitPush(args: string[], accessToken?: string): Promise<ConsolePrint> {
    const [remote, branch] = args;
    console.log("args", args);
    console.log("remote", remote);
    console.log("branch", branch);

    const enumeratingObjects = `Enumerating objects: 5, done.`;
    const countingObjects = `Counting objects: 100% (5/5), done.`;
    const deltaCompression = `Delta compression using up to 8 threads`;
    const compressingObjects = `Compressing objects: 100% (2/2), done.`;
    const writingObjects = `Writing objects: 100% (3/3), 309 bytes | 309.00 KiB/s, done.`;
    const total = `Total 3 (delta 1), reused 0 (delta 0), pack-reused 0`;
    const remoteResolving = `remote: Resolving deltas: 100% (1/1), completed with 1 local object.`;
    const ToRemote = `To https://github.com/P4P-Group129-2022/${username}.git`;
    const commits = `   15c4907..a05853a  main -> main`;

    if (!accessToken) {
      return {
        input: `git push ${args.join(" ")}`,
        output: [
          { value: "An error has occurred while authenticating you." },
          { value: "Please go to the main website to re-login and resume scenarios." },
          { value: "Or contact the administrator for assistance, through the email here: hpar461@aucklanduni.ac.nz" },
        ]
      };
    }

    if (!branch || !remote) {
      return {
        input: `git push ${args.join(" ")}`,
        output: [
          { value: "Unknown git push arguments." },
          { value: "Currently, the system only supports pushing to the 'origin' remote and existing branches." },
          { value: "hint: Use 'git push origin main' to push to the main branch." },
        ]
      };
    }

    const response = await pushRepo(username, remote, branch, accessToken);
    if (response.status === HTTPStatusCode.NO_CONTENT) {
      checkAndAdvanceScenario();
    }
    return {
      input: `git push ${args.join(" ")}`,
      output: response.status === HTTPStatusCode.NO_CONTENT ? [
        { value: enumeratingObjects },
        { value: countingObjects },
        { value: deltaCompression },
        { value: compressingObjects },
        { value: writingObjects },
        { value: total },
        { value: remoteResolving },
        { value: ToRemote },
        { value: commits },
      ] : [
        { value: "Error pushing files.", color: TERMINAL_COLORS.red },
      ]
    };
  }

  async function processGitBranch(args: string[]) {
    const [branchName] = args;

    if (branchName) {
      if (branchName.startsWith("-") || branchName.startsWith("--")) {
        return {
          input: "git branch",
          output: [
            { value: "Unknown git branch argument." },
            { value: "Currently, the system only supports creating branches." },
            { value: "hint: Use 'git branch <branchName>' to create a new branch." },
          ]
        };
      }

      try {
        await branch(username, branchName);

        // Not sure whether branching should advance scenario.
        // if (response.status === HTTPStatusCode.CREATED) {
        //   checkAndAdvanceScenario();
        // }

        return {
          input: `git branch ${args.join(" ")}`,
          output: [noOutput]
        };
      } catch (e: any) {
        console.log(e);
        return {
          input: `git branch ${args.join(" ")}`,
          output: [
            { value: "Error creating branch.", color: TERMINAL_COLORS.red },
            // // @ts-ignore - temporary fix, it could possibly return a message if on error.
            ...(e.response.status === HTTPStatusCode.INTERNAL_SERVER_ERROR && e.response.data.message === "AlreadyExistsError" ? [
              { value: `Branch already exists.`, color: TERMINAL_COLORS.red },
              {
                value: `hint: Use "git checkout ${branchName}" to check out to that branch or try again with a different name.`,
                color: TERMINAL_COLORS.red
              },
            ] : [{
              value: "Unknown error occurred. Please try again.", color: TERMINAL_COLORS.red
            }])
          ]
        };
      }
    } else {
      return {
        input: "git branch",
        output: [
          { value: "In actual git interface, this would result in listing out currently available branches." },
          { value: "However, this feature is not implemented in this program." },
          { value: "hint: Use 'git branch <branchName>' to create a new branch." },
        ]
      };
    }
  }

  async function processGitCheckout(args: string[]) {
    const [branchName] = args;

    if (branchName) {
      try {
        await checkout(username, branchName);

        // Not sure whether branching should advance scenario.
        // if (response.status === HTTPStatusCode.OK) {
        //   checkAndAdvanceScenario();
        // }

        return {
          input: `git checkout ${args.join(" ")}`,
          output: [noOutput]
        };
      } catch (e: any) {
        console.log(e.response.data.message);
        return {
          input: `git checkout ${args.join(" ")}`,
          output: [
            { value: "Error checking out branch.", color: TERMINAL_COLORS.red },
            // // @ts-ignore - temporary fix, it could possibly return a message if on error.
            ...(e.response.status === HTTPStatusCode.INTERNAL_SERVER_ERROR && e.response.data.message === "NotFoundError" ? [
              { value: `Branch ${branchName} not found.`, color: TERMINAL_COLORS.red },
              {
                value: `hint: Use "git branch <branchName>" to first create a branch.`,
                color: TERMINAL_COLORS.red
              },
            ] : [{
              value: "Unknown error occurred. Please try again."
            }])
          ]
        };
      }
    } else {
      return {
        input: "git checkout",
        output: [
          { value: "No branch specified to checkout. Please specify an existing branch to checkout." },
          { value: "hint: Use 'git branch <branchName>' to first create a branch." },
        ]
      };
    }
  }

  async function processCommands(command: string): Promise<ConsolePrint> {
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
          return processGitPush(args, accessToken);
        case "branch":
          return processGitBranch(args);
        case "checkout":
          return processGitCheckout(args);
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

  return { processCommands: processCommands };
};