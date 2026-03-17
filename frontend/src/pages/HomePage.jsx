import React from 'react';
import { ArrowRight, Code, BookOpen, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-24 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Software for humans. <br />
            Built with Django & React.
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed">
            I build functional, scalable web architectures. No fluff, just clean code and predictable user interfaces.
          </p>
          <div className="flex gap-4">
            <Link to="/portfolio" className="btn-primary flex items-center gap-2">
              View Work <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Areas */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureItem 
              icon={<Code className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />}
              title="Portfolio"
              description="A collection of production-ready projects and case studies."
              link="/portfolio"
            />
            <FeatureItem 
              icon={<BookOpen className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />}
              title="Blog"
              description="Technical deep dives and notes on software engineering."
              link="/blog"
            />
            <FeatureItem 
              icon={<ShoppingBag className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />}
              title="Marketplace"
              description="Functional components and templates for your next project."
              link="/marketplace"
            />
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3">
              <h2 className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-4">Core Stack</h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed italic">
                A predictable, robust collection of tools chosen for maintainable architectures.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12">
              <TechItem name="Django" category="Backend" />
              <TechItem name="React" category="Frontend" />
              <TechItem name="PostgreSQL" category="Database" />
              <TechItem name="Redis" category="Caching" />
              <TechItem name="Docker" category="Ops" />
              <TechItem name="Tailwind" category="Styling" />
            </div>
          </div>
        </div>
      </section>

      {/* Simplified Contact CTA */}
      <section className="py-24 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">Let's build something honest.</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Available for new opportunities and collaborations.
          </p>
          <Link to="/contact" className="text-blue-600 font-semibold hover:underline">
            silas@ngetich.dev →
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureItem = ({ icon, title, description, link }) => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
    <div className="mb-4">{icon}</div>
    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-2 uppercase tracking-tight">{title}</h3>
    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">{description}</p>
    <Link to={link} className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
      Browse {title} <ArrowRight className="w-3 h-3" />
    </Link>
  </div>
);

const TechItem = ({ name, category }) => (
  <div className="flex flex-col gap-1 group">
    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-amber-500 transition-colors">{name}</span>
    <span className="text-[10px] text-zinc-400 dark:text-zinc-700 font-mono uppercase tracking-tighter">{category}</span>
  </div>
);

export default HomePage;
