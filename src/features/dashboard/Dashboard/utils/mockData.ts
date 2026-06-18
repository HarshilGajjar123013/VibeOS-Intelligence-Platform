export interface Survey {
  id: string;
  title: string;
  status: 'active' | 'scheduled' | 'closed';
  responses: number;
  totalTarget: number;
  participationRate: number;
  engagementScore: number;
  closesOn: string;
  category: string;
}

export interface FeedbackItem {
  id: string;
  category: string;
  content: string;
  mood: 'positive' | 'neutral' | 'negative';
  date: string;
  upvotes: number;
  status: 'resolved' | 'in_progress' | 'in_review' | 'investigating';
  replies: number;
}

export interface RecognitionItem {
  id: string;
  sender: string;
  senderAvatar: string;
  receiver: string;
  receiverAvatar: string;
  message: string;
  date: string;
  likes: number;
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salaryRange: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: string;
  author: string;
  authorRole: string;
  readTime: string;
  date: string;
  excerpt: string;
  featured: boolean;
}

export const MOCK_SURVEYS: Survey[] = [
  {
    id: 's-1',
    title: 'Q2 Global Culture & Engagement Pulse',
    status: 'active',
    responses: 245,
    totalTarget: 350,
    participationRate: 70,
    engagementScore: 78,
    closesOn: 'June 20, 2026',
    category: 'Engagement'
  },
  {
    id: 's-2',
    title: 'Hybrid Workspace & Well-being Survey',
    status: 'active',
    responses: 112,
    totalTarget: 350,
    participationRate: 32,
    engagementScore: 82,
    closesOn: 'June 25, 2026',
    category: 'Well-being'
  },
  {
    id: 's-3',
    title: 'Annual Diversity, Equity & Inclusion Assessment',
    status: 'scheduled',
    responses: 0,
    totalTarget: 350,
    participationRate: 0,
    engagementScore: 0,
    closesOn: 'July 10, 2026',
    category: 'Inclusion'
  },
  {
    id: 's-4',
    title: 'Q1 Manager Effectiveness Evaluation',
    status: 'closed',
    responses: 312,
    totalTarget: 330,
    participationRate: 94,
    engagementScore: 85,
    closesOn: 'April 15, 2026',
    category: 'Leadership'
  },
  {
    id: 's-5',
    title: 'Professional Growth & Learning Opportunities',
    status: 'closed',
    responses: 289,
    totalTarget: 320,
    participationRate: 90,
    engagementScore: 72,
    closesOn: 'March 1, 2026',
    category: 'Growth'
  }
];

export const MOCK_FEEDBACK: FeedbackItem[] = [
  {
    id: 'f-1',
    category: 'Workplace Flexibility',
    content: 'The new flexible Friday focus-hours policy has been an absolute game changer for our engineering team. We get major coding blocks done without meeting disruptions. Please make it permanent!',
    mood: 'positive',
    date: '2 hours ago',
    upvotes: 42,
    status: 'resolved',
    replies: 5
  },
  {
    id: 'f-2',
    category: 'Career Growth',
    content: 'The path from Senior Engineer to Staff Engineer feels extremely opaque. We need clear performance benchmarks and examples of successful transitions to build confidence in the promotion tracks.',
    mood: 'neutral',
    date: '1 day ago',
    upvotes: 28,
    status: 'in_review',
    replies: 3
  },
  {
    id: 'f-3',
    category: 'Company Alignment',
    content: 'Recent leadership updates regarding the corporate restructuring have felt very vague. It causes a lot of unnecessary anxiety across middle management. More transparent timelines would go a long way.',
    mood: 'negative',
    date: '2 days ago',
    upvotes: 68,
    status: 'investigating',
    replies: 12
  },
  {
    id: 'f-4',
    category: 'Workplace Environment',
    content: 'The catered meals on Tuesdays and Thursdays are great, but the vegan and gluten-free options run out within the first 10 minutes. Can we audit the dietary preference percentages and order accordingly?',
    mood: 'positive',
    date: '3 days ago',
    upvotes: 15,
    status: 'in_progress',
    replies: 2
  },
  {
    id: 'f-5',
    category: 'Compensation & Benefits',
    content: 'Our mental health budget has not changed since 2024. With rising costs of therapy, increasing the annual stipend from $500 to $1,000 would align with our brand value of focusing on well-being.',
    mood: 'neutral',
    date: '5 days ago',
    upvotes: 53,
    status: 'in_review',
    replies: 7
  }
];

