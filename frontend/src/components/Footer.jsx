import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Silas Portfolio</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Full-Stack Developer focused on building functional, maintainable web systems.
          </p>
        </div>
        
        <div className="flex gap-16">
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-tighter mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Github size={14} /> GitHub
              </a>
              <a href="#" className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-tighter mb-4">Project</h4>
            <div className="flex flex-col gap-2">
              <a href="/portfolio" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600">Portfolio</a>
              <a href="/blog" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600">Blog</a>
              <a href="/marketplace" className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600">Marketplace</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-slate-100 dark:border-slate-800/50">
        <p className="text-xs text-slate-400 dark:text-slate-600 text-center">
          © {new Date().getFullYear()} Silas Ngetich. Normal UI Standard.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
