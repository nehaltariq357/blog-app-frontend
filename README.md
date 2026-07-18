# 📝 Blog Platform Frontend

A modern **Medium-style Blog Platform Frontend** built with **Next.js, TypeScript, Tailwind CSS, and Tiptap Editor**.

The application provides a clean writing experience with authentication, blog management, search, comments, likes, image uploads, and responsive design.

---

# 🚀 Tech Stack

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Tiptap Editor
- Cloudinary
- Fetch API
- JWT Authentication
- HttpOnly Cookies

---

# ✨ Features

## Authentication

- User Signup
- User Login
- Logout
- Persistent Login using Cookies
- Protected Routes
- User Avatar

---

## Blog Management

- Create Blog
- Edit Blog
- Delete Blog
- Rich Text Editor
- Upload Featured Image
- Upload Images inside Content
- Public Blogs

---

## Explore

- Search Blogs
- Latest Blogs
- Trending Blogs
- Responsive Blog Cards

---

## Blog Details

- View Complete Blog
- Author Information
- Like Posts
- Comment System
- Delete Own Comment
- Reading Experience

---

## Editor

Built using **Tiptap**

Supports

- Headings
- Bold
- Italic
- Bullet Lists
- Ordered Lists
- Links
- Code Blocks
- Images
- Placeholder
- Rich Text Formatting

---

## Image Upload

Images are uploaded directly to **Cloudinary**.

Supports

- Featured Image
- Images inside Blog Content

---

## UI

- Responsive Design
- Mobile Navigation
- Medium Inspired Layout
- Clean Typography
- Loading States
- Empty States

---

# 📁 Folder Structure

```
src
│
├── app
│   ├── blog
│   ├── explore
│   ├── login
│   ├── signup
│   ├── createPost
│   └── edit
│
├── components
│   ├── Navbar
│   ├── BlogCard
│   ├── SearchBar
│   ├── SearchResults
│   ├── LatestBlogs
│   ├── TrendingBlogs
│   ├── TiptapEditor
│   ├── Toolbar
│   ├── ImageUpload
│   └── ...
│
└── lib
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone <repository-url>
```

Go to project

```bash
cd frontend
```

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔗 Backend API

The frontend communicates with the Express.js backend.

Example

```
POST /api/signup

POST /api/login

POST /api/logout

GET /api/current

GET /api/posts

GET /api/posts/latest

GET /api/posts/trending

GET /api/posts/search

POST /api/posts

PUT /api/posts/:id

DELETE /api/posts/:id

POST /api/comments

DELETE /api/comments/:id

POST /api/likes/:postId

DELETE /api/likes/:postId
```

---

# ☁️ Cloudinary

Cloudinary is used for image uploads.

Supports

- Featured Images
- Rich Text Editor Images

---

# 📱 Responsive

The application is fully responsive and works across

- Desktop
- Tablet
- Mobile

---

# 👨‍💻 Author

**Muhammad Nehal Tariq**


# ⭐ If you like this project

Give it a ⭐ on GitHub.