export const MOCK_RECOGNITION: RecognitionItem[] = [
  {
    id: 'r-1',
    sender: 'Alexander Wright',
    senderAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    receiver: 'Helena Vance',
    receiverAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    message: 'Helena did a spectacular job steering the Q2 release. Under a tight deadline, her calm leadership and technical clarity kept the engineering division completely aligned. Thank you!',
    date: 'Today',
    likes: 24
  },
  {
    id: 'r-2',
    sender: 'Kaelen Brooks',
    senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    receiver: 'Marcus Sterling',
    receiverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    message: 'Shoutout to Marcus for redesigning our onboarding portal! The flow feels incredibly slick, simple, and captures the warmth of VibeOS. Incredible craftsmanship.',
    date: 'Yesterday',
    likes: 18
  },
  {
    id: 'r-3',
    sender: 'Helena Vance',
    senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    receiver: 'Kaelen Brooks',
    receiverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    message: 'Kaelen went above and beyond helping me debug a complex styling issue on the landing page charts late on Tuesday. Pure teammate quality!',
    date: '3 days ago',
    likes: 12
  }
];

export const MOCK_JOBS: JobOpening[] = [
  {
    id: 'j-1',
    title: 'Staff Frontend Engineer (React / CSS Modules)',
    department: 'Engineering',
    location: 'San Francisco, CA / Remote',
    type: 'Full-time',
    salaryRange: '$180,000 - $220,000 + Equity'
  },
  {
    id: 'j-2',
    title: 'Lead Product Designer (Design Systems)',
    department: 'Design',
    location: 'New York, NY / Hybrid',
    type: 'Full-time',
    salaryRange: '$160,000 - $195,000 + Equity'
  },
  {
    id: 'j-3',
    title: 'Senior HR Operations Manager',
    department: 'People & Culture',
    location: 'Remote (US/Canada)',
    type: 'Full-time',
    salaryRange: '$130,000 - $160,000'
  },
  {
    id: 'j-4',
    title: 'Head of Customer Success',
    department: 'Growth',
    location: 'San Francisco, CA / Hybrid',
    type: 'Full-time',
    salaryRange: '$150,000 - $185,000'
  }
];

export const MOCK_ARTICLES: BlogArticle[] = [
  {
    id: 'a-1',
    title: 'The Future of Hybrid Work: Cultivating Trust in Distributed Teams',
    category: 'Workplace Culture',
    author: 'Marcus Sterling',
    authorRole: 'Chief People Officer',
    readTime: '6 min read',
    date: 'June 5, 2026',
    excerpt: 'Building trust across physical distances requires shifting from visual presence to output and intentional feedback loops. Learn how top organizations design workspaces that thrive.',
    featured: true
  },
  {
    id: 'a-2',
    title: 'How Transparency Drives Employee Engagement and Business Growth',
    category: 'Company Growth',
    author: 'Alexander Wright',
    authorRole: 'CEO & Co-founder',
    readTime: '4 min read',
    date: 'May 28, 2026',
    excerpt: 'When employees understand the "why" behind executive decisions, alignment increases and performance rises. Here is our blueprint for transparency.',
    featured: false
  },
  {
    id: 'a-3',
    title: 'Understanding Employee Burnout: Early Indicators and Preventative Actions',
    category: 'Well-being',
    author: 'Helena Vance',
    authorRole: 'Engineering Director',
    readTime: '8 min read',
    date: 'May 14, 2026',
    excerpt: 'Burnout is rarely caused by a single deadline. Discover the cumulative factors (meeting overload, isolation, poor recognition) and how managers can intercept them early.',
    featured: false
  },
  {
    id: 'a-4',
    title: 'Crafting an Authentic Employer Brand from the Inside Out',
    category: 'Employer Brand',
    author: 'Kaelen Brooks',
    authorRole: 'Brand Designer',
    readTime: '5 min read',
    date: 'May 3, 2026',
    excerpt: 'Your best recruitment asset is the real stories of your current employees. How to package and broadcast authentic culture highlights without corporate filters.',
    featured: false
  }
];

