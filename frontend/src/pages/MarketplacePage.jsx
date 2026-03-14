import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { marketplaceService } from '../services/dataService';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';

const MarketplacePage = () => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: marketplaceService.getProducts,
  });

  if (error) return <div className="p-12 text-center text-red-500">Error loading products.</div>;

  return (
    <div className="py-12 max-w-7xl mx-auto px-6">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Marketplace</h1>
        <p className="text-slate-500 dark:text-slate-400">Digital assets and tools for modern developers.</p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <SkeletonLoader key={i} className="h-80" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.results?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          {(!products?.results || products.results.length === 0) && (
            <p className="col-span-full text-center py-20 text-slate-400 italic">Marketplace is coming soon.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
