# Backend Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Set Up Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/pravara-health-clinic
   NODE_ENV=development
   ```

3. **Install and Start MongoDB**
   
   **Option A: Local MongoDB**
   - Download and install MongoDB from https://www.mongodb.com/try/download/community
   - Start MongoDB service
   
   **Option B: MongoDB Atlas (Cloud)**
   - Create a free account at https://www.mongodb.com/cloud/atlas
   - Create a cluster and get your connection string
   - Update `MONGODB_URI` in `.env` with your Atlas connection string

4. **Start the Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Verify Installation**
   - Open http://localhost:5000/api/health
   - You should see: `{"status":"ok","message":"Pravara Health Clinic API is running"}`

## API Base URL

The API runs on: `http://localhost:5000/api`

## Testing Endpoints

You can test the API using:
- Browser: Visit `http://localhost:5000/api/employees`
- curl: `curl http://localhost:5000/api/employees`
- Postman or any API client

## Troubleshooting

### MongoDB Connection Issues
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- The server will continue running even without MongoDB (but data won't persist)

### Port Already in Use
- Change `PORT` in `.env` to a different port (e.g., 5001)
- Update frontend API URL accordingly

### Module Not Found Errors
- Run `npm install` again
- Make sure you're in the `backend` directory

