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
      error: 'Something went wrong. Please try again later.'
    },
    hero: {
      badge: 'Telecom & ELV System Integration in UAE',
      title: 'Bespoke Connectivity',
      titleSpan: 'Solutions for Business.',
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
            image: 'https://instagram.fdxb3-3.fna.fbcdn.net/v/t51.82787-15/625122385_18187558837360796_5965981383787006934_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=104&ig_cache_key=MzIwMTg0NzExNjM2NjQ4OTA4MQ%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjE0NDB4MTgwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=UrfOXg252wcQ7kNvwFLm10c&_nc_oc=Adkx7DxB0u8jHR1OLpm2xdyTsL5gfNnNTRLQ-6rOHJktm4uUy2L4JaXsDv2JmO8YrDg1ivWpjXsL6H_sgI6X4637&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=instagram.fdxb3-3.fna&_nc_gid=cIyJ3KR2Mz62WQJrX0EQgA&_nc_ss=8&oh=00_AfwUqK1rF0PIa3N3uD0zNCtN2VSjgTuRyn-YkYMp1JFLjw&oe=69B3459F'
          },
          {
            name: 'ALSIDDIG MAHMOUD',
            role: 'CTO',
            image: 'https://scontent.fdxb3-3.fna.fbcdn.net/v/t39.30808-6/465702844_27727947166819133_4779844027167601342_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=ca4fef&_nc_ohc=mHkRI5eGUukQ7kNvwHMxHOa&_nc_oc=AdmsUfxNafQBO3MRFjx_LYXEEw1icdyZrm1dqjR9ZRcDB5G1RDEGO7lBSUK1hygMcBsnNPBDENg9He-SQVAhtWHt&_nc_zt=23&_nc_ht=scontent.fdxb3-3.fna&_nc_gid=GBSAPfxLiP81oL71Ui1FTg&_nc_ss=8&oh=00_AfyNLvbCJ3B_WenctFhrX6kU-DyZBcS06C_IqqXQYoFXqQ&oe=69B32629'
          }
        ]
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
      }
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
      error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.'
    },
    hero: {
      badge: 'تكامل أنظمة الاتصالات و ELV في الإمارات',
      title: 'حلول اتصال مخصصة',
      titleSpan: 'لأعمالك.',
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
      }
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

const ConsultationModal = ({ isOpen, onClose, t }: { isOpen: boolean, onClose: () => void, t: any }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    inquiry: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.phone}</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.email}</label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.company}</label>
                  <input 
                    required
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-slate-700">{t.consultation.inquiry}</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.inquiry}
                  onChange={e => setFormData({...formData, inquiry: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand/20 focus:border-brand outline-none transition-all resize-none"
                />
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

const Navbar = ({ lang, setLang, t, onAuth, onConsultation }: { lang: string, setLang: (l: string) => void, t: any, onAuth: () => void, onConsultation: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ar' : 'en';
    setLang(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = newLang === 'ar' ? 'rtl' : 'ltr';
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
            {lang === 'en' ? 'العربية' : 'English'}
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
            <span className="text-brand">{t.hero.titleSpan}</span>
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
              src="https://picsum.photos/seed/telecom/1600/900" 
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
                  src="https://picsum.photos/seed/infrastructure/1000/1200" 
                  alt="Project Implementation" 
                  className="w-full"
                  referrerPolicy="no-referrer"
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
    return <Dashboard user={user} token={token} onLogout={handleLogout} />;
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
          <PortfolioShowcase t={t} />
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
                    <button className="w-full sm:w-auto bg-white/10 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all backdrop-blur-md border border-white/10">
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
