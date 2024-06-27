import supabase from "./supabase";

export interface IUser {
    name: string,
    email: string,
    password: string
}


export async function getUsers () {

    const { data: Users, error } = await supabase
    .from('User')
    .select('*')

    if (error) {
        console.error("An error was encountered while fetching users.");
        throw new Error(error.message);
    }

    return Users;
}


export async function getUser(id : number) {
    const { data: User, error } = await supabase
    .from('User')
    .select()
    .eq('id', id)
    .single()

    if (error) {
        console.error("An error was encountered while fetching user.");
        throw new Error(error.message);
    }

    return User;
}


export async function createUser (newUserObj : IUser) {

    const { data, error } = await supabase
    .from('User')
    .insert([newUserObj])
    .select()

    if (error) {
        console.error("An error was encountered while fetching users.");
        throw new Error(error.message);
    }

    return data;
}