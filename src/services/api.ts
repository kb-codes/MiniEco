export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string;
    sku: string;
    weight: number;
    thumbnail: string;
    images: string[];
}

interface ProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

const BASE_URL = 'https://dummyjson.com';

export const fetchProductsAPI = async (limit: number, skip: number): Promise<ProductResponse> => {
    try {
        const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const fetchProductByIdAPI = async (id: number): Promise<Product> => {
    try {
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch product with id ${id}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};
