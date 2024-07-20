import supabase, { supabaseUrl } from "./supabase";

export interface ISuggestion {
    image?: any, //TODO: To be modified to the actual data format
    name?: string,
    description?: string,
    category?: string,
    recipe?: string,
    userID?: Number,
    id?: string | Number,
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
    // https://rgqlfhkkxritdeajtgrw.supabase.co/storage/v1/object/public/suggestion_images/817041839539233-rice_and_beans_mix.png?t=2024-07-04T19%3A33%3A36.615Z

    let imageURLList = [] as string[];
    let imageNameList = [] as string[];
    newSuggestionObj?.image.forEach((image : any) => {
        // ? Strip the name of any slashes and whitespaces, replacing the whitespaces with underscore
        
        const imageName = `${Math.ceil(Math.random() * 1000000000000000)}-${image.name}`.replaceAll("/", "").split(" ").join("_");
        const imageURL = `${supabaseUrl}/storage/v1/object/public/suggestion_images/${imageName}`;
        imageURLList = [...imageURLList, imageURL];
        imageNameList = [...imageNameList, imageName];
    })
    
    const { data, error } = await supabase
    .from('Suggestion')
    .insert([{...newSuggestionObj, image: imageURLList}])

    if (error) {
        console.error("There was a problem creating suggestion.");
        throw new Error(error.message);
    }


    imageNameList.forEach(async (img, i) => {
        const { error: storageError } = await supabase
        .storage
        .from('suggestion_images')
        .upload(img, newSuggestionObj.image[i])

        if (storageError) {
            await supabase.from("Suggestion").delete().eq("name", newSuggestionObj.name);
            console.error(storageError);
            throw new Error("Storage failed. Suggestion deleted");
        }
    })

    
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