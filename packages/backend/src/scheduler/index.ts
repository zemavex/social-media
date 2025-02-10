import { CronJob } from "cron";
import { Session } from "@/entities/session";

const cleanExpiredSessions = async () => {
  try {
    const count = await Session.deleteExpired();
    console.log(
      `CronJob finished. Count of deleted expired sessions: ${count || 0}`
    );
  } catch (err) {
    console.error("Error while running Cron Job");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  }
};

export const startScheduledTasks = () => {
  const job = CronJob.from({
    cronTime: "0 0 4 * * *",
    onTick: cleanExpiredSessions,
    timeZone: "UTC+5",
    runOnInit: true,
  });

  job.start();
};
