/*
  # Add Faculties and Departments

  1. New Tables
    - `faculties` - Medical faculties with name and description
    - `departments` - Departments within faculties
    - `course_departments` - Junction table linking courses to departments

  2. Security
    - Enable RLS on all new tables
    - Policies for read access by authenticated users
    - Policies for admin management

  3. Initial Data
    - 5 medical faculties
    - 13 departments across faculties
*/

-- Create faculties table
CREATE TABLE IF NOT EXISTS faculties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  faculty_id uuid NOT NULL REFERENCES faculties(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  head_of_department text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create course_departments junction table
CREATE TABLE IF NOT EXISTS course_departments (
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (course_id, department_id)
);

-- Enable RLS
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_departments ENABLE ROW LEVEL SECURITY;

-- Policies for faculties
CREATE POLICY "Anyone can read faculties"
  ON faculties
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage faculties"
  ON faculties
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for departments
CREATE POLICY "Anyone can read departments"
  ON departments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage departments"
  ON departments
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for course_departments
CREATE POLICY "Anyone can read course_departments"
  ON course_departments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage course_departments"
  ON course_departments
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_faculties_updated_at
  BEFORE UPDATE ON faculties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_departments_updated_at
  BEFORE UPDATE ON departments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert initial faculties
INSERT INTO faculties (name, description) VALUES
  ('Faculty of Medicine', 'Comprehensive medical education and research'),
  ('Faculty of Dentistry', 'Advanced dental studies and oral health'),
  ('Faculty of Pharmacy', 'Pharmaceutical sciences and drug development'),
  ('Faculty of Nursing', 'Nursing education and patient care'),
  ('Faculty of Public Health', 'Population health and disease prevention');

-- Insert initial departments
INSERT INTO departments (faculty_id, name, description, head_of_department) VALUES
  ((SELECT id FROM faculties WHERE name = 'Faculty of Medicine'), 'Internal Medicine', 'Study of adult diseases', 'Dr. Sarah Johnson'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Medicine'), 'Surgery', 'Surgical procedures and techniques', 'Dr. Michael Chen'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Medicine'), 'Pediatrics', 'Medical care for children', 'Dr. Emily Williams'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Medicine'), 'Obstetrics & Gynecology', 'Women''s health and reproduction', 'Dr. Robert Torres'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Medicine'), 'Psychiatry', 'Mental health and behavioral disorders', 'Dr. Lisa Wong'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Dentistry'), 'Orthodontics', 'Dental and facial irregularities', 'Dr. James Peterson'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Dentistry'), 'Periodontics', 'Gum diseases and implants', 'Dr. Maria Garcia'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Pharmacy'), 'Clinical Pharmacy', 'Patient-centered pharmaceutical care', 'Dr. David Smith'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Pharmacy'), 'Pharmaceutical Chemistry', 'Drug design and development', 'Dr. Anna Lee'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Nursing'), 'Adult Nursing', 'Care for adult patients', 'Dr. Patricia Brown'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Nursing'), 'Pediatric Nursing', 'Care for children', 'Dr. John Wilson'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Public Health'), 'Epidemiology', 'Disease patterns in populations', 'Dr. Mark Thompson'),
  ((SELECT id FROM faculties WHERE name = 'Faculty of Public Health'), 'Health Policy', 'Healthcare systems and policy', 'Dr. Rachel Green');