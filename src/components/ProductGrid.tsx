import { EbayProduct } from "../hooks/useEbaySearch";

export default function ProductGrid({ products }: {products: EbayProduct[]}) {
  return (
    <div className="justify-center items-center min-h-screen">
      <div className="w-full max-w-[720px] mx-auto px-4 py-8 shadow-md rounded-lg">
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <a
              key={product.id}
              href={`/product/${product.id}`}
              className="aspect-square flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors duration-200"
            >
              <span className="text-center font-medium text-white">{product.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}