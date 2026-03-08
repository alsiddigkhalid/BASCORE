import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Zap, 
  Settings, 
  Users, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  Globe, 
  Smartphone,
  Lock,
  Network,
  Cable,
  Activity,
  Wifi,
  Phone,
  Languages
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AuthModal } from './components/Auth';
import { Dashboard } from './components/Dashboard';

// --- Service Pages ---
import StructuredCabling from './pages/services/StructuredCabling';
import FiberOptics from './pages/services/FiberOptics';
import WirelessCommunication from './pages/services/WirelessCommunication';
import ELVSystems from './pages/services/ELVSystems';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// --- Translations ---

const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      contact: 'Contact',
      getStarted: 'Get Started',
      login: 'Login',
    },
    consultation: {
      title: 'Book Your Free Consultation',
      subtitle: 'Speak with one of BASCORE\'s experts today.',
      name: 'Full Name',
      phone: 'Contact Number',
      email: 'Email Address',
      company: 'Company Name',
      inquiry: 'Your Inquiry',
      send: 'Send Request',
      success: 'Thank you! Your request has been sent. We will contact you soon.',
      error: 'Something went wrong. Please try again later.',
      validation: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        minLength: 'Must be at least {min} characters'
      }
    },
    contact: {
      title: 'Contact Our Team',
      subtitle: 'Have a specific question? Reach out to us directly.',
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Your Message',
      send: 'Send Message',
      success: 'Message sent successfully! We will get back to you shortly.',
      error: 'Failed to send message. Please try again.'
    },
    hero: {
      badge: 'Telecom & ELV System Integration in UAE',
      title: 'Bespoke Connectivity',
      titlePrefix: 'Solutions for ',
      words: ['Support', 'Security', 'Services'],
      desc: 'At BASCORE, we specialize in delivering bespoke structured cabling, fiber optic, and wireless communication solutions to meet the diverse needs of businesses across the UAE.',
      getStarted: 'Get Started',
      discover: 'Discover Our Services',
    },
    trust: 'Trusted Provider of Telecom & ELV Systems in the UAE',
    trustItems: ['Fiber Optic', 'Wireless', 'Cabling', 'ELV Systems', 'Telecom', 'Infrastructure'],
    why: {
      title: 'Why Choose BASCORE?',
      desc: 'We combine over 20 years of industry experience with the latest technologies to deliver exceptional telecom and ELV systems.',
      cards: [
        {
          title: '20+ Years Experience',
          desc: 'Benefit from two decades of industry expertise, ensuring we deliver solutions that meet international standards.',
        },
        {
          title: 'Customizable Solutions',
          desc: 'Our services are bespoke, allowing us to meet the distinct requirements of your business environment.',
        },
        {
          title: 'Eco-Friendly',
          desc: 'We prioritize sustainable solutions, ensuring that our projects are environmentally responsible.',
        }
      ]
    },
    services: {
      title: 'Our Comprehensive Services',
      desc: 'Discover our range of telecom and ELV system integration services, crafted to enhance your operational efficiency and connectivity.',
      viewAll: 'View all services',
      items: [
        {
          title: 'Structured Cabling',
          desc: 'High-performance data and voice cabling solutions designed for reliability and future scalability.',
          features: ['Cat6/Cat6A Cabling', 'Data Center Cabling', 'Testing & Certification', 'Cable Management'],
        },
        {
          title: 'Fiber Optic Solutions',
          desc: 'Advanced fiber optic installations for high-speed, long-distance data transmission.',
          features: ['Splicing & Termination', 'Backbone Cabling', 'OTDR Testing', 'Fiber to the Desk'],
        },
        {
          title: 'Wireless Communication',
          desc: 'Robust wireless networks providing seamless connectivity across your entire business premises.',
          features: ['Wi-Fi 6 Solutions', 'Point-to-Point Links', 'Wireless Site Surveys', 'Outdoor Wireless'],
        },
        {
          title: 'ELV Systems',
          desc: 'Integrated Extra Low Voltage systems for security, safety, and building automation.',
          features: ['CCTV & Surveillance', 'Access Control', 'Public Address', 'SMATV & IPTV'],
        }
      ],
      learnMore: 'Discover More'
    },
    portfolio: {
      badge: 'Our Portfolio',
      title: 'Transforming the Telecom Landscape',
      desc: 'Showcasing our projects and successful implementations of ELV systems and telecom infrastructure across the UAE.',
      items: [
        { title: 'Enterprise ELV Systems' },
        { title: 'Smart Building Connectivity' },
        { title: 'Industrial Fiber Networks' },
        { title: 'Hospitality Telecom' }
      ]
    },
    stats: {
      title: 'Excellence in Connectivity',
      desc: 'Our journey, mission, and what makes us unique in the UAE market.',
      items: [
        { label: 'Experience', value: '20+', sub: 'Years' },
        { label: 'Projects Done', value: '500+', sub: 'Successful' },
        { label: 'Client Satisfaction', value: '100%', sub: 'Guaranteed' },
        { label: 'UAE Coverage', value: '7', sub: 'Emirates' }
      ]
    },
    cta: {
      title: 'Ready to enhance your connectivity?',
      desc: "Reach out to us for inquiries or consultation requests. Let's build the future of your business infrastructure together.",
      btn1: 'Get a Free Consultation',
      btn2: 'Contact Our Team'
    },
    footer: {
      desc: 'BASCORE is committed to transforming the telecom and ELV landscape in the UAE with innovative solutions.',
      sections: [
        {
          title: 'Services',
          links: ['Structured Cabling', 'Fiber Optics', 'Wireless Communication', 'ELV Systems']
        },
        {
          title: 'Company',
          links: ['Home', 'About Us', 'Portfolio', 'Contact']
        },
        {
          title: 'Contact',
          links: ['UAE, Dubai', 'UAE, Abu Dhabi', 'info@bascore.ae', 'www.bascore.ae']
        }
      ],
      rights: '© 2025 BASCORE. All rights reserved.',
      legal: ['Privacy Policy', 'Terms of Service', 'Security Policy']
    },
    clients: {
      title: 'Our Clients',
      desc: 'We are proud to have worked with some of the leading businesses and organizations in the UAE.',
      items: [
        { name: 'Dubai Mall', logo: 'https://picsum.photos/seed/tech-mall/160/80' },
        { name: 'Etisalat', logo: 'https://picsum.photos/seed/telecom-etisalat/160/80' },
        { name: 'Emaar', logo: 'https://picsum.photos/seed/smart-city-emaar/160/80' },
        { name: 'ADNOC', logo: 'https://picsum.photos/seed/industrial-tech/160/80' },
        { name: 'Dubai Airport', logo: 'https://picsum.photos/seed/aviation-tech/160/80' },
        { name: 'Mubadala', logo: 'https://picsum.photos/seed/global-tech/160/80' },
      ]
    },
    aboutSection: {
      badge: 'About BASCORE',
      title: 'Our Journey in Connectivity',
      historyTitle: 'Our History',
      historyDesc: 'Founded over 20 years ago, BASCORE began as a small team of visionary engineers in the UAE. Our journey started with a simple mission: to bridge the gap in high-quality telecom infrastructure. As the UAE transformed into a global hub, we evolved alongside it, mastering the complexities of structured cabling, fiber optics, and ELV systems. Today, we stand as a trusted partner for businesses seeking robust and future-proof connectivity.',
      missionTitle: 'Our Mission',
      missionDesc: 'To empower businesses across the UAE with seamless, high-performance connectivity solutions that drive innovation, enhance efficiency, and build a connected future.',
      valuesTitle: 'Our Values',
      values: [
        { title: 'Integrity', desc: 'We build trust through transparent and ethical business practices.' },
        { title: 'Innovation', desc: 'We stay ahead by adopting the latest technologies and methodologies.' },
        { title: 'Sustainability', desc: 'We prioritize eco-friendly solutions for a greener tomorrow.' },
        { title: 'Excellence', desc: 'We strive for perfection in every project we undertake.' }
      ],
      leadership: {
        title: 'Our Leadership',
        subtitle: 'The visionaries behind BASCORE',
        members: [
          {
            name: 'Askar Bibayev',
            role: 'CEO & Founder',
            image: 'https://picsum.photos/seed/tech-leader-1/600/800'
          },
          {
            name: 'ALSIDDIG MAHMOUD',
            role: 'CTO',
            image: 'https://picsum.photos/seed/tech-leader-2/600/800'
          }
        ]
      }
    },
    serviceDetails: {
      back: 'Back to Home',
      offerings: 'Our Offerings',
      benefits: 'Key Benefits',
      industries: 'Target Industries',
      cabling: {
        title: 'Structured Cabling Solutions',
        desc: 'BASCORE provides end-to-end structured cabling solutions that form the backbone of your business communication. Our designs prioritize scalability, reliability, and international standards.',
        items: [
          { title: 'Cat6 & Cat6A Cabling', desc: 'High-speed copper solutions for modern office environments.' },
          { title: 'Data Center Cabling', desc: 'Optimized rack-to-rack and row-to-row connectivity.' },
          { title: 'Testing & Certification', desc: 'Comprehensive Fluke testing and certification for all installations.' },
          { title: 'Cable Management', desc: 'Neat and organized cable routing for better maintenance and airflow.' }
        ],
        benefits: [
          'Scalability for future growth',
          'Reduced downtime and easier troubleshooting',
          'Improved network performance and reliability',
          'Enhanced aesthetic and organized infrastructure'
        ]
      },
      fiber: {
        title: 'Fiber Optic Solutions',
        desc: 'Experience lightning-fast connectivity with our advanced fiber optic solutions. We specialize in high-speed data transmission for enterprises and industrial environments.',
        items: [
          { title: 'Splicing & Termination', desc: 'Precision fusion splicing for minimal signal loss.' },
          { title: 'Backbone Installations', desc: 'High-capacity fiber backbones for campus and multi-story buildings.' },
          { title: 'OTDR Testing', desc: 'Advanced diagnostics to ensure peak performance and integrity.' },
          { title: 'FTTX Solutions', desc: 'Fiber-to-the-X deployments for residential and commercial complexes.' }
        ],
        benefits: [
          'Immunity to electromagnetic interference',
          'Extremely high bandwidth over long distances',
          'Future-proof technology for decades',
          'Secure data transmission'
        ]
      },
      wireless: {
        title: 'Wireless Communication',
        desc: 'Stay connected anywhere. BASCORE provides robust wireless solutions that ensure seamless connectivity across your entire business premises, from indoor offices to outdoor campuses.',
        items: [
          { title: 'Wi-Fi 6 Solutions', desc: 'High-density wireless networks for modern workspaces.' },
          { title: 'Point-to-Point Links', desc: 'Wireless backbone connectivity between distant locations.' },
          { title: 'Wireless Site Surveys', desc: 'Detailed heatmaps and signal analysis for optimal coverage.' },
          { title: 'Outdoor Wireless', desc: 'Ruggedized wireless solutions for campuses and public spaces.' }
        ],
        benefits: [
          'Seamless mobility for employees and visitors',
          'Reduced cabling costs for large areas',
          'Scalable coverage with mesh technology',
          'High-speed connectivity without physical constraints'
        ]
      },
      elv: {
        title: 'ELV Systems Integration',
        desc: 'Extra Low Voltage (ELV) systems are the intelligence of modern buildings. BASCORE integrates security, communication, and safety systems into a unified, easy-to-manage infrastructure.',
        items: [
          { title: 'CCTV & Surveillance', desc: 'IP-based high-definition security cameras and monitoring.' },
          { title: 'Access Control', desc: 'Biometric and card-based entry management systems.' },
          { title: 'Public Address (PA/GA)', desc: 'Clear and reliable audio distribution for announcements.' },
          { title: 'SMATV & IPTV', desc: 'Centralized television and media distribution for hospitality.' }
        ],
        benefits: [
          'Enhanced security and asset protection',
          'Centralized management of building systems',
          'Seamless integration with network infrastructure',
          'Improved safety for occupants and visitors'
        ]
      }
    },
    dashboard: {
      staffPortal: 'Staff Support Portal',
      customerPortal: 'Customer Support Portal',
      totalTickets: 'Total Tickets',
      pending: 'Pending',
      resolved: 'Resolved',
      navDashboard: 'Dashboard',
      navChat: 'Internal Chat',
      navTeam: 'Team Members',
      navSecurity: 'Security',
      navLogout: 'Logout',
      searchPlaceholder: 'Search tickets...',
      filterAll: 'All Tickets',
      filterOpen: 'Open',
      filterPending: 'Pending',
      filterResolved: 'Resolved',
      filterClosed: 'Closed',
      sortNewest: 'Newest First',
      sortOldest: 'Oldest First',
      sortPriority: 'Priority',
      tableTicket: 'Ticket',
      tableStatus: 'Status',
      tablePriority: 'Priority',
      tableAgent: 'Agent',
      tableUpdated: 'Last Updated',
      noTickets: 'No tickets found',
      noTicketsDesc: 'Try adjusting your search or filters',
      noTicketSelected: 'No Ticket Selected',
      selectTicketDesc: 'Select a ticket from the list to view details and start chatting.',
      reportedIssue: 'Reported this issue',
      contactDetails: 'Contact Details',
      customer: 'Customer',
      joined: 'Joined',
      type: 'Type',
      question: 'Question',
      incident: 'Incident',
      problem: 'Problem',
      featureRequest: 'Feature Request',
      agent: 'Agent',
      unassigned: 'Unassigned',
      userManagement: 'User Management',
      createManageAccounts: 'Create and manage staff and customer accounts',
      addUser: 'Add User',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      action: 'Action',
      accessRestricted: 'Access Restricted',
      authorizedPersonnel: 'This section is only available for authorized BASCORE personnel.',
      openNewTicket: 'Open New Support Ticket',
      issueTitle: 'Issue Title',
      issueTitlePlaceholder: 'e.g., Network connectivity issue in Office A',
      category: 'Category',
      catNetwork: 'Network',
      catFiber: 'Fiber Optic',
      catELV: 'ELV Systems',
      catWireless: 'Wireless',
      catCabling: 'Cabling',
      catOther: 'Other',
      priority: 'Priority',
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      urgent: 'Urgent',
      assignAgent: 'Assign Agent (Optional)',
      autoAssign: 'Auto-assign random agent',
      description: 'Description',
      descriptionPlaceholder: 'Please describe the issue in detail...',
      submitTicket: 'Submit Ticket',
      createNewUser: 'Create New User',
      fullName: 'Full Name',
      emailAddress: 'Email Address',
      password: 'Password',
      roleCustomer: 'Customer',
      roleStaff: 'Staff',
      roleAdmin: 'Admin',
      createUser: 'Create User'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'من نحن',
      services: 'خدماتنا',
      contact: 'اتصل بنا',
      getStarted: 'ابدأ الآن',
      login: 'تسجيل الدخول',
    },
    consultation: {
      title: 'احجز استشارتك المجانية',
      subtitle: 'تحدث مع أحد خبراء باسكور اليوم.',
      name: 'الاسم الكامل',
      phone: 'رقم الاتصال',
      email: 'البريد الإلكتروني',
      company: 'اسم الشركة',
      inquiry: 'استفسارك',
      send: 'إرسال الطلب',
      success: 'شكراً لك! تم إرسال طلبك. سنتواصل معك قريباً.',
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.',
      validation: {
        required: 'هذا الحقل مطلوب',
        email: 'يرجى إدخال بريد إلكتروني صحيح',
        phone: 'يرجى إدخال رقم هاتف صحيح',
        minLength: 'يجب أن يكون {min} أحرف على الأقل'
      }
    },
    contact: {
      title: 'اتصل بفريقنا',
      subtitle: 'هل لديك سؤال محدد؟ تواصل معنا مباشرة.',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      subject: 'الموضوع',
      message: 'رسالتك',
      send: 'إرسال الرسالة',
      success: 'تم إرسال الرسالة بنجاح! سنقوم بالرد عليك قريباً.',
      error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.'
    },
    hero: {
      badge: 'تكامل أنظمة الاتصالات و ELV في الإمارات',
      title: 'حلول اتصال مخصصة',
      titlePrefix: 'لـ ',
      words: ['دعم', 'أمن', 'خدمات'],
      desc: 'في BASCORE، نحن متخصصون في تقديم حلول مخصصة للكابلات الهيكلية، والألياف الضوئية، وحلول الاتصالات اللاسلكية لتلبية الاحتياجات المتنوعة للشركات في جميع أنحاء الإمارات.',
      getStarted: 'ابدأ الآن',
      discover: 'اكتشف خدماتنا',
    },
    trust: 'مزود موثوق لأنظمة الاتصالات و ELV في الإمارات',
    trustItems: ['الألياف الضوئية', 'اللاسلكي', 'الكابلات', 'أنظمة ELV', 'الاتصالات', 'البنية التحتية'],
    why: {
      title: 'لماذا تختار BASCORE؟',
      desc: 'نحن نجمع بين أكثر من 20 عاماً من الخبرة في الصناعة مع أحدث التقنيات لتقديم أنظمة اتصالات و ELV استثنائية.',
      cards: [
        {
          title: '20+ عاماً من الخبرة',
          desc: 'استفد من عقدين من الخبرة في الصناعة، مما يضمن تقديم حلول تلبي المعايير الدولية.',
        },
        {
          title: 'حلول قابلة للتخصيص',
          desc: 'خدماتنا مخصصة، مما يسمح لنا بتلبية المتطلبات المتميزة لبيئة عملك.',
        },
        {
          title: 'صديقة للبيئة',
          desc: 'نحن نعطي الأولوية للحلول المستدامة، مما يضمن أن مشاريعنا مسؤولة بيئياً.',
        }
      ]
    },
    services: {
      title: 'خدماتنا الشاملة',
      desc: 'اكتشف مجموعتنا الواسعة من خدمات تكامل أنظمة الاتصالات و ELV، المصممة لتعزيز كفاءتك التشغيلية واتصالك.',
      viewAll: 'عرض جميع الخدمات',
      items: [
        {
          title: 'الكابلات الهيكلية',
          desc: 'حلول كابلات البيانات والصوت عالية الأداء المصممة للموثوقية وقابلية التوسع في المستقبل.',
          features: ['كابلات Cat6/Cat6A', 'كابلات مراكز البيانات', 'الاختبار والاعتماد', 'إدارة الكابلات'],
        },
        {
          title: 'حلول الألياف الضوئية',
          desc: 'تركيبات ألياف ضوئية متقدمة لنقل البيانات بسرعة عالية ولمسافات طويلة.',
          features: ['اللحام والإنهاء', 'كابلات العمود الفقري', 'اختبار OTDR', 'الألياف إلى المكتب'],
        },
        {
          title: 'الاتصالات اللاسلكية',
          desc: 'شبكات لاسلكية قوية توفر اتصالاً سلساً عبر كامل مقر عملك.',
          features: ['حلول Wi-Fi 6', 'روابط النقطة إلى النقطة', 'مسوحات الموقع اللاسلكي', 'اللاسلكي الخارجي'],
        },
        {
          title: 'أنظمة ELV',
          desc: 'أنظمة الجهد المنخفض الإضافي المتكاملة للأمن والسلامة وأتمتة المباني.',
          features: ['كاميرات المراقبة', 'أنظمة التحكم في الدخول', 'أنظمة النداء العام', 'أنظمة التلفزيون المركزي'],
        }
      ],
      learnMore: 'اكتشف المزيد'
    },
    portfolio: {
      badge: 'أعمالنا',
      title: 'تحويل مشهد الاتصالات',
      desc: 'عرض مشاريعنا والتنفيذ الناجح لأنظمة ELV والبنية التحتية للاتصالات في جميع أنحاء الإمارات.',
      items: [
        { title: 'أنظمة ELV للمؤسسات' },
        { title: 'اتصال المباني الذكية' },
        { title: 'شبكات الألياف الصناعية' },
        { title: 'اتصالات الضيافة' }
      ]
    },
    stats: {
      title: 'التميز في الاتصال',
      desc: 'رحلتنا، مهمتنا، وما يجعلنا فريدين في سوق الإمارات.',
      items: [
        { label: 'خبرة', value: '+20', sub: 'عاماً' },
        { label: 'مشاريع منجزة', value: '+500', sub: 'ناجحة' },
        { label: 'رضا العملاء', value: '100%', sub: 'مضمون' },
        { label: 'تغطية الإمارات', value: '7', sub: 'إمارات' }
      ]
    },
    cta: {
      title: 'هل أنت جاهز لتعزيز اتصالك؟',
      desc: 'تواصل معنا للاستفسارات أو طلبات الاستشارة. لنبني مستقبل البنية التحتية لأعمالك معاً.',
      btn1: 'احصل على استشارة مجانية',
      btn2: 'اتصل بفريقنا'
    },
    footer: {
      desc: 'تلتزم BASCORE بتحويل مشهد الاتصالات و ELV في الإمارات من خلال حلول مبتكرة.',
      sections: [
        {
          title: 'الخدمات',
          links: ['الكابلات الهيكلية', 'الألياف الضوئية', 'الاتصالات اللاسلكية', 'أنظمة ELV']
        },
        {
          title: 'الشركة',
          links: ['الرئيسية', 'من نحن', 'أعمالنا', 'اتصل بنا']
        },
        {
          title: 'اتصال',
          links: ['الإمارات، دبي', 'الإمارات، أبوظبي', 'info@bascore.ae', 'www.bascore.ae']
        }
      ],
      rights: '© 2025 BASCORE. جميع الحقوق محفوظة.',
      legal: ['سياسة الخصوصية', 'شروط الخدمة', 'سياسة الأمن']
    },
    clients: {
      title: 'عملاؤنا',
      desc: 'نحن فخورون بالعمل مع بعض الشركات والمؤسسات الرائدة في دولة الإمارات العربية المتحدة.',
      items: [
        { name: 'دبي مول', logo: 'https://picsum.photos/seed/tech-mall/160/80' },
        { name: 'اتصالات', logo: 'https://picsum.photos/seed/telecom-etisalat/160/80' },
        { name: 'إعمار', logo: 'https://picsum.photos/seed/smart-city-emaar/160/80' },
        { name: 'أدنوك', logo: 'https://picsum.photos/seed/industrial-tech/160/80' },
        { name: 'مطار دبي', logo: 'https://picsum.photos/seed/aviation-tech/160/80' },
        { name: 'مبادلة', logo: 'https://picsum.photos/seed/global-tech/160/80' },
      ]
    },
    aboutSection: {
      badge: 'حول BASCORE',
      title: 'رحلتنا في عالم الاتصال',
      historyTitle: 'تاريخنا',
      historyDesc: 'تأسست BASCORE منذ أكثر من 20 عاماً، وبدأت كفريق صغير من المهندسين ذوي الرؤية في دولة الإمارات. بدأت رحلتنا بمهمة بسيطة: سد الفجوة في البنية التحتية للاتصالات عالية الجودة. مع تحول الإمارات إلى مركز عالمي، تطورنا جنباً إلى جنب معها، وأتقنا تعقيدات الكابلات الهيكلية والألياف الضوئية وأنظمة ELV. اليوم، نقف كشريك موثوق للشركات التي تبحث عن اتصال قوي ومواكب للمستقبل.',
      missionTitle: 'مهمتنا',
      missionDesc: 'تمكين الشركات في جميع أنحاء الإمارات من خلال حلول اتصال سلسة وعالية الأداء تدفع الابتكار وتعزز الكفاءة وتبني مستقبلاً متصلاً.',
      valuesTitle: 'قيمنا',
      values: [
        { title: 'النزاهة', desc: 'نبني الثقة من خلال ممارسات تجارية شفافة وأخلاقية.' },
        { title: 'الابتكار', desc: 'نبقى في الطليعة من خلال اعتماد أحدث التقنيات والمنهجيات.' },
        { title: 'الاستدامة', desc: 'نعطي الأولوية للحلول الصديقة للبيئة من أجل غد أكثر خضرة.' },
        { title: 'التميز', desc: 'نسعى جاهدين للكمال في كل مشروع نقوم به.' }
      ],
      leadership: {
        title: 'قيادتنا',
        subtitle: 'المبدعون وراء BASCORE',
        members: [
          {
            name: 'Askar Bibayev',
            role: 'الرئيس التنفيذي والمؤسس',
            image: 'https://instagram.fdxb3-3.fna.fbcdn.net/v/t51.82787-15/625122385_18187558837360796_5965981383787006934_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzIwMTg0NzExNjM2NjQ4OTA4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=UrfOXg252wcQ7kNvwFLm10c&_nc_oc=Adkx7DxB0u8jHR1OLpm2xdyTsL5gfNnNTRLQ-6rOHJktm4uUy2L4JaXsDv2JmO8YrDg1ivWpjXsL6H_sgI6X4637&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fdxb3-3.fna&_nc_gid=cIyJ3KR2Mz62WQJrX0EQgA&_nc_ss=8&oh=00_AfwUqK1rF0PIa3N3uD0zNCtN2VSjgTuRyn-YkYMp1JFLjw&oe=69B3459F'
          },
          {
            name: 'ALSIDDIG MAHMOUD',
            role: 'المدير التقني',
            image: 'https://scontent.fdxb3-3.fna.fbcdn.net/v/t39.30808-6/465702844_27727947166819133_4779844027167601342_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ca4fef&_nc_ohc=mHkRI5eGUukQ7kNvwHMxHOa&_nc_oc=AdmsUfxNafQBO3MRFjx_LYXEEw1icdyZrm1dqjR9ZRcDB5G1RDEGO7lBSUK1hygMcBsnNPBDENg9He-SQVAhtWHt&_nc_zt=23&_nc_ht=scontent.fdxb3-3.fna&_nc_gid=GBSAPfxLiP81oL71Ui1FTg&_nc_ss=8&oh=00_AfyNLvbCJ3B_WenctFhrX6kU-DyZBcS06C_IqqXQYoFXqQ&oe=69B32629'
          }
        ]
      }
    },
    serviceDetails: {
      back: 'العودة للرئيسية',
      offerings: 'خدماتنا',
      benefits: 'المزايا الرئيسية',
      industries: 'الصناعات المستهدفة',
      cabling: {
        title: 'حلول الكابلات الهيكلية',
        desc: 'توفر BASCORE حلول كابلات هيكلية متكاملة تشكل العمود الفقري لاتصالات عملك. تصاميمنا تعطي الأولوية لقابلية التوسع والموثوقية والمعايير الدولية.',
        items: [
          { title: 'كابلات Cat6 و Cat6A', desc: 'حلول نحاسية عالية السرعة لبيئات المكاتب الحديثة.' },
          { title: 'كابلات مراكز البيانات', desc: 'اتصال محسن بين الرفوف والصفوف.' },
          { title: 'الاختبار والاعتماد', desc: 'اختبار Fluke شامل واعتماد لجميع التركيبات.' },
          { title: 'إدارة الكابلات', desc: 'توجيه كابلات مرتب ومنظم لصيانة وتدفق هواء أفضل.' }
        ],
        benefits: [
          'قابلة للتوسع للنمو المستقبلي',
          'تقليل وقت التوقف وسهولة استكشاف الأخطاء وإصلاحها',
          'تحسين أداء الشبكة وموثوقيتها',
          'تحسين المظهر الجمالي والبنية التحتية المنظمة'
        ]
      },
      fiber: {
        title: 'حلول الألياف الضوئية',
        desc: 'استمتع باتصال فائق السرعة مع حلول الألياف الضوئية المتقدمة لدينا. نحن متخصصون في نقل البيانات عالي السرعة للمؤسسات والبيئات الصناعية.',
        items: [
          { title: 'اللحام والإنهاء', desc: 'لحام انصهار دقيق لتقليل فقدان الإشارة.' },
          { title: 'تركيبات العمود الفقري', desc: 'أعمدة فقرية من الألياف عالية السعة للمجمعات والمباني متعددة الطوابق.' },
          { title: 'اختبار OTDR', desc: 'تشخيصات متقدمة لضمان ذروة الأداء والنزاهة.' },
          { title: 'حلول FTTX', desc: 'نشر الألياف إلى المواقع المختلفة للمجمعات السكنية والتجارية.' }
        ],
        benefits: [
          'حصانة ضد التداخل الكهرومغناطيسي',
          'نطاق ترددي عالٍ جداً عبر مسافات طويلة',
          'تكنولوجيا جاهزة للمستقبل لعقود',
          'نقل بيانات آمن'
        ]
      },
      wireless: {
        title: 'الاتصالات اللاسلكية',
        desc: 'ابق على اتصال في أي مكان. توفر BASCORE حلولاً لاسلكية قوية تضمن اتصالاً سلساً عبر كامل مقر عملك، من المكاتب الداخلية إلى المجمعات الخارجية.',
        items: [
          { title: 'حلول Wi-Fi 6', desc: 'شبكات لاسلكية عالية الكثافة لمساحات العمل الحديثة.' },
          { title: 'روابط النقطة إلى النقطة', desc: 'اتصال العمود الفقري اللاسلكي بين المواقع البعيدة.' },
          { title: 'مسوحات الموقع اللاسلكي', desc: 'خرائط حرارية مفصلة وتحليل الإشارة للتغطية المثلى.' },
          { title: 'اللاسلكي الخارجي', desc: 'حلول لاسلكية قوية للمجمعات والمساحات العامة.' }
        ],
        benefits: [
          'تنقل سلس للموظفين والزوار',
          'تقليل تكاليف الكابلات للمساحات الكبيرة',
          'تغطية قابلة للتوسع مع تقنية Mesh',
          'اتصال عالي السرعة بدون قيود مادية'
        ]
      },
      elv: {
        title: 'تكامل أنظمة ELV',
        desc: 'أنظمة الجهد المنخفض الإضافي (ELV) هي ذكاء المباني الحديثة. تدمج BASCORE أنظمة الأمن والاتصالات والسلامة في بنية تحتية موحدة وسهلة الإدارة.',
        items: [
          { title: 'كاميرات المراقبة', desc: 'كاميرات أمنية عالية الدقة تعتمد على IP والمراقبة.' },
          { title: 'التحكم في الدخول', desc: 'أنظمة إدارة الدخول القائمة على القياسات الحيوية والبطاقات.' },
          { title: 'النداء العام (PA/GA)', desc: 'توزيع صوتي واضح وموثوق للإعلانات.' },
          { title: 'SMATV و IPTV', desc: 'توزيع مركزي للتلفزيون والوسائط لقطاع الضيافة.' }
        ],
        benefits: [
          'تعزيز الأمن وحماية الأصول',
          'إدارة مركزية لأنظمة المباني',
          'تكامل سلس مع البنية التحتية للشبكة',
          'تحسين السلامة للشاغلين والزوار'
        ]
      }
    },
    dashboard: {
      staffPortal: 'بوابة دعم الموظفين',
      customerPortal: 'بوابة دعم العملاء',
      totalTickets: 'إجمالي التذاكر',
      pending: 'قيد الانتظار',
      resolved: 'تم الحل',
      navDashboard: 'لوحة التحكم',
      navChat: 'الدردشة الداخلية',
      navTeam: 'أعضاء الفريق',
      navSecurity: 'الأمان',
      navLogout: 'تسجيل الخروج',
      searchPlaceholder: 'البحث في التذاكر...',
      filterAll: 'جميع التذاكر',
      filterOpen: 'مفتوحة',
      filterPending: 'قيد الانتظار',
      filterResolved: 'تم الحل',
      filterClosed: 'مغلقة',
      sortNewest: 'الأحدث أولاً',
      sortOldest: 'الأقدم أولاً',
      sortPriority: 'الأولوية',
      tableTicket: 'التذكرة',
      tableStatus: 'الحالة',
      tablePriority: 'الأولوية',
      tableAgent: 'الوكيل',
      tableUpdated: 'آخر تحديث',
      noTickets: 'لم يتم العثور على تذاكر',
      noTicketsDesc: 'حاول تعديل البحث أو الفلاتر',
      noTicketSelected: 'لم يتم اختيار تذكرة',
      selectTicketDesc: 'اختر تذكرة من القائمة لعرض التفاصيل وبدء الدردشة.',
      reportedIssue: 'أبلغ عن هذه المشكلة',
      contactDetails: 'تفاصيل الاتصال',
      customer: 'عميل',
      joined: 'انضم',
      type: 'النوع',
      question: 'سؤال',
      incident: 'حادثة',
      problem: 'مشكلة',
      featureRequest: 'طلب ميزة',
      agent: 'الوكيل',
      unassigned: 'غير معين',
      userManagement: 'إدارة المستخدمين',
      createManageAccounts: 'إنشاء وإدارة حسابات الموظفين والعملاء',
      addUser: 'إضافة مستخدم',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      role: 'الدور',
      action: 'الإجراء',
      accessRestricted: 'الوصول مقيد',
      authorizedPersonnel: 'هذا القسم متاح فقط لموظفي باسكور المصرح لهم.',
      openNewTicket: 'فتح تذكرة دعم جديدة',
      issueTitle: 'عنوان المشكلة',
      issueTitlePlaceholder: 'مثال: مشكلة في اتصال الشبكة في المكتب أ',
      category: 'الفئة',
      catNetwork: 'شبكة',
      catFiber: 'ألياف ضوئية',
      catELV: 'أنظمة ELV',
      catWireless: 'لاسلكي',
      catCabling: 'كابلات',
      catOther: 'أخرى',
      priority: 'الأولوية',
      low: 'منخفضة',
      medium: 'متوسطة',
      high: 'عالية',
      urgent: 'عاجلة',
      assignAgent: 'تعيين وكيل (اختياري)',
      autoAssign: 'تعيين وكيل عشوائياً تلقائياً',
      description: 'الوصف',
      descriptionPlaceholder: 'يرجى وصف المشكلة بالتفصيل...',
      submitTicket: 'إرسال التذكرة',
      createNewUser: 'إنشاء مستخدم جديد',
      fullName: 'الاسم الكامل',
      emailAddress: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      roleCustomer: 'عميل',
      roleStaff: 'موظف',
      roleAdmin: 'مسؤول',
      createUser: 'إنشاء مستخدم'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      about: 'О нас',
      services: 'Услуги',
      contact: 'Контакты',
      getStarted: 'Начать',
      login: 'Войти',
    },
    consultation: {
      title: 'Закажите бесплатную консультацию',
      subtitle: 'Поговорите с экспертом BASCORE сегодня.',
      name: 'Полное имя',
      phone: 'Контактный телефон',
      email: 'Электронная почта',
      company: 'Название компании',
      inquiry: 'Ваш запрос',
      send: 'Отправить запрос',
      success: 'Спасибо! Ваш запрос отправлен. Мы свяжемся с вами в ближайшее время.',
      error: 'Что-то пошло не так. Пожалуйста, попробуйте позже.',
      validation: {
        required: 'Это поле обязательно',
        email: 'Введите корректный email',
        phone: 'Введите корректный номер телефона',
        minLength: 'Минимум {min} символов'
      }
    },
    contact: {
      title: 'Связаться с нашей командой',
      subtitle: 'У вас есть конкретный вопрос? Свяжитесь с нами напрямую.',
      name: 'Полное имя',
      email: 'Электронная почта',
      subject: 'Тема',
      message: 'Ваше сообщение',
      send: 'Отправить сообщение',
      success: 'Сообщение успешно отправлено! Мы скоро ответим.',
      error: 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.'
    },
    hero: {
      badge: 'Интеграция телекоммуникаций и ELV-систем в ОАЭ',
      title: 'Индивидуальные решения для связи',
      titlePrefix: 'Для ',
      words: ['Поддержки', 'Безопасности', 'Сервиса'],
      desc: 'В BASCORE мы специализируемся на предоставлении индивидуальных решений для структурированных кабельных систем, оптоволокна и беспроводной связи для удовлетворения разнообразных потребностей бизнеса по всей территории ОАЭ.',
      getStarted: 'Начать',
      discover: 'Наши услуги',
    },
    trust: 'Надежный поставщик телекоммуникационных и ELV-систем в ОАЭ',
    trustItems: ['Оптоволокно', 'Беспроводная связь', 'Кабельные системы', 'ELV-системы', 'Телекоммуникации', 'Инфраструктура'],
    why: {
      title: 'Почему выбирают BASCORE?',
      desc: 'Мы сочетаем более 20 лет опыта в отрасли с новейшими технологиями для предоставления исключительных телекоммуникационных и ELV-систем.',
      cards: [
        {
          title: '20+ лет опыта',
          desc: 'Воспользуйтесь двумя десятилетиями опыта в отрасли, гарантирующими решения, соответствующие международным стандартам.',
        },
        {
          title: 'Настраиваемые решения',
          desc: 'Наши услуги адаптированы под ваши нужды, что позволяет нам соответствовать уникальным требованиям вашей бизнес-среды.',
        },
        {
          title: 'Экологичность',
          desc: 'Мы отдаем приоритет экологически чистым решениям для более зеленого будущего.',
        }
      ]
    },
    services: {
      title: 'Наши комплексные услуги',
      desc: 'Откройте для себя наш широкий спектр услуг по интеграции телекоммуникаций и ELV-систем, разработанных для повышения вашей операционной эффективности и качества связи.',
      viewAll: 'Все услуги',
      items: [
        {
          title: 'Структурированные кабельные системы',
          desc: 'Высокопроизводительные решения для передачи данных и голоса, разработанные для надежности и масштабируемости.',
          features: ['Кабели Cat6/Cat6A', 'Кабельные системы ЦОД', 'Тестирование и сертификация', 'Кабель-менеджмент'],
        },
        {
          title: 'Оптоволоконные решения',
          desc: 'Передовые оптоволоконные инсталляции для высокоскоростной передачи данных на большие расстояния.',
          features: ['Сварка и терминация', 'Магистральные кабели', 'Тестирование OTDR', 'Оптоволокно до офиса'],
        },
        {
          title: 'Беспроводная связь',
          desc: 'Надежные беспроводные сети, обеспечивающие бесперебойную связь на всей территории вашего предприятия.',
          features: ['Решения Wi-Fi 6', 'Радиорелейные линии', 'Обследование объектов', 'Уличный Wi-Fi'],
        },
        {
          title: 'ELV-системы',
          desc: 'Интегрированные системы сверхнизкого напряжения для безопасности и автоматизации зданий.',
          features: ['Видеонаблюдение', 'Контроль доступа', 'Системы оповещения', 'SMATV и IPTV'],
        }
      ],
      learnMore: 'Узнать больше'
    },
    portfolio: {
      badge: 'Наше портфолио',
      title: 'Трансформация ландшафта связи',
      desc: 'Ознакомьтесь с нашими проектами и успешными внедрениями ELV-систем и телекоммуникационной инфраструктуры по всей территории ОАЭ.',
      items: [
        { title: 'Корпоративные ELV-системы' },
        { title: 'Связь для умных зданий' },
        { title: 'Промышленные оптоволоконные сети' },
        { title: 'Связь для гостиничного бизнеса' }
      ]
    },
    stats: {
      title: 'Превосходство в связи',
      desc: 'Наш путь, миссия и то, что делает нас уникальными на рынке ОАЭ.',
      items: [
        { label: 'Опыт', value: '20+', sub: 'Лет' },
        { label: 'Проектов', value: '500+', sub: 'Успешных' },
        { label: 'Довольных клиентов', value: '100%', sub: 'Гарантировано' },
        { label: 'Покрытие ОАЭ', value: '7', sub: 'Эмиратов' }
      ]
    },
    cta: {
      title: 'Готовы улучшить свою связь?',
      desc: 'Свяжитесь с нами для получения консультации. Давайте строить будущее вашей инфраструктуры вместе.',
      btn1: 'Бесплатная консультация',
      btn2: 'Связаться с командой'
    },
    footer: {
      desc: 'BASCORE стремится трансформировать ландшафт телекоммуникаций и ELV в ОАЭ с помощью инновационных решений.',
      sections: [
        {
          title: 'Услуги',
          links: ['Структурированные кабельные системы', 'Оптоволокно', 'Беспроводная связь', 'ELV-системы']
        },
        {
          title: 'Компания',
          links: ['Главная', 'О нас', 'Портфолио', 'Контакты']
        },
        {
          title: 'Контакты',
          links: ['ОАЭ, Дубай', 'ОАЭ, Абу-Даби', 'info@bascore.ae', 'www.bascore.ae']
        }
      ],
      rights: '© 2025 BASCORE. Все права защищены.',
      legal: ['Политика конфиденциальности', 'Условия использования', 'Политика безопасности']
    },
    clients: {
      title: 'Наши клиенты',
      desc: 'Мы гордимся тем, что работаем с ведущими компаниями и организациями в ОАЭ.',
      items: [
        { name: 'Dubai Mall', logo: 'https://picsum.photos/seed/tech-mall/160/80' },
        { name: 'Etisalat', logo: 'https://picsum.photos/seed/telecom-etisalat/160/80' },
        { name: 'Emaar', logo: 'https://picsum.photos/seed/smart-city-emaar/160/80' },
        { name: 'ADNOC', logo: 'https://picsum.photos/seed/industrial-tech/160/80' },
        { name: 'Dubai Airport', logo: 'https://picsum.photos/seed/aviation-tech/160/80' },
        { name: 'Mubadala', logo: 'https://picsum.photos/seed/global-tech/160/80' },
      ]
    },
    aboutSection: {
      badge: 'О BASCORE',
      title: 'Наш путь в области связи',
      historyTitle: 'Наша история',
      historyDesc: 'Основанная более 20 лет назад, компания BASCORE начиналась как небольшая команда инженеров-визионеров в ОАЭ. Наша миссия была проста: восполнить пробел в высококачественной телекоммуникационной инфраструктуре. По мере того как ОАЭ превращались в глобальный центр, мы развивались вместе с ними, осваивая сложности структурированных кабельных систем, оптоволокна и ELV-систем. Сегодня мы являемся надежным партнером для компаний, стремящихся к надежной и перспективной связи.',
      missionTitle: 'Наша миссия',
      missionDesc: 'Предоставлять компаниям по всей территории ОАЭ бесшовные и высокопроизводительные решения для связи, которые стимулируют инновации, повышают эффективность и строят связанное будущее.',
      valuesTitle: 'Наши ценности',
      values: [
        { title: 'Честность', desc: 'Мы строим доверие через прозрачные и этичные методы ведения бизнеса.' },
        { title: 'Инновации', desc: 'Мы остаемся впереди, внедряя новейшие технологии и методологии.' },
        { title: 'Устойчивость', desc: 'Мы отдаем приоритет экологически чистым решениям для лучшего завтра.' },
        { title: 'Превосходство', desc: 'Мы стремимся к совершенству в каждом проекте, за который беремся.' }
      ],
      leadership: {
        title: 'Наше руководство',
        subtitle: 'Визионеры, стоящие за BASCORE',
        members: [
          {
            name: 'Аскар Бибаев',
            role: 'Генеральный директор и основатель',
            image: 'https://picsum.photos/seed/tech-leader-1/600/800'
          },
          {
            name: 'АЛЬСИДДИГ МАХМУД',
            role: 'Технический директор',
            image: 'https://picsum.photos/seed/tech-leader-2/600/800'
          }
        ]
      }
    },
    serviceDetails: {
      back: 'Вернуться на главную',
      offerings: 'Наши предложения',
      benefits: 'Ключевые преимущества',
      industries: 'Целевые отрасли',
      cabling: {
        title: 'Структурированные кабельные решения',
        desc: 'BASCORE предоставляет комплексные решения для структурированных кабельных систем, которые составляют основу ваших бизнес-коммуникаций. Наши проекты ориентированы на масштабируемость, надежность и международные стандарты.',
        items: [
          { title: 'Кабели Cat6 и Cat6A', desc: 'Высокоскоростные медные решения для современных офисов.' },
          { title: 'Кабельные системы ЦОД', desc: 'Оптимизированная связь между стойками и рядами.' },
          { title: 'Тестирование и сертификация', desc: 'Комплексное тестирование Fluke и сертификация всех инсталляций.' },
          { title: 'Кабель-менеджмент', desc: 'Аккуратная прокладка кабелей для лучшего обслуживания и охлаждения.' }
        ],
        benefits: [
          'Масштабируемость для будущего роста',
          'Сокращение времени простоя и упрощение поиска неисправностей',
          'Повышение производительности и надежности сети',
          'Улучшенная эстетика и организованная инфраструктура'
        ]
      },
      fiber: {
        title: 'Оптоволоконные решения',
        desc: 'Оцените молниеносную связь с нашими передовыми оптоволоконными решениями. Мы специализируемся на высокоскоростной передаче данных для предприятий и промышленных объектов.',
        items: [
          { title: 'Сварка и терминация', desc: 'Прецизионная сварка для минимальных потерь сигнала.' },
          { title: 'Магистральные инсталляции', desc: 'Высокоемкие оптоволоконные магистрали для кампусов и многоэтажных зданий.' },
          { title: 'Тестирование OTDR', desc: 'Передовая диагностика для обеспечения максимальной производительности.' },
          { title: 'Решения FTTX', desc: 'Развертывание оптоволокна для жилых и коммерческих комплексов.' }
        ],
        benefits: [
          'Иммунитет к электромагнитным помехам',
          'Чрезвычайно высокая пропускная способность на больших расстояниях',
          'Технология, ориентированная на будущее',
          'Безопасная передача данных'
        ]
      },
      wireless: {
        title: 'Беспроводная связь',
        desc: 'Оставайтесь на связи везде. BASCORE предоставляет надежные беспроводные решения, обеспечивающие бесперебойную связь на всей территории вашего предприятия.',
        items: [
          { title: 'Решения Wi-Fi 6', desc: 'Беспроводные сети высокой плотности для современных рабочих мест.' },
          { title: 'Радиорелейные линии', desc: 'Магистральная беспроводная связь между удаленными объектами.' },
          { title: 'Обследование объектов', desc: 'Детальные тепловые карты и анализ сигналов для оптимального покрытия.' },
          { title: 'Уличный Wi-Fi', desc: 'Защищенные беспроводные решения для кампусов и общественных мест.' }
        ],
        benefits: [
          'Бесшовная мобильность для сотрудников и посетителей',
          'Снижение затрат на кабельную разводку на больших площадях',
          'Масштабируемое покрытие с технологией mesh',
          'Высокоскоростная связь без физических ограничений'
        ]
      },
      elv: {
        title: 'Интеграция ELV-систем',
        desc: 'Системы сверхнизкого напряжения (ELV) — это интеллект современных зданий. BASCORE интегрирует системы безопасности, связи и защиты в единую, простую в управлении инфраструктуру.',
        items: [
          { title: 'Видеонаблюдение', desc: 'IP-камеры высокого разрешения и мониторинг.' },
          { title: 'Контроль доступа', desc: 'Биометрические и карточные системы управления доступом.' },
          { title: 'Системы оповещения (PA/GA)', desc: 'Четкое и надежное распределение аудио для объявлений.' },
          { title: 'SMATV и IPTV', desc: 'Централизованное распределение телевидения и медиа для гостиниц.' }
        ],
        benefits: [
          'Повышенная безопасность и защита активов',
          'Централизованное управление инженерными системами здания',
          'Бесшовная интеграция с сетевой инфраструктурой',
          'Повышение безопасности для жильцов и посетителей'
        ]
      }
    },
    dashboard: {
      staffPortal: 'Портал поддержки персонала',
      customerPortal: 'Портал поддержки клиентов',
      totalTickets: 'Всего тикетов',
      pending: 'В ожидании',
      resolved: 'Решено',
      navDashboard: 'Панель управления',
      navChat: 'Внутренний чат',
      navTeam: 'Команда',
      navSecurity: 'Безопасность',
      navLogout: 'Выйти',
      searchPlaceholder: 'Поиск тикетов...',
      filterAll: 'Все тикеты',
      filterOpen: 'Открытые',
      filterPending: 'В ожидании',
      filterResolved: 'Решенные',
      filterClosed: 'Закрытые',
      sortNewest: 'Сначала новые',
      sortOldest: 'Сначала старые',
      sortPriority: 'По приоритету',
      tableTicket: 'Тикет',
      tableStatus: 'Статус',
      tablePriority: 'Приоритет',
      tableAgent: 'Агент',
      tableUpdated: 'Обновлено',
      noTickets: 'Тикеты не найдены',
      noTicketsDesc: 'Попробуйте изменить параметры поиска или фильтры',
      noTicketSelected: 'Тикет не выбран',
      selectTicketDesc: 'Выберите тикет из списка, чтобы просмотреть детали и начать чат.',
      reportedIssue: 'Сообщил об этой проблеме',
      contactDetails: 'Контактная информация',
      customer: 'Клиент',
      joined: 'Присоединился',
      type: 'Тип',
      question: 'Вопрос',
      incident: 'Инцидент',
      problem: 'Проблема',
      featureRequest: 'Запрос функции',
      agent: 'Агент',
      unassigned: 'Не назначен',
      userManagement: 'Управление пользователями',
      createManageAccounts: 'Создание и управление аккаунтами персонала и клиентов',
      addUser: 'Добавить пользователя',
      name: 'Имя',
      email: 'Email',
      role: 'Роль',
      action: 'Действие',
      accessRestricted: 'Доступ ограничен',
      authorizedPersonnel: 'Этот раздел доступен только для авторизованного персонала BASCORE.',
      openNewTicket: 'Открыть новый тикет поддержки',
      issueTitle: 'Тема проблемы',
      issueTitlePlaceholder: 'например, Проблема с сетью в офисе А',
      category: 'Категория',
      catNetwork: 'Сеть',
      catFiber: 'Оптоволокно',
      catELV: 'ELV-системы',
      catWireless: 'Беспроводная связь',
      catCabling: 'Кабельные системы',
      catOther: 'Другое',
      priority: 'Приоритет',
      low: 'Низкий',
      medium: 'Средний',
      high: 'Высокий',
      urgent: 'Срочный',
      assignAgent: 'Назначить агента (опционально)',
      autoAssign: 'Автоматическое назначение',
      description: 'Описание',
      descriptionPlaceholder: 'Пожалуйста, опишите проблему подробно...',
      submitTicket: 'Отправить тикет',
      createNewUser: 'Создать нового пользователя',
      fullName: 'Полное имя',
      emailAddress: 'Email',
      password: 'Пароль',
      roleCustomer: 'Клиент',
      roleStaff: 'Сотрудник',
      roleAdmin: 'Админ',
      createUser: 'Создать пользователя'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      services: 'Servicios',
      contact: 'Contacto',
      getStarted: 'Empezar',
      login: 'Iniciar Sesión',
    },
    consultation: {
      title: 'Reserva tu consulta gratuita',
      subtitle: 'Habla con un experto de BASCORE hoy mismo.',
      name: 'Nombre completo',
      phone: 'Teléfono de contacto',
      email: 'Correo electrónico',
      company: 'Nombre de la empresa',
      inquiry: 'Tu consulta',
      send: 'Enviar solicitud',
      success: '¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto contigo pronto.',
      error: 'Algo salió mal. Por favor, inténtalo de nuevo más tarde.',
      validation: {
        required: 'Este campo es obligatorio',
        email: 'Ingresa un correo electrónico válido',
        phone: 'Ingresa un número de teléfono válido',
        minLength: 'Mínimo {min} caracteres'
      }
    },
    contact: {
      title: 'Contacta con nuestro equipo',
      subtitle: '¿Tienes una pregunta específica? Contáctanos directamente.',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      subject: 'Asunto',
      message: 'Tu mensaje',
      send: 'Enviar mensaje',
      success: '¡Mensaje enviado con éxito! Te responderemos pronto.',
      error: 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
    },
    hero: {
      badge: 'Integración de Telecomunicaciones y Sistemas ELV en EAU',
      title: 'Soluciones de conectividad a medida',
      titlePrefix: 'Para ',
      words: ['Soporte', 'Seguridad', 'Servicio'],
      desc: 'En BASCORE, nos especializamos en proporcionar soluciones personalizadas de cableado estructurado, fibra óptica y comunicación inalámbrica para satisfacer las diversas necesidades de las empresas en todos los EAU.',
      getStarted: 'Empezar',
      discover: 'Nuestros servicios',
    },
    trust: 'Proveedor confiable de sistemas de telecomunicaciones y ELV en EAU',
    trustItems: ['Fibra Óptica', 'Inalámbrico', 'Cableado', 'Sistemas ELV', 'Telecomunicaciones', 'Infraestructura'],
    why: {
      title: '¿Por qué elegir BASCORE?',
      desc: 'Combinamos más de 20 años de experiencia en la industria con las últimas tecnologías para ofrecer sistemas de telecomunicaciones y ELV excepcionales.',
      cards: [
        {
          title: '20+ años de experiencia',
          desc: 'Benefíciate de dos décadas de experiencia en la industria, garantizando soluciones que cumplen con los estándares internacionales.',
        },
        {
          title: 'Soluciones personalizables',
          desc: 'Nuestros servicios se adaptan a tus necesidades, lo que nos permite cumplir con los requisitos únicos de tu entorno empresarial.',
        },
        {
          title: 'Ecológico',
          desc: 'Priorizamos soluciones sostenibles para un futuro más verde.',
        }
      ]
    },
    services: {
      title: 'Nuestros servicios integrales',
      desc: 'Descubre nuestra amplia gama de servicios de integración de telecomunicaciones y sistemas ELV, diseñados para mejorar tu eficiencia operativa y conectividad.',
      viewAll: 'Ver todos los servicios',
      items: [
        {
          title: 'Cableado Estructurado',
          desc: 'Soluciones de cableado de datos y voz de alto rendimiento diseñadas para la fiabilidad y escalabilidad futura.',
          features: ['Cableado Cat6/Cat6A', 'Cableado de Centros de Datos', 'Pruebas y Certificación', 'Gestión de Cables'],
        },
        {
          title: 'Soluciones de Fibra Óptica',
          desc: 'Instalaciones avanzadas de fibra óptica para transmisión de datos a alta velocidad y largas distancias.',
          features: ['Empalme y Terminación', 'Instalaciones de Backbone', 'Pruebas OTDR', 'Fibra hasta la oficina'],
        },
        {
          title: 'Comunicación Inalámbrica',
          desc: 'Redes inalámbricas robustas que garantizan una conectividad perfecta en todas tus instalaciones.',
          features: ['Soluciones Wi-Fi 6', 'Enlaces Punto a Punto', 'Estudios de Sitio Inalámbricos', 'Wi-Fi Exterior'],
        },
        {
          title: 'Sistemas ELV',
          desc: 'Sistemas de Voltaje Extra Bajo integrados para seguridad y automatización de edificios.',
          features: ['CCTV y Vigilancia', 'Control de Acceso', 'Megafonía (PA/GA)', 'SMATV e IPTV'],
        }
      ],
      learnMore: 'Saber más'
    },
    portfolio: {
      badge: 'Nuestro portafolio',
      title: 'Transformando el panorama de la conectividad',
      desc: 'Explora nuestros proyectos y las implementaciones exitosas de sistemas ELV e infraestructura de telecomunicaciones en todos los EAU.',
      items: [
        { title: 'Sistemas ELV Corporativos' },
        { title: 'Conectividad para Edificios Inteligentes' },
        { title: 'Redes de Fibra Industrial' },
        { title: 'Comunicaciones para Hostelería' }
      ]
    },
    stats: {
      title: 'Excelencia en Conectividad',
      desc: 'Nuestro viaje, misión y lo que nos hace únicos en el mercado de los EAU.',
      items: [
        { label: 'Experiencia', value: '20+', sub: 'Años' },
        { label: 'Proyectos Realizados', value: '500+', sub: 'Exitosos' },
        { label: 'Satisfacción del Cliente', value: '100%', sub: 'Garantizada' },
        { label: 'Cobertura EAU', value: '7', sub: 'Emiratos' }
      ]
    },
    cta: {
      title: '¿Listo para mejorar tu conectividad?',
      desc: 'Contáctanos para consultas o solicitudes de asesoramiento. Construyamos juntos el futuro de tu infraestructura empresarial.',
      btn1: 'Consulta Gratuita',
      btn2: 'Contactar al Equipo'
    },
    footer: {
      desc: 'BASCORE se compromete a transformar el panorama de las telecomunicaciones y ELV en los EAU con soluciones innovadoras.',
      sections: [
        {
          title: 'Servicios',
          links: ['Cableado Estructurado', 'Fibra Óptica', 'Comunicación Inalámbrica', 'Sistemas ELV']
        },
        {
          title: 'Empresa',
          links: ['Inicio', 'Nosotros', 'Portafolio', 'Contacto']
        },
        {
          title: 'Contacto',
          links: ['EAU, Dubái', 'EAU, Abu Dabi', 'info@bascore.ae', 'www.bascore.ae']
        }
      ],
      rights: '© 2025 BASCORE. Todos los derechos reservados.',
      legal: ['Política de Privacidad', 'Términos de Servicio', 'Política de Seguridad']
    },
    clients: {
      title: 'Nuestros Clientes',
      desc: 'Estamos orgullosos de haber trabajado con algunas de las empresas y organizaciones líderes en los EAU.',
      items: [
        { name: 'Dubai Mall', logo: 'https://picsum.photos/seed/tech-mall/160/80' },
        { name: 'Etisalat', logo: 'https://picsum.photos/seed/telecom-etisalat/160/80' },
        { name: 'Emaar', logo: 'https://picsum.photos/seed/smart-city-emaar/160/80' },
        { name: 'ADNOC', logo: 'https://picsum.photos/seed/industrial-tech/160/80' },
        { name: 'Dubai Airport', logo: 'https://picsum.photos/seed/aviation-tech/160/80' },
        { name: 'Mubadala', logo: 'https://picsum.photos/seed/global-tech/160/80' },
      ]
    },
    aboutSection: {
      badge: 'Sobre BASCORE',
      title: 'Nuestro viaje en conectividad',
      historyTitle: 'Nuestra Historia',
      historyDesc: 'Fundada hace más de 20 años, BASCORE comenzó como un pequeño equipo de ingenieros visionarios en los EAU. Nuestra misión era simple: cerrar la brecha en infraestructura de telecomunicaciones de alta calidad. A medida que los EAU se transformaban en un centro global, evolucionamos junto a ellos, dominando las complejidades del cableado estructurado, la fibra óptica y los sistemas ELV. Hoy en día, somos un socio de confianza para las empresas que buscan una conectividad robusta y preparada para el futuro.',
      missionTitle: 'Nuestra Misión',
      missionDesc: 'Empoderar a las empresas de todos los EAU con soluciones de conectividad fluidas y de alto rendimiento que impulsen la innovación, mejoren la eficiencia y construyan un futuro conectado.',
      valuesTitle: 'Nuestros Valores',
      values: [
        { title: 'Integridad', desc: 'Construimos confianza a través de prácticas comerciales transparentes y éticas.' },
        { title: 'Innovación', desc: 'Nos mantenemos a la vanguardia adoptando las últimas tecnologías y metodologías.' },
        { title: 'Sostenibilidad', desc: 'Priorizamos soluciones ecológicas para un mañana más verde.' },
        { title: 'Excelencia', desc: 'Nos esforzamos por la perfección en cada proyecto que emprendemos.' }
      ],
      leadership: {
        title: 'Nuestro Liderazgo',
        subtitle: 'Los visionarios detrás de BASCORE',
        members: [
          {
            name: 'Askar Bibayev',
            role: 'CEO y Fundador',
            image: 'https://picsum.photos/seed/tech-leader-1/600/800'
          },
          {
            name: 'ALSIDDIG MAHMOUD',
            role: 'CTO',
            image: 'https://picsum.photos/seed/tech-leader-2/600/800'
          }
        ]
      }
    },
    serviceDetails: {
      back: 'Volver al Inicio',
      offerings: 'Nuestras Ofertas',
      benefits: 'Beneficios Clave',
      industries: 'Industrias Objetivo',
      cabling: {
        title: 'Soluciones de Cableado Estructurado',
        desc: 'BASCORE proporciona soluciones integrales de cableado estructurado que forman la columna vertebral de la comunicación de tu empresa. Nuestros diseños priorizan la escalabilidad, la fiabilidad y los estándares internacionales.',
        items: [
          { title: 'Cableado Cat6 y Cat6A', desc: 'Soluciones de cobre de alta velocidad para oficinas modernas.' },
          { title: 'Cableado de Centros de Datos', desc: 'Conectividad optimizada entre racks y filas.' },
          { title: 'Pruebas y Certificación', desc: 'Pruebas exhaustivas de Fluke y certificación para todas las instalaciones.' },
          { title: 'Gestión de Cables', desc: 'Enrutamiento de cables ordenado para un mejor mantenimiento y flujo de aire.' }
        ],
        benefits: [
          'Escalabilidad para el crecimiento futuro',
          'Reducción del tiempo de inactividad y resolución de problemas más sencilla',
          'Mejora del rendimiento y la fiabilidad de la red',
          'Estética mejorada e infraestructura organizada'
        ]
      },
      fiber: {
        title: 'Soluciones de Fibra Óptica',
        desc: 'Experimenta una conectividad ultrarrápida con nuestras soluciones avanzadas de fibra óptica. Nos especializamos en la transmisión de datos a alta velocidad para empresas y entornos industriales.',
        items: [
          { title: 'Empalme y Terminación', desc: 'Empalme por fusión de precisión para una pérdida mínima de señal.' },
          { title: 'Instalaciones de Backbone', desc: 'Backbones de fibra de alta capacidad para campus y edificios de varias plantas.' },
          { title: 'Pruebas OTDR', desc: 'Diagnóstico avanzado para garantizar el máximo rendimiento e integridad.' },
          { title: 'Soluciones FTTX', desc: 'Despliegues de fibra hasta la X para complejos residenciales y comerciales.' }
        ],
        benefits: [
          'Inmunidad a las interferencias electromagnéticas',
          'Ancho de banda extremadamente alto en largas distancias',
          'Tecnología preparada para el futuro durante décadas',
          'Transmisión de datos segura'
        ]
      },
      wireless: {
        title: 'Comunicación Inalámbrica',
        desc: 'Mantente conectado en cualquier lugar. BASCORE ofrece soluciones inalámbricas robustas que garantizan una conectividad perfecta en todas tus instalaciones.',
        items: [
          { title: 'Soluciones Wi-Fi 6', desc: 'Redes inalámbricas de alta densidad para espacios de trabajo modernos.' },
          { title: 'Enlaces Punto a Punto', desc: 'Conectividad inalámbrica de backbone entre ubicaciones distantes.' },
          { title: 'Estudios de Sitio Inalámbricos', desc: 'Mapas de calor detallados y análisis de señales para una cobertura óptima.' },
          { title: 'Wi-Fi Exterior', desc: 'Soluciones inalámbricas robustas para campus y espacios públicos.' }
        ],
        benefits: [
          'Movilidad perfecta para empleados y visitantes',
          'Reducción de costos de cableado para áreas grandes',
          'Cobertura escalable con tecnología mesh',
          'Conectividad de alta velocidad sin restricciones físicas'
        ]
      },
      elv: {
        title: 'Integración de Sistemas ELV',
        desc: 'Los sistemas de Voltaje Extra Bajo (ELV) son la inteligencia de los edificios modernos. BASCORE integra sistemas de seguridad, comunicación y protección en una infraestructura unificada y fácil de gestionar.',
        items: [
          { title: 'CCTV y Vigilancia', desc: 'Cámaras de seguridad de alta definición basadas en IP y monitoreo.' },
          { title: 'Control de Acceso', desc: 'Sistemas de gestión de entrada basados en biometría y tarjetas.' },
          { title: 'Megafonía (PA/GA)', desc: 'Distribución de audio clara y fiable para anuncios.' },
          { title: 'SMATV e IPTV', desc: 'Distribución centralizada de televisión y medios para hostelería.' }
        ],
        benefits: [
          'Seguridad mejorada y protección de activos',
          'Gestión centralizada de los sistemas del edificio',
          'Integración perfecta con la infraestructura de red',
          'Mejora de la seguridad para ocupantes y visitantes'
        ]
      }
    },
    dashboard: {
      staffPortal: 'Portal de Soporte del Personal',
      customerPortal: 'Portal de Soporte al Cliente',
      totalTickets: 'Total de Tickets',
      pending: 'Pendientes',
      resolved: 'Resueltos',
      navDashboard: 'Panel de Control',
      navChat: 'Chat Interno',
      navTeam: 'Equipo',
      navSecurity: 'Seguridad',
      navLogout: 'Cerrar Sesión',
      searchPlaceholder: 'Buscar tickets...',
      filterAll: 'Todos los Tickets',
      filterOpen: 'Abiertos',
      filterPending: 'Pendientes',
      filterResolved: 'Resueltos',
      filterClosed: 'Cerrados',
      sortNewest: 'Más recientes',
      sortOldest: 'Más antiguos',
      sortPriority: 'Prioridad',
      tableTicket: 'Ticket',
      tableStatus: 'Estado',
      tablePriority: 'Prioridad',
      tableAgent: 'Agente',
      tableUpdated: 'Actualizado',
      noTickets: 'No se encontraron tickets',
      noTicketsDesc: 'Intenta ajustar tu búsqueda o filtros',
      noTicketSelected: 'Ningún Ticket Seleccionado',
      selectTicketDesc: 'Selecciona un ticket de la lista para ver los detalles y comenzar a chatear.',
      reportedIssue: 'Reportó este problema',
      contactDetails: 'Detalles de Contacto',
      customer: 'Cliente',
      joined: 'Se unió',
      type: 'Tipo',
      question: 'Pregunta',
      incident: 'Incidente',
      problem: 'Problema',
      featureRequest: 'Solicitud de Función',
      agent: 'Agente',
      unassigned: 'Sin asignar',
      userManagement: 'Gestión de Usuarios',
      createManageAccounts: 'Crear y gestionar cuentas de personal y clientes',
      addUser: 'Agregar Usuario',
      name: 'Nombre',
      email: 'Email',
      role: 'Rol',
      action: 'Acción',
      accessRestricted: 'Acceso Restringido',
      authorizedPersonnel: 'Esta sección solo está disponible para el personal autorizado de BASCORE.',
      openNewTicket: 'Abrir Nuevo Ticket de Soporte',
      issueTitle: 'Título del Problema',
      issueTitlePlaceholder: 'ej., Problema de conectividad de red en la Oficina A',
      category: 'Categoría',
      catNetwork: 'Red',
      catFiber: 'Fibra Óptica',
      catELV: 'Sistemas ELV',
      catWireless: 'Inalámbrico',
      catCabling: 'Cableado',
      catOther: 'Otro',
      priority: 'Prioridad',
      low: 'Baja',
      medium: 'Media',
      high: 'Alta',
      urgent: 'Urgente',
      assignAgent: 'Asignar Agente (Opcional)',
      autoAssign: 'Asignación automática',
      description: 'Descripción',
      descriptionPlaceholder: 'Por favor, describe el problema en detalle...',
      submitTicket: 'Enviar Ticket',
      createNewUser: 'Crear Nuevo Usuario',
      fullName: 'Nombre Completo',
      emailAddress: 'Correo Electrónico',
      password: 'Contraseña',
      roleCustomer: 'Cliente',
      roleStaff: 'Personal',
      roleAdmin: 'Admin',
      createUser: 'Crear Usuario'
    }
  }
};

