import supabase from "./config";
import * as Sentry from "@sentry/browser";

export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    Sentry.captureException(error);
    return false;
  }

  return data;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    Sentry.captureException(error);
    return false;
  }
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    Sentry.captureException(error);
    return false;
  }

  return data;
}