export const FAQS = [
  {
    q: 'How does VibeOS guarantee employee anonymity?',
    a: 'VibeOS uses cryptographic aggregation. For anonymous surveys and feedback feeds, responses are pooled in groups of five or more before reports are compiled. Individual responses cannot be traced back to single accounts, guaranteeing total safety and transparency.'
  },
  {
    q: 'Can we customize survey question sets or use preset templates?',
    a: 'Yes! VibeOS comes with over 45 research-backed template surveys developed by organizational psychologists. You can also build entirely custom surveys from scratch using our Survey Builder, supporting emoji reactions, open text, NPS, rating scales, and multiple choice.'
  },
  {
    q: 'How does the AI Insights engine analyze open-text feedback?',
    a: 'Our natural language processing model aggregates open-text comments, filters out identifying pronouns/terms, summarizes recurring core themes, and analyzes overall sentiment (positive, neutral, negative) so leadership can read consolidated trends instead of sifting through hundreds of raw entries.'
  },
  {
    q: 'What integrations do you support?',
    a: 'We support Slack, Microsoft Teams, Zoom, Google Workspace, Workday, BambooHR, and Linear. You can trigger feedback prompts directly in Slack and sync employee rosters automatically.'
  },
  {
    q: 'How are engagement and culture scores calculated?',
    a: 'Our Culture Health Index aggregates metrics across six key drivers: Trust, Alignment, Recognition, Connection, Well-being, and Growth. These are calculated from employee surveys and feedback trends, calibrated against industry-specific benchmarks.'
  },
  {
    q: 'What is the difference between the HR Dashboard and Manager Dashboard?',
    a: 'The HR Dashboard provides company-wide heatmaps, cross-department comparison matrices, and survey scheduling tools. The Manager Dashboard focuses exclusively on the manager\'s immediate direct-report team, providing aggregated sentiment and recommended action items (like 1-on-1 topics).'
  },
  {
    q: 'Does VibeOS offer a trial period?',
    a: 'Absolutely. We offer a 14-day free trial on our Starter and Growth plans, with no credit card required. You get full access to survey templates and automated AI Insights reports.'
  },
  {
    q: 'Can we export reports for board meetings?',
    a: 'Yes, our Reports Center allows you to compile Executive Summaries, Department Heatmaps, or Sentiment Trends. You can export these reports instantly into vector PDF, Excel spreadsheets, or editable PowerPoint slides.'
  },
  {
    q: 'How often are surveys sent out?',
    a: 'You can configure your cadence. Most companies set up a weekly or bi-weekly brief Wellbeing Pulse (1-2 questions) and a monthly or quarterly comprehensive Culture Assessment (10-15 questions).'
  },
  {
    q: 'Is VibeOS SOC 2 compliant?',
    a: 'Yes, VibeOS is SOC 2 Type II certified. All data in transit and at rest is fully encrypted using enterprise-grade standards, and we conduct third-party penetration testing twice a year.'
  }
];

export const MOCK_COMPANY_STATS = {
  employeeCount: 350,
  departments: ['Engineering', 'Product', 'Design', 'Sales', 'Support', 'Marketing'],
  locations: ['San Francisco, CA', 'New York, NY', 'Toronto, ON', 'London, UK', 'Remote'],
  engagementScore: 82,
  engagementTrend: +4.2,
  participationRate: 92,
  participationTrend: +1.5,
  burnoutRisk: {
    high: 4,
    moderate: 22,
    low: 74
  },
  cultureHealthIndex: 84,
  cultureDrivers: [
    { name: 'Trust & Leadership', score: 86 },
    { name: 'Alignment & Vision', score: 80 },
    { name: 'Recognition & Rewards', score: 78 },
    { name: 'Social Connection', score: 82 },
    { name: 'Mental Well-being', score: 88 },
    { name: 'Professional Growth', score: 85 }
  ],
  insights: [
    {
      id: 'i-1',
      type: 'warning',
      category: 'Recognition & Rewards',
      message: 'Design department reports a 12% drop in feeling recognized for their work. AI recommends setting up a spotlight segment in next week\'s team meeting.',
      target: 'Design'
    },
    {
      id: 'i-2',
      type: 'danger',
      category: 'Mental Well-being',
      message: 'Sales department burnout risk has risen to Moderate. Recommendation: Institute "No Meeting Wednesday" to recover focus time.',
      target: 'Sales'
    },
    {
      id: 'i-3',
      type: 'success',
      category: 'Workplace Flexibility',
      message: 'Engineering engagement rose by 8% following the permanent adoption of Focus Fridays. Recommend sharing this success model with Support.',
      target: 'Engineering'
    }
  ]
};

// ============================================================================
// LEGACY ALIASES — preserved for backward compatibility with existing dashboard
// ============================================================================

// Legacy Survey interface (re-mapped from new Survey type)
export type Feedback = {
  id: string;
  category: "workload" | "culture" | "management" | "tools" | "compensation";
  sentiment: "positive" | "neutral" | "negative";
  priority: "high" | "medium" | "low";
  content: string;
  aiSummary: string;
  status: "new" | "reviewing" | "replied" | "resolved";
  date: string;
  department: string;
};

