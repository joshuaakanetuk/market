import { type EbayProduct } from "../hooks/useEbaySearch";

interface ProductDetailViewProps {
  product: EbayProduct;
  onBack: () => void;
}

import { createProduct } from "../lib/ebay"

export function ProductDetailView({ product, onBack }: ProductDetailViewProps) {
  return (
    <div className="space-y-4 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-4 text-gray-700 dark:text-gray-300 hover:underline"
      >
        &larr; Back to Search
      </button>

      {/* Static Product Image */}
      <div className="relative w-full h-64">
        <img
          src={product?.additionalImages?.[0]?.imageUrl || ""}
          alt={product.title}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-2 text-gray-800 dark:text-gray-200">
        <h2 className="text-2xl font-bold">{product.title}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">ID: {product.id}</p>
        <p className="text-lg font-semibold">Brand: {product.brand || "N/A"}</p>
        <p className="text-xl font-bold">${product.price.value}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{product.condition}</p>
        {product.description && <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>}
      </div>

      <button onClick={() => {
        createProduct(product.title, product.brand || "", product.description || "Not a desc", 100)
      }} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
       Create Product
      </button>
    </div>
  );
}
