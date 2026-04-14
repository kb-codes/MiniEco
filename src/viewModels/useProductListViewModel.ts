import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { loadProducts } from '../store/slices/productSlice';

export const useProductListViewModel = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, refreshing, loadingMore, error, hasMore, isOffline } = useSelector(
        (state: RootState) => state.products
    );

    useEffect(() => {
        dispatch(loadProducts(false));
    }, [dispatch]);

    const handleLoadMore = () => {
        if (!loading && !loadingMore && hasMore && !isOffline) {
            dispatch(loadProducts(false));
        }
    };

    const handleRefresh = () => {
        dispatch(loadProducts(true));
    };

    return {
        products,
        loading,
        refreshing,
        loadingMore,
        error,
        isOffline,
        handleLoadMore,
        handleRefresh,
    };
};
