/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id]
      ,[username]
      ,[password]
      ,[email]
      ,[role]
      ,[firstlogin]
      ,[dateupdatepassword]
  FROM [ADMS].[dbo].[userADMS]

  /****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP (1000) [id_user]
      ,[email]
      ,[code]
      ,[prod]
      ,[expire]
  FROM [ADMS].[dbo].[sendcodeADMS]

    /****** Script for SelectTopNRows command from SSMS  ******/
SELECT * FROM [ADMS].[dbo].[documentADMS]

	  /****** Script for SelectTopNRows command from SSMS  ******/
	SELECT TOP (1000) [username]
		  ,[timelogin]
		  ,[statuslogin]
	  FROM [ADMS].[dbo].[loginADMS]
  DELETE FROM loginADMS WHERE username = '21520208'

  DELETE FROM sendcodeADMS WHERE id_user = 1

  SELECT id FROM userADMS WHERE email = '21520208@gm.uit.edu.vn'

UPDATE userADMS
SET email = '21521003@gm.uit.edu.vn'
WHERE email = '21521003@gm.edu.uit.vn';

DELETE FROM userADMS
WHERE id = 1;

CREATE TABLE sendcodeADMS(
	id_user int not null,
	email varchar(255) not null UNIQUE,
	code int not null,
	prod smalldatetime null,
	expire smalldatetime null,
	PRIMARY KEY(id_user, email),
	FOREIGN KEY (id_user) REFERENCES userADMS(id),
	FOREIGN KEY (email) REFERENCES userADMS(email),
)

DROP TABLE sendcodeADMS

CREATE TABLE userADMS(
	id int not null IDENTITY(1,1) PRIMARY KEY,
	name nvarchar(255) null,
	username varchar(255) not null UNIQUE,
	password varchar(255) not null,
	email varchar(255) not null UNIQUE,
	role varchar(255) not null,
	firstlogin int null DEFAULT 1,
	dateupdatepassword smalldatetime null,
)

DROP TABLE userADMS

CREATE TABLE loginADMS(
	username varchar(255) null,
	timelogin smalldatetime null,
	statuslogin Int null,
)

DROP TABLE loginADMS

UPDATE userADMS SET password = 'asb', dateupdatepassword = '2023-05-13 16:47:00', firstlogin = 0 WHERE id = 3

DELETE FROM userADMS

DELETE FROM userADMS
WHERE id = 4

CREATE TABLE documentADMS(
	id int not null IDENTITY(1,1) PRIMARY KEY,
	number int not null,
	namedoc nvarchar(255) not null,
	datedoc smalldatetime not null,
	typedoc int not null,
	termdoc varchar(255) not null,
	note nvarchar(255),
	filepri nvarchar(255) not null,
	fileat nvarchar(255),
	id_save bigint not null,
)

DROP TABLE documentADMS
SELECT * FROM documentADMS WHERE (namedoc LIKE '%3%' OR number LIKE '%3%')

CREATE TABLE reportADMS(
	id int not null IDENTITY(1,1) PRIMARY KEY,
	id_user int not null,
	name nvarchar(255) not null,
	email nvarchar(255) not null,
	problem nvarchar(255) not null,
	descrip nvarchar(max),
	datesub smalldatetime,
	FOREIGN KEY (id_user) REFERENCES userADMS(id),
)
SELECT * FROM reportADMS
DROP TABLE reportADMS

SELECT username FROM (SELECT username, count(*) as countlogin FROM loginADMS GROUP BY username) WHERE countlogin = 5