-- Create a private bucket for Identity Documents
insert into storage.buckets (id, name, public)
values ('documents', 'documents', false);

-- Create a public bucket for Profile Pictures
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true);

-- POLICIES

-- AVATARS (Public Read, Authenticated Upload)
create policy "Avatar images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar."
  on storage.objects for insert
  with check ( bucket_id = 'avatars' );
  
create policy "Anyone can update their own avatar."
  on storage.objects for update
  using ( auth.uid() = owner )
  with check ( bucket_id = 'avatars' );

-- DOCUMENTS (Private: User can upload/read their own, Admin can read all)
-- Assuming 'auth.uid() = owner' handles the "own" part.
create policy "Users can upload their own documents."
  on storage.objects for insert
  with check ( bucket_id = 'documents' and auth.uid() = owner );

create policy "Users can read their own documents."
  on storage.objects for select
  using ( bucket_id = 'documents' and auth.uid() = owner );

-- (Optional) Policy for Admins to view documents would go here
