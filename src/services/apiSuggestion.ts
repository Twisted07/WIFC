import supabase from "./supabase";

export interface ISuggestion {
    image?: string,
    name?: string,
    description?: string,
    recipe?: string,
    userID?: number | string,
    id?: number,
}


export async function getSuggestions() {

    const { data: Suggestions, error } = await supabase
    .from('Suggestion')
    .select('*')

    if (error) {
        console.error("There was a problem fetching suggestions");
        throw new Error(error.message);
    }

    return Suggestions;
}


export async function getSuggestion(id : number) {
    const {data: Suggestion, error} = await supabase
    .from('Suggestion')
    .select()
    .eq('id', id)
    .single()

    if (error) {
        console.error("There was a problem creating suggestion.");
        throw new Error(error.message);
    }

    return Suggestion;
}


export async function createSuggestion(newSuggestionObj : ISuggestion) {

    const { data, error } = await supabase
    .from('Suggestion')
    .insert([newSuggestionObj])
    .select()

    if (error) {
        console.error("There was a problem creating suggestion.");
        throw new Error(error.message);
    }

    return data;

}


export async function deleteSuggestion(id : ISuggestion['id']) {

    const { error } = await supabase
    .from('Suggestion')
    .delete()
    .eq('id', id)

    if (error) {
        console.error("There was a problem deleting suggestion.");
        throw new Error(error.message);
    }
}

export async function updateSuggestion() {

    const { data, error } = await supabase
    .from('Suggestion')
    .update({ other_column: 'otherValue' })
    .eq('some_column', 'someValue')
    .select()


    if (error) {
        console.error("There was a problem updating suggestion.");
        throw new Error(error.message);
    }
    
    return data;
}