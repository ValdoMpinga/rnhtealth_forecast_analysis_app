import { SupabaseConnection } from "./SupabaseConnection.js";
export class SupabaseHelper {
    constructor() { }
    async initialize() {
        try {
            this.connection = SupabaseConnection.getInstance(process.env.SUPABASE_KEY, process.env.SUPABASE_URL);
            const { supabase, session } = await this.connection.getSupabaseInstanceWithSession();
            this.supabase = supabase;
        }
        catch (error) {
            console.error(error);
            throw new Error("Failed");
        }
    }
    async getAnalysisData() {
        try {
            await this.initialize();
            const { data, error } = await this.supabase
                .from("analysisview")
                .select("*");
            console.log(data.length);
            // console.log(data);
            return data;
        }
        catch (error) {
            console.error("Error retrieving Bi_LSTM_Forecasts:", error);
            return null;
        }
    }
}
//# sourceMappingURL=SupabaseHelper.js.map