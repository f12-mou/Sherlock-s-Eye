CREATE OR REPLACE FUNCTION IS_GROUP_MEMBER(GM_GROUP_ID IN NUMBER, GM_USER_ID IN VARCHAR2) RETURN VARCHAR2 AS
CNT NUMBER;
RET VARCHAR2(50);
BEGIN
    SELECT COUNT(*) INTO CNT FROM GROUP_MEMBERS
    WHERE USER_ID = GM_USER_ID AND GROUP_ID= GM_GROUP_ID;
    IF CNT = 0 THEN
        RET := 'NO';
    ELSE
        RET := 'YES';
    end if;
    RETURN RET;
end;

CREATE OR REPLACE FUNCTION IS_LIKED (L_POST_ID IN NUMBER, L_USER_ID IN VARCHAR2) RETURN VARCHAR2 AS
CNT NUMBER;
RET VARCHAR2(5);
BEGIN
    SELECT COUNT(*) INTO CNT FROM LIKES
    WHERE USER_ID = L_USER_ID AND POST_ID= L_POST_ID;
    IF CNT = 0 THEN
        RET := 'NO';
    ELSE
        RET := 'YES';
    end if;
    RETURN RET;
end;

CREATE OR REPLACE FUNCTION IS_PENDING_MEMBER(PM_GROUP_ID IN NUMBER, PM_USER_ID IN VARCHAR2) RETURN VARCHAR2 AS
CNT NUMBER;
RET VARCHAR2(50);
BEGIN
    SELECT COUNT(*) INTO CNT FROM PENDING_MEMBERS
    WHERE USER_ID = PM_USER_ID AND GROUP_ID= PM_GROUP_ID;
		IF CNT = 0 THEN
       RET := 'NO';
		ELSE
        RET := 'YES';
    end if;
    RETURN RET;
end;