import { ConsolePrint } from "../types/TerminalTypes";
import {
  branch,
  checkout,
  commitRepo,
  getCurrentBranch,
  getRepoStatusForScenario,
  pushRepo,
  rebase,
  stageAllAndCommitRepo,
  stageAllFilesInRepo,
  stageFileInRepo
} from "../api/Api";
import { TERMINAL_COLORS } from "../theme/colors";
import HTTPStatusCode from "../constants/HTTPStatusCode";
import { TaskType } from "../utils/TaskType";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { ScenarioContext } from "../contexts/ScenarioContextProvider";
import { AxiosError } from "axios";

export const useTerminalCommandProcessor = () => {
  const { user: { username, name, email }, accessToken } = useContext(UserContext);
  const noOutput = { value: "No output.", color: TERMINAL_COLORS.grey };
  const { checkAndAdvanceScenarioSegment } = useContext(ScenarioContext);

  async function processGitStatus(): Promise<ConsolePrint> {
    const input = "git status";
    try {
      console.log(username);
      const response = await getRepoStatusForScenario(username);
      const { data: branch } = await getCurrentBranch(username);

      const onBranchMain = `On branch ${branch}`;
      const nothingToCommit = `nothing to commit, working tree clean`;
      const changesNotStaged = `Changes not staged for commit:`;
      const changesToCommit = `Changes to be committed:`;
      const useGitAdd = `  (use "git add <file>..." to update what will be committed)`;
      const useGitRestoreUnstaged = `  (use "git restore <file>..." to discard changes in working directory)`;
      const useGitRestoreStaged = `  (use "git restore --staged <file>..." to unstage)`;
      const modifiedMain = `        modified:   index.html`;
      const noChangesAddedToCommit = `\nno changes added to commit (use "git add" and/or "git commit -a")`;

      switch (response.data.status) {
        case "modified":
          return {
            input,
            output: [
              { value: onBranchMain },
              { value: changesToCommit },
              { value: useGitRestoreStaged },
              { value: modifiedMain, color: TERMINAL_COLORS.green },
            ]
          };
        case "*modified":
          return {
            input,
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
            input,
            output: [
              { value: onBranchMain },
              { value: nothingToCommit },
            ]
          };
        default:
          return {
            input,
            output: [
              { value: "Unknown isomorphic git status return value:" },
              { value: `Value: ${response.data.status}` },
            ]
          };
      }
    } catch (e) {
      console.log("Error occurred while running git status", e);
      return {
        input,
        output: [
          { value: "Error running git status. Please try again.", color: TERMINAL_COLORS.red },
          ...(e instanceof AxiosError && !!e.response && e.response.data?.message === "NotFoundError" ? [{
            value: "Error Message: Current branch not found.",
            color: TERMINAL_COLORS.yellow
          }] : []),
        ]
      };
    }
  }

  async function processGitAdd(fileNames: string[]): Promise<ConsolePrint> {
    const input = `git add ${fileNames.join(" ")}`;

    try {
      if (fileNames.length === 0) {
        return {
          input,
          output: [
            { value: "Nothing specified, nothing added." },
            { value: "hint: Maybe you wanted to say 'git add .'?" },
          ]
        };
      } else if (fileNames.length === 1 && fileNames[0] === ".") {
        const response = await stageAllFilesInRepo(username);

        checkAndAdvanceScenarioSegment(TaskType.ADD);
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
            value: `Failed to stage ${failedRequests.length} files.`
          }, {
            value: `Failed files: ${failedRequests.map(response => response.data?.fileName).join(", ")}`,
          }]
        };
      }
    } catch (e) {
      console.log("Error occurred while running git add", e);
      return {
        input,
        output: [
          { value: "Error staging files. Please try again.", color: TERMINAL_COLORS.red },
          ...(e instanceof AxiosError && !!e.response && e.response.data?.message === "NotFoundError" ? [{
            value: "Error Message: Current branch not found."
          }] : []),
        ]
      };
    }
  }

  async function processGitCommit(args: string[]): Promise<ConsolePrint> {
    const input = `git commit ${args.join(" ")}`;
    const [commitArgs, ...rest] = args;
    const author = { name, email };

    try {
      const { data: branchName } = await getCurrentBranch(username);

      if (commitArgs === "-m" || commitArgs === "-am") {
        // Automatically assume that the following argument is the commit message.
        const message = rest[0]?.slice(1, -1);
        if (!message || message.length === 0) {
          return {
            input,
            output: [
              { value: "No commit message specified.", color: TERMINAL_COLORS.yellow },
              { value: `hint: Use 'git commit -m "<message>"' with <message> inside double quotes replaced with your message to include a commit message.` },
            ]
          };
        } else if (message === "<message>") {
          return {
            input,
            output: [
              { value: "No commit message specified.", color: TERMINAL_COLORS.yellow },
              { value: `hint: Replace <message> from 'git commit -m "<message>"' to your own message.` },
              { value: `hint: Example: 'git commit -m "this is a sample commit message"'` },
            ]
          };
        }
        const isAddCommit = commitArgs === "-am";

        const request = isAddCommit ? stageAllAndCommitRepo : commitRepo;
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

        checkAndAdvanceScenarioSegment(isAddCommit ? TaskType.ADDCOMMIT : TaskType.COMMIT);

        return {
          input,
          output: response.status === HTTPStatusCode.CREATED ? [
            { value: `[${branchName} ${shortCommitId}] ${message}` },
            { value: statsString.join(", ") },
            ...(isAddCommit ? [] : [
              {
                value: `\nhint: In the future, you can also stage all files and commit at the same time, by using: 'git commit -am "<message>"'`,
                color: TERMINAL_COLORS.yellow
              },
            ]),
          ] : [
            { value: "Error committing files.", color: TERMINAL_COLORS.red },
          ]
        };
      } else {
        return {
          input,
          output: [
            commitArgs && (commitArgs.includes("-") || commitArgs.includes("--"))
              ? { value: "Unknown commit argument.", color: TERMINAL_COLORS.yellow }
              : { value: "No commit option specified.", color: TERMINAL_COLORS.yellow },
            { value: `hint: Use 'git commit -m "<message>"' with commit message inside double quotes to commit.` },
            { value: `hint: Use 'git commit -am "<message>"' followed by a commit message to stage all files and commit.` },
          ]
        };
      }
    } catch (e) {
      console.log("Error occurred while running git commit", e);
      return {
        input,
        output: [
          { value: "Error committing files. Please try again.", color: TERMINAL_COLORS.red },
          ...(e instanceof AxiosError && !!e.response && e.response.data?.message === "NotFoundError" ? [{
            value: "Error Message: Current branch not found.",
          }] : []),
        ]
      };
    }
  }

  async function processGitPush(args: string[], accessToken?: string): Promise<ConsolePrint> {
    const input = `git push ${args.join(" ")}`;
    const [remote, branch] = args;
    const pushHint = "hint: Use 'git push origin <branch>' to push a branch to a remote repository, such as 'main'.";
    console.log("args", args);
    console.log("remote", remote);
    console.log("branch", branch);

    if (!remote || !branch) {
      return {
        input,
        output: [
          { value: "No remote or branch specified." },
          { value: pushHint },
        ]
      };
    }

    if (remote.startsWith("-") || branch.startsWith("--")) {
      return {
        input,
        output: [
          { value: "Unsupported push argument." },
          { value: "Currently, the app does not support git push arguments, such as -u for setting the upstream." },
          { value: pushHint },
        ]
      };
    }

    if (!accessToken) {
      return {
        input,
        output: [
          { value: "An error has occurred while authenticating you." },
          { value: "Please go to the main website to re-login and resume scenarios." },
          { value: "Or contact the administrator for assistance, through the email here: hpar461@aucklanduni.ac.nz" },
        ]
      };
    }

    const enumeratingObjects = `Enumerating objects: 5, done.`;
    const countingObjects = `Counting objects: 100% (5/5), done.`;
    const deltaCompression = `Delta compression using up to 8 threads`;
    const compressingObjects = `Compressing objects: 100% (2/2), done.`;
    const writingObjects = `Writing objects: 100% (3/3), 309 bytes | 309.00 KiB/s, done.`;
    const total = `Total 3 (delta 1), reused 0 (delta 0), pack-reused 0`;
    const remoteResolving = `remote: Resolving deltas: 100% (1/1), completed with 1 local object.`;
    const ToRemote = `To https://github.com/P4P-Group129-2022/${username}.git`;
    const commits = `   15c4907..a05853a  ${branch} -> ${branch}`;

    try {
      const { data: currentBranch } = await getCurrentBranch(username);
      const response = await pushRepo(username, remote, branch, accessToken);

      if (branch === currentBranch && response.status === HTTPStatusCode.NO_CONTENT) {
        checkAndAdvanceScenarioSegment(TaskType.PUSH);
      }

      return {
        input,
        output: [
          { value: enumeratingObjects },
          { value: countingObjects },
          { value: deltaCompression },
          { value: compressingObjects },
          { value: writingObjects },
          { value: total },
          { value: remoteResolving },
          { value: ToRemote },
          { value: commits },
          ...(branch === currentBranch ? [] : [
            {
              value: "\nhint: you've made a push to a different branch than your current branch.",
              color: TERMINAL_COLORS.yellow
            },
            {
              value: `Don't forget to push currently working branch, "${currentBranch}", to advance scenarios.`,
              color: TERMINAL_COLORS.yellow
            },
          ]),
        ]
      };
    } catch {
      // Reaching here means that the push failed.
      // TODO: fix here to a more generic error message.
      return {
        input,
        output: [
          { value: "Error pushing files. Please try again", color: TERMINAL_COLORS.red },
          ...(remote !== "origin" ? [
            { value: "Currently, only push to origin is allowed." },
          ] : []),
          { value: "hint: In order to push to a remote repository, you MUST have accepted GitHub organisation invite." },
          { value: pushHint },
        ]
      };
    }
  }

  async function processGitBranch(args: string[]) {
    const input = `git branch ${args.join(" ")}`;
    const [branchName] = args;

    if (branchName) {
      if (branchName.startsWith("-") || branchName.startsWith("--")) {
        return {
          input,
          output: [
            { value: "Unknown git branch argument." },
            { value: "Currently, the system only supports creating branches." },
            { value: "hint: Use 'git branch <branchName>' to create a new branch." },
          ]
        };
      }

      try {
        await branch(username, branchName);

        checkAndAdvanceScenarioSegment(TaskType.BRANCH);
        return {
          input,
          output: [noOutput]
        };
      } catch (e) {
        console.log("Error occurred while running git branch", e);
        return {
          input,
          output: [
            { value: "Error creating branch.", color: TERMINAL_COLORS.red },
            ...(e instanceof AxiosError && !!e.response && e.response.status === HTTPStatusCode.INTERNAL_SERVER_ERROR && e.response.data?.message === "AlreadyExistsError" ? [
              { value: `fatal: A branch named '${branchName}' already exists.` },
              { value: `hint: Use "git checkout ${branchName}" to check out to that branch or try again with a different name.` },
            ] : [{ value: "Unknown error occurred. Please try again." }]),
          ]
        };
      }
    } else {
      return {
        input,
        output: [
          {
            value: "In actual git interface, this would result in listing out currently available branches.",
            color: TERMINAL_COLORS.yellow
          },
          {
            value: "However, this feature is not implemented in this program.",
            color: TERMINAL_COLORS.yellow
          },
          { value: "hint: Use 'git branch <branchName>' to create a new branch." },
        ]
      };
    }
  }

  async function processGitCheckout(args: string[]) {
    const input = `git checkout ${args.join(" ")}`;
    const [branchOrArg, newBranchName] = args;
    let branchName = "";
    let isCreateBranch = false;

    if (branchOrArg.startsWith("-") || branchOrArg.startsWith("--")) {
      if (branchOrArg === "-b") {
        isCreateBranch = true;
        branchName = newBranchName;

        try {
          await branch(username, branchName);
        } catch (e) {
          console.log("Error occurred while making a new branch for git checkout -b", e);
          return {
            input,
            output: [
              { value: "Error creating a branch to check out.", color: TERMINAL_COLORS.red },
              ...(e instanceof AxiosError && !!e.response && e.response.status === HTTPStatusCode.INTERNAL_SERVER_ERROR && e.response.data?.message === "AlreadyExistsError" ? [
                { value: `fatal: A branch named '${branchName}' already exists.` },
                { value: `hint: Use "git checkout ${branchName}" to check out to that branch or try again with a different branch name.` },
              ] : [{ value: "Unknown error occurred while creating a new branch. Please try again." }]),
            ]
          };
        }
      } else {
        return {
          input,
          output: [
            { value: "Unknown git checkout argument.", color: TERMINAL_COLORS.red },
            { value: "Currently, the system only supports checking out to a new or an existing branch." },
            { value: "hint: Use 'git checkout -b <branchName>' to create a new branch and check out to that branch." },
            { value: "hint: Use 'git checkout <branchName>' to check out to an existing branch." },
          ]
        };
      }
    } else {
      branchName = branchOrArg;
    }

    if (branchName) {
      try {
        await checkout(username, branchName);

        checkAndAdvanceScenarioSegment(isCreateBranch ? TaskType.BRANCH_CHECKOUT : TaskType.CHECKOUT);
        return {
          input,
          output: [{ value: `Switched to branch '${branchName}'` }]
        };
      } catch (e) {
        console.log("Error occurred while running git checkout", e);
        return {
          input,
          output: [
            { value: "Error checking out branch.", color: TERMINAL_COLORS.red },
            ...(e instanceof AxiosError && !!e.response && e.response.status === HTTPStatusCode.INTERNAL_SERVER_ERROR && e.response.data?.message === "NotFoundError" ? [
              { value: `Branch ${branchName} not found.` },
              { value: `hint: Use "git branch <branchName>" to first create a branch.`, },
              { value: `hint: Use "git checkout -b <branchName>" to create a new branch and check out.`, },
            ] : [{ value: "Unknown error occurred. Please try again." }]),
          ]
        };
      }
    } else {
      return {
        input,
        output: [
          { value: "No branch specified to checkout. Please specify an existing branch to checkout." },
          { value: "hint: Use 'git branch <branchName>' to first create a branch." },
        ]
      };
    }
  }

  async function processGitRebase(args: string[]) {
    const input = `git rebase ${args.join(" ")}`;
    const [branchName] = args;

    if (branchName === "main") {
      try {
        await rebase(username, branchName);
        const { data: currentBranch } = await getCurrentBranch(username, true);
        checkAndAdvanceScenarioSegment(TaskType.REBASE);
        return {
          input,
          output: [{ value: `Successfully rebased and updated ${currentBranch}.` }]
        };
      } catch (e) {
        console.log("Error occurred while running git rebase", e);
        return {
          input,
          output: [
            { value: "Error rebasing branch.", color: TERMINAL_COLORS.red },
            ...(e instanceof AxiosError && !!e.response && e.response.status === HTTPStatusCode.INTERNAL_SERVER_ERROR && e.response.data?.message === "NotFoundError" ? [
              { value: `Branch ${branchName} not found.` },
              { value: `hint: Use "git branch <branchName>" to first create a branch.` },
            ] : [{
              value: "Unknown error occurred. Please try again."
            }])
          ]
        };
      }
    } else if (branchName) {
      return {
        input,
        output: [
          { value: "Currently, only rebase to main is supported. Please select main branch to rebase." },
          { value: "hint: Use 'git rebase main' to rebase from a main branch." },
        ]
      };
    } else {
      return {
        input,
        output: [
          { value: "No branch specified to rebase. Please specify an existing branch to rebase." },
          { value: "hint: Perhaps you meant 'git rebase main' to rebase from the main branch?." },
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
        case "rebase":
          return processGitRebase(args);
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

  return { processCommands };
};