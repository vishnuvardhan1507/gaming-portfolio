// Replace the empty contact fields and internship placeholders with verified details.
export const profile = {
  name: 'Andena Vishnu Vardhan Reddy',
  email: 'vishnu24004@gmail.com',
  github: '',
  linkedin: '',
  internshipCompany: 'NexusIQ Solutions LLP · Hyderabad, Telangana',
  internshipDetails: [
    '[Add primary AI responsibility]',
    '[Add technologies used]',
    '[Add measurable contribution]',
    '[Add AI / agent / model work]',
  ],
};
export const missions = [
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
    result:
      'Research published at the 4th International Conference on Advances in Software Engineering and Information Technology — ASIT 2025.',
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
    skills: ['MySQL', 'SQLite'],
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
