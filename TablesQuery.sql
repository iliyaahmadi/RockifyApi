create table Roles(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Role_Name VARCHAR(50) NOT NULL
);

create table Users(
	ID VARCHAR(100) NOT NULL PRIMARY KEY,
	User_Name VARCHAR(50) NOT NULL,
	User_Password VARCHAR(250) NOT NULL,
	User_Email VARCHAR(50) NOT NULL,
	User_Role_ID BIGINT REFERENCES Roles (ID),
	User_Image BYTEA
);

create table Genres(
	ID BIGSERIAL NOT NULL PRIMARY KEY,
	Genre_Name VARCHAR(50) NOT NULL
);

create table Tracks(
	ID VARCHAR(100) NOT NULL PRIMARY KEY,
	Track_Title VARCHAR(50) NOT NULL,
	Filename VARCHAR(250) NOT NULL,
	Duration INT NOT NULL,
	CoverUrl BYTEA,
	Uploaded Date NOT NULL,
	Track_Artist VARCHAR(100) REFERENCES Users (ID),
	Track_Genre BIGINT REFERENCES Genres (ID)
);

create table Playlist(
	ID VARCHAR(100) NOT NULL PRIMARY KEY,
	Playlist_Name VARCHAR(50) NOT NULL,
	User_ID VARCHAR(50) REFERENCES Users(ID)
);

create table Track_Genre(
	Genre_ID BIGINT REFERENCES Genres(ID),
	Track_ID VARCHAR(100) REFERENCES Tracks (ID)
);

create table Playlist_Track(
	Playlist_ID VARCHAR(50) REFERENCES Playlist (ID),
	Track_ID VARCHAR(50) REFERENCES Tracks (ID)
);

create table Popular(
	Track_ID VARCHAR(100) REFERENCES Tracks (ID),
	UNIQUE(Track_ID)
);

create table Likes(
	User_ID VARCHAR(100) REFERENCES Users (ID),
	Track_ID VARCHAR(100) REFERENCES Tracks (ID),
	Like_Date_Time date
);

create table History(
	User_ID VARCHAR(100) REFERENCES Users (ID),
	Track_ID VARCHAR(100) REFERENCES Tracks (ID)
);