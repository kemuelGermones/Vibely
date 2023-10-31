# Vibely

A social media web application that is dedicated to fostering a community of like-minded individuals who are passionate about creating and sharing positive, uplifting content.

### [View Demo](https://trackero-client.vercel.app/)

## About The Project

![Vibely](https://res.cloudinary.com/de9dxfdav/image/upload/v1698739496/Project%20Promotion/Screenshot_from_2023-10-31_15-50-29_s0en0n.png)

Vibely stands as a remarkable social media web application designed with a distinctive mission in mind. It serves as a digital haven for individuals seeking genuine connections with like-minded peers. Within its virtual realm, it's committed to fostering a thriving and close-knit community, where people of shared interests and passions can come together, connect, and collaborate. 

**Key Features**
- **User-Friendly Interface:** Our intuitive interface ensures that you can effortlessly navigate through the app.
- **Connect with Friends:** Vibely allows you to follow others and make new connections easily.
- **News Feed:** Stay informed about the latest posts.
- **Messaging:** Communicate with anyone one-on-one.
- **Explore and Discover:** Discover new people by searching them.

### Built With

- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
- ![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
- ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

## Getting Started

To access the live demo, please proceed to the provided URL above. Alternatively, if you prefer to host the web application locally on your computer, please follow the instructions outlined below.

### Prerequisites

In order to host the web application locally on your computer you must install MySQL and Node.js on your machine. Also, you must create a Firebase and Cloudinary account. 

### Installation

Below are the instructions of how you can host the web application locally on your computer.

1. Clone the project repository on your machine by running the command below on your terminal.
```
git clone git@github.com:kemuelGermones/Vibely.git
```
2.  Go into the client and server directory and run the command below on your terminal to install all dependencies.
```
npm install
```
3.  In the server directory create a `.env` file. The purpose of a `.env` (short for "environment") file is to store configuration variables and sensitive information.
4.  Copy the code below and paste it on your server `.env` file. Also, you must provide MySQL and Cloudinary credentials.
```
PORT  = 5000
CLIENT_URL  = http://localhost:3000

DB_HOST  = **EXAMPLE: 127.0.0.1**
DB_USER  = **EXAMPLE: root**
DB_NAME  = **EXAMPLE: vibely**
DB_PASSWORD  = **EXAMPLE: thisIsAPassword**

CLOUDINARY_CLOUD_NAME  = **EXAMPLE: de9dtUdav**
CLOUDINARY_KEY  = **EXAMPLE: 639786847010159**
CLOUDINARY_SECRET  = **EXAMPLE: aju5yI6KbWvrKDpcyKxDrP7VN3g**
```
5. On your Firebase account create a new project and inside your project create a new web app.
6. On your Firebase project add authentication with email/password as sign-in provider.
7. On your Firebase project go to service accounts inside settings and generate a new private key. It will automatically download a `.json` file rename it as `firebase.json` and move it to the server directory.
8. Navigate to the client directory and create a `.env` file provided with your Firebase config located at your Firebase project settings.
```
REACT_APP_SERVER_URL  = http://localhost:5000

REACT_APP_FIREBASE_API_KEY  = **EXAMPLE: AIzaSyCi3OSlQbkC4wNPHNGYc6PsUCl_viL_ABC**
REACT_APP_FIREBASE_AUTH_DOMAIN  = **EXAMPLE: vibely-6zz66.firebaseapp.com**
REACT_APP_FIREBASE_PROJECT_ID  = **EXAMPLE: vibely-6zz66**
REACT_APP_FIREBASE_STORAGE_BUCKET  = **EXAMPLE: vibely-6zz66.appspot.com**
REACT_APP_FIREBASE_MESSAGING_SENDER_ID  = **EXAMPLE: 580991161234**
REACT_APP_FIREBASE_APP_ID  = **EXAMPLE: 1:580991161234:web:69bfe6183d242f466faccd**
```
9. Navigate back to the server directory and run the command below on your terminal.
```
npm run dev
```
10. Navigate to the client directory and run the command below on your terminal.
```
npm start
``` 
11.  Open [http://localhost:3000](http://localhost:3000/) and enjoy!

## Contact

Email - [kemuelgermones@gmail.com](kemuelgermones@gmail.com)
Project Link: [https://github.com/kemuelGermones/Vibely](https://github.com/kemuelGermones/Vibely)
Web Application Link: [https://trackero-client.vercel.app/](https://trackero-client.vercel.app/)

