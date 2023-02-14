import { createClient } from "@supabase/supabase-js";
import * as Sentry from "@sentry/browser";

const supabase = createClient(
  import.meta.env.ASTRO_SUPABASE_URL ??
    "https://nvpaknjxdglnrkhahnaq.supabase.co",
  import.meta.env.ASTRO_SUPABASE_PUBLIC_KEY ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cGFrbmp4ZGdsbnJraGFobmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5MzQ4MjMsImV4cCI6MTk5MTUxMDgyM30.yaixrMiLozraxdYQAKDkA5ta8H-fKn6NTcFAX25cXHU"
);

export async function getDataFromTable(table, condition = null) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    Sentry.captureException(error);
    return [];
  }

  if (condition) {
    return data.filter((item) => item[condition.key] === condition.value);
  }

  return data;
}

export async function insertDataIntoTable(table, data) {
  const { error } = await supabase.from(table).insert(data);

  if (error) {
    Sentry.captureException(error);
    return false;
  }

  return true;
}

export async function getTicketRecord(event_id, user_id) {
  const { data, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("event_id", event_id)
    .eq("user_id", user_id);

  if (error) {
    Sentry.captureException(error);
    return [];
  }

  return data;
}

export default supabase;
