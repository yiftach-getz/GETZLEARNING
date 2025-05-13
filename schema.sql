-- Create users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_progress table
CREATE TABLE user_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name TEXT NOT NULL,
    progress JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create words table
CREATE TABLE words (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    english TEXT NOT NULL,
    hebrew TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert initial words
INSERT INTO words (english, hebrew, image_url) VALUES
    ('each', 'כל (אחד)', 'https://picsum.photos/200/200?random=1'),
    ('everyone', 'כולם', 'https://picsum.photos/200/200?random=2'),
    ('fall', 'ליפול', 'https://picsum.photos/200/200?random=3'),
    ('flag', 'דגל', 'https://picsum.photos/200/200?random=4'),
    ('guess', 'לנחש', 'https://picsum.photos/200/200?random=5'),
    ('kind of', 'סוג של', 'https://picsum.photos/200/200?random=6'),
    ('many', 'הרבה', 'https://picsum.photos/200/200?random=7'),
    ('outside', 'בחוץ', 'https://picsum.photos/200/200?random=8'),
    ('parents', 'הורים', 'https://picsum.photos/200/200?random=9'),
    ('pull', 'למשוך', 'https://picsum.photos/200/200?random=10'),
    ('spook', 'כדי להפחיד', 'https://picsum.photos/200/200?random=11'),
    ('weekend', 'סוף שבוע', 'https://picsum.photos/200/200?random=12');

-- Create game_scores table
CREATE TABLE game_scores (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name TEXT NOT NULL,
    game_type TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE words ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON words FOR SELECT USING (true);
CREATE POLICY "Enable read access for all users" ON game_scores FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON game_scores FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable read access for all users" ON user_progress FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON user_progress FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON user_progress FOR UPDATE USING (true); 