export const clientMockEvents = [
  {
    _id: 'event-00-bootcamp',
    slug: '7-day-java-logic-bootcamp',
    title: '7-Day Java & Logic Building Bootcamp',
    category: 'Bootcamp',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 14).toISOString(),
    time: '6:00 PM - 7:30 PM IST (daily)',
    venue: 'Google Meet / Online (Day 7: Computer Lab 2, SRMCEM)',
    eligibility: 'Ideal for 1st & 2nd Year Students — No Prior Coding Required.',
    description: 'Master Java fundamentals, problem-solving intuition, and algorithmic logic from scratch. Led by senior CP rankholders at SRMCEM.',
    registrationUrl: 'https://algozenith.org',
    tags: ['Java', 'DSA', 'Beginner Friendly', 'Free', 'Certificates'],
    status: 'upcoming',
    speakers: [
      { name: 'Yashraj Rastogi', title: 'Chapter Lead & Candidate Master', avatar: '' },
      { name: 'Aryan Verma', title: 'Technical Lead & CP Mentor', avatar: '' },
      { name: 'Priya Kapoor', title: 'DSA Head & LeetCode Knight', avatar: '' }
    ],
    curriculum: [
      { day: 1, title: 'Java Essentials, Platform Setup & Logic Building', topics: ['Java syntax, Scanner input & type systems', 'Conditional branching & loop patterns', 'IDE configuration & first submission on Judge', 'Basic problem solving drills'] },
      { day: 2, title: 'Time/Space Complexity & Arrays (1D + 2D)', topics: ['Big-O asymptotic intuition & operation limits', '1D Array traversal & Kadane’s algorithm', 'Prefix sums & range queries', '2D Matrix manipulation & spiral grids'] },
      { day: 3, title: 'Two Pointers & Sliding Window', topics: ['Opposite vs same directional two pointers', 'Fixed vs dynamic sliding window patterns', 'Subarray sum equals K & maximum window', 'Hands-on practice on LeetCode beginner tracks'] },
      { day: 4, title: 'Sorting & Binary Search', topics: ['Comparative sorting & time complexity intuition', 'Binary search template on sorted arrays', 'Binary search on answer space (predicate check)', 'Common edge cases and off-by-one avoidance'] },
      { day: 5, title: 'Strings, Collections (JCF) & Hashing', topics: ['StringBuilder vs immutable Strings', 'Java Collections Framework (ArrayList, HashMap, HashSet)', 'Frequency counting & two-sum variations', 'Character hashing & anagram detection'] },
      { day: 6, title: 'Recursion & Contest Mock Check', topics: ['Recursion tree mental model & stack frames', 'Backtracking: subsets & permutations', 'Timed 60-minute mock contest simulation', 'Live editorial breakdown & doubt clearing'] },
      { day: 7, title: 'The Grand Finale — College Lab Offline Contest 🏆', topics: ['Live 2-hour offline coding contest in SRMCEM Computer Labs', 'Real-time projector leaderboard & scoreboard', 'Prize ceremony & AlgoZenith swag distribution', 'Certificate of completion for all qualifying participants'] },
    ],
    prizes: [
      '🥇 1st Place — AlgoZenith Merch Kit + Winner Trophy + Certificate of Excellence + Senior Referral',
      '🥈 2nd Place — AlgoZenith Custom Goodies + Certificate of Distinction',
      '🥉 3rd Place — Official Swag Pack + Certificate of Distinction',
      '🎖️ All Attendees — Verified Digital Certificate of Bootcamp Completion',
      '⭐ Fast-track entry into the AlgoZenith Core Competitive Programming Circle',
    ],
    faq: [
      { question: 'Do I need to pay anything?', answer: '100% Free — no registration fee, no charges for session access or lab entry.' },
      { question: 'What if I have never written code before?', answer: 'Day 1 starts completely from zero. All you need is enthusiasm to learn logic and problem solving.' },
      { question: 'What if I miss an online session?', answer: 'All online sessions (Days 1–6) are recorded and shared on our Discord with daily assignment links.' },
      { question: 'Do I need a laptop for Day 7?', answer: 'The Day 7 Grand Finale contest takes place in the SRMCEM Computer Labs, with high-speed internet and pre-configured systems.' },
      { question: 'Will I receive a verified certificate?', answer: 'Yes! All students completing the tasks and attending Day 7 will receive a verified certificate from AlgoZenith SRMCEM.' },
    ]
  },
  {
    _id: 'event-01',
    slug: 'codesprint-1-freshers-cp',
    title: 'CodeSprint 1.0: Freshers CP Challenge',
    category: 'Contest',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    time: '6:00 PM - 8:30 PM IST',
    venue: 'HackerEarth / SRMCEM Lab 4',
    description: 'An introductory competitive programming contest designed specifically for beginner & intermediate coders to test algorithmic intuition, arrays, strings, and basic math.',
    registrationUrl: 'https://algozenith.org',
    tags: ['DSA', 'Beginner Friendly', 'Contest', 'Codeforces'],
    status: 'upcoming',
    speakers: [
      { name: 'Yashraj Rastogi', title: 'AZ SRMCEM Lead', avatar: '' }
    ]
  },
  {
    _id: 'event-02',
    slug: 'dp-and-graphs-workshop',
    title: 'Mastering Dynamic Programming & Graph Theory',
    category: 'Workshop',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    time: '4:00 PM - 6:30 PM IST',
    venue: 'Seminar Hall 1 / Live Stream',
    description: 'Deep dive into state transitions, memoization, tree traversals, Dijkstra, and tackling hard problems on LeetCode & Codeforces.',
    registrationUrl: 'https://algozenith.org',
    tags: ['Advanced DSA', 'DP', 'Graphs', 'Placement Prep'],
    status: 'upcoming',
    speakers: [
      { name: 'Core CP Mentors', title: 'AlgoZenith Mentors', avatar: '' }
    ]
  },
  {
    _id: 'event-03',
    slug: 'webcraft-fullstack-mern-bootcamp',
    title: 'WebCraft: Full-Stack MERN Sprint',
    category: 'Bootcamp',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18).toISOString(),
    time: '3:00 PM - 5:30 PM IST (daily)',
    venue: 'Google Meet / Online (Day 7: CS Lab 3, SRMCEM)',
    eligibility: 'Ideal for 1st & 2nd Year Students — Basic HTML knowledge helpful but not required.',
    description: 'Learn to build real-world responsive web applications with React, Express, and MongoDB, complete with JWT authentication and deployment — across 7 focused days.',
    registrationUrl: 'https://algozenith.org',
    tags: ['Web Dev', 'React', 'NodeJS', 'MongoDB', 'Free'],
    status: 'upcoming',
    speakers: [
      { name: 'Tech Team Leads', title: 'AZ Web Leads', avatar: '' },
      { name: 'Yashraj Rastogi', title: 'Chapter Lead & Full-Stack Mentor', avatar: '' }
    ],
    curriculum: [
      { day: 1, title: 'HTML, CSS & the Web Fundamentals', topics: ['Document structure & semantic HTML', 'CSS box model & Flexbox', 'Responsive design intro', 'Deploy a static page to GitHub Pages'] },
      { day: 2, title: 'JavaScript Essentials & DOM', topics: ['Variables, functions & ES6+', 'DOM manipulation', 'Events & listeners', 'Fetch API & JSON'] },
      { day: 3, title: 'React Fundamentals', topics: ['Create React App / Vite setup', 'Components & JSX', 'Props & State with useState', 'React Router basics'] },
      { day: 4, title: 'Node.js & Express Backend', topics: ['Node.js runtime', 'Express server & REST routes', 'Middleware & error handling', 'Postman API testing'] },
      { day: 5, title: 'MongoDB & Mongoose', topics: ['MongoDB Atlas setup', 'Mongoose schemas & models', 'CRUD operations', 'Connecting backend to database'] },
      { day: 6, title: 'JWT Auth & Full-Stack Integration', topics: ['JWT authentication flow', 'Protected routes', 'Connecting React frontend to Express API', 'End-to-end testing'] },
      { day: 7, title: 'Deployment & Offline Demo Day 🏆', topics: ['Deploy backend on Render', 'Deploy frontend on Vercel', 'Live demo presentations', 'Prize ceremony & certificate distribution'] },
    ],
    prizes: [
      '🥇 Best Project — AlgoZenith Merch Kit + Certificate + Referral Opportunity',
      '🥈 Runner-up — Certificate of Excellence + AlgoZenith Goodies',
      '🥉 2nd Runner-up — Certificate + Recognition on Club Leaderboard',
      '🎖️ All Participants — Digital Certificate of Completion',
      '⭐ Top performers featured on club website & social media',
    ],
    faq: [
      { question: 'Do I need to pay anything?', answer: '100% Free — no registration fee, no hidden cost whatsoever.' },
      { question: 'What if I miss an online session?', answer: 'Recordings and GitHub notes are shared in our Discord within 24 hours of each session.' },
      { question: 'Do I need a laptop for Day 7?', answer: 'The offline demo day is held in the college computer labs — no personal laptop required.' },
      { question: 'Is prior coding experience required?', answer: 'No. The bootcamp is designed for beginners. If you know basic HTML, you are over-prepared.' },
      { question: 'Will I get a certificate?', answer: 'Yes! Every participant who completes all 7 days receives a digital certificate of completion.' },
    ]
  },
  {
    _id: 'event-04',
    slug: 'inaugural-orientation-2024',
    title: 'AlgoZenith SRMCEM Inaugural Orientation',
    category: 'Meetup',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    time: '2:00 PM - 4:00 PM IST',
    venue: 'Auditorium 2, SRMCEM',
    description: 'Kick-off session introducing AlgoZenith club vision, domain divisions, contest roadmaps, mentorship culture, and induction roadmap.',
    registrationUrl: '#',
    tags: ['Orientation', 'Club Induction', 'SRMCEM'],
    status: 'completed',
    speakers: [
      { name: 'Club Executive Council', title: 'Faculty & Student Leads', avatar: '' }
    ]
  }
];
