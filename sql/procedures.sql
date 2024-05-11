CREATE OR REPLACE PROCEDURE ADDUSER(user_id IN VARCHAR2,password IN VARCHAR2,type IN VARCHAR2,
first_name IN VARCHAR2,last_name IN VARCHAR2,email IN VARCHAR2,address IN VARCHAR2)
Is 
BEGIN
INSERT INTO Users(user_id,password,type,first_name,last_name,email,address) VALUES (user_id,password,type,first_name,last_name,email,address);
if (type='Detective') THEN 
INSERT INTO Detectives(detective_id) VALUES(user_id);
END IF;
END;

CREATE OR REPLACE PROCEDURE ADDCASE(case_id IN NUMBER ,client_user_id IN VARCHAR2,title IN VARCHAR2,
type IN VARCHAR2,description IN VARCHAR2,submitted_date IN DATE, det_id IN VARCHAR2) IS 
BEGIN 
INSERT INTO Cases(case_id,client_user_id,title,type,description,submitted_date) VALUES(case_id,client_user_id,title,type,description,submitted_date);
INSERT INTO Filed_Cases(case_id,detective_id) VALUES(case_id,det_id);
END;
/

CREATE OR REPLACE PROCEDURE ADDPENDINGCASE(case_id IN NUMBER) IS 
BEGIN 
INSERT INTO Pending_Cases(case_id,progress_rate) VALUES(case_id,0.0);
UPDATE cases SET type='Pending' WHERE case_id=case_id;
END;
/


CREATE OR REPLACE PROCEDURE ADD_GROUP(name in VARCHAR2, description in VARCHAR2, admin_id in VARCHAR2, cover_photo in VARCHAR2, date_of_creation in DATE ) 
IS 
g_id NUMBER;
BEGIN 
INSERT INTO GROUPS(name,DESCRIPTION,admin_id,COVER_PHOTO,DATE_OF_CREATION) VALUES(name, DESCRIPTION,admin_id,  COVER_PHOTO,DATE_OF_CREATION);
SELECT count(*) INTO g_id FROM GROUPS;
g_id:=g_id+1;
INSERT INTO GROUP_MEMBERS(GROUP_NAME,ADMIN_ID, USER_ID,JOINING_DATE) VALUES(name,admin_id,admin_id,date_of_creation);
END;
/



CREATE OR REPLACE PROCEDURE UPDATE_ADMIN(name in VARCHAR2,admin_id IN VARCHAR2, new_admin IN VARCHAR2  ) 
IS 
BEGIN 
UPDATE GROUPS SET admin_id=new_admin WHERE name=name AND admin_id=admin_id;
END;
/


CREATE OR REPLACE PROCEDURE UPDATE_GROUP(name in VARCHAR2, description in VARCHAR2, cover_photo in VARCHAR2 ) 
IS 
BEGIN 
UPDATE GROUPS SET name=name, description=description, cover_photo=cover_photo; 
END;
/


CREATE OR REPLACE PROCEDURE ADD_SOLVED_CASE(case_id IN VARCHAR2 ,solved_date IN DATE, challenges IN VARCHAR2,criminal_id IN VARCHAR2,name IN VARCHAR2, location IN VARCHAR2,dob IN DATE, info IN VARCHAR2, image IN VARCHAR2) 
IS 
BEGIN 
UPDATE CASES SET type='solved' where case_id=case_id;
INSERT INTO SOLVED_CASES(case_id,solved_date,challenges) VALUES (case_id,solved_date,challenges);
INSERT INTO CRIMINALS(criminal_id,name,location,dob,info,image) VALUES(criminal_id,name,location,dob,info,image);
INSERT INTO FOUND_CRIMINALS(case_id,criminal_id) VALUES(case_id,criminal_id);
END;
/


CREATE OR REPLACE PROCEDURE UPDATE_CRIMINAL(criminal_id IN VARCHAR2,name IN VARCHAR2, location IN VARCHAR2,dob IN DATE, info IN VARCHAR2, image IN VARCHAR2) 
IS 
BEGIN 
UPDATE CRIMINALS 
SET  name=name, location=location,info=info,image=image WHERE criminal_id=criminal_id;
END;
/



CREATE OR REPLACE PROCEDURE ADD_RESOURCES(case_id in varchar2,title in varchar2,source in varchar2,description in varchar2,uploaded_date in date) 
IS 
BEGIN 
INSERT INTO RESOURCES(case_id,title,source,description,uploaded_date) VALUES(case_id,title,source,description,uploaded_date);
END;
/

CREATE OR REPLACE PROCEDURE UPDATE_RESOURCES(case_id in varchar2,title in varchar2,source in varchar2,description in varchar2,uploaded_date in date) 
IS 
BEGIN 
UPDATE RESOURCES
SET  source=source,description=description WHERE case_id=case_id AND title=title;
END;
/



CREATE OR REPLACE PROCEDURE EDIT(first_name IN VARCHAR2,last_name IN VARCHAR2, thana IN VARCHAR2, district IN VARCHAR2,division IN VARCHAR2,bio IN VARCHAR2,
experience IN VARCHAR2, user_id IN VARCHAR2) 
IS 
BEGIN 
UPDATE USERS 
SET first_name=first_name, last_name=last_name,thana=thana,district=district, division=division, bio=bio,experience=experience
WHERE user_id=user_id;
END;
/


