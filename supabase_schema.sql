-- 1. Create custom ENUM types for specific roles and status
CREATE TYPE user_role AS ENUM ('auditor', 'tenant', 'student');
CREATE TYPE canteen_grade AS ENUM ('A', 'B', 'C');
CREATE TYPE inspection_status AS ENUM ('pending', 'scheduled', 'completed', 'rejected');

-- 2. Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create canteens table
CREATE TABLE canteens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  faculty_location TEXT NOT NULL,
  owner_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  banner_url TEXT,
  description TEXT,
  current_grade canteen_grade,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create inspections table
CREATE TABLE inspections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  canteen_id UUID REFERENCES canteens(id) ON DELETE CASCADE,
  auditor_id UUID REFERENCES profiles(id),
  score_water INTEGER NOT NULL CHECK (score_water >= 0 AND score_water <= 100),
  score_waste INTEGER NOT NULL CHECK (score_waste >= 0 AND score_waste <= 100),
  score_food_handling INTEGER NOT NULL CHECK (score_food_handling >= 0 AND score_food_handling <= 100),
  total_score INTEGER NOT NULL CHECK (total_score >= 0 AND total_score <= 100),
  grade canteen_grade NOT NULL,
  proof_photo_url TEXT,
  notes TEXT,
  inspected_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  canteen_id UUID REFERENCES canteens(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create inspection_requests table
CREATE TABLE inspection_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  canteen_id UUID REFERENCES canteens(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status inspection_status DEFAULT 'pending' NOT NULL,
  notes TEXT,
  requested_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE canteens ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspections ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE inspection_requests ENABLE ROW LEVEL SECURITY;

-- 8. Create basic RLS Policies

-- Profiles: Anyone can read, users can update their own profile
CREATE POLICY "Public profiles are viewable by everyone." ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile." ON profiles FOR UPDATE USING (auth.uid() = id);

-- Canteens: Anyone can read, tenants can update their own canteen
CREATE POLICY "Canteens are viewable by everyone." ON canteens FOR SELECT USING (true);
CREATE POLICY "Tenants can insert their own canteen." ON canteens FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Tenants can update their own canteen." ON canteens FOR UPDATE USING (auth.uid() = owner_id);

-- Inspections: Anyone can read, only auditors can insert/update
CREATE POLICY "Inspections are viewable by everyone." ON inspections FOR SELECT USING (true);
-- To securely check for auditor role, we use a subquery on profiles
CREATE POLICY "Auditors can insert inspections" ON inspections FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'auditor'));
CREATE POLICY "Auditors can update inspections" ON inspections FOR UPDATE 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'auditor'));

-- Reviews: Anyone can read, only students can insert
CREATE POLICY "Reviews are viewable by everyone." ON reviews FOR SELECT USING (true);
CREATE POLICY "Students can insert their own reviews." ON reviews FOR INSERT 
WITH CHECK (auth.uid() = student_id AND EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'student'));

-- Inspection Requests: Tenants can read/insert their own, Auditors can read/update all
CREATE POLICY "Tenants can view their own requests." ON inspection_requests FOR SELECT USING (auth.uid() = tenant_id);
CREATE POLICY "Auditors can view all requests." ON inspection_requests FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'auditor'));
CREATE POLICY "Tenants can insert their own requests." ON inspection_requests FOR INSERT WITH CHECK (auth.uid() = tenant_id);
CREATE POLICY "Auditors can update requests." ON inspection_requests FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'auditor'));

-- 9. Trigger to create a profile automatically when a user signs up (Optional but recommended)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', COALESCE((new.raw_user_meta_data->>'role')::user_role, 'student'));
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
