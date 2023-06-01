import dotenv from "dotenv";
import { SupabaseHelper } from "./database/SupabaseHelper.js";
dotenv.config();
class ForecastAnalysis {
    constructor() {
        this.initialize();
    }
    async initialize() {
        await this.getForecasts();
    }
    async getForecasts() {
        this.supabaseHelper = new SupabaseHelper();
        await this.supabaseHelper.getBiLSTMForecasts();
        console.log("----------------------------------------------------------------\n");
        await this.supabaseHelper.getLSTMForecasts();
        console.log("----------------------------------------------------------------\n");
        await this.supabaseHelper.getMeasurements();
    }
}
new ForecastAnalysis();
//# sourceMappingURL=script.js.map