// --- Components ---

const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex flex-col leading-none ${className}`}>
    <span className="text-2xl md:text-3xl font-black tracking-tighter text-[#f1c232]">BASCORE</span>
    <span className="text-[6px] md:text-[8px] font-bold tracking-[0.2em] text-[#f1c232] opacity-90">COMMUNICATION SYSTEMS INSTALLATION</span>
  </Link>
);

const Skeleton = ({ className, dark = false }: { className?: string, dark?: boolean, key?: any }) => (
  <div className={`shimmer-wrapper bg-slate-200 rounded-lg ${className} ${dark ? 'bg-white/10' : ''}`}>
    <div className={`shimmer ${dark ? 'shimmer-dark' : ''}`} />
  </div>
);

const WordSlider = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="inline-flex relative h-[1.1em] overflow-hidden align-bottom min-w-[3ch]">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="text-brand whitespace-nowrap"
        >
          {words[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const ConsultationModal = ({ isOpen, onClose, t }: { isOpen: boolean, onClose: () => void, t: any }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    inquiry: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.consultation.validation.required;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = t.consultation.validation.minLength.replace('{min}', '3');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t.consultation.validation.required;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.consultation.validation.email;
    }

    const phoneRegex = /^\+?[\d\s-]{8,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = t.consultation.validation.required;
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = t.consultation.validation.phone;
    }

    if (!formData.company.trim()) {
      newErrors.company = t.consultation.validation.required;
    }

    if (!formData.inquiry.trim()) {
      newErrors.inquiry = t.consultation.validation.required;
    } else if (formData.inquiry.trim().length < 10) {
      newErrors.inquiry = t.consultation.validation.minLength.replace('{min}', '10');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', phone: '', email: '', company: '', inquiry: '' });
          setErrors({});
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
          
          <h2 className="text-3xl font-bold mb-2">{t.consultation.title}</h2>
          <p className="text-slate-500 mb-8">{t.consultation.subtitle}</p>

          {status === 'success' ? (
            <div className="bg-emerald-50 text-emerald-600 p-6 rounded-2xl text-center font-medium">
              {t.consultation.success}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.name}</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={e => {
                      setFormData({...formData, name: e.target.value});
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.phone}</label>
                  <input 
                    type="tel"
                    value={formData.phone}
                    onChange={e => {
                      setFormData({...formData, phone: e.target.value});
                      if (errors.phone) setErrors({...errors, phone: ''});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.email}</label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={e => {
                      setFormData({...formData, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: ''});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.company}</label>
                  <input 
                    type="text"
                    value={formData.company}
                    onChange={e => {
                      setFormData({...formData, company: e.target.value});
                      if (errors.company) setErrors({...errors, company: ''});
                    }}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.company ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all`}
                  />
                  {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.inquiry}</label>
                <textarea 
                  rows={4}
                  value={formData.inquiry}
                  onChange={e => {
                    setFormData({...formData, inquiry: e.target.value});
                    if (errors.inquiry) setErrors({...errors, inquiry: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.inquiry ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all resize-none`}
                />
                {errors.inquiry && <p className="text-red-500 text-xs mt-1">{errors.inquiry}</p>}
              </div>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">{t.consultation.error}</p>
              )}

              <button 
                disabled={status === 'loading'}
                className="w-full bg-brand text-white py-4 rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 disabled:opacity-50"
              >
                {status === 'loading' ? '...' : t.consultation.send}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose, t }: { isOpen: boolean, onClose: () => void, t: any }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t.consultation.validation.required;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = t.consultation.validation.minLength.replace('{min}', '3');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = t.consultation.validation.required;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = t.consultation.validation.email;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t.consultation.validation.required;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.consultation.validation.required;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t.consultation.validation.minLength.replace('{min}', '10');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ name: '', email: '', subject: '', message: '' });
          setErrors({});
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-xl overflow-hidden"
      >
        <div className="p-8 md:p-12">
          <button onClick={onClose} className="absolute top-8 right-8 text-slate-400 hover:text-slate-600">
            <X size={24} />
          </button>
          
          <h2 className="text-3xl font-bold mb-2">{t.contact.title}</h2>
          <p className="text-slate-500 mb-8">{t.contact.subtitle}</p>

          {status === 'success' ? (
            <div className="bg-emerald-50 text-emerald-600 p-6 rounded-2xl text-center font-medium">
              {t.contact.success}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">{t.contact.name}</label>
                <input 
                  type="text"
                  value={formData.name}
                  onChange={e => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">{t.contact.email}</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={e => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">{t.contact.subject}</label>
                <input 
                  type="text"
                  value={formData.subject}
                  onChange={e => {
                    setFormData({...formData, subject: e.target.value});
                    if (errors.subject) setErrors({...errors, subject: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.subject ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all`}
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">{t.contact.message}</label>
                <textarea 
                  rows={4}
                  value={formData.message}
                  onChange={e => {
                    setFormData({...formData, message: e.target.value});
                    if (errors.message) setErrors({...errors, message: ''});
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${errors.message ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all resize-none`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
              </div>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">{t.contact.error}</p>
              )}

              <button 
                disabled={status === 'loading'}
                className="w-full bg-brand text-white py-4 rounded-2xl font-bold hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 disabled:opacity-50"
              >
                {status === 'loading' ? '...' : t.contact.send}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ lang, setLang, t, onAuth, onConsultation }: { lang: string, setLang: (l: string) => void, t: any, onAuth: () => void, onConsultation: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    const langs = ['en', 'ar', 'ru', 'es'];
    const currentIndex = langs.indexOf(lang);
    const nextIndex = (currentIndex + 1) % langs.length;
    const newLang = langs[nextIndex];
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-brand transition-colors">{t.nav.home}</Link>
          <a href="/#about" className="hover:text-brand transition-colors">{t.nav.about}</a>
          <a href="/#services" className="hover:text-brand transition-colors">{t.nav.services}</a>
          <a href="/#contact" className="hover:text-brand transition-colors">{t.nav.contact}</a>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition-all text-sm font-semibold"
          >
            <Languages size={18} className="text-brand" />
            {lang === 'en' ? 'English' : lang === 'ar' ? 'العربية' : lang === 'ru' ? 'Русский' : 'Español'}
          </button>
          <button 
            onClick={onAuth}
            className="text-slate-600 px-4 py-2 rounded-full text-sm font-semibold hover:text-brand transition-all"
          >
            {t.nav.login}
          </button>
          <button 
            onClick={onConsultation}
            className="bg-brand text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-dark transition-all shadow-lg shadow-brand/20"
          >
            {t.nav.getStarted}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button onClick={toggleLang} className="p-2 text-slate-600">
            <Languages size={20} />
          </button>
          <button className="text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-6">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t.nav.home}</Link>
              <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t.nav.about}</a>
              <a href="/#services" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t.nav.services}</a>
              <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium">{t.nav.contact}</a>
              <hr className="border-slate-100" />
              <button 
                onClick={() => { onAuth(); setIsMobileMenuOpen(false); }}
                className="w-full text-slate-600 py-4 rounded-2xl font-bold border border-slate-100"
              >
                {t.nav.login}
              </button>
              <button 
                onClick={() => { onConsultation(); setIsMobileMenuOpen(false); }}
                className="w-full bg-brand text-white py-4 rounded-2xl font-bold"
              >
                {t.nav.getStarted}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ t, onConsultation }: { t: any, onConsultation: () => void }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <motion.div 
        style={{ y: useTransform(scrollY, [0, 500], [0, 150]), opacity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10"
      >
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand/5 text-brand text-xs font-bold uppercase tracking-wider mb-8 border border-brand/10"
          >
            <Zap size={14} className="fill-brand" />
            {t.hero.badge}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]"
          >
            {t.hero.title} <br className="hidden md:block" />
            <span className="text-slate-900">{t.hero.titlePrefix}</span>
            <WordSlider words={t.hero.words} />
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-12 leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button 
              onClick={onConsultation}
              className="w-full sm:w-auto bg-brand text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 flex items-center justify-center gap-2 group"
            >
              {t.hero.getStarted} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
            </button>
            <button className="w-full sm:w-auto bg-slate-50 text-slate-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-100 transition-all border border-slate-200">
              {t.hero.discover}
            </button>
          </motion.div>
        </div>

        <motion.div
          style={{ y, scale }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-slate-300 border border-slate-200">
            <img 
              src="https://picsum.photos/seed/network-server/1280/720" 
              alt="Telecom Infrastructure" 
              className="w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand/5 blur-3xl -z-10" />
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-emerald-500/5 blur-3xl -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const TrustBar = ({ t }: { t: any }) => (
  <section className="py-12 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6">
      <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-10">
        {t.trust}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {t.trustItems.map((item: string) => (
          <div key={item} className="text-xl font-bold text-slate-400">{item}</div>
        ))}
      </div>
    </div>
  </section>
);

const WhyBascore = ({ t }: { t: any }) => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.why.title}</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {t.why.desc}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {t.why.cards.map((item: any, i: number) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${i === 0 ? 'bg-brand/10' : i === 1 ? 'bg-emerald-50' : 'bg-amber-50'}`}>
              {i === 0 ? <Activity className="text-brand" /> : i === 1 ? <Settings className="text-emerald-600" /> : <Shield className="text-amber-600" />}
            </div>
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-slate-600 leading-relaxed">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AboutUs = ({ t }: { t: any }) => (
  <section className="py-24 overflow-hidden" id="about">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand font-bold uppercase tracking-widest text-sm mb-6 block">{t.aboutSection.badge}</span>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            {t.aboutSection.title}
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-8 h-1 bg-brand rounded-full" />
                {t.aboutSection.historyTitle}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                {t.aboutSection.historyDesc}
              </p>
            </div>

            <div className="p-8 bg-brand/5 rounded-3xl border border-brand/10">
              <h3 className="text-2xl font-bold mb-4 text-brand">{t.aboutSection.missionTitle}</h3>
              <p className="text-lg text-slate-700 italic">
                "{t.aboutSection.missionDesc}"
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          <div className="col-span-full mb-4">
            <h3 className="text-3xl font-bold mb-2">{t.aboutSection.valuesTitle}</h3>
            <div className="w-20 h-1.5 bg-brand rounded-full" />
          </div>
          {t.aboutSection.values.map((value: any, i: number) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center text-brand mb-4">
                {i === 0 ? <Shield size={20} /> : i === 1 ? <Zap size={20} /> : i === 2 ? <Globe size={20} /> : <CheckCircle2 size={20} />}
              </div>
              <h4 className="text-xl font-bold mb-2">{value.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
            </div>
          ))}
          
          <div className="col-span-full mt-12">
            <h3 className="text-3xl font-bold mb-8">{t.aboutSection.leadership.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {t.aboutSection.leadership.members.map((member: any, i: number) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="group relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl"
                >
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent flex flex-col justify-end p-8">
                    <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-brand font-semibold uppercase tracking-wider text-sm">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Services = ({ t }: { t: any }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24" id="services">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.services.title}</h2>
            <p className="text-lg text-slate-600">
              {t.services.desc}
            </p>
          </div>
          <button className="text-brand font-bold flex items-center gap-2 hover:gap-3 transition-all">
            {t.services.viewAll} <ChevronRight size={20} className="rtl:rotate-180" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bento-card flex flex-col h-full">
                <Skeleton className="w-14 h-14 rounded-2xl mb-8" />
                <Skeleton className="w-3/4 h-8 mb-4" />
                <Skeleton className="w-full h-20 mb-8" />
                <div className="space-y-3 mb-8">
                  <Skeleton className="w-full h-4" />
                  <Skeleton className="w-5/6 h-4" />
                  <Skeleton className="w-4/5 h-4" />
                </div>
                <Skeleton className="w-full h-12 rounded-xl" />
              </div>
            ))
          ) : (
            t.services.items.map((service: any, i: number) => (
              <div key={i} className="bento-card flex flex-col h-full">
                <div className="mb-8 p-4 bg-white rounded-2xl w-fit shadow-sm border border-slate-100">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {i === 0 ? <Cable className="text-brand" size={28} /> : i === 1 ? <Network className="text-brand" size={28} /> : i === 2 ? <Wifi className="text-brand" size={28} /> : <Shield className="text-brand" size={28} />}
                  </motion.div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-slate-600 mb-8 flex-grow">{service.desc}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((f: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link 
                  to={i === 0 ? "/services/structured-cabling" : i === 1 ? "/services/fiber-optics" : i === 2 ? "/services/wireless-communication" : "/services/elv-systems"}
                  className="w-full py-3 rounded-xl border border-slate-200 font-bold hover:bg-slate-900 hover:text-white transition-all text-center block"
                >
                  {t.services.learnMore}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

const ServiceHighlights = ({ t, lang }: { t: any, lang: string }) => {
  const isRtl = lang === 'ar';
  const highlights = [
    { 
      id: 'cabling',
      data: t.serviceDetails.cabling,
      icon: <Cable size={32} />,
      image: "https://picsum.photos/seed/structured-cabling/640/480"
    },
    { 
      id: 'fiber',
      data: t.serviceDetails.fiber,
      icon: <Network size={32} />,
      image: "https://picsum.photos/seed/fiber-optics/640/480"
    },
    { 
      id: 'wireless',
      data: t.serviceDetails.wireless,
      icon: <Wifi size={32} />,
      image: "https://picsum.photos/seed/wireless-antenna/640/480"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="text-brand font-bold uppercase tracking-widest text-sm mb-4 block">
            {isRtl ? 'نظرة معمقة' : 'Deep Dive'}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {isRtl ? 'تفاصيل خدماتنا المتخصصة' : 'Detailed Service Overview'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {isRtl ? 'نحن نجمع بين الخبرة التقنية والابتكار لتقديم حلول بنية تحتية لا مثيل لها.' : 'We combine technical expertise with innovation to deliver unparalleled infrastructure solutions.'}
          </p>
        </div>

        <div className="space-y-32">
          {highlights.map((item, i) => (
            <div key={item.id} className={`grid lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={i % 2 !== 0 ? 'lg:order-2' : ''}
              >
                <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-8">
                  {item.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">{item.data.title}</h3>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {item.data.desc}
                </p>
                <div className="grid sm:grid-cols-2 gap-6 mb-10">
                  {item.data.items.slice(0, 4).map((sub: any, j: number) => (
                    <div key={j} className="flex gap-3">
                      <div className="mt-1">
                        <CheckCircle2 size={18} className="text-brand" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{sub.title}</h4>
                        <p className="text-sm text-slate-500">{sub.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to={`/services/${item.id === 'cabling' ? 'structured-cabling' : item.id === 'fiber' ? 'fiber-optics' : 'wireless-communication'}`}
                  className="inline-flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all"
                >
                  {t.services.learnMore} <ArrowRight size={20} className="rtl:rotate-180" />
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={`relative ${i % 2 !== 0 ? 'lg:order-1' : ''}`}
              >
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/3]">
                  <img 
                    src={item.image} 
                    alt={item.data.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand rounded-3xl -z-10 hidden md:block" />
                <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-slate-100 rounded-3xl -z-10 hidden md:block" />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceProcess = ({ t, lang }: { t: any, lang: string }) => {
  const isRtl = lang === 'ar';
  const steps = [
    { 
      title: isRtl ? 'الاستشارة والمسح' : 'Consultation & Survey',
      desc: isRtl ? 'نبدأ بفهم متطلباتك الفريدة وإجراء مسح ميداني شامل.' : 'We begin by understanding your unique requirements and conducting a thorough site survey.',
      icon: <Users size={24} />
    },
    { 
      title: isRtl ? 'التصميم والهندسة' : 'Design & Engineering',
      desc: isRtl ? 'يقوم خبراؤنا بتصميم حل مخصص يلبي المعايير الدولية.' : 'Our experts design a bespoke solution that meets international standards.',
      icon: <Settings size={24} />
    },
    { 
      title: isRtl ? 'التنفيذ والتركيب' : 'Implementation & Install',
      desc: isRtl ? 'فريقنا الفني المعتمد ينفذ المشروع بدقة واحترافية.' : 'Our certified technical team executes the project with precision and professionalism.',
      icon: <Zap size={24} />
    },
    { 
      title: isRtl ? 'الاختبار والاعتماد' : 'Testing & Certification',
      desc: isRtl ? 'نضمن الأداء الأمثل من خلال اختبارات صارمة واعتمادات رسمية.' : 'We ensure peak performance through rigorous testing and official certifications.',
      icon: <CheckCircle2 size={24} />
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {isRtl ? 'كيف نعمل' : 'Our Working Process'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {isRtl ? 'نهج منهجي لضمان نجاح كل مشروع نقوم به.' : 'A systematic approach to ensure the success of every project we undertake.'}
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 hidden lg:block -z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-brand text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-brand/20">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-400 border-4 border-white">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PortfolioShowcase = ({ t }: { t: any }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-brand font-bold uppercase tracking-widest text-sm mb-6 block">{t.portfolio.badge}</span>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              {t.portfolio.title}
            </h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              {t.portfolio.desc}
            </p>
            <div className="space-y-6">
              {loading ? (
                Array(4).fill(0).map((_, i) => (
                  <Skeleton key={i} className="w-full h-16 rounded-2xl" dark />
                ))
              ) : (
                t.portfolio.items.map((item: any, i: number) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-default">
                    <div className="text-brand">
                      {i === 0 ? <Lock size={20} /> : i === 1 ? <Smartphone size={20} /> : i === 2 ? <Activity size={20} /> : <Network size={20} />}
                    </div>
                    <span className="font-semibold">{item.title}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {loading ? (
              <Skeleton className="w-full aspect-[10/12] rounded-3xl" dark />
            ) : (
              <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-3xl shadow-brand/20">
                <img 
                  src="https://picsum.photos/seed/datacenter-tech/800/1000" 
                  alt="Project Implementation" 
                  className="w-full"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            )}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand/20 blur-[120px] -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Stats = ({ t }: { t: any }) => (
  <section className="py-24 bg-brand text-white">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{t.stats.title}</h2>
        <p className="text-brand-light opacity-80">{t.stats.desc}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {t.stats.items.map((stat: any, i: number) => (
          <div key={i} className="text-center">
            <div className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">{stat.sub}</div>
            <div className="text-4xl md:text-6xl font-bold mb-2">{stat.value}</div>
            <div className="text-lg font-medium opacity-80">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const OurClients = ({ t, lang }: { t: any, lang: string }) => {
  const isRtl = lang === 'ar';
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.clients.title}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.clients.desc}
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {t.clients.items.map((client: any, i: number) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 grayscale hover:grayscale-0 transition-all duration-500 flex flex-col items-center gap-4"
            >
              <div className="w-full aspect-video bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 p-4">
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="max-w-full max-h-full object-contain"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
              <span className="text-sm font-bold text-slate-400">{client.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ t }: { t: any }) => (
  <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2">
          <Logo className="mb-8" />
          <p className="text-slate-500 max-w-xs mb-8">
            {t.footer.desc}
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand transition-colors cursor-pointer">
              <Phone size={18} />
            </div>
            <div className="w-10 h-10 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-brand transition-colors cursor-pointer">
              <Globe size={18} />
            </div>
          </div>
        </div>
        
        {t.footer.sections.map((section: any, i: number) => (
          <div key={i}>
            <h4 className="font-bold mb-6">{section.title}</h4>
            <ul className="space-y-4 text-slate-500 text-sm">
              {section.links.map((link: string, j: number) => (
                <li key={j}><a href="#" className="hover:text-brand">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
        <p>{t.footer.rights}</p>
        <div className="flex gap-8">
          {t.footer.legal.map((item: string) => (
            <a key={item} href="#" className="hover:text-brand">{item}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [lang, setLang] = useState('en');
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showConsultation, setShowConsultation] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const t = translations[lang as keyof typeof translations];

  const handleAuthSuccess = (userData: any, userToken: string) => {
    setUser(userData);
    setToken(userToken);
    setShowAuth(false);
    // Save to localStorage for persistence
    localStorage.setItem('bascore_user', JSON.stringify(userData));
    localStorage.setItem('bascore_token', userToken);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bascore_user');
    localStorage.removeItem('bascore_token');
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('bascore_user');
    const savedToken = localStorage.getItem('bascore_token');
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  if (user && token) {
    return <Dashboard user={user} token={token} onLogout={handleLogout} t={t} />;
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={
        <div className="min-h-screen">
          <Navbar lang={lang} setLang={setLang} t={t} onAuth={() => setShowAuth(true)} onConsultation={() => setShowConsultation(true)} />
          <Hero t={t} onConsultation={() => setShowConsultation(true)} />
          <TrustBar t={t} />
          <WhyBascore t={t} />
          <AboutUs t={t} />
          <Services t={t} />
          <ServiceHighlights t={t} lang={lang} />
          <ServiceProcess t={t} lang={lang} />
          <PortfolioShowcase t={t} />
          <OurClients t={t} lang={lang} />
          <Stats t={t} />
          
          {/* CTA Section */}
          <section className="py-24" id="contact">
            <div className="max-w-7xl mx-auto px-6">
              <div className="bg-slate-900 rounded-[40px] p-12 md:p-24 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-brand/10 blur-[100px]" />
                <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    {t.cta.title}
                  </h2>
                  <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                    {t.cta.desc}
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button 
                      onClick={() => setShowConsultation(true)}
                      className="w-full sm:w-auto bg-brand text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-brand-dark transition-all shadow-2xl shadow-brand/40"
                    >
                      {t.cta.btn1}
                    </button>
                    <button 
                      onClick={() => setShowContact(true)}
                      className="w-full sm:w-auto bg-white/10 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all backdrop-blur-md border border-white/10"
                    >
                      {t.cta.btn2}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <Footer t={t} />

          <AnimatePresence>
            {showAuth && (
              <AuthModal 
                onSuccess={handleAuthSuccess} 
                onClose={() => setShowAuth(false)} 
              />
            )}
            {showConsultation && (
              <ConsultationModal 
                isOpen={showConsultation} 
                onClose={() => setShowConsultation(false)} 
                t={t} 
              />
            )}
            {showContact && (
              <ContactModal 
                isOpen={showContact} 
                onClose={() => setShowContact(false)} 
                t={t} 
              />
            )}
          </AnimatePresence>
        </div>
      } />
      <Route path="/services/structured-cabling" element={<StructuredCabling t={t} lang={lang} />} />
      <Route path="/services/fiber-optics" element={<FiberOptics t={t} lang={lang} />} />
      <Route path="/services/wireless-communication" element={<WirelessCommunication t={t} lang={lang} />} />
      <Route path="/services/elv-systems" element={<ELVSystems t={t} lang={lang} />} />
    </Routes>
    </>
  );
}
