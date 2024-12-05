import { ISuggestion } from "@/_modules/suggestion";
import { supabase } from "./supabase";


export async function getSuggestions() : Promise<ISuggestion[]> {
  const { data: Suggestion, error } = await supabase
  .from('Suggestion')
  .select('*')

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while fetching suggestions");
  }

  return Suggestion;

}

export async function getOneSuggestion(id: string) : Promise<ISuggestion | any> {
  const { data: Suggestion, error } = await supabase
  .from('Suggestion')
  .select()
  .eq('id', id)

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while fetching suggestion");
  }

  return Suggestion;
}

export async function updateSuggestion(id: string, data: ISuggestion) {
  const { data: Suggestion, error } = await supabase
  .from('Suggestion')
  .update(data)
  .eq('id', id)
  .select()

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while updating suggestions");
  }

  return Suggestion;
}

export async function deleteSuggestion(id: string) {
  const { data: Suggestion, error } = await supabase
  .from('Suggestion')
  .delete()
  .eq('id', id)

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while deleting suggestion");
  }

  return Suggestion;
}


// export async function getReviews() {

// }

// export async function getOneReview() {

// }

// export async function updateReview() {

// }

// export async function deleteReview() {

// }


export async function getUsers() {

}

export async function getOneUser() {

}

export async function updateUser() {

}

export async function deleteUser() {

}