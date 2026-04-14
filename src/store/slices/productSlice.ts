import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsAPI, Product } from '../../services/api';
import { saveProducts, getCachedProducts, clearProducts } from '../../services/database';
import { isConnected } from '../../services/network';

interface ProductState {
    products: Product[];
    loading: boolean;
    refreshing: boolean;
    loadingMore: boolean;
    error: string | null;
    skip: number;
    hasMore: boolean;
    isOffline: boolean;
}

const initialState: ProductState = {
    products: [],
    loading: false,
    refreshing: false,
    loadingMore: false,
    error: null,
    skip: 0,
    hasMore: true,
    isOffline: false,
};

const LIMIT = 10;

export const loadProducts = createAsyncThunk(
    'products/loadProducts',
    async (isRefresh: boolean = false, { getState, rejectWithValue }) => {
        try {
            const state = getState() as { products: ProductState };
            const skip = isRefresh ? 0 : state.products.skip;

            const online = await isConnected();

            if (!online) {
                // Offline mode: load from cache instead
                const cachedProducts = await getCachedProducts();
                return {
                    products: cachedProducts,
                    skip: cachedProducts.length, // Not strictly accurate for pagination but prevents infinite loops
                    hasMore: false,
                    isOffline: true,
                    isRefresh
                };
            }

            const response = await fetchProductsAPI(LIMIT, skip);

            if (isRefresh) {
                await clearProducts();
            }
            await saveProducts(response.products);

            return {
                products: response.products,
                skip: skip + LIMIT,
                hasMore: response.products.length === LIMIT,
                isOffline: false,
                isRefresh
            };
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load products');
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadProducts.pending, (state, action) => {
            const isRefresh = action.meta.arg;
            if (isRefresh) {
                state.refreshing = true;
            } else if (state.skip === 0) {
                state.loading = true;
            } else {
                state.loadingMore = true;
            }
            state.error = null;
        });
        builder.addCase(loadProducts.fulfilled, (state, action) => {
            const { products, skip, hasMore, isOffline, isRefresh } = action.payload;
            state.loading = false;
            state.refreshing = false;
            state.loadingMore = false;

            if (isRefresh) {
                state.products = products;
            } else {
                // To avoid duplicate products on fast scroll
                const existingIds = new Set(state.products.map(p => p.id));
                const newProducts = products.filter(p => !existingIds.has(p.id));
                state.products = [...state.products, ...newProducts];
            }

            state.skip = skip;
            state.hasMore = hasMore;
            state.isOffline = isOffline;
            state.error = null;
        });
        builder.addCase(loadProducts.rejected, (state, action) => {
            state.loading = false;
            state.refreshing = false;
            state.loadingMore = false;
            state.error = action.payload as string;
        });
    },
});

export default productSlice.reducer;
