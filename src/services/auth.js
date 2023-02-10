import supabase from "./config";

export async function signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) {
    console.log(error);
    // TODO: Handle error
    return false;
  }

  return data;
}

export async function signout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log(error);
    // TODO: Handle error
    return false;
  }
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.log(error);
    // TODO: Handle error
    return false;
  }

  return data;
}
