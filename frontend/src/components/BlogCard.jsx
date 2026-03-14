import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
        <div className="md:w-32 flex-shrink-0 pt-1">
          <time className="text-xs font-semibold text-slate-400 uppercase tracking-tight">
            {formattedDate}
          </time>
        </div>
        
        <div className="flex-grow">
          <Link to={`/blog/${post.slug}`} className="block group mb-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </h2>
          </Link>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
            {post.content.substring(0, 200)}...
          </p>
          
          <div className="flex gap-2">
            {post.tags?.map(tag => (
              <span key={tag.id} className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-800 px-1.5 py-0.5 rounded">
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
