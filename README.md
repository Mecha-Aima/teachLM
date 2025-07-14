# teachLM

teachLM is a modern e-learning platform built with Next.js, designed to connect students with expert teachers for personalized learning experiences.

## Overview

This project is a full-stack web application that provides a platform for discovering teachers, enrolling in lessons, and tracking personal learning progress. It features a clean, intuitive user interface and leverages a powerful, modern tech stack to deliver a seamless user experience.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality using Clerk.
- **Teacher Profiles**: Create and manage detailed teacher profiles.
- **Lesson Management**: Browse, view, and enroll in lessons on various subjects.
- **Search and Filtering**: Easily find teachers and lessons by subject or other criteria.
- **Personalized Dashboard**: Track your learning journey and upcoming lessons.
- **Subscription Services**: Manage subscriptions for premium content and features.
- **AI Tutors**: Create custom AI tutors for learning specific topics.
- **Saved Transcripts**: Lessons feature that saves a session's transcript for later reference.

## Page Structure

The application follows a logical and intuitive page structure, organized within the `app` directory:

- `/`: The main landing page of the application.
- `/lessons`: Displays a list of all available lessons.
- `/lessons/[id]`: Shows detailed information about a specific lesson.
- `/teachers`: Lists all available teachers.
- `/teachers/new`: A form to create a new teacher profile.
- `/teachers/[id]`: Provides detailed information about a specific teacher.
- `/my-journey`: A personalized dashboard for users to track their progress.
- `/subscription`: Handles user subscriptions and payment information.
- `/sign-in`: The user authentication page.

## Tech Stack

teachLM is built with a modern and robust technology stack:

- **Framework**: [Next.js](https://nextjs.org/) with Turbopack
- **UI**: [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/), and [Lottie](https://lottiefiles.com/) for animations
- **Authentication**: [Clerk](https://clerk.com/)
- **Database**: [Supabase](https://supabase.io/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for validation
- **Voice AI**: [Vapi AI](https://vapi.ai/)
- **Error Monitoring**: [Sentry](https://sentry.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Data Flow

The data flow in teachLM is designed to be efficient and scalable:

1.  **Client-Side**: The UI is rendered using React components located in the `app/` and `components/` directories.
2.  **User Interaction**: User actions, such as submitting a form or clicking a button, trigger server actions defined in `lib/actions/`.
3.  **Server Actions**: These actions handle the business logic, such as creating, reading, updating, or deleting data.
4.  **Database**: Server actions communicate with the [Supabase](https://supabase.io/) database via the client in `lib/supabase.ts` to persist data.
5.  **Authentication**: User authentication is managed by [Clerk's](https://clerk.com/) middleware and pre-built components, ensuring secure access to the application.

## Future Contributions

We have an exciting roadmap of new features and improvements. Here are some of the potential areas for future contributions:

- **AI-Powered Lesson Summaries**: Automatically generate summaries for each lesson to provide quick insights.
- **Share Lessons Feature**: Allow users to share lessons with others via social media or direct links.
- **Multi-User Classroom Sessions**: Enable collaborative, real-time classroom sessions with multiple users.

## Deployment

The project is deployed on Vercel. You can check out the live version here: [https://teach-lm.vercel.app/](https://teach-lm.vercel.app/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
