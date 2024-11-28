CREATE TABLE domain (
    domain_id BIGINT PRIMARY KEY,
    program VARCHAR(50),
    batch VARCHAR(4),
    qualification VARCHAR(50) 
);

CREATE TABLE specialization (
    specialization_id BIGINT PRIMARY KEY,
    code VARCHAR(10) UNIQUE,
    name VARCHAR(50),
    credit_required BIGINT
);

CREATE TABLE student (
    student_id BIGINT PRIMARY KEY,
    roll_no VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255),
    domain BIGINT,
    specialization BIGINT,
    FOREIGN KEY (domain) REFERENCES domain(domain_id),
    FOREIGN KEY (specialization) REFERENCES specialization(specialization_id)
);

