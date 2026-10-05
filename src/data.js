// Portfolio details supplied by Vishnu. Add verified social links when available.
export const profile = {
  name: 'Andena Vishnu Vardhan Reddy',
  email: 'vishnu24004@gmail.com',
  github: '',
  linkedin: '',
  internshipCompany: 'NexusIQ Solutions LLP · Hyderabad, Telangana',
  internshipDetails: [
    'Contributed to a multi-agent college assistant using LangGraph to coordinate AI agents and support college-related queries.',
    'Integrated the Groq API to power chatbot responses and gained practical experience connecting AI applications to hosted language models.',
    'Gained hands-on experience working with training and testing datasets to develop and evaluate machine learning models.',
  ],
};
export const publication = {
  title: 'Smart Surveillance with Hand Gesture Detection for Silent Emergency Alerts',
  authors: 'Anil V Turukmane, Vishnu Vardhan Reddy, Ruthvik Reddy Anupati, Reethwik Reddy Poreddy',
  journal: 'GRENZE International Journal of Engineering and Technology',
  citation: 'Vol. 12, Issue 1 (2026), pp. 3929–3939',
  conference:
    '17th International Conference on Advances in Computing, Control, and Telecommunication Technologies (ACT 2026)',
  eid: '2-s2.0-105047243065',
  url: 'https://thegrenze.com/abstract/journal/6903',
  scopusUrl: 'https://www.scopus.com/pages/publications/105047243065',
  summary:
    'Co-authored research on Silent Alert, a computer-vision system that recognizes distress hand gestures in live video and captures image evidence for email-based emergency alerts.',
};
export const missions = [
  {
    id: '05',
    name: 'Permission-Aware Multi-Tenant RAG System',
    category: 'RAG / Secure AI Applications',
    year: '',
    status: 'Completed',
    short: 'Relevant answers. Access limited to the right users and tenants.',
    description:
      'Built a permission-aware retrieval-augmented generation application that lets users across multiple organizations query documents within their authorized scope. The system combines tenant isolation, role-based access control, metadata filtering, and vector search to restrict retrieved context before it reaches the language model. Audit logging records retrieval activity for traceability.',
    tech: [
      'RAG',
      'Embeddings',
      'Vector Databases',
      'Metadata Filtering',
      'Role-Based Access Control',
      'Multi-Tenancy',
      'Audit Logging',
    ],
    steps: [
      'Associate document embeddings with tenant and access-control metadata for permission-aware retrieval.',
      'Use the requesting user’s tenant and role to determine the document scope they may access.',
      'Apply metadata and permission filters during vector search to exclude unauthorized content from retrieval.',
      'Pass only permitted document context to the language model to generate a relevant response.',
      'Record retrieval activity in audit logs to support access reviews and troubleshooting.',
    ],
    result:
      'Implemented permission checks before LLM context generation, combining document retrieval with tenant isolation, role-based access control, and auditable access.',
    code: '',
  },
  {
    id: '01',
    name: 'Multi-Agent College Assistant',
    category: 'Agentic AI / Multi-Agent System',
    year: 'ONGOING',
    status: 'Active development',
    short: 'One question. A coordinated network of intelligence.',
    description:
      'An intelligent college assistant architecture using specialized AI agents to answer academic and student-service queries while maintaining controlled system behavior.',
    tech: ['Python', 'AI Agents', 'RAG', 'SQL', 'LangGraph / LangChain', 'Flask', 'MySQL / SQLite'],
    steps: [
      'A guardrail agent checks the incoming request.',
      'The supervisor determines intent and routes the request to a specialized agent.',
      'The SQL agent retrieves structured student information; RAG retrieves academic knowledge.',
      'A validator checks the result before a relevant response is returned.',
    ],
    result: 'A controlled architecture for academic queries and student information retrieval.',
    code: '',
  },
  {
    id: '02',
    name: 'Smart Surveillance',
    fullName: 'Smart Surveillance with Hand Gesture Detection for Silent Emergency Alerts',
    category: 'AI / Computer Vision',
    year: '2025',
    status: 'Completed',
    short: 'A silent signal. An intelligent response.',
    description:
      'A real-time surveillance system that recognizes emergency hand gestures using Python, OpenCV, and MediaPipe. The system processes webcam input and automatically sends an email alert containing a captured screenshot when it recognizes an emergency signal.',
    tech: ['Python', 'OpenCV', 'MediaPipe', 'Machine Learning', 'Computer Vision'],
    steps: [
      'Capture and process live webcam input.',
      'Detect hand landmarks and recognize emergency gestures.',
      'Capture a screenshot and send an automated email alert.',
    ],
    result: `Published in ${publication.journal}, ${publication.citation}. Indexed in Scopus (EID: ${publication.eid}).`,
    code: '',
  },
  {
    id: '03',
    name: 'Brahmi Script Recognition',
    category: 'Deep Learning',
    year: '2024',
    status: 'Completed',
    short: 'Ancient characters. Modern intelligence.',
    description:
      'A TensorFlow-based deep learning system for recognizing Brahmi script characters, bringing computer vision to historical writing systems.',
    tech: ['Python', 'TensorFlow', 'CNN', 'Deep Learning', 'TensorFlow Lite'],
    steps: [
      'Preprocess, augment, and normalize the dataset.',
      'Train a CNN with batch normalization and dropout.',
      'Use learning-rate scheduling to refine training.',
    ],
    result: 'Approximately 97% test accuracy.',
    code: '',
  },
  {
    id: '04',
    name: 'Gesture-Controlled Wheelchair',
    category: 'IoT / Computer Vision',
    year: '2022',
    status: 'Completed',
    short: 'Small gestures. Greater independence.',
    description:
      'A Raspberry Pi-based smart wheelchair controlled through hand gestures. A webcam recognizes finger-count gestures and converts them into movement commands, providing an accessible alternative to traditional joystick-based control.',
    tech: ['Raspberry Pi', 'Python', 'Computer Vision', 'IoT'],
    steps: ['1 finger → Left', '2 fingers → Right', '3 fingers → Forward', '4 fingers → Backward'],
    result: 'An accessible alternative to traditional joystick-based wheelchair control.',
    code: '',
  },
];
export const branches = [
  {
    name: 'Programming',
    icon: 'code',
    skills: ['Python', 'Java', 'SQL', 'HTML', 'CSS', 'R'],
    description:
      'Foundations for implementing intelligent systems, querying data, and building web interfaces.',
  },
  {
    name: 'AI / Machine Learning',
    icon: 'brain',
    skills: [
      'Machine Learning',
      'Deep Learning',
      'CNN',
      'Computer Vision',
      'RAG',
      'Embeddings',
      'AI Agents',
      'Multi-Agent Systems',
    ],
    description:
      'Learning systems, visual recognition, knowledge retrieval, and coordinated AI architectures.',
  },
  {
    name: 'AI / ML Technologies',
    icon: 'cpu',
    skills: ['TensorFlow', 'OpenCV', 'MediaPipe', 'scikit-learn'],
    description: 'The toolkit for training models and processing real-time visual information.',
  },
  {
    name: 'Database',
    icon: 'database',
    skills: ['MySQL', 'SQLite', 'Vector Databases'],
    description:
      'Structured data storage and retrieval for application backends and AI query workflows.',
  },
  {
    name: 'Development',
    icon: 'layers',
    skills: ['REST APIs', 'Flask', 'Backend Development', 'Full-Stack Development'],
    description:
      'Connecting interfaces, application logic, and data through practical software systems.',
  },
  {
    name: 'Secure AI Applications',
    icon: 'layers',
    skills: ['Metadata Filtering', 'Role-Based Access Control', 'Multi-Tenancy', 'Audit Logging'],
    description:
      'Restricting document retrieval by tenant and role before LLM context generation, with audit logs for traceability.',
  },
  {
    name: 'Tools',
    icon: 'terminal',
    skills: [
      'VS Code',
      'Eclipse',
      'Docker',
      'Jupyter Notebook',
      'Figma',
      'Jira',
      'RStudio',
      'XAMPP',
    ],
    description: 'An environment for developing, experimenting, designing, and collaborating.',
  },
];
