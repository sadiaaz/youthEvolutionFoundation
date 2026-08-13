# Youth Evolution Foundation (YEF)

## Official Web Platform

A modern, responsive, and content-managed website designed to showcase YEF's mission, programs, events, community initiatives, and opportunities for youth engagement.

**Project Status:** In Development
**Duration:** 2 Months
**Project Lead:** Sadia Saad

---

## Live Website

**Coming Soon**

The production website will be deployed on Vercel after development and testing.

---

## Key Features

* Responsive homepage
* About YEF and its mission
* Programs and initiatives
* Events and activities
* Blog and news
* Team section
* Volunteer application
* Donation information
* Contact page
* Sanity CMS content management
* SEO-friendly structure
* Mobile, tablet, and desktop support

---

## Technology Stack

| Category        | Technology   |
| --------------- | ------------ |
| Frontend        | Next.js 15   |
| Language        | TypeScript   |
| Styling         | Tailwind CSS |
| CMS             | Sanity CMS   |
| Design          | Figma        |
| Version Control | Git & GitHub |
| Deployment      | Vercel       |

---

## Architecture

```text
Users
  │
  ▼
Next.js Frontend
  │
  ▼
Sanity CMS
  │
  ▼
Vercel
```

---

## Project Structure

```text
yef-website/
│
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # Reusable UI components
│   ├── sanity/           # Sanity configuration & schemas
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   └── utils/            # Utility functions
│
├── public/               # Static assets
├── .env.local            # Local environment variables
├── package.json
└── README.md
```

---

# Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git
* VS Code (recommended)

## 1. Clone the Repository

```bash
git clone https://github.com/sadiaaz/youthEvolutionFoundation.git
```

## 2. Navigate to the Project

```bash
cd youthEvolutionFoundation/yef-website
```

## 3. Install Dependencies

```bash
npm install
```

## 4. Configure Environment Variables

Create a `.env.local` file inside the `yef-website` directory.

Add the environment variables provided by the Project Lead:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=YOUR_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET=production
```

> Never commit `.env.local`, API keys, passwords, or private tokens to GitHub.

## 5. Run the Development Server

```bash
npm run dev
```

Open:

* Website: http://localhost:3000
* Sanity Studio: http://localhost:3000/studio

For first-time Sanity setup:

```bash
npx sanity login
```

---

# Git & Contribution Workflow

All team members must follow the project Git workflow.

### 1. Update `develop`

```bash
git checkout develop
git pull origin develop
```

### 2. Create a Feature Branch

```bash
git checkout -b feature/your-task-name
```

Example:

```bash
git checkout -b feature/home-page
```

### 3. Complete Your Task

Make your changes and test them locally.

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: complete home page"
```

### 5. Push Your Branch

```bash
git push origin feature/home-page
```

### 6. Create a Pull Request

Create a Pull Request:

```text
feature/home-page → develop
```

Assign the Project Lead for review.

### Important Rules

* Do not push directly to `main`.
* Do not push directly to `develop`.
* One task should use one feature branch.
* Test your work before creating a Pull Request.
* Use meaningful commit messages.
* Code review is required before merging.

---

# Team

### Project Lead

**Sadia Saad**

Project architecture, GitHub management, code review, coordination, deployment, and technical decisions.

### UI/UX Designer

**Sidra Amjad**

Figma design, design system, wireframes, responsive UI, and UX research.

### Frontend Developer

**Nuzhat Qureshi**

Frontend architecture, layout, navigation, routing, and page structure.

### Frontend Developer

**Numair Iqbal**

Reusable UI components, forms, cards, buttons, and responsive components.

### Backend / CMS Developer

**Abdul Basit**

Sanity CMS architecture, schemas, content structure, and CMS configuration.

### Backend / Integration Developer

**Abdul Bais**

Sanity integration, GROQ queries, data fetching, and Next.js–Sanity integration.

---

# Development Timeline

| Week   | Focus                                                              |
| ------ | ------------------------------------------------------------------ |
| Week 1 | Project setup, UI/UX foundation, frontend architecture & CMS setup |
| Week 2 | Home page                                                          |
| Week 3 | About & Programs                                                   |
| Week 4 | Events & Blog                                                      |
| Week 5 | Volunteer, Donation & Contact                                      |
| Week 6 | CMS integration                                                    |
| Week 7 | Testing, SEO & responsive improvements                             |
| Week 8 | Final testing, deployment & documentation                          |

---

# Design Guidelines

The website should maintain:

* Consistent YEF branding
* Clean and modern UI
* Responsive layouts
* Accessible components
* Consistent typography
* Reusable design components
* Mobile-first considerations

All major UI designs will be maintained in Figma.

---

# Quality Standards

Before creating a Pull Request:

* Test the feature locally.
* Check desktop and mobile layouts.
* Fix TypeScript errors.
* Fix ESLint errors.
* Follow the project folder structure.
* Avoid unnecessary code duplication.
* Use reusable components.
* Verify existing features are not broken.

---

# Security

Never commit sensitive information such as:

```text
.env.local
API keys
Sanity write tokens
Passwords
Private credentials
```

Use environment variables for sensitive configuration.

---

# Project Documentation

| File              | Purpose                         |
| ----------------- | ------------------------------- |
| `README.md`       | Project overview and setup      |
| `SRS_PRD.md`      | Requirements and project scope  |
---

# Project Goal

This project is not only about building a website. It is also an opportunity for the team to experience a real-world software development workflow, including:

* Team collaboration
* Git and GitHub
* Feature branches
* Pull Requests
* Code reviews
* UI/UX handoff
* Next.js development
* Sanity CMS
* Data integration
* Testing
* Deployment

---

# License

This project is being developed for **Youth Evolution Foundation (YEF)**.

The project source code is private and intended for authorized project contributors.

---

# Contact

**Youth Evolution Foundation (YEF)**

Email: [info@youthevolutionfoundation.com](mailto:info@youthevolutionfoundation.com)
Website: https://www.youthevolutionfoundation.com

---

**Built by the YEF Web Development Team**
