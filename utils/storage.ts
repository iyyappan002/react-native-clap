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

export const getRandomRGBColor = (name: string) => {
    if (!name) return 'rgba(156, 163, 175, 1)';
    
    const colors = [
      'rgba(59, 130, 246, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(245, 158, 11, 1)',
      'rgba(239, 68, 68, 1)',
      'rgba(168, 85, 247, 1)',
      'rgba(16, 185, 129, 1)',
      'rgba(99, 102, 241, 1)',
      'rgba(0, 150, 136,1)',
    ];
    
    const hash = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    return colors[hash % colors.length];
};

export const getInitials = (name :string) => {
    if (!name) return '';
    
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
