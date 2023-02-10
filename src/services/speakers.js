import supabase from "./config";
import * as Sentry from "@sentry/browser";

export async function getSpeakers() {
  const { data, error } = await supabase
    .from("speakers")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    Sentry.captureException(error);
    return [];
  }

  return data;
}
