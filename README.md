# ProRecommendation (Product Recommendation Platform)

## Introduction
ProRecommendation is a collaborative and interactive web application designed to help users discover the best products through community-driven queries and recommendations. This platform fosters informed purchasing decisions by enabling users to post queries, share recommendations, and engage in discussions.


## Purpose
The platform aims to:
- Provide a space for users to share their product-related queries.
- Enable the community to contribute recommendations and insights.
- Encourage meaningful discussions to assist users in making better decisions.


## Features

### User Queries
- Add, update, or delete product-related queries.
- View a centralized feed of all queries posted by other users.

### Product Recommendations
- Browse recommendations for specific queries.
- Add or delete personal recommendations to contribute to the community.

### Product Details
- Access detailed information about queries and recommended products.


## Technology Stack

### Frontend (Query-Client)
- **React**: Framework for building the platform’s user interface.
- **DaisyUI & Tailwind CSS**: Tools for creating a responsive and visually appealing design.

### Backend (Query-Server)
- **Node.js**: Manages server-side logic and API interactions.

### Database
- **MongoDB**: Stores and organizes user queries, recommendations, and comments.

### State Management
- **Context API**: Ensures smooth and consistent state management across the application.


## Dependencies

### Client Side (Query-Client)
#### **Dependencies**
- `axios`: ^1.7.9
- `firebase`: ^11.1.0
- `localforage`: ^1.10.0
- `match-sorter`: ^8.0.0
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-helmet-async`: ^2.0.5
- `react-icons`: ^5.4.0
- `react-lottie-player`: ^2.1.0
- `react-router-dom`: ^7.1.0
- `react-tabs`: ^6.1.0
- `react-toastify`: ^11.0.2
- `react-tooltip`: ^5.28.0
- `sort-by`: ^1.2.0
- `sweetalert2`: ^11.15.3
- `swiper`: ^11.1.15

#### **DevDependencies**
- `@eslint/js`: ^9.17.0
- `@types/react`: ^18.3.17
- `@types/react-dom`: ^18.3.5
- `@vitejs/plugin-react`: ^4.3.4
- `autoprefixer`: ^10.4.20
- `daisyui`: ^4.12.22
- `eslint`: ^9.17.0
- `eslint-plugin-react`: ^7.37.2
- `eslint-plugin-react-hooks`: ^5.0.0
- `eslint-plugin-react-refresh`: ^0.4.16
- `globals`: ^15.13.0
- `postcss`: ^8.4.49
- `tailwindcss`: ^3.4.17
- `vite`: ^6.0.3


### Server Side (Query-Server)
#### **Dependencies**
- `bcrypt`: ^5.1.1
- `cookie-parser`: ^1.4.7
- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.1
- `jsonwebtoken`: ^9.0.2
- `mongodb`: ^6.11.0


## Instructions for Running the Project Locally

### Frontend (Query-Client)
1. **Navigate to the `query-client` folder:**
-   `cd query-client`
2. **Install the dependencies:**
-   `npm install`
3. **Create/Replace .env.local (Rename .env.example to .env.local ):**
-   Add your Credentials Here !
4. **Start the development server:**
-   `npm run dev`
5. **Access the application:**
-   Open your browser and navigate to `http://localhost:5173`.

### Backend (Query-Server)
1.* Navigate to the query-server folder:*
-   `cd query-server`

2. **Install the dependencies:**
-   `npm install`
3. **Set up environment variables:**
-   Create a .env file in the query-server directory.Add your Credentials Here. simillar to .env.example.
4. **Start the backend server:**
-   `npm run start` or install nodemon globally!
5. **Verify the server is running:**
The backend server will be accessible at http://localhost:5000 (http://localhost:portnamber)

# Website
-   Product Recommendation System
-   Live Site Link : https://progheroa11.web.app
-   Screenshot : 

![Application Screenshot](/screenshot.png)