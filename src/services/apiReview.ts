import supabase from "./supabase";

export interface IReview {
  reviewerID? : Number,
  message : string,
  suggestionID : Number,

}

export async function getReviews(suggestionID : (IReview['suggestionID'])) {
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


export async function createReview(reviewObj: IReview) {
  const { data, error } = await supabase
    .from("Review")
    .insert([reviewObj])
    // .select();

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
