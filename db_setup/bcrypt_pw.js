var bcrypt = require('bcryptjs');
const fs = require('fs')
const path = require('path')


var userArr = [
  { "id": 0, "first_name": "John", "last_name": "Doe", "email": "user0@example.com", "username": "user0", "password": "password0", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 1, "first_name": "John", "last_name": "Doe", "email": "user1@example.com", "username": "user1", "password": "password1", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 2, "first_name": "John", "last_name": "Doe", "email": "user2@example.com", "username": "user2", "password": "password2", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 3, "first_name": "John", "last_name": "Doe", "email": "user3@example.com", "username": "user3", "password": "password3", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 4, "first_name": "John", "last_name": "Doe", "email": "user4@example.com", "username": "user4", "password": "password4", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 5, "first_name": "John", "last_name": "Doe", "email": "user5@example.com", "username": "user5", "password": "password5", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 6, "first_name": "John", "last_name": "Doe", "email": "user6@example.com", "username": "user6", "password": "password6", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 7, "first_name": "John", "last_name": "Doe", "email": "user7@example.com", "username": "user7", "password": "password7", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 8, "first_name": "John", "last_name": "Doe", "email": "user8@example.com", "username": "user8", "password": "password8", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 9, "first_name": "John", "last_name": "Doe", "email": "user9@example.com", "username": "user9", "password": "password9", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 10, "first_name": "John", "last_name": "Doe", "email": "user10@example.com", "username": "user10", "password": "password10", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 11, "first_name": "John", "last_name": "Doe", "email": "user11@example.com", "username": "user11", "password": "password11", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 12, "first_name": "John", "last_name": "Doe", "email": "user12@example.com", "username": "user12", "password": "password12", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 13, "first_name": "John", "last_name": "Doe", "email": "user13@example.com", "username": "user13", "password": "password13", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 14, "first_name": "John", "last_name": "Doe", "email": "user14@example.com", "username": "user14", "password": "password14", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 15, "first_name": "John", "last_name": "Doe", "email": "user15@example.com", "username": "user15", "password": "password15", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 16, "first_name": "John", "last_name": "Doe", "email": "user16@example.com", "username": "user16", "password": "password16", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 17, "first_name": "John", "last_name": "Doe", "email": "user17@example.com", "username": "user17", "password": "password17", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 18, "first_name": "John", "last_name": "Doe", "email": "user18@example.com", "username": "user18", "password": "password18", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 19, "first_name": "John", "last_name": "Doe", "email": "user19@example.com", "username": "user19", "password": "password19", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 20, "first_name": "John", "last_name": "Doe", "email": "user20@example.com", "username": "user20", "password": "password20", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 21, "first_name": "John", "last_name": "Doe", "email": "user21@example.com", "username": "user21", "password": "password21", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 22, "first_name": "John", "last_name": "Doe", "email": "user22@example.com", "username": "user22", "password": "password22", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 23, "first_name": "John", "last_name": "Doe", "email": "user23@example.com", "username": "user23", "password": "password23", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 24, "first_name": "John", "last_name": "Doe", "email": "user24@example.com", "username": "user24", "password": "password24", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 25, "first_name": "John", "last_name": "Doe", "email": "user25@example.com", "username": "user25", "password": "password25", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 26, "first_name": "John", "last_name": "Doe", "email": "user26@example.com", "username": "user26", "password": "password26", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 27, "first_name": "John", "last_name": "Doe", "email": "user27@example.com", "username": "user27", "password": "password27", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 28, "first_name": "John", "last_name": "Doe", "email": "user28@example.com", "username": "user28", "password": "password28", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 29, "first_name": "John", "last_name": "Doe", "email": "user29@example.com", "username": "user29", "password": "password29", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 30, "first_name": "John", "last_name": "Doe", "email": "user30@example.com", "username": "user30", "password": "password30", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 31, "first_name": "John", "last_name": "Doe", "email": "user31@example.com", "username": "user31", "password": "password31", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 32, "first_name": "John", "last_name": "Doe", "email": "user32@example.com", "username": "user32", "password": "password32", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 33, "first_name": "John", "last_name": "Doe", "email": "user33@example.com", "username": "user33", "password": "password33", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 34, "first_name": "John", "last_name": "Doe", "email": "user34@example.com", "username": "user34", "password": "password34", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 35, "first_name": "John", "last_name": "Doe", "email": "user35@example.com", "username": "user35", "password": "password35", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 36, "first_name": "John", "last_name": "Doe", "email": "user36@example.com", "username": "user36", "password": "password36", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 37, "first_name": "John", "last_name": "Doe", "email": "user37@example.com", "username": "user37", "password": "password37", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 38, "first_name": "John", "last_name": "Doe", "email": "user38@example.com", "username": "user38", "password": "password38", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 39, "first_name": "John", "last_name": "Doe", "email": "user39@example.com", "username": "user39", "password": "password39", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 40, "first_name": "John", "last_name": "Doe", "email": "user40@example.com", "username": "user40", "password": "password40", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 41, "first_name": "John", "last_name": "Doe", "email": "user41@example.com", "username": "user41", "password": "password41", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 42, "first_name": "John", "last_name": "Doe", "email": "user42@example.com", "username": "user42", "password": "password42", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 43, "first_name": "John", "last_name": "Doe", "email": "user43@example.com", "username": "user43", "password": "password43", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 44, "first_name": "John", "last_name": "Doe", "email": "user44@example.com", "username": "user44", "password": "password44", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 45, "first_name": "John", "last_name": "Doe", "email": "user45@example.com", "username": "user45", "password": "password45", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 46, "first_name": "John", "last_name": "Doe", "email": "user46@example.com", "username": "user46", "password": "password46", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 47, "first_name": "John", "last_name": "Doe", "email": "user47@example.com", "username": "user47", "password": "password47", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 48, "first_name": "John", "last_name": "Doe", "email": "user48@example.com", "username": "user48", "password": "password48", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 49, "first_name": "John", "last_name": "Doe", "email": "user49@example.com", "username": "user49", "password": "password49", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 50, "first_name": "John", "last_name": "Doe", "email": "user50@example.com", "username": "user50", "password": "password50", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 51, "first_name": "John", "last_name": "Doe", "email": "user51@example.com", "username": "user51", "password": "password51", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 52, "first_name": "John", "last_name": "Doe", "email": "user52@example.com", "username": "user52", "password": "password52", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 53, "first_name": "John", "last_name": "Doe", "email": "user53@example.com", "username": "user53", "password": "password53", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 54, "first_name": "John", "last_name": "Doe", "email": "user54@example.com", "username": "user54", "password": "password54", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 55, "first_name": "John", "last_name": "Doe", "email": "user55@example.com", "username": "user55", "password": "password55", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 56, "first_name": "John", "last_name": "Doe", "email": "user56@example.com", "username": "user56", "password": "password56", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 57, "first_name": "John", "last_name": "Doe", "email": "user57@example.com", "username": "user57", "password": "password57", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 58, "first_name": "John", "last_name": "Doe", "email": "user58@example.com", "username": "user58", "password": "password58", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 59, "first_name": "John", "last_name": "Doe", "email": "user59@example.com", "username": "user59", "password": "password59", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 60, "first_name": "John", "last_name": "Doe", "email": "user60@example.com", "username": "user60", "password": "password60", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 61, "first_name": "John", "last_name": "Doe", "email": "user61@example.com", "username": "user61", "password": "password61", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 62, "first_name": "John", "last_name": "Doe", "email": "user62@example.com", "username": "user62", "password": "password62", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 63, "first_name": "John", "last_name": "Doe", "email": "user63@example.com", "username": "user63", "password": "password63", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 64, "first_name": "John", "last_name": "Doe", "email": "user64@example.com", "username": "user64", "password": "password64", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 65, "first_name": "John", "last_name": "Doe", "email": "user65@example.com", "username": "user65", "password": "password65", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 66, "first_name": "John", "last_name": "Doe", "email": "user66@example.com", "username": "user66", "password": "password66", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 67, "first_name": "John", "last_name": "Doe", "email": "user67@example.com", "username": "user67", "password": "password67", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 68, "first_name": "John", "last_name": "Doe", "email": "user68@example.com", "username": "user68", "password": "password68", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 69, "first_name": "John", "last_name": "Doe", "email": "user69@example.com", "username": "user69", "password": "password69", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 70, "first_name": "John", "last_name": "Doe", "email": "user70@example.com", "username": "user70", "password": "password70", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 71, "first_name": "John", "last_name": "Doe", "email": "user71@example.com", "username": "user71", "password": "password71", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 72, "first_name": "John", "last_name": "Doe", "email": "user72@example.com", "username": "user72", "password": "password72", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 73, "first_name": "John", "last_name": "Doe", "email": "user73@example.com", "username": "user73", "password": "password73", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 74, "first_name": "John", "last_name": "Doe", "email": "user74@example.com", "username": "user74", "password": "password74", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 75, "first_name": "John", "last_name": "Doe", "email": "user75@example.com", "username": "user75", "password": "password75", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 76, "first_name": "John", "last_name": "Doe", "email": "user76@example.com", "username": "user76", "password": "password76", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 77, "first_name": "John", "last_name": "Doe", "email": "user77@example.com", "username": "user77", "password": "password77", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 78, "first_name": "John", "last_name": "Doe", "email": "user78@example.com", "username": "user78", "password": "password78", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 79, "first_name": "John", "last_name": "Doe", "email": "user79@example.com", "username": "user79", "password": "password79", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 80, "first_name": "John", "last_name": "Doe", "email": "user80@example.com", "username": "user80", "password": "password80", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 81, "first_name": "John", "last_name": "Doe", "email": "user81@example.com", "username": "user81", "password": "password81", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 82, "first_name": "John", "last_name": "Doe", "email": "user82@example.com", "username": "user82", "password": "password82", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 83, "first_name": "John", "last_name": "Doe", "email": "user83@example.com", "username": "user83", "password": "password83", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 84, "first_name": "John", "last_name": "Doe", "email": "user84@example.com", "username": "user84", "password": "password84", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 85, "first_name": "John", "last_name": "Doe", "email": "user85@example.com", "username": "user85", "password": "password85", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 86, "first_name": "John", "last_name": "Doe", "email": "user86@example.com", "username": "user86", "password": "password86", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 87, "first_name": "John", "last_name": "Doe", "email": "user87@example.com", "username": "user87", "password": "password87", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 88, "first_name": "John", "last_name": "Doe", "email": "user88@example.com", "username": "user88", "password": "password88", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 89, "first_name": "John", "last_name": "Doe", "email": "user89@example.com", "username": "user89", "password": "password89", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 90, "first_name": "John", "last_name": "Doe", "email": "user90@example.com", "username": "user90", "password": "password90", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 91, "first_name": "John", "last_name": "Doe", "email": "user91@example.com", "username": "user91", "password": "password91", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 92, "first_name": "John", "last_name": "Doe", "email": "user92@example.com", "username": "user92", "password": "password92", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 93, "first_name": "John", "last_name": "Doe", "email": "user93@example.com", "username": "user93", "password": "password93", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 94, "first_name": "John", "last_name": "Doe", "email": "user94@example.com", "username": "user94", "password": "password94", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 95, "first_name": "John", "last_name": "Doe", "email": "user95@example.com", "username": "user95", "password": "password95", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 96, "first_name": "John", "last_name": "Doe", "email": "user96@example.com", "username": "user96", "password": "password96", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 97, "first_name": "John", "last_name": "Doe", "email": "user97@example.com", "username": "user97", "password": "password97", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 98, "first_name": "John", "last_name": "Doe", "email": "user98@example.com", "username": "user98", "password": "password98", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 99, "first_name": "John", "last_name": "Doe", "email": "user99@example.com", "username": "user99", "password": "password99", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 100, "first_name": "John", "last_name": "Doe", "email": "user100@example.com", "username": "user100", "password": "password100", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" },
  { "id": 101, "first_name": "James", "last_name": "Rutledge", "email": "jmz527@example.com", "username": "jmz527", "password": "password527", "createdAt": "2017-12-23 03:06:05.859 +00:00", "updatedAt": "2017-12-23 03:06:05.859 +00:00" }
];


userArr.map(function(user) {
  bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
          // Store hash in your password DB. 
      console.log({ salt, hash });

      // return Object.assign({}, user, { password: hash });
      });
  });
})


// saveJSON("user_seed", seedArr);


// // JSON SAVE
// // =========================================================== //
// function saveJSON(thisPath, json) {
//   fs.writeFile(`${thisPath}.json`, JSON.stringify(json, null, 4), function(err){
//     console.log(`\x1b[36m%s\x1b[0m`, `JSON file successfully written!`)
//     console.log(`\x1b[36m%s\x1b[0m`, `Check your project directory for the ${thisPath}.json file`)
//   })
// }