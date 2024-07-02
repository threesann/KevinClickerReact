
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wkuimailekpioxrlteqk.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrdWltYWlsZWtwaW94cmx0ZXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkzNDE3NjYsImV4cCI6MjAzNDkxNzc2Nn0.LatrykXWc9ZqIAltIjJAsSLrjLYmRXaRnNPAXm9626E"
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase