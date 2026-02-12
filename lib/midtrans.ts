// Midtrans Configuration
// Note: midtrans-client is a CommonJS module, so we use dynamic import in API routes

export const MIDTRANS_CONFIG = {
    isProduction: true, // Set to true for production
    serverKey: process.env.MIDTRANS_SERVER_KEY || "",
    clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "",
};

// Pricing in IDR - TESTING MODE: Rp 1
// TODO: Change back to real prices after testing
// Original: monthly = 1000000, yearly = 10000000
export const PRICING = {
    pro: {
        monthly: {
            price: 1, // TESTING: Rp 1 (original: 1,000,000)
            name: "Pro Monthly",
            duration: 30, // days
        },
        yearly: {
            price: 1, // TESTING: Rp 1 (original: 10,000,000)
            name: "Pro Yearly",
            duration: 365, // days
        },
    },
    trial: {
        duration: 2, // 2 days free trial
    },
};

// Generate unique order ID
export function generateOrderId(userId: string, plan: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `OCR-${plan.toUpperCase()}-${timestamp}-${random}`;
}

// Format currency to IDR
export function formatIDR(amount: number): string {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
