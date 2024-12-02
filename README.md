# blog_app
A single-user blogging engine with post creation, comments, and voting, featuring secure login, real-time updates, and REST/GraphQL APIs.

## Prerequisites
This application provides a platform to create, publish, and interact with blog posts.

### Build on
Build on MacOS Sequoia 15.0.1

## Files structure
```blog_app/
├── backend/
│   ├── Dockerfile
│   ├── multer.config.ts
│   ├── nest-cli.json
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── articles/
│   │   ├── auth/
│   │   ├── comments/
│   │   ├── prisma/
│   │   ├── users/
│   │   ├── votes/
│   │   └── main.ts
│   ├── test/
│   └── tsconfig.json
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   ├── Button.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── About.tsx
│   │   │   ├── ArticleDetail.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── PrivacyPolicy.tsx
│   │   │   ├── RecentArticles.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── TermsOfService.tsx
│   │   │   └── user/
│   │   ├── services/
│   │   │   ├── articleService.ts
│   │   │   └── authService.ts
│   │   └── styles/
│   │       └── globals.css
├── docker-compose.yml
└── README.md
```

## Files structure
User Authentication: Register with a unique username and password.
Create and Manage Articles: Write, edit, and delete your articles.
Commenting System: Add comments to articles and interact with the community.
Comment Voting: Upvote or downvote comments to promote engaging discussions.

## Step-by-Step Setup

1. Clone the Repository
First open a new terminal window and clone the repository:
```bash
git clone https://github.com/jaroslavdusek1/blog_app/
cd blog_app
```

2. Run the Application with Docker
Ensure Docker is installed and running. Use the following command to start the application:
```bash
docker-compose up --build
```

The application will start and be accessible at:

Frontend: http://localhost:3001
Backend: http://localhost:3000
GraphQL Playground: http://localhost:3000/graphql
Swagger API Docs: http://localhost:3000/api-docs

## Development Setup
To run the backend or frontend locally:

### Backend
1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend
```bash
npm run start:dev
```

### Frontend
1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend
```bash
npm start
```

## API Endpoints Documentation

Swagger Documentation: http://localhost:3000/api-docs
Here, you can view and test the available REST API endpoints.

![Swagger API Docs](public/swagger_api_docs.png)
![Swagger API Docs Detail](public/swagger_api_docs_detail.png)


## GraphQL API
Explore and test GraphQL queries in the Playground:
http://localhost:3000/graphql
```bash
query {
  articles {
    id
    title
    perex
    content
    author {
      id
      username
    }
    comments {
      id
      content
    }
  }
}
```

![GraphQL Playground](public/graphql_playground.png)

## Visual blog app workflow
### Home Page
![Home Page](public/home.png)

### Registration Form
![Registration Form](public/reg_form.png)

### Login Page
![Login Page](public/login.png)

### My Profile
![My Profile](public/my_profile.png)

### Recent Articles
![Recent Articles](public/recent_articles.png)

### Publish Article
![Publish Article](public/publish.png)

### Recent Articles Public
![Recent Articles Public](public/recent_articles_public.png)

### My Articles Admin
![My Articles Admin](public/my_articles_admin.png)

### Edit Article
![Edit Article](public/edit_article.png)

### Article Detail
![Article Detail](public/article_detail.png)

Enjoy :]