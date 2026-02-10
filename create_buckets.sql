-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('catch-photos', 'catch-photos', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('proof-log', 'proof-log', false);

-- Set up storage policies for catch-photos bucket (public read, authenticated write)
CREATE POLICY "Public can view catch photos" ON storage.objects FOR SELECT USING (bucket_id = 'catch-photos');
CREATE POLICY "Authenticated users can upload catch photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'catch-photos' AND auth.role() = 'authenticated');

-- Set up storage policies for proof-log bucket (private, user can only access their own)
CREATE POLICY "Users can view own proof photos" ON storage.objects FOR SELECT USING (bucket_id = 'proof-log' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can upload own proof photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'proof-log' AND auth.uid()::text = (storage.foldername(name))[1]);
