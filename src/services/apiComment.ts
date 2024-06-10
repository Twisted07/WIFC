import supabase from "./supabase";

export async function getComments() {
  const { data: Comment, error } = await supabase.from("Comment").select("*");

  if (error) {
    console.error("There was an issue fetching comments");
    throw new Error(error.message);
  }

  return Comment;
}


export async function createComment() {
  const { data, error } = await supabase
    .from("Comment")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();

  if (error) {
    console.error("There was an issue creating comment");
    throw new Error(error.message);
  }

  return data;
}


export async function updateComment() {
  const { data, error } = await supabase
    .from("Comment")
    .update({ other_column: "otherValue" })
    .eq("some_column", "someValue")
    .select();

  if (error) {
    console.error("There was an issue updating comment");
    throw new Error(error.message);
  }

  return data;
}


export async function deleteComment() {
  const { error } = await supabase
    .from("Comment")
    .delete()
    .eq("some_column", "someValue");

  if (error) {
    console.error("There was an issue deleting comment");
    throw new Error(error.message);
  }
}
