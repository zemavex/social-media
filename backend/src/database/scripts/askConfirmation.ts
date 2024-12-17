import readline from "node:readline";

interface AskConfirmationOptions {
  confirmText?: string;
  rejectText?: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const askConfirmation = (
  text: string,
  options?: AskConfirmationOptions
) => {
  const { confirmText = "y", rejectText = "n" } = options || {};

  return new Promise((resolve, reject) => {
    rl.question(`${text} (${confirmText}/${rejectText}): `, (answer) => {
      if (answer === confirmText) {
        resolve(true);
        rl.close();
        return;
      }

      if (answer === rejectText) {
        resolve(false);
        rl.close();
        return;
      }

      console.log(
        `\nInvalid input. Please enter "${confirmText}" or "${rejectText}"\n`
      );
      resolve(askConfirmation(text, options));
    });
  });
};
