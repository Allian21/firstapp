-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS untitled_table_190_student_id_seq;

-- Table Definition
CREATE TABLE "public"."student_data_table" (
    "student_id" int4 NOT NULL DEFAULT nextval('untitled_table_190_student_id_seq'::regclass),
    "student_name" varchar NOT NULL,
    "student_score" int4 NOT NULL
);

