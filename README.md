# CollabStudy

## Project Name: CollabStudy

### Purpose:
CollabStudy is a web application that facilitates online group study by allowing users to create assignments, complete them, and grade their friends' assignments. It enables collaboration among users, making it easier for students or professionals to learn together in a virtual environment.

### Live URL: https://simple-project-c9ba2.web.app


### Key Features:
- **Authentication System:** Users can log in or register using email/password or social login (Google/GitHub).
- **Create Assignments:** Any logged-in user can create assignments for others, specifying title, description, marks, difficulty level, and due date.
- **Assignments Dashboard:** Display all assignments with functionalities to view, update, and delete (only the creator of the assignment can delete it).
- **Submit Assignments:** Users can submit assignments with a Google Docs link and a quick note.
- **Pending Assignments:** Admins or examiners can review pending assignments and grade them with marks and feedback.
- **Profile Page:** Displays the user’s profile, assignments they’ve created, and attempted assignments.
- **Search and Filter:** Users can filter assignments by difficulty level and search through them based on keywords.
- **JWT Authentication:** Secure private routes with JWT for user verification.
- **Responsive Design:** Fully responsive design optimized for mobile, tablet, and desktop devices.
- **Theme Toggle:** Users can switch between light and dark themes.
- **Validation:** Forms are validated to ensure correct data input (e.g., password strength, assignment creation).

### Technologies Used:
- **Frontend:**
  - React.js
  - Tailwind CSS
  - React Router DOM
  - React-datepicker
  - Firebase (for authentication)
  - React Hot Toast (for notifications)
  - React Icons (for UI icons)
  - AOS (for animations)

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (for storing user and assignment data)
  - JWT Authentication
  - Firebase Admin SDK (for managing Firebase users)

### npm Packages Used:
- `react-router-dom`
- `react-icons`
- `axios`
- `react-hot-toast`
- `firebase`
- `react-datepicker`
- `jsonwebtoken`
- `dotenv`
- `express`
- `mongoodb`
