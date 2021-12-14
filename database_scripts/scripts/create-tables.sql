CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "sessions" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"token" TEXT NOT NULL,
	CONSTRAINT "sessions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "teachers" (
	"id" serial NOT NULL,
	"name" serial NOT NULL,
	CONSTRAINT "teachers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "subjects" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"course_id" integer NOT NULL,
	"season_id" integer NOT NULL,
	CONSTRAINT "subjects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "categories" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "categories_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "exams" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"file_url" TEXT NOT NULL,
	"category_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	"teacher_id" integer NOT NULL,
	CONSTRAINT "exams_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "teachers_subjects" (
	"id" serial NOT NULL,
	"teacher_id" integer NOT NULL,
	"subject_id" integer NOT NULL,
	CONSTRAINT "teachers_subjects_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "courses" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "courses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "seasons" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "seasons_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "subjects" ADD CONSTRAINT "subjects_fk0" FOREIGN KEY ("course_id") REFERENCES "courses"("id");
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_fk1" FOREIGN KEY ("season_id") REFERENCES "seasons"("id");

ALTER TABLE "exams" ADD CONSTRAINT "exams_fk0" FOREIGN KEY ("category_id") REFERENCES "categories"("id");
ALTER TABLE "exams" ADD CONSTRAINT "exams_fk1" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");
ALTER TABLE "exams" ADD CONSTRAINT "exams_fk2" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");

ALTER TABLE "teachers_subjects" ADD CONSTRAINT "teachers_subjects_fk0" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id");
ALTER TABLE "teachers_subjects" ADD CONSTRAINT "teachers_subjects_fk1" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id");


INSERT INTO "courses" ("name")
VALUES ("Engenharia Qualquer"), ("Química");

INSERT INTO "subjects" ("name", "course_id", "season_id")
VALUES ("A mais chata", 1, 1), ("A mais legal", 1, 10), ("Reações", 2, 6), ("Equilíbrio de fases", 2, 4);

INSERT INTO "teachers" ("name")
VALUES ("Sr. Ninguém Liga Jr."), ("Sempre Falta da Silva");

INSERT INTO "teachers_subjects" ("teacher_id", "subject_id")
VALUES (1,1), (2,2), (2,3), (2,4);

INSERT INTO "categories" ("name")
VALUES ("P1"),("P2"),("P3"),("2ch"),("Outras");

INSERT INTO "seasons" ("name")
VALUES ("1"), ("2"), ("3"), ("4"), ("5"),
("6"), ("7"), ("8"), ("9"), ("10"), ("11"), ("12"), ("Eletiva");