// storage.js

import * as SecureStore from 'expo-secure-store';

// Storage implementation: You can change this to another storage system if needed
const storage = {
    // SecureStore implementation (default)
    setItem: async (key: string, value: string) => {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error(`Error storing item with key "${key}":`, error);
        }
    },

    getItem: async (key: string) => {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error(`Error retrieving item with key "${key}":`, error);
            return null;
        }
    },

    deleteItem: async (key: string) => {
        try {
            await SecureStore.deleteItemAsync(key);
        } catch (error) {
            console.error(`Error deleting item with key "${key}":`, error);
        }
    },
};

/**
 * Store an item securely (token, settings, etc.)
 * @param {string} key - The key to store the value under.
 * @param {string} value - The value to store.
 */
export const storeStorageItem = async (key: string, value: string) => {
    await storage.setItem(key, value);
};

/**
 * Get an item by key.
 * @param {string} key - The key to retrieve the value for.
 * @returns {Promise<string|null>} The stored value or null if not found.
 */
export const getStorageItem = async (key: string) => {
    return await storage.getItem(key);
};

/**
 * Delete an item by key.
 * @param {string} key - The key to delete the value for.
 */
export const deleteStorageItem = async (key: string) => {
    await storage.deleteItem(key);
};
