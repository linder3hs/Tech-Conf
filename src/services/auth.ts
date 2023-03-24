import supabase from "./config";
import * as Sentry from "@sentry/browser";

export async function signInWithGitHub(url: string = "/") {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/events/1",
    },
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

  window.location.href = "/";
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    Sentry.captureException(error);
    return null;
  }

  return data.user;
}
