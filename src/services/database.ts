import * as SQLite from 'expo-sqlite';
import { Product } from './api';

let db: SQLite.SQLiteDatabase | null = null;

export const initDB = async () => {
    try {
        db = await SQLite.openDatabaseAsync('minieco.db');
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT,
                description TEXT,
                category TEXT,
                price REAL,
                discountPercentage REAL,
                rating REAL,
                stock INTEGER,
                tags TEXT,
                brand TEXT,
                sku TEXT,
                weight REAL,
                thumbnail TEXT,
                images TEXT
            );
        `);
        console.log('Database initialized');
    } catch (error) {
        console.error('Failed to initialize database', error);
    }
};

export const saveProducts = async (products: Product[]) => {
    if (!db) return;
    try {
        const statement = await db.prepareAsync(`
            INSERT OR REPLACE INTO products (
                id, title, description, category, price, discountPercentage, rating, stock, tags, brand, sku, weight, thumbnail, images
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        for (const product of products) {
            await statement.executeAsync([
                product.id,
                product.title,
                product.description,
                product.category,
                product.price,
                product.discountPercentage,
                product.rating,
                product.stock,
                JSON.stringify(product.tags),
                product.brand ?? null,
                product.sku,
                product.weight,
                product.thumbnail,
                JSON.stringify(product.images)
            ]);
        }
        await statement.finalizeAsync();
    } catch (error) {
        console.error('Failed to save products to DB', error);
    }
};

export const getCachedProducts = async (): Promise<Product[]> => {
    if (!db) return [];
    try {
        const rows = await db.getAllAsync<any>('SELECT * FROM products ORDER BY id ASC');
        return rows.map((row) => ({
            id: row.id,
            title: row.title,
            description: row.description,
            category: row.category,
            price: row.price,
            discountPercentage: row.discountPercentage,
            rating: row.rating,
            stock: row.stock,
            tags: row.tags ? JSON.parse(row.tags) : [],
            brand: row.brand,
            sku: row.sku,
            weight: row.weight,
            thumbnail: row.thumbnail,
            images: row.images ? JSON.parse(row.images) : []
        }));
    } catch (error) {
        console.error('Failed to get cached products', error);
        return [];
    }
};

export const clearProducts = async () => {
    if (!db) return;
    try {
        await db.execAsync('DELETE FROM products');
    } catch (error) {
        console.error('Failed to clear products', error);
    }
};
