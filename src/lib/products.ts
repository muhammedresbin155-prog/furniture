import { GOOGLE_SHEETS_WEB_APP_URL } from './api';
import { Product, ProductNormalized } from '@/types';

export async function fetchProducts(): Promise<ProductNormalized[]> {
  try {
    const response = await fetch(`${GOOGLE_SHEETS_WEB_APP_URL}?sheet=products`, {
      method: 'GET',
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different possible API response structures
    let productsArray: any[] = [];
    if (Array.isArray(data)) {
      productsArray = data;
    } else if (data && Array.isArray(data.products)) {
      productsArray = data.products;
    } else if (data && Array.isArray(data.data)) {
      productsArray = data.data;
    } else if (data && Array.isArray(data.rows)) {
      productsArray = data.rows;
    } else if (data && typeof data === 'object') {
      // Try to find array in object
      const keys = Object.keys(data);
      for (const key of keys) {
        if (Array.isArray(data[key])) {
          productsArray = data[key];
          break;
        }
      }
    }
    
    return productsArray.map((product: any) => {
      const priceValue = product.price || product.Price || product['product price'] || product['Product Price'] || product.unitPrice || product['Unit Price'];
      let price: number | undefined = undefined;
      if (priceValue !== undefined && priceValue !== null && priceValue !== '') {
        const numPrice = Number(priceValue);
        if (!isNaN(numPrice)) {
          price = numPrice;
        }
      }
      
      return {
        id: product['products id'] || product.id || product.productId || product['product id'] || product['Product ID'] || product['Products ID'] || '',
        name: product['product name'] || product.name || product.productName || product['Product Name'] || product['Product name'] || '',
        category: product.category || product.Category || product['Category'] || product.type || '',
        stock: Number(product.stock || product.Stock || product.quantity || product['Stock'] || product.available || 0),
        image: product.image || product.Image || product.imageUrl || product['image url'] || product['Image'] || product['Image URL'] || '',
        price: price,
      };
    }).filter(p => p.id && p.name);
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function submitOrder(orderData: {
  'product id': string;
  quantity: number;
  price: number;
  'phone number': string;
  name: string;
}): Promise<any> {
  try {
    const payload = {
      sheet: 'orders',
      'product id': orderData['product id'],
      quantity: orderData.quantity,
      price: orderData.price,
      'phone number': orderData['phone number'],
      name: orderData.name,
    };
    
    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    // With no-cors we can't read response, but request may go through
    return { success: true };
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}
