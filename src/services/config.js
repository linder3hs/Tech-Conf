import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.ASTRO_SUPABASE_URL ??
    "https://nvpaknjxdglnrkhahnaq.supabase.co",
  import.meta.env.ASTRO_SUPABASE_PUBLIC_KEY ??
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52cGFrbmp4ZGdsbnJraGFobmFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU5MzQ4MjMsImV4cCI6MTk5MTUxMDgyM30.yaixrMiLozraxdYQAKDkA5ta8H-fKn6NTcFAX25cXHU"
);

export default supabase;
