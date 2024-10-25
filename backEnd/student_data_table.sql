DROP TABLE IF EXISTS "public"."student_data_table";
-- This script only contains the table creation statements and does not fully represent the table in the database. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS untitled_table_190_student_id_seq;

-- Table Definition
CREATE TABLE "public"."student_data_table" (
    "student_id" int4 NOT NULL DEFAULT nextval('untitled_table_190_student_id_seq'::regclass),
    "student_name" varchar NOT NULL,
    "student_score" int4 NOT NULL
);

