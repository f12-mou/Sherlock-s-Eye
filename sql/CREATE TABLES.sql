-- part 2

-- DROP TABLE UNSOLVED_CASES;
CREATE TABLE Unsolved_Cases(
    case_id NUMBER,
    reason VARCHAR2(1000),
    limitation VARCHAR2(1000),

    PRIMARY KEY(case_id)
);
-- DROP TABLE PENDING_CASES;
CREATE TABLE Pending_Cases(
    case_id NUMBER,
    prospected_date DATE,
    progress_rate NUMBER(3,2),
    
    PRIMARY KEY(case_id)
);
-- DROP TABLE SOLVED_CASES;
CREATE TABLE solved_Cases(
    case_id NUMBER,
    solved_date DATE,
    challenges VARCHAR2(1000),

    PRIMARY KEY(case_id)
);

CREATE TABLE Criminals(
        criminal_id VARCHAR2(255) PRIMARY KEY,
        name VARCHAR2(100),
        location VARCHAR2(300),
        dob DATE,
        info VARCHAR2(1000),

        image VARCHAR2(1000)
);

CREATE TABLE Found_Criminals(
    case_id NUMBER,
    criminal_id VARCHAR2(255),

	PRIMARY KEY(case_id,criminal_id),
    FOREIGN KEY(case_id) REFERENCES Cases(case_id),
    FOREIGN KEY(criminal_id) REFERENCES Criminals(criminal_id)

    
);

CREATE TABLE Resources(
    case_id NUMBER,
    title VARCHAR2(100),
    source VARCHAR2(100),
    description VARCHAR2(1000),
    uploaded_date DATE,

    PRIMARY KEY(case_id),
    FOREIGN KEY(case_id) REFERENCES Cases(case_id)
);

CREATE TABLE Payment(
    case_id NUMBER,
    amount NUMBER(8,2),
    method VARCHAR2(100),
    card_no VARCHAR2(200),
    percentage NUMBER(2,2),
    payment_date DATE,

    PRIMARY KEY(case_id),
    FOREIGN KEY(case_id) REFERENCES Cases(case_id)

);
-- correction done!!
-- 
-- 3rd step/ not yet corrected 

CREATE TABLE Groups(
    name VARCHAR2(100) ,
    description VARCHAR2(1000),
    admin_id VARCHAR2(100),
    cover_photo VARCHAR2(1000),
    date_of_creation DATE,


    PRIMARY KEY(admin_id,name),
    FOREIGN KEY(admin_id) REFERENCES Users(user_id)
);

-- ganjammmm
CREATE TABLE Group_Members(
	member_id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    name VARCHAR2(100),
    admin_id VARCHAR2(100),
    user_id VARCHAR2(100),
    joining_date DATE,

	PRIMARY KEY(member_id),
	FOREIGN KEY(name,admin_id) REFERENCES Groups(name,admin_id)
);

CREATE TABLE Posts(
	post_id VARCHAR2(100),
    group_name VARCHAR2(100),
    user_id VARCHAR2(100),
    description VARCHAR2(1000),
    title VARCHAR2(100),
    posting_date TIMESTAMP(6),

    PRIMARY KEY(post_id) 
);


CREATE TABLE Comments(
    comment_id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    post_id VARCHAR2(100),
    user_id VARCHAR2(100),
    description VARCHAR2(1000),
    posting_date DATE,

    PRIMARY KEY(comment_id),
    FOREIGN KEY(post_id) REFERENCES Posts(post_id),
    FOREIGN KEY(user_id) REFERENCES Users(user_id)
);
-- 4th step === messages 