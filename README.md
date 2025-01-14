# NewsApp

NewsApp aggregates news via the News API, offering JSON search results from 150,000+ sources. Its React.js frontend ensures seamless browsing. User authentication provides secure access, enabling account creation and login. Bookmarking lets users save articles, stored in MongoDB. Adding notes personalizes news consumption. Node.js and Express.js power the backend, managing authentication, data storage, and server-side operations. Overall, NewsApp delivers a user-friendly, feature-rich news experience, combining diverse content aggregation with intuitive navigation and personalization options.

## Tech Stack

Client: React JS

Server: Node JS, Express JS

Database: Mongo DB

Additional Libraries and Frameworks: Mongoose, Zod, Recoil, TailwindCSS, Axios

## Features

1. Collects news from diverse sources via the News API and renders them using React JS

2. User Authentication using NodeJS and ExpressJS alongwith libraries like zod

3. Allows users to bookmark their favourite articles using NodeJS and ExpressJS

4. Permits users to add personal notes to articles for organization and customization using NodeJS and ExpressJS

5. MongoDB database stores user-related information, bookmarks, and notes securely

## Run Locally

Clone the project
```bash
https://github.com/AbhradeepMukherjee/NewsApp.git
```

Go to the project directory
```bash
cd NewsApp
```

Install dependencies
```bash
npm install
```
```bash
cd backend/
npm install
```

Start the server
```bash
npm run dev
```

Start the Client
```bash
cd ../frontend
npm start
```
