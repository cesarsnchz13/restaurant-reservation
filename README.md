# Periodic Tables: Restaurant Reservation System

### [View Website](https://cesar-reservation-client.herokuapp.com/)
---
## Summary
### Periodic Tables allows restaurant hosts or managers to create tables and book reservations. This application prives the ability to create, edit, and search for reservations in the at any point in time. Reservations can be searched via phone number. Users are also able to seat guests to occupy tables and finish/close reservations as guests finish their stay. 
---
## Technology and Tools Utilized:
### Front End
- React.js
- Bootstrap
- CSS
- HTML

### Back End
- Node.js
- Express.js
- PostgreSQL
- Knex.js

---

## Installation Insructions
### Front End
- From the root directory, run `npm install`
- run `npm start` to start the application

### Back End
- `cd` into `restaurant-reservation-main/back-end`
- run `npm install`
- run `npx knex migrate:latest` and `npx knex seed:run`

---
## Features

### Dashboard
The dashboard is the main page of the website that displays booked reservations and available tables for the current day. Users can navigate to different dates to view reservations on different days. From the dashboard, the user is able to seat, edit, or cancel the reservation.

<img width="1440" alt="Screen Shot 2022-04-11 at 8 41 15 PM" src="https://user-images.githubusercontent.com/84400955/162861849-1808264a-9250-4a0e-be1c-f1ad7c432923.png">

## Search Page
The search page allows the user to type in any part of a phone number to search for a reservation that has been booked. 

<img width="1436" alt="Screen Shot 2022-04-11 at 8 43 12 PM" src="https://user-images.githubusercontent.com/84400955/162864587-d5fa6ad6-35e9-45a5-bbfa-452885a43dc2.png">

## Create Reservation Page
This page allows the user to create a reservation for an incoming party. The user would input the following information :
- First Name
- Last Name
- Phone Number
- Reservation Date
- Reservation Time
- Party Size

<img width="1440" alt="Screen Shot 2022-04-11 at 8 43 29 PM" src="https://user-images.githubusercontent.com/84400955/162865015-a797e1df-627f-41ea-9f3a-68c9c6f94616.png">

## Create New Table Page
The table page allows the user to add another table that requires the name of the table and the seating capacity. 

<img width="1440" alt="Screen Shot 2022-04-11 at 8 43 42 PM" src="https://user-images.githubusercontent.com/84400955/162865198-5235b7a5-e4f1-41eb-ae57-1f23da50c88a.png">

---

## API

### Reservations
GET `/reservations`
- Gets a list of all current reservations

GET `/reservations/:reservation_id` 
- Gets a reservation with the corresponding reservation ID

GET `/reservations/:reservation_id/status`
- Gets the status information of a specific reservation. Will return a status of *seated, finished, or canceled*

PUT `/reservations/:reservation_id`
- Updates information on an existing reservation.

POST `/reservations`
- Creates a new reservation

### Tables

GET `/tables`
- Gets a list of all tables.

PUT `/tables/:table_id/seat`
- Updates the status of a reservation to finished and clears the reservation ID from the table.
- Changes the status to *free*

POST `/tables`
- Creates a new table

