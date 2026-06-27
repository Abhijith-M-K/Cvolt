import { ResumeData } from "@/types/resume";

export const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "JOHN DOE",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 019-2834",
    location: "San Francisco, CA, USA",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe-placeholder",
    github: "https://github.com/johndoe-placeholder",
    summary: "Result-driven Senior Software Engineer with 5+ years of hands-on experience designing, developing, and deploying robust cloud-native applications. Skilled in React, Node.js, and TypeScript, with a proven track record of optimizing database queries, building scalable RESTful APIs, and leading cross-functional teams to deliver high-quality digital products."
  },
  workExperience: [
    {
      id: "exp-1",
      company: "Innovate Tech Solutions Inc",
      position: "Senior Software Engineer",
      location: "San Francisco, CA, USA",
      startDate: "Jun 2021",
      endDate: "Present",
      current: true,
      description: "• Spearheaded the development of a high-throughput microservices architecture using Node.js and TypeScript, reducing system latency by 24%.\n• Built and maintained interactive frontend applications with React and Next.js, boosting user engagement metrics by 15%.\n• Designed and optimized relational and non-relational database schemas in PostgreSQL and MongoDB, reducing query execution times by 30%.\n• Mentored 4 junior engineers, conducting weekly code reviews and establishing modern CI/CD deployment pipelines using GitHub Actions."
    },
    {
      id: "exp-2",
      company: "Core Systems Corp",
      position: "Software Engineer",
      location: "Austin, TX, USA",
      startDate: "Jan 2019",
      endDate: "May 2021",
      current: false,
      description: "• Developed clean, modular, and reusable frontend components using React.js and Redux Toolkit, ensuring seamless cross-browser compatibility.\n• Implemented secure user authentication and authorization using OAuth 2.0 and JSON Web Tokens (JWT).\n• Integrated external RESTful APIs and optimized data rendering pipelines, improving page speed scores on Google Lighthouse by 18 points.\n• Collaborated closely with UI/UX designers to translate Figma design mockups into responsive, accessible web interfaces."
    }
  ],
  education: [
    {
      id: "edu-1",
      institution: "State University of Technology",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science & Engineering",
      location: "Austin, TX, USA",
      graduationDate: "Dec 2018",
      gpa: "3.8/4.0"
    }
  ],
  skills: [
    {
      id: "skill-1",
      category: "Languages",
      skills: "JavaScript, TypeScript, Python, SQL"
    },
    {
      id: "skill-2",
      category: "Frontend",
      skills: "React, Next.js, HTML5, CSS3, Tailwind CSS, Redux Toolkit"
    },
    {
      id: "skill-3",
      category: "Backend & Database",
      skills: "Node.js, Express.js, PostgreSQL, MongoDB, Redis"
    },
    {
      id: "skill-4",
      category: "Tools & Cloud",
      skills: "Git, Docker, AWS (S3, Lambda, EC2), GitHub Actions, Jest"
    }
  ],
  projects: [
    {
      id: "proj-1",
      name: "E-Commerce Cloud Platform",
      role: "Lead Developer",
      url: "https://github.com/johndoe-placeholder/ecommerce-cloud",
      technologies: "Next.js, Node.js, Express, MongoDB, Stripe API",
      description: "• Designed and engineered a fully responsive e-commerce web application with custom product filtering, shopping cart state management, and secure payment processing.\n• Implemented real-time inventory tracking utilizing WebSockets, preventing overselling by matching instant product counts."
    },
    {
      id: "proj-2",
      name: "Real-Time Dev Analytics Panel",
      role: "Full Stack Engineer",
      url: "https://github.com/johndoe-placeholder/analytics-dashboard",
      technologies: "React, TypeScript, Chart.js, AWS Lambda, PostgreSQL",
      description: "• Developed an analytics dashboard tracking deployment success rates and system uptimes for SaaS development teams.\n• Optimized database indexes on time-series log tables, allowing dashboard reports to load 5x faster."
    }
  ],
  certifications: [],
  others: []
};
