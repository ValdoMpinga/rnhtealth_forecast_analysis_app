import dotenv from "dotenv";
import { SupabaseConnection } from "./database/SupabaseConnection.js";
import { SupabaseHelper } from "./database/SupabaseHelper.js";
import { SupabaseClient, AuthResponse } from "@supabase/supabase-js";

dotenv.config();

class ForecastAnalysis {
  private supabase: SupabaseClient;
  private supabaseHelper: SupabaseHelper;
  private connection: SupabaseConnection;
  private isInitialized: boolean;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    await this.getForecasts();
  }

  private async getForecasts() {
      this.supabaseHelper = new SupabaseHelper();
      
    await this.supabaseHelper.getBiLSTMForecasts();
    console.log(
      "----------------------------------------------------------------\n"
    );

    await this.supabaseHelper.getLSTMForecasts();

    console.log(
      "----------------------------------------------------------------\n"
    );

    await this.supabaseHelper.getMeasurements();
  }
}

new ForecastAnalysis();
