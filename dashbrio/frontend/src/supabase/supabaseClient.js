import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://panygnmknkcyrjsbvujb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBhbnlnbm1rbmtjeXJqc2J2dWpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzNDc2NDMsImV4cCI6MjA2MDkyMzY0M30.LB1l8AZbRNW4JXBefEQILrAmjwYI5nsJ3sg1m8_byeE'

export const supabase = createClient(supabaseUrl, supabaseKey);