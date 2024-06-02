import supabase from "./supabase";

export async function getReplies() {

    const { data: Replies, error } = await supabase
    .from('Reply')
    .select('*')

    if (error) {
        console.error("There was an issue fetching replies");
        throw new Error(error.message);
    }

    return Replies;
  
}

export async function createReply() {

    const { data, error } = await supabase
    .from('Reply')
    .insert([
    { some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select()

    if (error) {
        console.error("There was an issue fetching reply");
        throw new Error(error.message);
    }

    return data;

}


export async function updateReply() {

    const { data, error } = await supabase
    .from('Reply')
    .update({ other_column: 'otherValue' })
    .eq('some_column', 'someValue')
    .select()

    if (error) {
        console.error("There was an issue updating reply");
        throw new Error(error.message);
    }


    return data;
}


export async function deleteReply(id) {

    const { error } = await supabase
    .from('Reply')
    .delete()
    .eq('id', id)

    if (error) {
        console.error("There was an issue deleting reply");
        throw new Error(error.message);
    }

}