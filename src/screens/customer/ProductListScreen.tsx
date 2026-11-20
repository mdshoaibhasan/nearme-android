import React, { useState } from 'react';
import { Search, Tag, Package, Store, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';
import { Product, Business } from '../../types/nearme';

export const ProductListScreen: React.FC = () => {
  const { businesses, setCurrentBusiness, navigateTo } = useNearMe();
  const [productQuery, setProductQuery] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Flatten products with their business metadata
  const allProducts: { product: Product; business: Business }[] = [];
  businesses.forEach((b) => {
    b.products.forEach((p) => {
      allProducts.push({ product: p, business: b });
    });
  });

  const filteredProducts = allProducts.filter(({ product, business }) => {
    if (inStockOnly && !product.isAvailable) return false;
    if (productQuery.trim()) {
      const q = productQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        business.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSelectBusiness = (business: Business) => {
    setCurrentBusiness(business);
    navigateTo('business_detail');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none">
      {/* Header and Filter */}
      <div className="p-4 border-b border-neutral-100 bg-[#E8F5EC]/30">
        <div className="relative mb-2.5">
          <Search className="w-4 h-4 text-[#16834A] absolute left-3.5 top-3" />
          <input
            type="text"
            value={productQuery}
            onChange={(e) => setProductQuery(e.target.value)}
            placeholder="Search products (rice, milk, cha, fuchka)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-medium focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-600">
            {filteredProducts.length} items found across nearby merchants
          </span>
          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer border ${
              inStockOnly
                ? 'bg-[#16834A] text-white border-[#16834A]'
                : 'bg-white text-neutral-600 border-neutral-200'
            }`}
          >
            In Stock Only
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="p-4 space-y-2.5 pb-8">
        {filteredProducts.map(({ product, business }) => (
          <div
            key={product.id}
            onClick={() => handleSelectBusiness(business)}
            className="p-3 rounded-2xl border border-neutral-200/90 bg-white hover:border-[#16834A] hover:shadow-xs transition-all cursor-pointer group flex items-center justify-between"
          >
            <div className="min-w-0 pr-3">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs text-[#202124] truncate group-hover:text-[#16834A]">
                  {product.name}
                </h4>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                    product.isAvailable
                      ? 'bg-[#E8F5EC] text-[#16834A]'
                      : 'bg-red-50 text-red-600'
                  }`}
                >
                  {product.isAvailable ? 'In Stock' : 'Out'}
                </span>
              </div>

              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-neutral-500">
                <Store className="w-3 h-3 text-[#16834A] shrink-0" />
                <span className="font-medium text-neutral-700 truncate">{business.name}</span>
                <span>•</span>
                <span className="shrink-0 text-[#16834A] font-bold">
                  {business.distanceMeters < 1000
                    ? `${business.distanceMeters}m`
                    : `${(business.distanceMeters / 1000).toFixed(1)}km`}
                </span>
              </div>

              <p className="text-[10px] text-neutral-400 mt-0.5">
                Unit: {product.unit} {product.description ? `• ${product.description}` : ''}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-sm font-black text-[#16834A]">৳{product.price}</span>
              <div className="text-[10px] text-[#FF9F43] font-semibold flex items-center justify-end gap-0.5 mt-0.5">
                <span>View</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
