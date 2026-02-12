import { createClient } from "./supabase";

// Scan limits per tier
export const SCAN_LIMITS = {
    guest: 2,        // Total scans (localStorage)
    free: 10,        // Per day
    pro: Infinity,   // Unlimited
};

const GUEST_SCAN_KEY = "ocr_guest_scans";

interface ScanLimitResult {
    allowed: boolean;
    remaining: number;
    tier: string;
    requiresLogin: boolean;
    requiresUpgrade: boolean;
}

// Get guest scan count from localStorage
function getGuestScanCount(): number {
    if (typeof window === "undefined") return 0;
    const data = localStorage.getItem(GUEST_SCAN_KEY);
    if (!data) return 0;

    try {
        const parsed = JSON.parse(data);
        return parsed.count || 0;
    } catch {
        return 0;
    }
}

// Increment guest scan count
function incrementGuestScanCount(): void {
    if (typeof window === "undefined") return;
    const currentCount = getGuestScanCount();
    localStorage.setItem(GUEST_SCAN_KEY, JSON.stringify({
        count: currentCount + 1,
        updatedAt: new Date().toISOString()
    }));
}

// Check if user can scan
export async function checkScanLimit(userId?: string): Promise<ScanLimitResult> {
    // Guest user - check localStorage
    if (!userId) {
        const guestCount = getGuestScanCount();
        const remaining = Math.max(0, SCAN_LIMITS.guest - guestCount);
        return {
            allowed: remaining > 0,
            remaining,
            tier: "guest",
            requiresLogin: remaining <= 0,
            requiresUpgrade: false,
        };
    }

    // Logged in user - check database
    const supabase = createClient();
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("subscription_tier, scan_count, subscription_expires_at")
        .eq("id", userId)
        .single();

    if (error || !profile) {
        // Fallback to free tier if profile not found
        return {
            allowed: true,
            remaining: SCAN_LIMITS.free,
            tier: "free",
            requiresLogin: false,
            requiresUpgrade: false,
        };
    }

    const tier = profile.subscription_tier || "free";

    // Check if subscription is expired
    if (tier === "pro" && profile.subscription_expires_at) {
        const expiresAt = new Date(profile.subscription_expires_at);
        if (expiresAt < new Date()) {
            // Subscription expired, treat as free
            const remaining = Math.max(0, SCAN_LIMITS.free - (profile.scan_count || 0));
            return {
                allowed: remaining > 0,
                remaining,
                tier: "free",
                requiresLogin: false,
                requiresUpgrade: remaining <= 0,
            };
        }
    }

    // Pro user - unlimited
    if (tier === "pro") {
        return {
            allowed: true,
            remaining: Infinity,
            tier: "pro",
            requiresLogin: false,
            requiresUpgrade: false,
        };
    }

    // Free user - check daily limit
    const scanCount = profile.scan_count || 0;
    const remaining = Math.max(0, SCAN_LIMITS.free - scanCount);

    return {
        allowed: remaining > 0,
        remaining,
        tier: "free",
        requiresLogin: false,
        requiresUpgrade: remaining <= 0,
    };
}

// Increment scan count after successful scan
export async function incrementScanCount(userId?: string): Promise<void> {
    if (!userId) {
        incrementGuestScanCount();
        return;
    }

    const supabase = createClient();

    // Increment scan count in database
    const { error } = await supabase.rpc("increment_scan_count", { user_id: userId });

    if (error) {
        console.error("Error incrementing scan count:", error);
        // Fallback: direct update
        await supabase
            .from("profiles")
            .update({ scan_count: supabase.rpc("scan_count + 1") })
            .eq("id", userId);
    }
}

// Reset daily scan count (called by cron or on first scan of the day)
export async function resetDailyScanCount(userId: string): Promise<void> {
    const supabase = createClient();
    await supabase
        .from("profiles")
        .update({ scan_count: 0 })
        .eq("id", userId);
}
