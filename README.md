
# W-2 PDF AI Chat Application

## Overview

The W-2 PDF AI Chat Application is a robust platform designed to assist users in managing and querying information from their W-2 tax forms through a conversational AI interface. Leveraging OpenAI's GPT-vision model, this application provides insightful responses to user queries directly related to their uploaded documents. The application is built using Django for the backend and React with Vite for the frontend, with a PostgreSQL database for persistent storage of chat sessions and messages.

## Features

- **Document Upload:** Users can securely upload their W-2 tax documents to the platform.
- **AI-Powered Chat:** Users can interact with an AI to extract and analyze information from their uploaded W-2 forms.
- **Data Storage:** Chat interactions and messages are stored in a PostgreSQL database, ensuring data persistence and security.

## Technologies Used

- **Frontend:** React, Vite
- **Backend:** Django
- **AI Model:** OpenAI GPT-vision
- **Database:** PostgreSQL

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Docker Compose
- Node.js and npm
- Python with Pipenv

### Installing

1. **Clone the repository**

   ```bash
   git clone https://github.com/AsadKhalil/PDF_READER_LLM.git
   ```

2. **Setup the Backend**

   Navigate to the backend directory:

   ```bash
   cd W-2PDF/backend
   ```

   Build and run the Docker container:

   ```bash
   docker-compose up --build
   ```

3. **Setup the Frontend**

   Open another terminal and navigate to the frontend directory:

   ```bash
   cd W-2PDF/frontend
   ```

   Install dependencies and run the development server:

   ```bash
   npm install
   npm run dev
   ```

   Your frontend should now be running on [localhost:3000](http://localhost:3000).

### Environment Variables

Make sure to create a `.env` file in the backend directory with the following variables:

```plaintext
DATABASE_URL=postgresql://postgres:1234@localhost:5432/w2pdf
DEBUG=1
GROQ_API_KEY=your_groq_api_key
OPEN_API_KEY=your_open_api_key
```

And in the frontend directory, include:

```plaintext
VITE_BACKEND_URL=http://localhost:8000
```

## Deployment

For details on deployment on platforms like Heroku for the backend and Netlify for the frontend, please refer to the deployment sections of their respective documentation.



## ERD

![](w2pdf.jpg)
## UI
![image.png](image.png)