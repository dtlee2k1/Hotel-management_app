import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://txcfyapevwhlztzvncup.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4Y2Z5YXBldndobHp0enZuY3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1ODk1NzYsImV4cCI6MjAwOTE2NTU3Nn0.4rg0zpn2yUWJ7bKdJgIfB9hVxEeD3x8aBaJ9hqMIGxE'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