CREATE OR REPLACE PROCEDURE ADD_UNSOLVED(U_CASE_ID IN VARCHAR2, U_limitation IN VARCHAR2, U_reason IN VARCHAR2) AS
RESULT VARCHAR2(100);
BEGIN
        DELETE FROM PENDING_CASES
        WHERE CASE_ID=U_CASE_ID;
        
        UPDATE  CASES
        SET TYPE='unsolved'
        WHERE CASE_ID=U_CASE_ID;
        
        INSERT INTO UNSOLVED_CASES
        VALUES(U_CASE_ID,U_reason, U_limitation);
        
    RESULT := 'UNSOLVED CASE is added';



EXCEPTION
    WHEN OTHERS THEN
        RESULT := 'Please fill up the field correctly';
END;
/




CREATE OR REPLACE PROCEDURE ADDDECLINEDCASE(P_CASE_ID IN VARCHAR2) AS
RESULT VARCHAR2(100);
BEGIN
		UPDATE FILED_CASES
		SET DETECTIVE_ID=NULL
		WHERE CASE_ID=P_CASE_ID;

		
		UPDATE  CASES
		SET TYPE='declined'
		WHERE CASE_ID=P_CASE_ID;
		
    RESULT := 'declined is added';

EXCEPTION
    WHEN OTHERS THEN
        RESULT := 'Please fill up the field correctly';
END;
/

CREATE OR REPLACE PROCEDURE UPDATEDECLINEDCASE(P_CASE_ID IN VARCHAR2, P_DETECTIVE_ID IN VARCHAR2) AS
RESULT VARCHAR2(100);
BEGIN
		UPDATE FILED_CASES
		SET DETECTIVE_ID=P_DETECTIVE_ID
		WHERE CASE_ID=P_CASE_ID;

		
		UPDATE  CASES
		SET TYPE='requested'
		WHERE CASE_ID=P_CASE_ID;
		
    RESULT := 'declined is updated';

EXCEPTION
    WHEN OTHERS THEN
        RESULT := 'Please fill up the field correctly';
END;
/


CREATE OR REPLACE PROCEDURE ADDUSER(user_id IN VARCHAR2,password IN VARCHAR2,type IN VARCHAR2,
first_name IN VARCHAR2,last_name IN VARCHAR2,email IN VARCHAR2,division IN VARCHAR2,district IN VARCHAR2,thana IN VARCHAR2)
Is 
BEGIN
INSERT INTO Users(user_id,password,type,first_name,last_name,email,division,district,thana) VALUES (user_id,password,type,first_name,last_name,email,division,district,thana);
if (lower(type)='detective') THEN 
INSERT INTO Detectives(detective_id) VALUES(user_id);
END IF;
END;
/

-- new 
CREATE OR REPLACE PROCEDURE ADDCRIMINAL(NAME IN VARCHAR2 ,DIVI IN VARCHAR2,DISTRICT IN VARCHAR2,THANA IN VARCHAR2,DOB IN DATE ,INFO IN VARCHAR2,IMAGE IN VARCHAR2) IS
cnt NUMBER;
div VARCHAR2(100);
num VARCHAR2(50);
BEGIN 
div:=SUBSTR(DIVI, 1, 3);
DBMS_OUTPUT.PUT_LINE(div);
SELECT COUNT(*) INTO cnt FROM CRIMINALS WHERE DIVISION = DIVI;
DBMS_OUTPUT.PUT_LINE(cnt);
cnt:=cnt+1;
num:=TO_CHAR(cnt);
div:=div||num;
DBMS_OUTPUT.PUT_LINE(div);
INSERT INTO CRIMINALS(CRIMINAL_ID,NAME,DIVISION,DISTRICT,THANA,DOB,INFO,IMAGE) 
VALUES(div,NAME,DIVI,DISTRICT,THANA,DOB,INFO,IMAGE);
END;
/

CREATE OR REPLACE PROCEDURE ADDNOTI(userId IN VARCHAR2,name IN VARCHAR2,text IN VARCHAR2, url IN VARCHAR2) IS 
BEGIN 
INSERT INTO NOTIFICATION(USER_ID,ENTITY_NAME,NOTIFICATION_TEXT,NOTIFICATION_URL,SEEN,TIMESTAMP)
VALUES(userId,name,text,url,'NO',SYSDATE);
END;
/

CREATE OR REPLACE PROCEDURE ADDDECLINEDCASE(P_CASE_ID IN VARCHAR2) AS
RESULT VARCHAR2(100);
BEGIN
		UPDATE FILED_CASES
		SET DETECTIVE_ID=NULL
		WHERE CASE_ID=P_CASE_ID;

		
		UPDATE  CASES
		SET TYPE='declined'
		WHERE CASE_ID=P_CASE_ID;
		
    RESULT := 'declined is added';

EXCEPTION
    WHEN OTHERS THEN
        RESULT := 'Please fill up the field correctly';
END;
/

CREATE OR REPLACE PROCEDURE UPDATEDECLINEDCASE(P_CASE_ID IN VARCHAR2, P_DETECTIVE_ID IN VARCHAR2) AS
RESULT VARCHAR2(100);
BEGIN
		UPDATE FILED_CASES
		SET DETECTIVE_ID=P_DETECTIVE_ID
		WHERE CASE_ID=P_CASE_ID;

		
		UPDATE  CASES
		SET TYPE='requested'
		WHERE CASE_ID=P_CASE_ID;
		
    RESULT := 'declined is updated';

EXCEPTION
    WHEN OTHERS THEN
        RESULT := 'Please fill up the field correctly';
END;
/