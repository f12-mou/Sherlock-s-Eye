DROP TABLE Users;
CREATE TABLE Users(
    user_id VARCHAR2(50),
    password VARCHAR2(500) not null,
    type VARCHAR2(50) NOT NULL ,
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100),
    email VARCHAR2(50) UNIQUE NOT NULL ,
    address VARCHAR2(200),

    PRIMARY KEY(user_id)
)




DROP TABLE Detectives;
CREATE TABLE Detectives(
    detective_id VARCHAR2(50) NOT NULL,
    rating NUMBER,
    experience VARCHAR2(50),
    bio VARCHAR2(1000),

    FOREIGN KEY(detective_id) REFERENCES Users(user_id)
);

DROP TABLE Cases;
CREATE TABLE Cases(
    case_id NUMBER  ,
    -- one case
	client_user_id VARCHAR2(50),
    title VARCHAR2(100) NOT NULL,
    type VARCHAR2(100) NOT NULL,
    description VARCHAR2(1000) ,
    submitted_date DATE DEFAULT SYSDATE,


    PRIMARY KEY(case_id)	,
	FOREIGN KEY(client_user_id) REFERENCES Users(user_id)

);

CREATE TABLE Filed_Cases(
    id NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) ,
    case_id NUMBER,
    detective_id VARCHAR2(100) NOT NULL,

    PRIMARY KEY(id),
    FOREIGN KEY(detective_id) REFERENCES Users(user_id),
	FOREIGN KEY(case_id) REFERENCES Cases(case_id)

);



INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('Tushi123','abcd1234','client','Fatema','Tushi','suem@gmail.com','Dhaka');
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('Tushi1','abcd1234','client','Fatema','Tushi','tushi12@gmail.com','Dhaka');
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('kishor12','abcd1234','detective','kishor','pasha','kishor3@gmail.com','Dhaka');
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('ava','abcd1234','client','Johora','Ava','ava1221@gmail.com','Dhaka');

INSERT INTO Detectives(detective_id,rating,experience,bio) VALUES('ava',8.5,'Cyber Crime','');
INSERT INTO Detectives(detective_id,rating,experience,bio) VALUES('kishor12',9.5,'Any type','Bangladeshi-American, is the leader of Tin Goyenda');




--  insert to users -> clients 
-- INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) 
-- VALUES('Tushi123','abcd1234','client','Fatema','Tushi','suem@gmail.com','Dhaka');

-- INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) 
-- VALUES('Tushi1','abcd1234','client','Fatema','Tushi','tushi12@gmail.com','Dhaka');

INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) 
VALUES('lara62','laraBandor','client','Lara','Khan','lara62@gmail.com','Dhaka');


-- insert to cases ->solved
INSERT INTO Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(01,'Tushi123','Murder case','solved','Five years after the murder of a child in Narsingdi, 
it has been  disclosed that the father had assisted the criminals to kill his daughter in exchange for money.
Eleven-year-old Elma Begum, a second-grade student, was found dead in a paddy field in Narsingdi Sadar upazila''s 
Baherchar on March 28, 2015.
During investigation of the murder case,it has been found that her father and five more were involoved in this murder.
While briefing reporters, CID Deputy Inspector General Imtiaz Ahmed said there was a long-standing feud over establishing
 supremacy between two groups, led by one Md Shahjahan Bhuiyan and one Bachchu, a former union member.',
 TO_DATE('2022-02-22 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'));


INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(02,'Tushi1','Kidnapping Case','Solved','A two-and-a-half month old infant was abducted on March 11,
 from a septic tank in Bagerhat''s Morrelganj upazila. The body was recovered yesterday.
 The dead Abdullah was son of Sohag Hawladar, a resident of district''s Nishanbaria area.After 
 recover the body police arrested Hridoy Chaprashi, the prime accused in a case filed in this connection,
  from the capital''s Sayedabad area on early Saturday. They conducted a drive, taking Hridoy along with them,
   yesterday morning to recover the body, said Riazul Islam, additional superintendent of police in Morrelganj.'
   ,TO_DATE('2022-03-12 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'));


INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(04,'Tushi123','Case-2','Requested','I have lost my wallet in New Market yesterday'
   ,TO_DATE('2022-07-12 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(05,'Tushi1','Case-2','pending','Victim of fraud '
   ,TO_DATE('2022-07-12 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(06,'lara62','Patta dey na','Unsolved','No solution available for this problem '
   ,TO_DATE('2020-01-12 00:00:00', 'SYYYY-MM-DD HH24:MI:SS'));


INSERT INTO Filed_Cases(case_id,detective_id) VALUES(01,'ava');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(04,'ava');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(05,'kishor12');