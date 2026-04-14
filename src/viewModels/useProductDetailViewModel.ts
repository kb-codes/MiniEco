import { useEffect, useState } from 'react';
import { fetchProductByIdAPI, Product } from '../services/api';
import { isConnected } from '../services/network';

export const useProductDetailViewModel = (initialProduct: Product) => {
    const [product, setProduct] = useState<Product>(initialProduct);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const loadFullProduct = async () => {
            try {
                const online = await isConnected();
                setIsOffline(!online);
                
                if (online) {
                    setLoading(true);
                    const fullProduct = await fetchProductByIdAPI(initialProduct.id);
                    setProduct(fullProduct);
                }
            } catch (e: any) {
                setError(e.message || 'Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        if (initialProduct?.id) {
            loadFullProduct();
        }
    }, [initialProduct?.id]);

    return { product, loading, error, isOffline };
};
