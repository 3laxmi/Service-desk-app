# Service Desk Application 

A full-featured Service Desk Web Application built using **React (Vite)** and **Firebase**. This project allows users to register/login, raise service tickets, and track their status. Admins can manage and resolve tickets efficiently.

##  Project Link

 Hosting URL : https://servicedesk-5d8a2.web.app
 GitHub Repository : https://github.com/3laxmi/Service-desk-app

--- 

## Features

###  User Side
- Register/Login with email & password (Firebase Auth)
- Raise support tickets with:
  - Issue description
  - Category (Technical, Billing, etc.)
  - Priority (Low, Medium, High)
- View success message on submission



##  Dummy Credentials

###  Admin
- Email: `admin@example.com`
- Password: `admin123`

###  User
- Email: `user@example.com`
- Password: `123456`

### Admin Side
- View all submitted tickets
- Assign, update, and resolve tickets
  
## To Access the Admin Panel 

  visit the hosted app:  
   https://servicedesk-5d8a2.web.app/
   
2. Register with their own gmail.
3. Then :
   - You manually update your role in Firestore as `"admin"` in the `users` collection, 
  

---

##  Tech Stack

 Frontend  :   React + Vite , HTML, CSS  
 Backend   :   Firebase Firestore ,  Firebase Auth 
 Hosting   :   Firebase Hosting
              

---

##  Setup Locally

```bash
git clone https://github.com/3laxmi/Service-desk-app.git
cd Service-desk-app
npm install


** Create a .env file in the root and add your Firebase config:

VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_MESSAGING_SENDER_ID=xxxxxxx
VITE_APP_ID=your_app_id


## Start the dev server: 
npm run dev

## Deploy on Firebase Hosting:  

npm run build
firebase login
firebase init
firebase deploy


