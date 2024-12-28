# Pugazholi R's Portfolio Website

A modern, responsive portfolio website built with Next.js, React, and Framer Motion. This website showcases my professional experience, skills, and projects while providing an interactive and engaging user experience.

## 🚀 Features

- Responsive design that works on all devices
- Smooth animations and transitions using Framer Motion
- Interactive navigation with scroll progress indicator
- Contact form with email integration
- Dynamic project showcases
- Optimized performance with Next.js
- Animated background effects
- Mobile-friendly navigation

## 🛠️ Technologies Used

- **Frontend Framework**: Next.js 15.1.2
- **UI Library**: React 18.2.0
- **Animation**: Framer Motion
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Email Service**: Nodemailer
- **Development Tools**: TypeScript, ESLint

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pugal-404/Pugazh-s-Portfolio.git
```markdown project="Portfolio Documentation" file="README.md"
```

2. Navigate to the project directory:

```shellscript
cd Pugazh-s-Portfolio
```


3. Install dependencies:

```shellscript
npm install
```


4. Create a `.env.local` file in the root directory and add your email configuration:

```plaintext
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-specific-password
```


5. Start the development server:

```shellscript
npm run dev
```




## 🏗️ Project Structure

```plaintext
Pugazh-s-Portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.js
│   │   ├── globals.css
│   │   ├── layout.jsx
│   │   └── page.jsx
│   ├── components/
│   │   ├── About.jsx
│   │   ├── AnimatedBackground.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Home.jsx
│   │   ├── Learning.jsx
│   │   ├── Navigation.jsx
│   │   ├── Projects.jsx
│   │   ├── Publications.jsx
│   │   └── Skills.jsx
│   └── hooks/
│       └── useParallax.js
├── public/
├── .env.local
├── next.config.js
├── package.json
├── postcss.config.js
└── tailwind.config.js
```

## 🎯 Key Components

- **Header**: Navigation bar with smooth scrolling links
- **Home**: Landing section with personal introduction
- **About**: Professional background and education
- **Skills**: Technical skills and competencies
- **Projects**: Showcase of notable projects
- **Publications**: Academic publications and research
- **Learning**: Educational achievements and certifications
- **Contact**: Contact form with email integration
- **AnimatedBackground**: Dynamic background effects


## ⚙️ Configuration

### Email Setup

The contact form uses Nodemailer with Gmail. To configure:

1. Enable 2-factor authentication in your Gmail account
2. Generate an App Password
3. Add credentials to `.env.local`


### Tailwind Configuration

Customize the design system in `tailwind.config.js`:

- Colors
- Typography
- Spacing
- Breakpoints


## 🚀 Deployment

The website can be deployed to Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy


## 💻 Development

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Git


### Commands

```shellscript
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔧 Performance Optimization

- Dynamic imports for components
- Image optimization with next/image
- Intersection Observer for efficient scrolling
- Memoized components with React.memo
- CSS optimizations for animations
- Responsive design best practices


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request


## License
All rights reserved. Unauthorized copying, modification, or distribution of this software is strictly prohibited.

## 👤 Contact

- GitHub: [@pugal-404](https://github.com/pugal-404)
- LinkedIn: [Pugazholi R](https://linkedin.com/in/pugazholi-r-aa388426a)
- Email: [Pugazhragu226@gmail.com](mailto:Pugazhragu226@gmail.com)


## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Open source community for inspiration and resources


```plaintext

This documentation provides a comprehensive overview of your portfolio project, including setup instructions, project structure, and development guidelines. You can add this as README.md to your repository, which will help others understand and contribute to your project.
```
