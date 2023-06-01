import { createClient, } from "@supabase/supabase-js";
export class SupabaseConnection {
    constructor(apiKey, apiUrl) {
        this.apiKey = apiKey;
        this.apiUrl = apiUrl;
        this.supabase = createClient(apiUrl, apiKey);
    }
    static getInstance(apiKey, apiUrl) {
        if (!SupabaseConnection.instance) {
            SupabaseConnection.instance = new SupabaseConnection(apiKey, apiUrl);
        }
        return SupabaseConnection.instance;
    }
    async getAuthenticatedSupabase() {
        try {
            const session = await this.supabase.auth.signInWithPassword({
                email: process.env.SUPABASE_USER,
                password: process.env.SUPABASE_PASSWORD,
            });
            return session;
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to authenticate with Supabase");
        }
    }
    async getSupabaseInstanceWithSession() {
        try {
            const session = await this.getAuthenticatedSupabase();
            return { supabase: this.supabase, session };
        }
        catch (e) {
            console.error(e);
            throw new Error("Failed to get Supabase instance with session");
        }
    }
}
//# sourceMappingURL=SupabaseConnection.js.map