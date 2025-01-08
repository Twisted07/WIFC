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

/**
 * 
 * TODO: I need to test all these functions and make sure they are working properly
 * ? This is meant to fetch data from the database and return return just one suggestion based on the search query, preferrably the suggestion id, since it is unique across the table.
 *  
 */
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

// So this is meant to take in the id of the suggestion row and select the review column for update
export async function createReview(id : string, data : IReview) {
  const { data: Review, error } = await supabase
  .from('Review')
  .insert(data)
  .select()

  if (error) {
    console.error(error);
    throw new Error("An issue occured while creating review");
  }

  return Review;
}

export async function getReviews(id: string | number) {
  const {data: reviews, error} = await supabase
  .from('Review')
  .select(`*`)
  .eq('suggestionID', id)

  if (error) {
    console.error(error);
    throw new Error("An error occurred while fetching reviews");
  }

  return reviews as IReview[];
}

export async function deleteReview(id: string | number) {
  const {data: review, error} = await supabase
  .from('Review')
  .delete()
  .eq('id', id)
  
  if (error) {
    console.error(error);
    throw new Error("An issue occurred while deleting review");
  }

  return review;
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
  let { data: Users, error } = await supabase
  .from('User')
  .select('*')

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while fetching users");
  }

  return Users;
        
}

export async function getUserByEmail(email: string) {
  let { data: User, error } = await supabase
  .from('User')
  .select()
  .eq('email', email)

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while fetching user");
  }

  return User;
  
}

export async function updateUser(user: IUser, id: number) {
  const { data, error } = await supabase
  .from('User')
  .update(user)
  .eq('id', id)
  .select()

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while updating user");
  }

  return data;
          
}

export async function deleteUser(id: number) {
  const { error } = await supabase
  .from('User')
  .delete()
  .eq('id', id)

  if (error) {
    console.error(error);
    throw new Error("An issue occurred while deleting user");
  }

  return true;
}

export async function createUser(user: IUser) {
  const { error } = await supabase
  .from('User')
  .insert(user)
  
  if (error) {
    console.error(error);
    throw new Error("An issue occurred while creating user");
  }

  return true
}