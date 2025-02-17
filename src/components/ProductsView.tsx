import {
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import { EbayProduct } from '../hooks/useEbaySearch';
import ProductGrid from './ProductGrid';

const BASE_URL = "http://localhost:8080"; // Replace with actual API base URL

/**
 * Fetch products from the API
 * @returns {Promise<Array>} - Returns an array of products
 */
export async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Fetch Products Error:", error);
    return [];
  }
}


export function ProductsView() {
    // Access the client
    const queryClient = useQueryClient()

    // Queries
    const query = useQuery({ queryKey: ['products'], queryFn: fetchProducts })

    return (
      <div>
      {query.data ? <ProductGrid products={query.data} /> : <></>}
    </div>
       
    )
}