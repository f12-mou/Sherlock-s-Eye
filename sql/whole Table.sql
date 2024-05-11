INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('Tushi123','abcd1234','client','Fatema','Tushi','suem@gmail.com','Dhaka');
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('Tushi1','abcd1234','client','Fatema','Tushi','tushi12@gmail.com','Barisal');
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('kishor12','abcd1234','detective','kishor','pasha','kishor3@gmail.com','Dhaka');
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('ava','abcd1234','detective','Johora','Ava','ava1221@gmail.com','Dhaka');
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('lara62','laraBandor','client','Lara','Khan','lara62@gmail.com','Mymensingh');
-- INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('ava','abcd1234','detective','Johora','Ava','ava1221@gmail.com','Dhaka');
-- INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('ava','abcd1234','detective','Johora','Ava','ava1221@gmail.com','Dhaka');
-- INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('ava','abcd1234','detective','Johora','Ava','ava1221@gmail.com','Dhaka');
-- INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES('ava','abcd1234','detective','Johora','Ava','ava1221@gmail.com','Dhaka');

-- add detective !!
BEGIN
adduser('musa','abcd1234','detective','Musa','Aman','musa@gmail.com','Barishal');
end;
					
BEGIN 
ADDUSER('robin22','abcd1234','detective','Robin','Milford','robin22@gmail.com','Sylhet');
END;

-- 

INSERT INTO Detectives(detective_id,rating,experience,bio) VALUES('ava',8.5,'Cyber Crime','');
INSERT INTO Detectives(detective_id,rating,experience,bio) VALUES('kishor12',9.5,'Any type','Bangladeshi-American, is the leader of Tin Goyenda');

-- edit info of detectives 
BEGIN 
UPDATE_INFO('robin22','abcd1234','detective','Robin','Milford','robin22@gmail.com','Sylhet',null,8.7,'A member of Tin Goyenda,assistant of Kishor Pasha', 'Book-worm','interested in All type Cases');
end;				
BEGIN 
UPDATE_INFO('musa','abcd1234','detective','Musa','Aman','musa@gmail.com','Barishal',null,7.6,
'A member of Tin Goyenda,assistant of Kishor Pasha', 'Skilled in fighting','interested in All type Cases');
end;




-- cases 
INSERT INTO Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(01,'Tushi123','Murder case','solved','Five years after the murder of a child in Narsingdi, 
it has been  disclosed that the father had assisted the criminals to kill his daughter in exchange for money.
Eleven-year-old Elma Begum, a second-grade student, was found dead in a paddy field in Narsingdi Sadar upazila''s 
Baherchar on March 28, 2015.
During investigation of the murder case,it has been found that her father and five more were involoved in this murder.
While briefing reporters, CID Deputy Inspector General Imtiaz Ahmed said there was a long-standing feud over establishing
 supremacy between two groups, led by one Md Shahjahan Bhuiyan and one Bachchu, a former union member.',
 TO_DATE('2022-02-22', 'SYYYY-MM-DD'));


INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(02,'Tushi123','Kidnapping Case','solved','A two-and-a-half month old infant was abducted on March 11,
 from a septic tank in Bagerhat''s Morrelganj upazila. The body was recovered yesterday.
 The dead Abdullah was son of Sohag Hawladar, a resident of district''s Nishanbaria area.After 
 recover the body police arrested Hridoy Chaprashi, the prime accused in a case filed in this connection,
  from the capital''s Sayedabad area on early Saturday. They conducted a drive, taking Hridoy along with them,
   yesterday morning to recover the body, said Riazul Islam, additional superintendent of police in Morrelganj.'
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));


INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(03,'lara62','School Bullying Case','solved','A formal student of BUET,CSE department, keeps harassing one of his classmates, always keeps disturbing her. Now ,she is too much disturbed to tolerate this'
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(04,'Tushi123','Case-2','Requested','I have lost my wallet in New Market yesterday'
   ,TO_DATE('2022-07-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(05,'Tushi123','Case-2','pending','Victim of fraud '
   ,TO_DATE('2022-07-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(06,'lara62','Patta dey na','Unsolved','No solution available for this problem '
   ,TO_DATE('2020-01-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(07,'tushi123','School Bullying Case','unsolved','A formal student of BUET,CSE department, keeps harassing one of his classmates, always keeps disturbing her. Now ,she is too much disturbed to tolerate this'
,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(08,'tushi1','School Bullying Case','unsolved','A formal student of BUET,CSE department, keeps harassing one of his classmates, always keeps disturbing her. Now ,she is too much disturbed to tolerate this'
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(09,'lara62','Serial killing','solved','Seven bodies of women have been found in the area in the last two months. It is believed to be 
the work of a serial killer.After investigation, detectives were able to catch the killer',TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(12,'tushi123','Kidnapping Case','solved','A two-and-a-half month old infant was abducted on March 11,
 from a septic tank in Bagerhat''s Morrelganj upazila. The body was recovered yesterday.
 The dead Abdullah was son of Sohag Hawladar, a resident of district''s Nishanbaria area.After 
 recover the body police arrested Hridoy Chaprashi, the prime accused in a case filed in this connection,
  from the capital''s Sayedabad area on early Saturday. They conducted a drive, taking Hridoy along with them,
   yesterday morning to recover the body, said Riazul Islam, additional superintendent of police in Morrelganj.'
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(13,'lara62','A very Bad CR ','solved',' our cr isn''t listening to us.'
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(14,'lara62','DSLR GONE ','solved','Almost a week ago, I lost my DSLR camera, which was gifted by my cousin. '
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(15,'tushi1','School Bullying Case','unsolved','A formal student of BUET,CSE department, keeps harassing one of his classmates, always keeps disturbing her. Now ,she is too much disturbed to tolerate this'
,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(16,'tushi123','A very Bad CR ','pending',' our cr isn''t listening to us.'
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));
INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(17,'tushi1','A very Bad CR ','pending',' our cr isn''t listening to us.'
,TO_DATE('2022-03-12', 'SYYYY-MM-DD')); 

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(18,'tushi1','A very Bad CR ','requested',' our cr isn''t listening to us.'
,TO_DATE('2022-04-12', 'SYYYY-MM-DD')); 

INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(19,'tushi123','DSLR GONE ','unsolved','Almost a week ago, I lost my DSLR camera, which was gifted by my cousin. '
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));
INSERT INTO  Cases(case_id,client_user_id,title,type,description,submitted_date) 
VALUES(20,'tushi1','DSLR GONE ','pending','Almost a week ago, I lost my DSLR camera, which was gifted by my cousin. '
   ,TO_DATE('2022-03-12', 'SYYYY-MM-DD'));

INSERT INTO Filed_Cases(case_id,detective_id) VALUES(01,'ava');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(02,'kishor12');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(03,'ava');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(04,'ava');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(05,'kishor12');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(05,'robin22');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(05,'musa');
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(06,'robin22');










NSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Dha01','Shattik Islam','Dhaka',TO_DATE('12-DEC-1980','DD-MON-YYYY'),'Shattik Islam, a infamous serial killer, has almost killed seven women till now. The reason behind all the murders is still unknown, detectives are investigating it right now.',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(1,'Dha01');


INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Raj01','Hafijul Haque','Rajshahi',TO_DATE('25-JUL-2000','DD-MON-YYYY'),'Hafizul Haque abducted a schoolgirl a few days ago. The girl''s parents then contacted detectives. After investigation they were able to locate the kidnapper and the child.',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(2,'Raj01');

INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Ran01','Farhan Tahmid Ryan','Rangpur',TO_DATE('23-OCT-1999','DD-MON-YYYY'),'Farhan Tahmid Ryan, a formal student of BUET,CSE department, bullies his classmates a lot, always keeps making fun of them. Some of his classmates are too much disgusted with him',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(3,'Ran01');


INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Bar01','Rhythm','Barisal',TO_DATE('28-JUN-1995','DD-MON-YYYY'),'Rhythm,abuser,mentally abuses his classmate, Ava',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(4,'Bar01');



INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Syl01','Asif Azad','Sylhet',TO_DATE('19-FEB-2001','DD-MON-YYYY'),'Asif Azad mentally tortures one of his his female class-mate. He keeps pushing her away though that girl likes him a lot. So, fter suffering almost three years , the victim finally filed a case against him.',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(6,'Syl01');

INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Cha01','Cha Eun Woo','Chattogram',TO_DATE('30-MAR-1996','DD-MON-YYYY'),'He has stolen the hearts of many girls',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(5,'Cha01');


INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Khu01','Farhan Tahmid Ryan','Khulna',TO_DATE('23-SEP-1999','DD-MON-YYYY'),'Farhan Tahmid Ryan, a formal student of BUET,CSE department, bullies his classmates a lot, always keeps making fun of them. Some of his classmates are too much disgusted with him',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(7,'khu01');


INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Mym01','Farhan Tahmid Ryan','Mymensingh',TO_DATE('12-OCT-1997','DD-MON-YYYY'),'Farhan Tahmid Ryan, a formal student of BUET,CSE department, bullies his classmates a lot, always keeps making fun of them. Some of his classmates are too much disgusted with him',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(8,'Mym01');


INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Raj02','Shattik Islam','Rajshahi',TO_DATE('12-DEC-1980','DD-MON-YYYY'),'Shattik Islam, a infamous serial killer, has almost killed seven women till now. The reason behind all the murders is still unknown, detectives are investigating it right now.',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(9,'Raj02');


INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Mym02','Hafijul Haque','Mymensingh',TO_DATE('25-JUL-2000','DD-MON-YYYY'),'Hafizul Haque abducted a schoolgirl a few days ago. The girl''s parents then contacted detectives. After investigation they were able to locate the kidnapper and the child.',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(12,'Mym02');

INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Bar02','Asif Azad','Barisal',TO_DATE('23-OCT-1999','DD-MON-YYYY'),'Asif Azad, a very very bad CR. His classmates keep requesting 
him to talk with teachers about ct marks and other assessments marks, but he always ignores it.',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(13,'Bar02');


INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Syl02','Gazi Fardin Zafor','Sylhet',TO_DATE('28-JUN-1996','DD-MON-YYYY'),'Gazi Fardin Zafor stole a DSLR camera from one of his classmates and keeps using it for his photography.',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(14,'Syl02');

INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES('Dha03','Nafis Tahmid','Dhaka',TO_DATE('28-JUN-1996','DD-MON-YYYY'),'Nafis Tahmid, a bully, always bullies one of his classmates, always keeps disturbing her by asking,"kire Barishailla?" "kire ,Kemon achos?" 
"Kire,criminal koyta dhorli?" The victiom was too much disturbed to tolerate this. So, she decided to file a case against him',null);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(15,'Dha03');










insert into SOLVED_CASES values(1,TO_DATE('25-JUL-2000','DD-MON-YYYY'),'tough');
insert into SOLVED_CASES values(2,TO_DATE('12-JUN-2000','DD-MON-YYYY'),'tough');
insert into SOLVED_CASES values(3,TO_DATE('5-MAY-2015','DD-MON-YYYY'),'tough');
insert into SOLVED_CASES values(9,TO_DATE('20-FEB-2020','DD-MON-YYYY'),'tough');
insert into SOLVED_CASES values(12,TO_DATE('25-OCT-2020','DD-MON-YYYY'),'tough');
insert into SOLVED_CASES values(13,TO_DATE('25-JUL-2021','DD-MON-YYYY'),'tough');
insert into SOLVED_CASES values(14,TO_DATE('25-SEP-2021','DD-MON-YYYY'),'tough');


insert into unSOLVED_CASES values(6,'Don''t know how to resolve heart related problem. Detective is now also trying to do solve problem','Emotions are attached');
-- insert into unSOLVED_CASES values(10,'Killer has escaped from the country.','Having no access outside the country');
insert into unSOLVED_CASES values(7,'Killer is dead','Criminal is dead now');
insert into unSOLVED_CASES values(8,'Criminal has escaped from the country.','Having no access outside the country');
insert into unSOLVED_CASES values(15,'Criminal has escaped from the country.','Having no access outside the country');
insert into unSOLVED_CASES values(19,'Criminal has escaped from the country.','Having no access outside the country');


INSERT INTO PENDING_CASES(case_id,PROSPECTED_DATE,PROGRESS_RATE) VALUES(5,TO_DATE('20-jan-2023','DD-MON-YYYY'),0.55);
INSERT INTO PENDING_CASES(case_id,PROSPECTED_DATE,PROGRESS_RATE) VALUES(16,TO_DATE('20-jul-2023','DD-MON-YYYY'),0.43);
INSERT INTO PENDING_CASES(case_id,PROSPECTED_DATE,PROGRESS_RATE) VALUES(20,TO_DATE('25-sep-2023','DD-MON-YYYY'),0.78);





INSERT INTO GROUPS(name,description,admin_id,cover_photo,date_of_creation) VALUES('We All Are Detectives','This group is for all detectives for their regular communication','kishor12',null,TO_DATE('16-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUPS(name,description,admin_id,cover_photo,date_of_creation) VALUES('Tin Goyenda','This group is only available for three of us,Kishor,Musa and Robin','kishor12',null,TO_DATE('16-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUPS(name,description,admin_id,cover_photo,date_of_creation) VALUES('GROUP-DEMO','This group is only for demo','ava',null,TO_DATE('11-JUN-2021','DD-MON-YYYY'));


INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('Tin Goyenda','kishor12','kishor12',TO_DATE('16-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('Tin Goyenda','robin22','kishor12',TO_DATE('16-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('Tin Goyenda','musa','kishor12',TO_DATE('16-jan-2022','DD-MON-YYYY'));


INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('We All Are Detectives','robin22','kishor12',TO_DATE('20-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('We All Are Detectives','kishor12','kishor12',TO_DATE('16-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('We All Are Detectives','musa','kishor12',TO_DATE('21-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('We All Are Detectives','ava','kishor12',TO_DATE('16-jan-2022','DD-MON-YYYY'));



INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('GROUP-DEMO','ava','ava',TO_DATE('16-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('GROUP-DEMO','kishor12','ava',TO_DATE('17-sep-2021','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('GROUP-DEMO','musa','ava',TO_DATE('16-jan-2022','DD-MON-YYYY'));
INSERT INTO GROUP_MEMBERS(NAME,USER_ID,ADMIN_ID,JOINING_DATE) VALUES('GROUP-DEMO','robin','ava',TO_DATE('20-jan-2022','DD-MON-YYYY'));
