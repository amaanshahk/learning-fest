
export type Project = {
  name: string;
  description: string;
  technologies: string;
  status: string;
  href?: string;
};

export type ProjectGroup = {
  title: string;
  description: string;
  projects: Project[];
};

export const projectGroups: ProjectGroup[] = [
  {
    title: "AI & Machine Learning",
    description: "Projects exploring applied AI and intelligent applications.",
    projects: [
      {
        name: "AI Data Detective",
        description:
          "A natural-language data analysis application combining an LLM with Python tools to explore sales data.",
        technologies: "Python · Pandas · Groq API · Streamlit",
        status: "Featured",
      },
      {
        name: "AI Interview Coach",
        description:
          "An AI interview simulator that generates role-specific questions, evaluates responses and produces feedback.",
        technologies: "Python · Streamlit · Groq API",
        status: "Project",
      },
      {
        name: "AI Support Desk",
        description:
          "Processes support tickets into categories, urgency levels and suggested actions using an LLM.",
        technologies: "Python · Groq API · OpenAI SDK",
        status: "Project",
      },
    ],
  },
  {
    title: "LLM & RAG",
    description:
      "Experiments involving language models, retrieval systems and evaluation.",
    projects: [
      {
        name: "Multi-Stage Document Investigator",
        description:
          "A three-stage LLM workflow that extracts factual claims, identifies contradictions and produces evidence-based findings.",
        technologies: "Python · Groq API · LLM",
        status: "Project",
      },
      {
        name: "RAG Failure & Hallucination Investigator",
        description:
          "Investigates retrieval failures, hallucinations and conflicting information through controlled experiments.",
        technologies: "Python · ChromaDB · Embeddings",
        status: "Project",
      },
      {
        name: "RAG Retrieval Quality Lab",
        description:
          "Compares fixed-size and section-based document chunking using retrieval evaluation metrics.",
        technologies: "Python · ChromaDB · Embeddings",
        status: "Project",
      },
      {
        name: "Prompt Benchmark Lab",
        description:
          "Compares three prompt strategies across 24 outputs using correctness, format, hallucination and consistency scores.",
        technologies: "Python · Groq API · LLM Evaluation",
        status: "Project",
      },
    ],
  },
  {
    title: "Computer Vision",
    description: "Projects involving visual understanding and pose estimation.",
    projects: [
      {
        name: "OptiFit",
        description:
          "A workout tracking application exploring pose estimation, exercise recognition and repetition counting.",
        technologies: "Python · Django · OpenCV · MediaPipe",
        status: "Featured",
      },
    ],
  },
  {
    title: "Web Development",
    description: "Applications, interfaces and browser-based experiments.",
    projects: [
      {
        name: "Virtualized Photo Browser",
        description:
          "A browser-based photo viewer designed for large image collections, featuring list virtualization, keyboard navigation and a full-screen viewer.",
        technologies: "React · TypeScript · Browser APIs",
        status: "Featured",
        href: "https://github.com/amaanshahk/learning-fest/tree/main/Web/virtualized-photo-browser",
      },
      {
        name: "Movie Explorer",
        description:
          "A React and TypeScript application for exploring movie information.",
        technologies: "React · TypeScript · Vite",
        status: "Project",
      },
      {
        name: "Weather Dashboard",
        description:
          "A browser-based dashboard for presenting weather information.",
        technologies: "JavaScript · HTML · CSS",
        status: "Project",
      },
      {
        name: "Student Record Manager",
        description:
          "A web application for managing, filtering and analysing student records.",
        technologies: "JavaScript · HTML · CSS",
        status: "Project",
      },
      {
        name: "TypeScript Employee Directory",
        description:
          "An employee directory exploring TypeScript, data handling and search functionality.",
        technologies: "TypeScript · HTML · CSS",
        status: "Project",
      },
    ],
  },
];
