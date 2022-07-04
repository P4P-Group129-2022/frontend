import { ConsolePrint } from "../types/TerminalTypes";

function processGitStatus(): ConsolePrint {
  // please implement these when you connect it with the backend.
  return { input: "git status", output: `"git status" not implemented yet.` };
}

function processGitAdd(fileNames: string[]): ConsolePrint {
  // please implement these when you connect it with the backend.
  return { input: "git add", output: `"git add" not implemented yet.` };
}

function processGitCommit(args: string[]): ConsolePrint {
  // please implement these when you connect it with the backend.
  return { input: "git commit", output: `"git commit" not implemented yet.` };
}

function processGitPush(args: string[]): ConsolePrint {
  // please implement these when you connect it with the backend.
  return { input: "git push", output: `"git push" not implemented yet.` };
}

export function processCommands(command: string): ConsolePrint {
  const [commandType, gitCommand, ...args] = command.split(/\s+(?=(?:[^'"]*['"][^'"]*['"])*[^'"]*$)/);

  if (commandType !== "git") {
    return { input: command, output: `"${command}" is not a git command.` };
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
          output: `"${commandType} ${gitCommand}" is either not a valid git command or it hasn't been implemented yet.`
        };
    }
  }
}