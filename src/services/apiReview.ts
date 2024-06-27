import supabase from "./supabase";

export async function getReviews(suggestionID : Number) {
  const { data: Review, error } = await supabase
  .from("Review")
  .select()
  .eq('suggestionID', suggestionID);

  if (error) {
    console.error("There was an issue fetching comments");
    throw new Error(error.message);
  }

  return Review;
}


export async function createReview() {
  const { data, error } = await supabase
    .from("Review")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();

  if (error) {
    console.error("There was an issue creating comment");
    throw new Error(error.message);
  }

  return data;
}


export async function updateReview() {
  const { data, error } = await supabase
    .from("Review")
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
    .from("Review")
    .delete()
    .eq("some_column", "someValue");

  if (error) {
    console.error("There was an issue deleting Review");
    throw new Error(error.message);
  }
}
