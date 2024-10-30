# Youtube-Clone

This **YouTube Clone** project is my capstone, built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It captures the core YouTube experience, allowing users to explore, watch, and interact with video content.

## 🌟 Features I've Added

### Front-End (React)

1. **Home Page UI**:
   - Created a YouTube-inspired homepage with a header and a sidebar that can be toggled using a hamburger menu.
   - Integrated filter buttons to let users refine video content easily.
   - Built a video grid with video cards displaying the **title, thumbnail, channel name, and views**.

2. **User Authentication**:
   - Added a registration and login system, where users can sign up with a **username, email, and password**.
   - Secured the app with **JWT-based authentication**.
   - Before signing in, users see a "Sign In" button; once logged in, their name appears in the header, and they can access the main content.

3. **Search and Filter Functionality**:
   - Implemented a dynamic search bar in the header that filters videos by title as users type.
   - Added filter buttons that let users categorize videos based on specific topics or interests.

4. **Video Player Page**:
   - Developed a video player page to display selected videos, including:
     - **Video player, title, description, channel name, like and dislike buttons**
   - Added a **comment section** where users can add, edit, and delete comments, with all updates stored in the database.

5. **Channel Page**:
   - Users can create their own channels once they sign in.
   - Added functionality to list channel-specific videos on the channel page.

6. **Responsive Design**:
   - Designed a fully responsive layout that adjusts seamlessly for mobile, tablet, and desktop screens.

### Back-End (Node.js, Express)

1. **API Endpoints**:
   - Developed routes for **user authentication, channel management, video management, and comments**, all organized for easy scalability.
   - Created a **comments API** to handle adding, editing, and deleting comments.

2. **Database (MongoDB)**:
   - Added MongoDB collections for users, videos, channels, and comments.
   - Included fields to store video metadata (like video URLs and thumbnails) to keep data consistent across components.

---

## Technologies Used

- **Frontend**: React, React Router, Axios
- **Backend**: Node.js, Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Database**: MongoDB 
- **Version Control**: Git

---

## 🚀 Getting Started



