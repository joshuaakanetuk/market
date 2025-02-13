// Create base url

const SEARCH_URL = "http://localhost:8080/api/ebay/search";
import axios from 'axios';
import { EbayProduct } from '../hooks/useEbaySearch';

export const postEbayListing = async (product: EbayProduct) => {

};

/**
 * Search products on eBay using the Browse API
 */
export const searchEbayProducts = async (query: string, limit = 10) => {
  try {
    const response = await axios(`${SEARCH_URL}?query=${encodeURIComponent(query)}&limit=${limit}`);
    console.log(response)
    return response.data.itemSummaries || [];
  } catch (error) {
    console.error("Error fetching eBay products:", error);
    return [];
  }
};
