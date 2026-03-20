# Village Grievance Portal

A full-stack MERN application that allows users to submit, track, and manage grievances within a village/community system. This project focuses on solving real-world problems with a clean backend architecture and cloud deployment.

---

## Live Demo

* Frontend: https://village-grievance-system.netlify.app/
* Backend API: https://village-grievance-system.onrender.com

---

## Features

* User Registration & Login (JWT Authentication)
* Submit grievances with details
* Dashboard to view submitted complaints
* Image upload support (local handling)
* Protected routes & authentication middleware
* Fully deployed using cloud platforms

---

## Tech Stack

### Frontend

* React.js (Vite)
* Axios
* CSS / Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB (Atlas)
* JWT Authentication
* Multer (for file upload)

### Deployment

* Netlify (Frontend)
* Render (Backend)
* MongoDB Atlas (Database)

---

## Project Structure

```id="f0qk6z"
project/
 ├── backend/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── middleware/
 │   └── server.js
 │
 └── frontend/
     ├── src/
     ├── public/
     └── index.html
```

---

## Environment Variables

Create a `.env` file inside the **backend** folder and add:

```id="d8k3az"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
NODE_ENV=production
```

---

## Run Locally

### 1. Clone the repository

```id="fgr2q1"
git clone https://github.com/your-username/village-grievance-portal.git
cd village-grievance-portal
```

---

### 2. Setup Backend

```id="1r9yq0"
cd backend
npm install
npm start
```

---

### 3. Setup Frontend

```id="plc7t3"
cd frontend
npm install
npm run dev
```

---

## Deployment

### Backend (Render)

* Create a new Web Service
* Set Root Directory → `backend`
* Add environment variables in dashboard
* Deploy

### Frontend (Netlify)

* Connect GitHub repository
* Set Base Directory → `frontend`
* Build Command → `npm run build`
* Publish Directory → `frontend/dist`

---

## Key Learnings

* Full-stack MERN deployment (Netlify + Render)
* Handling CORS and environment variables
* Authentication using JWT
* Managing file uploads using Multer
* Understanding cloud limitations (ephemeral storage)
* Debugging real-world deployment issues

---

## Known Limitations

* Uploaded files are stored locally and may not persist after redeploy
* Free hosting may cause cold start delays
* Basic UI (can be improved further)

---

## Future Improvements

* Integrate Cloudinary for image storage
* Improve UI/UX design
* Add admin panel for grievance management
* Implement notifications system
* Add pagination and filters

---

## Author

**Badrinath M H**
Software Developer (MERN Stack)

---

## Support

If you like this project, consider giving it a ⭐ on [GitHub](github.com/badrinath-sde/village-grievance-system)!
