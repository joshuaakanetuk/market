// Create base url

const SEARCH_URL = "http://localhost:8080/api/ebay/search";
const PRODUCT_URL = "http://localhost:8080/products";

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

export const createProduct = async (name: string, brand: string, description: string, upc: number ) => {
  try {
    const response = await axios(`${PRODUCT_URL}`, {
      method: 'POST',
      data: {
        name,
        brand,
        description,
        upc
      }
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Error fetching eBay products:", error);
    return [];
  }
};

