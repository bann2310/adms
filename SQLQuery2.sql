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
SELECT TOP (1000) [username]
      ,[timelogin]
      ,[statuslogin]
  FROM [ADMS].[dbo].[loginADMS]

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
	username varchar(255) not null,
	timelogin smalldatetime null,
	statuslogin Int null,
	PRIMARY KEY(username),
	FOREIGN KEY (username) REFERENCES userADMS(username),
)

DROP TABLE loginADMS

UPDATE userADMS SET password = 'asb', dateupdatepassword = '2023-05-13 16:47:00', firstlogin = 0 WHERE id = 3

DELETE FROM userADMS

DELETE FROM userADMS
WHERE id = 4