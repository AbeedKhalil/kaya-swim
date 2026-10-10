import { site } from '../config/site';
import type { SiteCopy } from './types';

const { full, first } = site.founder.en;

/** All English text. Edit here and the change appears across the site. */
const en: SiteCopy = {
  locale: 'en',
  languageName: 'English',
  languageShort: 'EN',

  meta: {
    title: 'KAYA SWIM | Swim with a champion — swimming lessons at Givat Ela',
    description: `Small-group swimming lessons with ${full}, Israeli champion and 2017 Maccabiah bronze medalist. The Water Experience for ages 4–10, Swimming Excellence for ages 10–18, and fear-of-water sessions for every age.`,
    ogImageAlt: 'KAYA SWIM — Swim with a champion',
  },

  skipLink: 'Skip to main content',

  nav: {
    label: 'Main',
    tracks: 'Tracks',
    story: 'Story',
    how: 'How to join',
    testimonials: 'Testimonials',
    faq: 'FAQ',
    contact: 'Sign up',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    home: 'KAYA SWIM — home',
    follow: 'Follow us',
  },

  cta: {
    whatsapp: 'Chat on WhatsApp',
    send: 'Send on WhatsApp',
    details: 'Full details',
    seeTracks: 'See the tracks',
    call: 'Call',
    email: 'Email',
    opensWhatsapp: '(opens WhatsApp)',
    opensNewTab: '(opens in a new tab)',
  },

  whatsapp: {
    general: "Hi! I found KAYA SWIM's website and would love to hear more 🙂",
  },

  hero: {
    eyebrow: 'Givat Ela pool',
    line1: 'Swim with',
    line2: 'a champion',
    credential: 'Israeli champion · Maccabiah bronze 2017',
    sub: 'Small-group swimming lessons with full personal attention — from first strokes to competitive training. Ages 4 to 90.',
    doors: {
      kids: {
        title: 'Kids & teens',
        meta: 'Ages 4–18',
        text: 'The Water Experience and Swimming Excellence',
      },
      adults: {
        title: 'Adults',
        meta: 'Any age',
        text: 'Overcoming fear of water, at your own pace',
      },
    },
  },

  credentials: [
    { icon: 'trophy', text: 'Israeli swimming champion' },
    { icon: 'medal', text: 'Bronze medal · Maccabiah 2017 · 200 m butterfly', medal: true },
    { icon: 'school', text: 'Wingate Institute for sports excellence · from age 13' },
    { icon: 'graduation', text: 'B.Ed in Physical Education' },
    { icon: 'globe', text: 'Hands-on experience in Europe' },
  ],

  tracksSection: {
    title: 'Choose your track',
    intro: `Every track comes with small groups, full personal attention and experienced instructors, led by ${first}.`,
    agesPrefix: 'Ages',
  },

  founder: {
    title: "Katrin's story",
    lead: `${full} first got into a pool when she was two. The water has been her home ever since.`,
    paragraphs: [
      'When she was three, her mother passed away. The water became her safe haven — the place where she felt secure, strong and at home.',
      'At 13 she joined the Wingate Institute for sports excellence, and by 17 she was Israeli champion and a bronze medalist in the 200 m butterfly at the 2017 Maccabiah Games.',
      `Today, with a B.Ed in Physical Education and hands-on experience in Europe, ${first} leads KAYA SWIM — to give children and adults what the water gave her: confidence, independence and discipline, in a supportive, professional environment.`,
    ],
    timelineLabel: `${first}'s timeline`,
    agePrefix: 'Age',
    timeline: [
      { age: 2, text: 'First time in the pool' },
      { age: 3, text: 'The water becomes her safe haven' },
      { age: 13, text: 'Joins the Wingate Institute for sports excellence' },
      { age: 17, text: 'Israeli champion and Maccabiah 2017 bronze, 200 m butterfly', medal: true },
      { label: 'Today', text: 'Founder of KAYA SWIM' },
    ],
    portraitAlt: `${full}, founder of KAYA SWIM`,
  },

  values: {
    eyebrow: 'What guides us',
    title: 'Home. Innovation. Professionalism.',
    items: [
      {
        icon: 'home',
        title: 'A home-like atmosphere',
        text: 'Emotional support that builds self-confidence. People who feel at home learn to love the water.',
      },
      {
        icon: 'video',
        title: 'Innovation',
        text: 'Digital documentation and real-time video feedback, so you see the progress instead of just hearing about it.',
      },
      {
        icon: 'graduation',
        title: 'Professionalism',
        text: 'Academic training in physical education and the hands-on experience of an Israeli champion, in every lesson.',
      },
    ],
    promises: ['Small groups', '100% personal attention', 'Experienced instructors', 'Givat Ela pool'],
  },

  journey: {
    title: 'How to join',
    intro: 'It all happens on WhatsApp, right from your phone.',
    steps: [
      { title: 'Send a message', text: 'On WhatsApp, or with the short form on this page.' },
      { title: 'A quick matching chat', text: 'We get to know you, hear what matters to you and choose the right track together.' },
      { title: 'Payment and a digital receipt', text: 'Payment details arrive on WhatsApp, and the receipt goes straight to your phone.' },
      { title: 'Swim and get feedback', text: 'After the lesson you get a video with personal feedback, so you can see the progress.' },
    ],
    phone: {
      label: 'Example WhatsApp conversation with KAYA SWIM',
      contact: 'KAYA SWIM',
      status: 'WhatsApp',
      outgoing: "Hi! I'd love details on The Water Experience for my daughter, she's 6 🙂",
      reply: "Hi! How lovely 😊 Let's get to know each other and find the right group together.",
      payment: { title: 'Payment details', text: 'Sent on WhatsApp' },
      receipt: 'Digital receipt',
      video: { title: "Today's lesson video", text: 'With personal feedback' },
    },
  },

  testimonials: {
    title: 'What parents and swimmers say',
    regionLabel: 'Testimonials',
    sampleBadge: 'Sample testimonial',
    audiences: { parent: 'Parent', swimmer: 'Swimmer', adult: 'Adult' },
    // Samples only — replace with real testimonials (with permission) and remove sample: true.
    items: [
      {
        quote: 'Our daughter was scared to get into the water, and within a few weeks she was asking to go to the pool. The small group made all the difference.',
        name: 'Parent of a Water Experience swimmer',
        audience: 'parent',
        track: 'water-experience',
        sample: true,
      },
      {
        quote: 'The training improved my technique, and the videos after each session show me exactly what to fix.',
        name: 'Swimmer at the Excellence Center',
        audience: 'swimmer',
        track: 'excellence',
        sample: true,
      },
      {
        quote: "I've been afraid of the water my whole life. We worked patiently, with no pressure, and for the first time I enjoy being in the pool.",
        name: 'Fear-of-water participant',
        audience: 'adult',
        track: 'fear-of-water',
        sample: true,
      },
      {
        quote: 'After every lesson we got a video and feedback, and we could see the progress with our own eyes.',
        name: 'Parent of a Water Experience swimmer',
        audience: 'parent',
        track: 'water-experience',
        sample: true,
      },
    ],
  },

  faq: {
    title: 'Frequently asked questions',
    intro: "Didn't find your answer? Message us on WhatsApp.",
    items: [
      {
        q: 'From what age can you join?',
        a: 'From age 4. The Water Experience is for ages 4–10, the Swimming Excellence Center for ages 10–18, and the fear-of-water sessions suit every age, from 4 to 90.',
      },
      {
        q: 'Do I need to know how to swim to start?',
        a: 'No. The Water Experience starts with pre-swimming, and the fear-of-water sessions start with gradual water adaptation, at each participant’s own pace.',
        tracks: ['water-experience', 'fear-of-water'],
      },
      {
        q: 'How many people are in a group?',
        a: 'Groups are kept especially small, so everyone gets full personal attention. We’ll share the details of the right group for you on WhatsApp.',
      },
      {
        q: 'How does payment work?',
        a: 'After the matching chat, payment details are sent to you on WhatsApp, and the receipt arrives digitally on your phone.',
      },
      {
        q: 'Where do the lessons take place?',
        a: 'At the Givat Ela swimming pool.',
      },
      {
        q: 'What is the video feedback?',
        a: 'We document lessons and give real-time video feedback. After the lesson you receive a video, so you can see the progress for yourself.',
      },
      {
        q: 'Are the fear-of-water sessions discreet?',
        a: 'Yes. Sessions take place in a protected, discreet setting, with patience and gentle emotional support, at a pace that suits you.',
        tracks: ['fear-of-water'],
      },
      {
        q: 'Who teaches?',
        a: `${full}, Israeli champion, 2017 Maccabiah bronze medalist and B.Ed in Physical Education, together with a team of experienced instructors.`,
      },
    ],
  },

  location: {
    eyebrow: 'Location',
    title: 'Givat Ela pool',
    text: 'All lessons take place here. Get directions:',
    waze: 'Navigate with Waze',
    maps: 'Open in Google Maps',
    imageAlt: 'The Givat Ela swimming pool',
  },

  register: {
    title: 'Quick sign-up',
    intro: 'Fill in a few details and the message opens in WhatsApp, ready to send.',
    fields: {
      name: 'Your name',
      track: 'Track',
      trackPlaceholder: 'Choose a track',
      trackNotSure: 'Not sure yet — we’d love to advise',
      age: 'Participant’s age',
      note: 'Anything we should know?',
      optional: 'optional',
    },
    errors: {
      name: 'Enter your name',
      track: 'Choose a track, or “Not sure yet”',
      age: 'Enter an age in numbers, for example 6',
    },
    privacy: 'Your details aren’t stored on this site — they go straight into your WhatsApp message.',
    direct: 'Or reach us directly',
    message: {
      greeting: 'Hi KAYA SWIM! 👋',
      intro: 'I’d like to sign up or get details:',
      name: 'Name',
      track: 'Track',
      age: 'Participant’s age',
      note: 'Note',
    },
  },

  footer: {
    tagline: 'A boutique center for swimming and water excellence, led by an Israeli champion.',
    navTitle: 'On this site',
    contactTitle: 'Contact',
    rights: 'All rights reserved',
    accessibility: 'Accessibility statement',
  },

  a11yMenu: {
    open: 'Accessibility menu',
    title: 'Accessibility',
    textSize: 'Text size',
    sizes: ['Default', 'Large', 'Larger'],
    contrast: 'High contrast',
    motion: 'Stop animations',
    links: 'Highlight links',
    reset: 'Reset settings',
    statement: 'Accessibility statement',
    close: 'Close',
  },

  a11yStatement: {
    meta: {
      title: 'Accessibility statement | KAYA SWIM',
      description: 'The KAYA SWIM accessibility statement: accessibility features on the site, how to use the accessibility menu, and who to contact about accessibility.',
    },
    title: 'Accessibility statement',
    updatedLabel: 'Last updated',
    intro: [
      'At KAYA SWIM we believe water — and websites — should be accessible to everyone. We work so that everyone can browse the site, find information and contact us comfortably.',
      'The site was built with the aim of meeting the Israeli Equal Rights for Persons with Disabilities (Service Accessibility Adjustments) Regulations, 2013, and Israeli Standard 5568 at level AA, which is based on the WCAG guidelines.',
    ],
    sections: [
      {
        title: 'What we did',
        list: [
          'Semantic structure with hierarchical headings and labeled navigation areas',
          'Full keyboard navigation with a clearly visible focus indicator',
          'A “Skip to main content” link at the top of every page',
          'Color contrast at level AA',
          'Text alternatives for images and icons',
          'Language and text direction set on every page',
          'Forms with field labels and clear error messages',
          'Respect for the operating system’s “reduce motion” setting',
        ],
      },
      {
        title: 'The accessibility menu',
        paragraphs: [
          'The accessibility button sits in the bottom-left corner of every page. The menu lets you enlarge text, turn on high contrast, stop animations and highlight links. Your settings are saved in your browser for your next visit.',
        ],
      },
      { title: 'Accessibility at the pool', pool: true },
      {
        title: 'Known limitations',
        paragraphs: [
          'Despite our efforts, some parts of the site may not yet be fully accessible. If you run into a problem, we’d like to hear about it and fix it.',
        ],
      },
    ],
    poolFallback: 'For details about accessibility arrangements at the Givat Ela pool, contact us by phone or WhatsApp.',
    contactTitle: 'Accessibility contact',
    contactIntro: 'Ran into an accessibility problem or have a suggestion? We’d like to hear it.',
    coordinatorLabel: 'Accessibility coordinator',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
  },

  notFound: {
    title: 'Page not found',
    text: 'The link may be wrong, or the page has moved.',
    home: 'Back to home',
  },

  trackPage: {
    allTracks: 'All tracks',
    forWhom: 'Who it’s for',
    whatYouGet: 'What you get',
    withFounder: `With ${first}`,
    withFounderText: 'Israeli champion and 2017 Maccabiah bronze medalist in the 200 m butterfly, with a B.Ed in Physical Education and hands-on experience in Europe.',
    storyLink: 'Read the full story',
    testimonials: 'What people say',
    faq: 'Questions about this track',
    otherTracks: 'Other tracks',
  },

  tracks: {
    'water-experience': {
      name: 'The Water Experience',
      tagline: 'First steps in the water, with complete confidence',
      pitch: 'Pre-swimming and learn-to-swim lessons for children, in a small, calm group instead of a crowded public pool. Every child gets full personal attention.',
      benefits: ['Maximum safety in every lesson', 'Small groups, never crowded', '100% personal attention', 'A video and feedback for parents after the lesson'],
      forWhom: [
        'Children aged 4–10 taking their first steps in the water',
        'Kids who want to learn to swim properly, from the basics',
        'Parents who want maximum safety and personal attention, not a crowded public pool',
      ],
      whatYouGet: [
        'Pre-swimming and gradual learn-to-swim lessons',
        'A small group with full personal attention for every child',
        'A home-like atmosphere that builds confidence and independence',
        'Digital documentation and a lesson video straight to your phone',
      ],
      whatsapp: 'Hi! I’d love to hear more about The Water Experience (ages 4–10) 🙂',
      imageAlt: 'A Water Experience lesson',
      meta: {
        title: 'The Water Experience — swimming lessons for ages 4–10 | KAYA SWIM',
        description: `Pre-swimming and learn-to-swim lessons for children aged 4–10 at the Givat Ela pool: small groups, maximum safety and full personal attention, led by Israeli champion ${full}.`,
      },
    },
    excellence: {
      name: 'Swimming Excellence Center',
      tagline: 'Professional coaching from a champion, for swimmers aiming high',
      pitch: 'For competitive swimmers and anyone who wants to sharpen their technique. Train with an Israeli champion, get precise video feedback and progress toward real results.',
      benefits: ['Coaching from an Israeli champion', 'Focused technique work', 'Video analysis and real-time feedback', 'Small groups, personal attention'],
      forWhom: [
        'Swimmers aged 10–18 who compete',
        'Swimmers who want better technique and higher achievements',
        'Teens looking for professional coaching from a champion, not just another class',
      ],
      whatYouGet: [
        'Coaching led by an Israeli champion and Maccabiah bronze medalist',
        'Focused technique work',
        'Video documentation and real-time feedback',
        'Academic knowledge in physical education and hands-on experience in Europe',
      ],
      whatsapp: 'Hi! I’d love to hear more about the Swimming Excellence Center (ages 10–18) 🙂',
      imageAlt: 'A training session at the Swimming Excellence Center',
      meta: {
        title: 'Swimming Excellence Center — coaching for ages 10–18 | KAYA SWIM',
        description: `Professional swim coaching for teens aged 10–18 with ${full}, Israeli champion and 2017 Maccabiah bronze medalist: technique work, real-time video feedback and small groups.`,
      },
    },
    'fear-of-water': {
      name: 'Overcoming Fear of Water',
      tagline: 'Get closer to the water at your own pace',
      pitch: 'Emotional support and gradual water adaptation in a protected, discreet setting. Patient, gentle and pressure-free, for every age.',
      benefits: ['A protected, discreet setting', 'Patience and gentle emotional support', 'Gradual adaptation to the water', 'For children and adults'],
      forWhom: [
        'Children and adults who are afraid of the water, from age 4 to 90',
        'Anyone who had a bad experience in the water and wants to feel safe again',
        'People looking for a patient, discreet approach, away from a crowded pool',
      ],
      whatYouGet: [
        'Emotional support and step-by-step water adaptation',
        'A protected, quiet and discreet setting',
        'Patience and gentle emotional support all the way',
        'Progress at your own pace, without pressure',
      ],
      whatsapp: 'Hi, I’d like to hear more about the fear-of-water sessions.',
      imageAlt: 'A fear-of-water session',
      meta: {
        title: 'Overcoming fear of water — for children and adults | KAYA SWIM',
        description: 'Fear-of-water sessions for every age, from 4 to 90: emotional support and gradual water adaptation in a protected, discreet setting, with patience and care. At the Givat Ela pool.',
      },
    },
  },
};

export default en;
