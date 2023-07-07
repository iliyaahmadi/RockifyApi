create table Roles(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Role_Name VARCHAR(50) NOT NULL
);

create table Users(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	User_Name VARCHAR(50) NOT NULL,
	User_Email VARCHAR(50) NOT NULL,
	User_Role_ID BIGINT REFERENCES Roles (ID),
	User_Image BYTEA
);

create table Artists(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Artist_Name VARCHAR(50),
	Artist_Image BYTEA,
    User_ID BIGINT REFERENCES Users (ID)
);

create table Genres(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Genre_Name VARCHAR(50) NOT NULL
);


CREATE TABLE Albums (
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Name VARCHAR(50) NOT NULL,
	Artist_ID BIGINT REFERENCES Artists (ID),
	Release_Date DATE,
	Cover BYTEA
);

create table Songs(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Song_Title VARCHAR(50) NOT NULL,
	Likes BIGINT NOT NULL,
	Duration INT NOT NULL,
	Path VARCHAR(250) NOT NULL,
	CoverUrl BYTEA,
	Song_Artist BIGINT REFERENCES Artists (ID),
	Song_Album BIGINT REFERENCES Albums (ID)
);

create table Playlist(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Playlist_Name VARCHAR(50) NOT NULL,
	User_ID BIGINT REFERENCES Users(ID)
);

create table Song_Genre(
	Genre_ID BIGINT REFERENCES Genres(ID),
	Song_ID BIGINT REFERENCES Songs (ID)
);

create table Playlist_Song(
	Playlist_ID BIGINT REFERENCES Playlist (ID),
	Song_ID BIGINT REFERENCES Songs (ID)
);

create table Popular(
	Song_ID BIGINT REFERENCES Songs (ID),
	UNIQUE(Song_ID)
);

create table Likes(
	Like_Date_Time date,
	User_ID BIGINT REFERENCES Users (ID),
	Song_ID BIGINT REFERENCES Songs (ID)
);

create table History(
	User_ID BIGINT REFERENCES Users (ID),
	Song_ID BIGINT REFERENCES Songs (ID)
);

create table Followers (
	User_ID BIGINT REFERENCES Users (ID),
	Artist_ID BIGINT REFERENCES Artists (ID)
);