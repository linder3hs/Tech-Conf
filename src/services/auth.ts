import type { Provider } from "@supabase/supabase-js";
import supabase from "./config";
import * as Sentry from "@sentry/browser";

export async function signInWithGitHub(provider: Provider = "github") {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
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
