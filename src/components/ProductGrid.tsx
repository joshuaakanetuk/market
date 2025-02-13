import { EbayProduct } from "../hooks/useEbaySearch";

export default function ProductGrid({ products }: {products: EbayProduct[]}) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-[420px] mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Our Products</h1>
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="aspect-square relative block overflow-hidden rounded-lg shadow-sm"
              >
                <img src={product.image.imageUrl || "/placeholder.svg"} alt={product.title}  />
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-2">
                  <span className="text-sm font-semibold">{product.title}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    )
  }