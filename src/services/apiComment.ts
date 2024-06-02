/**

** get
 const { data: Comment, error } = await supabase
   .from('Comment')
   .select('*')
 * 

** create

    const { data, error } = await supabase
    .from('Comment')
    .insert([
        { some_column: 'someValue', other_column: 'otherValue' },
    ])
    .select()

** update

    const { data, error } = await supabase
    .from('Comment')
    .update({ other_column: 'otherValue' })
    .eq('some_column', 'someValue')
    .select()



** delete

    const { error } = await supabase
    .from('Comment')
    .delete()
    .eq('some_column', 'someValue')


*/