export type Recognition = {
  id: string;
  from: string;
  fromAvatar?: string;
  to: string;
  toAvatar?: string;
  badge: "teamwork" | "innovation" | "leadership" | "customer-first" | "grit";
  message: string;
  date: string;
  reactions: { type: string; count: number }[];
  commentsCount: number;
};

export interface MetricTrend {
  period: string;
  engagement: number;
  participation: number;
  sentiment: number;
  burnoutRisk: number;
}

export interface DepartmentMetric {
  name: string;
  engagement: number;
  participation: number;
  sentiment: number;
  headcount: number;
}

export interface ReportItem {
  id: string;
  title: string;
  type: "weekly" | "monthly" | "quarterly" | "executive" | "survey";
  date: string;
  size: string;
}

export const surveyTemplates = [
  { id: "t1", title: "Standard Engagement Pulse", desc: "15 standard questions to assess monthly team health.", category: "Engagement", icon: "📊" },
  { id: "t2", title: "New Hire 30-Day Check-in", desc: "Measure ramp-up, team clarity, and support levels.", category: "Lifecycle", icon: "🌱" },
  { id: "t3", title: "Manager Effectiveness 360", desc: "Gain feedback on direction, feedback frequency, and support.", category: "Leadership", icon: "💼" },
  { id: "t4", title: "Stress & Workload Audit", desc: "Evaluate burnout indices, balance, and resourcing needs.", category: "Wellbeing", icon: "🧘" },
  { id: "t5", title: "Diversity & Inclusion Survey", desc: "Gauge belonging, psychological safety, and equal growth.", category: "Culture", icon: "🌍" },
  { id: "t6", title: "Post-Merger/Reorg Sentiment", desc: "Track organizational change stability and alignment.", category: "Change Management", icon: "🔄" }
];

// Legacy mock surveys — mapped from new MOCK_SURVEYS with extra fields for dashboard compat
export const mockSurveys = MOCK_SURVEYS.map(s => ({
  id: s.id,
  title: s.title,
  status: s.status,
  dueDate: s.closesOn,
  questionsCount: Math.floor(s.totalTarget / 15),
  responses: s.responses,
  participationRate: s.participationRate,
  category: s.category
}));

export const mockFeedback: Feedback[] = [
  {
    id: "fb1",
    category: "workload",
    sentiment: "negative",
    priority: "high",
    content: "The Engineering team is heavily understaffed for the upcoming Q3 commitments. People are working 60+ hour weeks, and we are starting to see team members leave without replacements. The burnout is real.",
    aiSummary: "Engineering understaffing is driving severe burnout and turnover risk due to long work hours and unreplaced departures.",
    status: "new",
    date: "2 hours ago",
    department: "Engineering"
  },
  {
    id: "fb2",
    category: "culture",
    sentiment: "positive",
    priority: "low",
    content: "The new peer recognition channel on Slack has completely transformed our morning team rituals. It is so easy to appreciate others and really builds positive morale.",
    aiSummary: "The newly integrated Slack peer recognition system has significantly improved morning team morale and habits.",
    status: "resolved",
    date: "1 day ago",
    department: "Marketing"
  },
  {
    id: "fb3",
    category: "management",
    sentiment: "negative",
    priority: "medium",
    content: "Our department directors are not providing clear direction on product goals. Every week we shift priorities, which feels incredibly unproductive and wastes engineering cycles.",
    aiSummary: "Lack of clear goals and shifting priorities by directors is causing frustration and wasting development efforts.",
    status: "reviewing",
    date: "Yesterday",
    department: "Product"
  },
  {
    id: "fb4",
    category: "tools",
    sentiment: "neutral",
    priority: "medium",
    content: "Can we look into upgrading our design system licenses? Figma is running slowly with the current tiers, and we are losing time syncing UI components.",
    aiSummary: "Requesting upgraded design licenses due to performance bottlenecks causing lag in syncing assets.",
    status: "replied",
    date: "3 days ago",
    department: "Design"
  },
  {
    id: "fb5",
    category: "compensation",
    sentiment: "negative",
    priority: "high",
    content: "With inflation rising, there hasn't been a transparent talk about annual cost-of-living salary adjustments. Top performers are starting to interview elsewhere for higher base pay.",
    aiSummary: "Lack of transparent salary adjustments is driving key talent to explore other market options.",
    status: "new",
    date: "4 days ago",
    department: "Sales"
  }
];

