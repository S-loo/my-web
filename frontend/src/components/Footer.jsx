import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0b0e14] border-t border-zinc-800/50 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-sm">
          <h3 className="text-sm font-semibold text-zinc-100 dark:text-zinc-200 mb-3 uppercase tracking-wider">Silas Ngetich</h3>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 leading-relaxed">
            Software Engineering. <br />
            Building functional, maintainable web systems with Django & React.
          </p>
        </div>
        
        <div className="flex gap-16">
          <div>
            <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.2em] mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 hover:text-white dark:hover:text-zinc-300 transition-colors">
                <Github size={12} /> GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500 hover:text-white dark:hover:text-zinc-300 transition-colors">
                <Linkedin size={12} /> LinkedIn
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-[0.2em] mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              <a href="/portfolio" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-white dark:hover:text-zinc-300 transition-colors">Portfolio</a>
              <a href="/blog" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-white dark:hover:text-zinc-300 transition-colors">Writing</a>
              <a href="/marketplace" className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-white dark:hover:text-zinc-300 transition-colors">Marketplace</a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-zinc-900/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono">
            © {new Date().getFullYear()} Silas Ngetich. All rights reserved.
          </p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-600 font-mono">
            Normal UI Standard v1.0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
