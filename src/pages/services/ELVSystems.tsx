import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, Building, Home, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const ELVSystems = ({ t, lang }: { t: any, lang: string }) => {
  const details = t.serviceDetails.elv;
  const isRtl = lang === 'ar';

  const industries = [
    { name: isRtl ? 'سكني' : 'Residential', icon: Home },
    { name: isRtl ? 'تجاري' : 'Commercial', icon: Building },
    { name: isRtl ? 'أمن' : 'Security', icon: Lock },
    { name: isRtl ? 'مراقبة' : 'Monitoring', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="text-brand font-bold mb-8 inline-flex items-center gap-2 hover:gap-3 transition-all">
          {isRtl ? '←' : '←'} {t.serviceDetails.back}
        </Link>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-16 h-16 bg-brand/10 rounded-2xl flex items-center justify-center text-brand mb-8">
              <Shield size={32} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{details.title}</h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {details.desc}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
          >
            <img 
              src="https://picsum.photos/seed/elv/1000/800" 
              alt={details.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-bold mb-8">{t.serviceDetails.offerings}</h2>
            <div className="space-y-6">
              {details.items.map((item: any, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-brand/5 rounded-xl flex items-center justify-center text-brand shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-10 rounded-3xl shadow-xl">
            <h2 className="text-3xl font-bold mb-8">{t.serviceDetails.benefits}</h2>
            <ul className="space-y-6">
              {details.benefits.map((benefit: string, i: number) => (
                <li key={i} className="flex items-center gap-4 text-lg">
                  <div className="w-2 h-2 bg-brand rounded-full" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12">{t.serviceDetails.industries}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {industries.map((industry, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <industry.icon className="w-12 h-12 text-brand mx-auto mb-4" />
                <span className="font-bold">{industry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ELVSystems;
