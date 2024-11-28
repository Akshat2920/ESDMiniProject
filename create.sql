CREATE TABLE domain (
    domain_id BIGINT PRIMARY KEY,
    program VARCHAR(50),
    batch VARCHAR(4) NOT NULL,
    qualification VARCHAR(50) NOT NULL
);

CREATE TABLE specialization (
    specialization_id BIGINT PRIMARY KEY,
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(50) NOT NULL,
    credit_required BIGINT NOT NULL
);

CREATE TABLE students (
    student_id BIGINT PRIMARY KEY,
    roll_no VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    domain BIGINT NOT NULL,
    specialization BIGINT,
    FOREIGN KEY (domain) REFERENCES domain(domain_id),
    FOREIGN KEY (specialization) REFERENCES specialization(specialization_id)
);

