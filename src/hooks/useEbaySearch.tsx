import { useState } from "react"
import { searchEbayProducts } from "../lib/ebay"

export interface EbayProductImage {
  imageUrl: string;
}

export interface EbayProduct {
  id: string;
  title: string;
  brand?: string;
  price: {
    value: number
  };
  condition: string;
  description?: string;
  additionalImages: EbayProductImage[];
  image: EbayProductImage;
}

export function useEbaySearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<EbayProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const searchProducts = async (term: string) => {
    setIsLoading(true)
    setSearchTerm(term)

    const results =  await searchEbayProducts(searchTerm);
    setSearchResults(results)
    setIsLoading(false)
  }

  return { searchTerm, searchResults, isLoading, searchProducts }
}

