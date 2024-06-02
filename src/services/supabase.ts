import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://rgqlfhkkxritdeajtgrw.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWxmaGtreHJpdGRlYWp0Z3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxODgwODgsImV4cCI6MjAzMjc2NDA4OH0.50Kxows-LEooqTfWSsDSKJ1RQ0syQ-9tNzaJNcHS_rw";

const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;