export const mockRecognitions: Recognition[] = [
  {
    id: "rec1",
    from: "Alexander Wright",
    fromAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    to: "Helena Vance",
    toAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    badge: "leadership",
    message: "Helena did a spectacular job steering the Q2 release. Under a tight deadline, her calm leadership and technical clarity kept the engineering division completely aligned. Thank you!",
    date: "Today",
    reactions: [
      { type: "🔥", count: 8 },
      { type: "❤️", count: 12 },
      { type: "🙌", count: 5 }
    ],
    commentsCount: 3
  },
  {
    id: "rec2",
    from: "Kaelen Brooks",
    fromAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    to: "Marcus Sterling",
    toAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    badge: "innovation",
    message: "Shoutout to Marcus for redesigning our onboarding portal! The flow feels incredibly slick, simple, and captures the warmth of VibeOS. Incredible craftsmanship.",
    date: "Yesterday",
    reactions: [
      { type: "🚀", count: 15 },
      { type: "💡", count: 6 }
    ],
    commentsCount: 1
  },
  {
    id: "rec3",
    from: "Helena Vance",
    fromAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    to: "Kaelen Brooks",
    toAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    badge: "teamwork",
    message: "Kaelen went above and beyond helping me debug a complex styling issue on the landing page charts late on Tuesday. Pure teammate quality!",
    date: "3 days ago",
    reactions: [
      { type: "👑", count: 9 },
      { type: "👏", count: 14 }
    ],
    commentsCount: 4
  }
];

export const mockTrends: MetricTrend[] = [
  { period: "Jan", engagement: 74, participation: 80, sentiment: 62, burnoutRisk: 12 },
  { period: "Feb", engagement: 76, participation: 84, sentiment: 65, burnoutRisk: 14 },
  { period: "Mar", engagement: 75, participation: 85, sentiment: 63, burnoutRisk: 15 },
  { period: "Apr", engagement: 78, participation: 89, sentiment: 68, burnoutRisk: 11 },
  { period: "May", engagement: 81, participation: 91, sentiment: 73, burnoutRisk: 8 },
  { period: "Jun", engagement: 84, participation: 92, sentiment: 76, burnoutRisk: 6 }
];

export const mockDepartmentMetrics: DepartmentMetric[] = [
  { name: "Engineering", engagement: 8.1, participation: 94, sentiment: 75, headcount: 142 },
  { name: "Product", engagement: 8.6, participation: 92, sentiment: 82, headcount: 36 },
  { name: "Design", engagement: 8.4, participation: 88, sentiment: 79, headcount: 24 },
  { name: "Marketing", engagement: 7.9, participation: 85, sentiment: 71, headcount: 55 },
  { name: "Sales", engagement: 7.2, participation: 76, sentiment: 60, headcount: 98 },
  { name: "Operations", engagement: 7.8, participation: 82, sentiment: 68, headcount: 48 }
];

export const mockReports: ReportItem[] = [
  { id: "rep1", title: "Q2 Organization Culture & Sentiment Report", type: "executive", date: "June 15, 2026", size: "4.8 MB" },
  { id: "rep2", title: "Weekly Employee Pulse Performance Summary", type: "weekly", date: "Today", size: "1.2 MB" },
  { id: "rep3", title: "Engineering Burnout Audit & Action Plan", type: "survey", date: "June 10, 2026", size: "2.4 MB" },
  { id: "rep4", title: "Monthly Retention Risk & Talent Forecast", type: "monthly", date: "June 1, 2026", size: "3.1 MB" },
  { id: "rep5", title: "Annual Workspace Experience Review 2025", type: "executive", date: "Jan 10, 2026", size: "14.2 MB" }
];

export const mockRoleMetrics = {
  executive: {
    cultureHealthIndex: 84,
    cultureHealthTrend: "+4%",
    engagementScore: 8.2,
    engagementTrend: "+0.3",
    participationRate: 92,
    participationTrend: "+2%",
    burnoutRisk: { low: 74, medium: 22, high: 4 },
    sentimentBreakdown: { positive: 65, neutral: 25, negative: 10 }
  },
  hr: {
    surveyHealth: 94,
    surveyHealthTrend: "+1.2%",
    feedbackVolume: 124,
    feedbackVolumeTrend: "+18 new",
    recognitionActivity: 382,
    recognitionActivityTrend: "+12% MoM",
    activeGoals: 6,
    goalsCompleted: 4
  },
  manager: {
    teamEngagement: 8.4,
    teamEngagementTrend: "+0.2",
    participation: 96,
    participationTrend: "All active",
    pendingActions: 3,
    weeklyOneOnOnes: 8,
    teamMoodIndex: 8.1
  },
  employee: {
    surveysCompleted: 8,
    surveysTotal: 12,
    recognitionReceived: 12,
    wellbeingScore: 8.2,
    myPoints: 350
  }
};
