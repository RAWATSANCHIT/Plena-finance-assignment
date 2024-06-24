# Plena Finance User

## Overview
This project provides a robust API for managing user operations and interactions within the Plena Finance system. It offers functionalities for user creation, retrieval, updating, deletion, blocking, unblocking, and searching, ensuring comprehensive user management capabilities.

## Features
- User Management:
Create, Read, Update, Delete User (CRUD operations).
- Block/Unblock User:
Block or unblock users to manage access and interactions.
- Search Users:
Search for users based on specified criteria.
  
## Technology Stack
- **Backend**: Node.js, NestJS
- **Database**: MongoDB

## Installation

### Prerequisites
- Node.js
- MongoDB
- NestJS

### Steps
1. Clone the repository:
```bash
git clone https://github.com/RAWATSANCHIT/Plena-finance-assignment.git
```

Navigate to the project directory:
```bash
cd user-management-service
```

Install the dependencies:
```bash
npm install
```

Set up the environment variables:
Create a .env file in the root directory.
Add the following environment variables:
```bash
MONGODB_URI=your_mongodb_uri
NODE_ENV = localhost
CACHE_TTL=300
PORT= your_port
```

Start the server:
```bash
npm start
```

## Postman Collection

You can find the Postman collection with all the API endpoints
> **🔗 [Postman Collection Link](https://www.postman.com/satellite-saganist-9960584/workspace/plena-backend-assignment/collection/25484800-423f9bbd-b353-43ad-a470-ad5a0ccec44f)**


## Running Tests
To ensure the quality and functionality of the application, have implemented various test cases. You can run these tests using the following command:
```bash
npm test
```

Contact
* Email: sanchitrawat097@gmail.com
* LinkedIn: [Sanchit Singh Rawat](https://www.linkedin.com/in/sanchit-rawat-a51a78153)
