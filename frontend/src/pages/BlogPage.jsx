import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { blogService } from '../services/dataService';
import BlogCard from '../components/BlogCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SearchBar from '../components/SearchBar';

const BlogPage = () => {
  const [search, setSearch] = useState('');
  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['blog-posts', search],
    queryFn: () => blogService.getPosts({ search }),
  });

  if (error) return <div className="p-12 text-center text-red-500">Error loading blog posts.</div>;

  return (
    <div className="py-12 max-w-5xl mx-auto px-6">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Writing</h1>
          <p className="text-slate-500 dark:text-slate-400">Notes on engineering, design, and software.</p>
        </div>
        <div className="w-full md:w-64">
          <SearchBar onSearch={setSearch} placeholder="Search posts..." />
        </div>
      </header>

      {isLoading ? (
        <div className="space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex flex-col gap-4">
              <SkeletonLoader className="h-4 w-1/4" />
              <SkeletonLoader className="h-6 w-3/4" />
              <SkeletonLoader className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {posts?.results?.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
          {(!posts?.results || posts.results.length === 0) && (
            <p className="text-center py-20 text-slate-400 italic">No posts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
