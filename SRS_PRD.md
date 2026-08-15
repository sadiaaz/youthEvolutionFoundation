
# Youth Evolution Foundation (YEF)
## System Requirements Specification (SRS) & Product Requirements Document (PRD)

**Version:** 1.0  
**Project Duration:** 2 Months  
**Project Lead:** Sadia Saad  
**Stack:** Next.js 15, TypeScript, Tailwind CSS, Sanity CMS, Vercel

---

## 1. Project Overview

Youth Evolution Foundation (YEF) is a non-profit organization focused on youth empowerment, education, mentorship, community development, and social impact.

The purpose of this project is to develop a modern, responsive, accessible, and content-managed website for YEF.

The website will provide visitors with information about YEF, its programs, events, initiatives, team, volunteer opportunities, and donation information.

---

## 2. Project Objectives

The main objectives are:

- Create a professional online presence for YEF.
- Present YEF's mission, vision, programs, and impact.
- Provide information about upcoming events and activities.
- Allow users to explore volunteer opportunities.
- Provide clear donation information.
- Provide a CMS for managing website content.
- Build a responsive experience for desktop, tablet, and mobile.
- Follow a professional GitHub-based development workflow.

---

## 3. Target Users

### Public Visitor
Can browse the website and view YEF information.

### Volunteer / Youth Applicant
Can explore opportunities and submit volunteer applications.

### Content Editor
Can manage website content through Sanity CMS.

### Project Administrator
Manages the technical project, GitHub repository, deployment, and CMS structure.

---

## 4. Website Modules

### 4.1 Home

The homepage should include:

- Hero section
- YEF introduction
- Impact/statistics section
- Featured programs
- Upcoming events
- Latest blog/news
- Testimonials or success stories
- Call-to-action sections

### 4.2 About

Include:

- About YEF
- Mission
- Vision
- Values
- Organization history
- Leadership/team
- Impact information

### 4.3 Programs

Users should be able to:

- View all programs
- View program categories
- Open individual program details
- View program description
- View program objectives
- View related images

### 4.4 Events

Users should be able to:

- View upcoming events
- View past events
- Open event details
- View date, location, description, and images
- Access registration information where applicable

### 4.5 Blog

The blog should provide:

- Blog listing
- Blog categories
- Individual blog pages
- Author information
- Featured image
- Publication date
- Related content

### 4.6 Volunteer

The volunteer section should provide:

- Volunteer information
- Areas of interest
- Application form
- Name
- Email
- Contact information
- Qualifications
- Area of interest

Form submissions should be securely processed.

### 4.7 Donation

The donation section should provide:

- Donation information
- Donation campaigns
- Donation amounts
- Payment/bank transfer information
- Donation instructions

Payment gateway integration can be added if required and approved.

### 4.8 Contact

Include:

- Contact information
- Email
- Phone
- Address
- Social media links
- Contact form
- Location/map where appropriate

---

## 5. Sanity CMS Requirements

Sanity CMS will be used to manage website content.

Initial schemas should include:

- Site Settings
- Hero
- About
- Program
- Event
- Blog
- Category
- Author
- Team
- Volunteer

The CMS should allow authorized users to create, update, publish, and manage content.

---

## 6. Technical Requirements

### Frontend

The application will use:

- Next.js 15
- App Router
- TypeScript
- Tailwind CSS
- Reusable React components

### CMS

- Sanity CMS
- GROQ queries
- Sanity image handling

### Deployment

- Vercel

### Version Control

- Git
- GitHub
- Feature branches
- Pull Requests
- Code reviews

---

## 7. Non-Functional Requirements

### Performance

The website should be optimized for fast loading and should aim for a Lighthouse performance score above 90.

### Responsiveness

The website must work correctly on:

- Mobile
- Tablet
- Desktop

### Accessibility

The interface should follow accessibility best practices and target WCAG 2.1 AA.

### SEO

The website should include:

- Page metadata
- Open Graph metadata
- Sitemap
- Robots configuration
- Semantic HTML
- Structured data where appropriate

### Security

- Sensitive credentials must remain in environment variables.
- Sanity write tokens must never be exposed publicly.
- `.env.local` must not be committed to GitHub.
- Form submissions must be validated.

---

## 8. Design Requirements

The UI/UX should be:

- Modern
- Clean
- Responsive
- Accessible
- Consistent with YEF branding
- Easy to navigate

The design system should define:

- Colors
- Typography
- Buttons
- Inputs
- Cards
- Icons
- Spacing
- Responsive behavior

All major designs will be maintained in Figma.

---

## 9. Navigation

The initial navigation should include:

```text
Home
About
Programs
Events
Blog
Volunteer
Donate
Contact
````

The final navigation may be adjusted during development based on UX requirements.

---

## 10. Project Architecture

```text
yef-website/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── sanity/
│   │   ├── schemaTypes/
│   │   ├── lib/
│   │   └── queries/
│   ├── types/
│   └── utils/
│
├── public/
├── SRS_PRD.md
├── WEEK1_SPRINT.md
├── README.md
└── package.json
```

---

## 11. GitHub Workflow

All contributors must follow the project Git workflow.

```text
develop
   │
   ├── feature/home-page
   ├── feature/about-page
   ├── feature/sanity-program
   └── feature/ui-components
            │
            ▼
       Pull Request
            │
            ▼
          Review
            │
            ▼
         develop
            │
            ▼
           main
```

Direct pushes to `main` and `develop` are not allowed.

---

## 12. Project Timeline

The project is planned for 8 weeks.

| Week   | Main Focus                                                     |
| ------ | -------------------------------------------------------------- |
| Week 1 | Setup, UI/UX foundation, frontend architecture, CMS foundation |
| Week 2 | Home page                                                      |
| Week 3 | About & Programs                                               |
| Week 4 | Events & Blog                                                  |
| Week 5 | Volunteer, Donate & Contact                                    |
| Week 6 | CMS integration                                                |
| Week 7 | Testing, SEO & responsive improvements                         |
| Week 8 | Final testing, deployment & documentation                      |

---

## 13. Project Constraints

* Development timeline: 2 months
* Team size: 5 developers/designers
* Requirements may evolve during development.
* New features must be discussed before being added to the active sprint.
* Priority will be given to the core website experience before optional features.

---

## 14. Future Enhancements

The following features may be considered after the core website is completed:

* Online payment gateway
* Advanced donation campaigns
* Newsletter subscription
* Advanced analytics dashboard
* User authentication
* Volunteer dashboard
* Event registration system
* Advanced search

These features are not mandatory for the initial version.

---

## 15. Acceptance Criteria

The project will be considered ready for final release when:

* Core pages are completed.
* Responsive design works across major screen sizes.
* CMS content can be managed successfully.
* Forms are functional and validated.
* SEO basics are implemented.
* No critical errors remain.
* Production deployment is working.
* Final testing is completed.
* Project documentation is updated.

---

## 16. Document Status

**Version:** 1.0
**Status:** Initial Project Requirements
**Last Updated:** August 2026

> This document provides the overall project direction and requirements. Specific implementation details and sprint tasks may be updated during development as the project progresses.


