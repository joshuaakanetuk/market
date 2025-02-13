import { useState, Fragment } from "react";
import { useEbaySearch, type EbayProduct } from "../hooks/useEbaySearch";
import { Dialog, Transition } from "@headlessui/react";
import { Search, Loader2, X } from "lucide-react";
import { ProductDetailView } from "./ProductDetailView";

export function EbaySearchModal() {
  const [open, setOpen] = useState(false);
  const { searchTerm, searchResults, isLoading, searchProducts } = useEbaySearch();
  const [selectedProduct, setSelectedProduct] = useState<EbayProduct | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const term = formData.get("searchTerm") as string;
    searchProducts(term);
  };

  const handleSelectProduct = (product: EbayProduct) => {
    setSelectedProduct(product);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        Search eBay Products
      </button>

      <Transition show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <div className="fixed inset-0 bg-black bg-opacity-30 dark:bg-black dark:bg-opacity-50" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white dark:bg-gray-900 w-full max-w-lg p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center">
                <Dialog.Title className="text-lg font-semibold dark:text-gray-200">
                  {selectedProduct ? selectedProduct.title : "Search eBay Products"}
                </Dialog.Title>
                <button onClick={() => setOpen(false)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              {selectedProduct ? (
                <ProductDetailView product={selectedProduct} onBack={handleBack} />
              ) : (
                <>
                  <form onSubmit={handleSearch} className="mt-4">
                    <div className="flex items-center gap-2">
                      <input
                        id="searchTerm"
                        name="searchTerm"
                        placeholder="Enter product name..."
                        className="border p-2 flex-1 rounded-md dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                      />
                      <button type="submit" className="p-2 bg-blue-500 text-white rounded-md">
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  </form>

                  {isLoading ? (
                    <div className="flex justify-center mt-4">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-500 dark:text-gray-400" />
                    </div>
                  ) : (
                    <div className="mt-4 space-y-2">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded cursor-pointer"
                          onClick={() => handleSelectProduct(product)}
                        >
                          {/* Square Image */}
                          <img
                            src={product.image?.imageUrl || product.additionalImages?.[0]?.imageUrl}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded-md mr-3"
                          />

                          {/* Product Info */}
                          <div className="flex flex-1 justify-between">
                            <div>
                              <h3 className="font-medium dark:text-gray-200">{product.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{product.condition}</p>
                            </div>
                            <p className="font-semibold dark:text-gray-300">${product.price.value}</p>
                          </div>
                        </div>
                      ))}
                      {searchTerm && searchResults.length === 0 && (
                        <p className="text-center text-gray-500 dark:text-gray-400">No results found</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
