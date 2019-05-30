use i8qksfjkhpju15t0;
CREATE TABLE events (
   id int(11) NOT NULL AUTO_INCREMENT,
   title varchar(255) NOT NULL,
   start varchar(255) DEFAULT NULL,
   end varchar(255) DEFAULT NULL,
   PRIMARY KEY (`id`)
);
CREATE TABLE bps (
   id int(11) NOT NULL AUTO_INCREMENT,
   date datetime DEFAULT NULL,
   systolic int(11) DEFAULT NULL,
   diastolic int(11) DEFAULT NULL,
   pulse int(11) DEFAULT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
   PRIMARY KEY (id)
 );
 CREATE TABLE doctors (
   id int(11) NOT NULL AUTO_INCREMENT,
   name varchar(255) DEFAULT NULL,
   location varchar(255) DEFAULT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
   PRIMARY KEY (id)
 );
 CREATE TABLE exercises (
   id int(11) NOT NULL AUTO_INCREMENT,
   date datetime DEFAULT NULL,
   type varchar(255) DEFAULT NULL,
   duration int(11) DEFAULT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
   PRIMARY KEY (id)
 );
 CREATE TABLE foods (
   id int(11) NOT NULL AUTO_INCREMENT,
   date datetime DEFAULT NULL,
   meal varchar(255) DEFAULT NULL,
   name varchar(255) DEFAULT NULL,
   calorie int(11) DEFAULT NULL,
   sugar int(11) DEFAULT NULL,
   sodium int(11) DEFAULT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
   PRIMARY KEY (id)
 );
 CREATE TABLE mhnotes (
   id int(11) NOT NULL AUTO_INCREMENT,
   date datetime DEFAULT NULL,
   mood varchar(255) DEFAULT NULL,
   note varchar(255) DEFAULT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
   PRIMARY KEY (id)
 );
 CREATE TABLE prescriptions (
   id int(11) NOT NULL AUTO_INCREMENT,
   name varchar(255) DEFAULT NULL,
   dosage varchar(255) DEFAULT NULL,
   createdAt datetime NOT NULL,
   updatedAt datetime NOT NULL,
   PRIMARY KEY (id)
 );