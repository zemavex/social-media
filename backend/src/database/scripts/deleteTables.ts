import "dotenv/config";
import { pool } from "..";
import { askConfirmation } from "./askConfirmation";

const deleteTables = async () => {
  const confirmed = await askConfirmation("Delete all tables?", {
    confirmText: "delete",
  });
  if (!confirmed) {
    console.log("Tables deletion cancelled.");
    return;
  }

  try {
    await pool.query("DROP SCHEMA public CASCADE");
    await pool.query("CREATE SCHEMA public");
    await pool.query("GRANT ALL ON SCHEMA public TO postgres");
    await pool.query("GRANT ALL ON SCHEMA public TO public");

    console.log("Tables deleted");
  } catch (err) {
    console.error("Error while deleting tables");
    if (err instanceof Error) {
      console.error(err.stack);
    }
  } finally {
    await pool.end();
  }
};

void deleteTables();
