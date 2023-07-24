create table Roles(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Role_Name VARCHAR(50) NOT NULL
);

create table Users(
	ID VARCHAR(50) NOT NULL PRIMARY KEY,
	User_Name VARCHAR(50) NOT NULL,
	User_Password VARCHAR(50) NOT NULL,
	User_Email VARCHAR(50) NOT NULL,
	User_Role_ID BIGINT REFERENCES Roles (ID),
	User_Image BYTEA
);

create table Artists(
	ID VARCHAR(50) NOT NULL PRIMARY KEY,
	Artist_Name VARCHAR(50),
	Artist_Image BYTEA,
	User_ID VARCHAR(50) REFERENCES Users (ID)
);

create table Followers (
	User_ID VARCHAR(50) REFERENCES Users (ID),
	Artist_ID VARCHAR(50) REFERENCES Artists (ID)
);

create table Genres(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Genre_Name VARCHAR(50) NOT NULL
);

CREATE TABLE Albums (
	ID VARCHAR(50) NOT NULL PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Artist_ID VARCHAR(50) REFERENCES Artists (ID),
	Release_Date DATE,
	Cover BYTEA
);

create table Tracks(
	ID VARCHAR(50) NOT NULL PRIMARY KEY,
	Track_Title VARCHAR(50) NOT NULL,
	Likes BIGINT NOT NULL,
	Duration INT NOT NULL,
	Path VARCHAR(250) NOT NULL,
	CoverUrl BYTEA,
	Track_Artist VARCHAR(50) REFERENCES Artists (ID),
	Track_Album VARCHAR(50) REFERENCES Albums (ID)
);

create table Playlist(
	ID VARCHAR(50) NOT NULL PRIMARY KEY,
	Playlist_Name VARCHAR(50) NOT NULL,
	User_ID VARCHAR(50) REFERENCES Users(ID)
);

create table Track_Genre(
	Genre_ID BIGINT REFERENCES Genres(ID),
	Track_ID VARCHAR(50) REFERENCES Tracks (ID)
);

create table Playlist_Track(
	Playlist_ID VARCHAR(50) REFERENCES Playlist (ID),
	Track_ID VARCHAR(50) REFERENCES Tracks (ID)
);

create table Popular(
	Track_ID VARCHAR(50) REFERENCES Tracks (ID),
	UNIQUE(Track_ID)
);

create table Likes(
	Like_Date_Time date,
	User_ID VARCHAR(50) REFERENCES Users (ID),
	Track_ID VARCHAR(50) REFERENCES Tracks (ID)
);

create table History(
	User_ID VARCHAR(50) REFERENCES Users (ID),
	Track_ID VARCHAR(50) REFERENCES Tracks (ID)
);