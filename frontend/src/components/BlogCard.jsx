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
          <time className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest block mb-1">
            {formattedDate}
          </time>
          {post.read_time && (
            <span className="text-[10px] font-mono text-zinc-300 dark:text-zinc-700 italic">
              {post.read_time} min read
            </span>
          )}
        </div>
        
        <div className="flex-grow">
          <Link to={`/blog/${post.slug}`} className="block group mb-3">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
              {post.title}
            </h2>
          </Link>
          
          <p className="text-sm text-zinc-500 dark:text-zinc-500 leading-relaxed mb-4 line-clamp-2 italic">
            {post.meta_description || (post.content.substring(0, 160) + '...')}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags?.map(tag => (
              <span key={tag.id} className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-[0.2em] border border-zinc-100 dark:border-zinc-900 px-1.5 py-0.5 rounded">
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
