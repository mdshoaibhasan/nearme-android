import React, { useState } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Tag,
  Store,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { useNearMe } from '../../context/NearMeContext';
import { Product } from '../../types/nearme';

// ============================================
// 1. MANAGE PRODUCTS SCREEN
// ============================================
export const ManageProductsScreen: React.FC = () => {
  const {
    ownerBusiness,
    toggleProductAvailability,
    deleteProduct,
    navigateTo,
  } = useNearMe();

  const [selectedProductToEdit, setSelectedProductToEdit] = useState<Product | null>(null);

  if (!ownerBusiness) {
    return null;
  }

  const products = ownerBusiness.products;

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#202124]">Product Inventory</h2>
          <p className="text-xs text-neutral-500">
            {products.length} products listed under {ownerBusiness.name}
          </p>
        </div>

        <button
          onClick={() => navigateTo('owner_add_product')}
          className="px-3 py-2 rounded-xl bg-[#16834A] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#0E5E34] transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {products.length === 0 ? (
        <div className="py-12 text-center bg-neutral-50 rounded-2xl border border-dashed border-neutral-300">
          <Package className="w-10 h-10 text-neutral-300 mx-auto mb-2" />
          <h4 className="text-xs font-bold text-neutral-600">No products added yet</h4>
          <p className="text-[11px] text-neutral-400 mt-1">
            Add items with prices in ৳ to attract customers
          </p>
          <button
            onClick={() => navigateTo('owner_add_product')}
            className="mt-3 px-4 py-2 rounded-xl bg-[#16834A] text-white text-xs font-bold cursor-pointer"
          >
            + Add First Product
          </button>
        </div>
      ) : (
        <div className="space-y-2.5 pb-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-2xl border border-neutral-200/90 bg-white hover:border-[#16834A]/50 transition-all flex items-center justify-between shadow-2xs"
            >
              <div className="min-w-0 pr-3 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs text-[#202124] truncate">{p.name}</h4>
                  <button
                    onClick={() => toggleProductAvailability(ownerBusiness.id, p.id)}
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full cursor-pointer transition-colors ${
                      p.isAvailable
                        ? 'bg-[#E8F5EC] text-[#16834A] hover:bg-[#cbebd4]'
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                    title="Click to toggle availability"
                  >
                    {p.isAvailable ? '✓ In Stock' : '✕ Out of Stock'}
                  </button>
                </div>

                <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-500">
                  <span className="font-bold text-[#16834A] text-xs">৳{p.price}</span>
                  <span>/</span>
                  <span>{p.unit}</span>
                  {p.description && (
                    <span className="truncate max-w-[120px] text-neutral-400">
                      • {p.description}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => {
                    // Navigate to edit with product state
                    (window as any).__editingProduct = p;
                    navigateTo('owner_edit_product');
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-500 hover:text-[#16834A] hover:bg-[#E8F5EC] transition-colors cursor-pointer"
                  title="Edit Product"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => deleteProduct(ownerBusiness.id, p.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// 2. ADD PRODUCT SCREEN
// ============================================
export const AddProductScreen: React.FC = () => {
  const { ownerBusiness, addProduct, navigateTo } = useNearMe();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('Piece');
  const [category, setCategory] = useState(ownerBusiness?.category || 'Grocery');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [error, setError] = useState('');

  if (!ownerBusiness) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a product name');
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError('Please provide a valid price in BDT (৳)');
      return;
    }
    setError('');

    addProduct(ownerBusiness.id, {
      name,
      price: numPrice,
      unit: unit || 'Piece',
      category: category || ownerBusiness.category,
      description,
      isAvailable,
    });

    navigateTo('owner_manage_products');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8">
      <div className="mb-4">
        <h2 className="text-lg font-black text-[#202124]">Add New Product</h2>
        <p className="text-xs text-neutral-500">
          List an item with price in BDT (৳) under {ownerBusiness.name}
        </p>
      </div>

      {error && (
        <div className="mb-3 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-semibold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Product Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Special Shahi Malai Cha or Miniket Rice"
            className="w-full px-3 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Price in BDT (৳) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs font-bold text-neutral-400">৳</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="45"
                className="w-full pl-7 pr-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold focus:outline-none focus:border-[#16834A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Unit / Quantity</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. 1 kg, Cup, Plate"
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Freshly brewed with thick clotted cream"
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#E8F5EC]/50 border border-[#16834A]/20">
          <input
            type="checkbox"
            id="availableToggle"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
          <label htmlFor="availableToggle" className="text-xs font-bold text-neutral-800 cursor-pointer">
            In Stock & Immediately Available
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 px-4 rounded-xl bg-[#16834A] text-white font-bold text-xs hover:bg-[#0E5E34] transition-all cursor-pointer shadow-md"
          >
            Add Product to Directory
          </button>
          <button
            type="button"
            onClick={() => navigateTo('owner_manage_products')}
            className="py-3 px-4 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

// ============================================
// 3. EDIT PRODUCT SCREEN
// ============================================
export const EditProductScreen: React.FC = () => {
  const { ownerBusiness, updateProduct, navigateTo } = useNearMe();

  const editingProduct: Product | undefined =
    (window as any).__editingProduct || ownerBusiness?.products[0];

  const [name, setName] = useState(editingProduct?.name || '');
  const [price, setPrice] = useState(editingProduct?.price?.toString() || '');
  const [unit, setUnit] = useState(editingProduct?.unit || 'Piece');
  const [description, setDescription] = useState(editingProduct?.description || '');
  const [isAvailable, setIsAvailable] = useState(editingProduct?.isAvailable ?? true);

  if (!ownerBusiness || !editingProduct) {
    return (
      <div className="p-4 text-center">
        <p className="text-xs text-neutral-500">No product selected</p>
        <button
          onClick={() => navigateTo('owner_manage_products')}
          className="mt-2 text-xs text-[#16834A] font-bold"
        >
          Back to Inventory
        </button>
      </div>
    );
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    const numPrice = parseFloat(price);
    updateProduct(ownerBusiness.id, editingProduct.id, {
      name,
      price: isNaN(numPrice) ? editingProduct.price : numPrice,
      unit,
      description,
      isAvailable,
    });
    navigateTo('owner_manage_products');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-y-auto select-none p-4 pb-8">
      <div className="mb-4">
        <h2 className="text-lg font-black text-[#202124]">Edit Product</h2>
        <p className="text-xs text-neutral-500">Modify price, stock or details</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-3.5">
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-[#16834A]"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Price in ৳</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-bold focus:outline-none focus:border-[#16834A]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">Unit</label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
          />
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
          <input
            type="checkbox"
            id="editAvail"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="w-4 h-4 text-[#16834A] rounded"
          />
          <label htmlFor="editAvail" className="text-xs font-bold text-neutral-800">
            Currently in Stock
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 py-3 px-4 rounded-xl bg-[#16834A] text-white font-bold text-xs hover:bg-[#0E5E34] transition-all cursor-pointer shadow-md"
          >
            Update Product
          </button>
          <button
            type="button"
            onClick={() => navigateTo('owner_manage_products')}
            className="py-3 px-4 rounded-xl border border-neutral-300 text-neutral-700 font-bold text-xs hover:bg-neutral-50 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
