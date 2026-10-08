export const mockEvents = [
  {
    _id: 'event-01',
    title: 'CodeSprint 1.0: Freshers CP Challenge',
    category: 'Contest',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
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
    title: 'Mastering Dynamic Programming & Graph Theory',
    category: 'Workshop',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10), // 10 days from now
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
    title: 'WebCraft: Full-Stack MERN Sprint',
    category: 'Bootcamp',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 18),
    time: '3:00 PM - 5:30 PM IST',
    venue: 'Google Meet / Online',
    description: 'Learn to build real-world responsive web applications with React, Express, and MongoDB, complete with JWT authentication and deployment.',
    registrationUrl: 'https://algozenith.org',
    tags: ['Web Dev', 'React', 'NodeJS', 'MongoDB'],
    status: 'upcoming',
    speakers: [
      { name: 'Tech Team Leads', title: 'AZ Web Leads', avatar: '' }
    ]
  },
  {
    _id: 'event-04',
    title: 'AlgoZenith SRMCEM Inaugural Orientation',
    category: 'Meetup',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
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

export const mockMembers = [
  {
    _id: 'member-01',
    name: 'Lead / President',
    role: 'Chapter President & Lead',
    subRole: 'Competitive Programming & Strategy',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    bio: 'Candidate Master / Knight on LeetCode. Passionate about algorithms, fostering a high-impact developer community at SRMCEM.',
    avatarUrl: '',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      codeforces: 'https://codeforces.com',
      leetcode: 'https://leetcode.com'
    },
    order: 1,
    isCoreTeam: true
  },
  {
    _id: 'member-02',
    name: 'Vice President / Tech Lead',
    role: 'Technical Lead & Full Stack Architect',
    subRole: 'Systems & Web Engineering',
    department: 'Information Technology',
    year: '3rd Year',
    bio: 'Full Stack engineer building cloud-native apps. Leads technical workshops, hackathon mentoring, and club project development.',
    avatarUrl: '',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    },
    order: 2,
    isCoreTeam: true
  },
  {
    _id: 'member-03',
    name: 'CP & DSA Head',
    role: 'Competitive Programming Lead',
    subRole: 'Problem Setting & Editorial Lead',
    department: 'CSE (AI & ML)',
    year: '3rd Year',
    bio: 'Curates weekly contest problemsets, analyzes test cases, and mentors 1st and 2nd year students on mathematical algorithms.',
    avatarUrl: '',
    socials: {
      github: 'https://github.com',
      codeforces: 'https://codeforces.com',
      leetcode: 'https://leetcode.com'
    },
    order: 3,
    isCoreTeam: true
  },
  {
    _id: 'member-04',
    name: 'Events & PR Head',
    role: 'Public Relations & Operations Lead',
    subRole: 'Campus Outreach & Logistics',
    department: 'Computer Science & Engineering',
    year: '2nd Year',
    bio: 'Manages inter-college relations, workshop logistics, sponsorships, and keeps the community energized across all social handles.',
    avatarUrl: '',
    socials: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://x.com'
    },
    order: 4,
    isCoreTeam: true
  }
];
