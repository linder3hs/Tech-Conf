import supabase from "./config";

export async function getSpeakers() {
  const { data, error } = await supabase
    .from("speakers")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    // TODO: Handle error
    return [];
  }

  return data;
}
