-- Add missing columns to support comprehensive species data
-- Run this in Supabase SQL Editor before running the import script

-- Add reference size columns to species table
ALTER TABLE species
ADD COLUMN IF NOT EXISTS min_size_reference numeric,
ADD COLUMN IF NOT EXISTS max_size_reference numeric;

-- Add special restrictions column to regulations table
ALTER TABLE regulations
ADD COLUMN IF NOT EXISTS special_restrictions text;

-- Verify the columns were added
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'species'
  AND column_name IN ('min_size_reference', 'max_size_reference');

SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'regulations'
  AND column_name = 'special_restrictions';
