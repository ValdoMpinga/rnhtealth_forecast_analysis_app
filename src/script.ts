import dotenv from "dotenv";
import { SupabaseHelper } from "./database/SupabaseHelper.js";

dotenv.config();

type Measurement = {
  LSTM_Forecast: number;
  biLSTM_Forecast: number;
  measurement: number;
};

class ForecastAnalysis {
  private supabaseHelper: SupabaseHelper;
  private forecastData: { [key: string]: Measurement[] } = {};

  constructor() {
    this.initialize();
  }

  private async initialize() {
    await this.getForecasts();
  }

  private async getForecasts() {
    this.supabaseHelper = new SupabaseHelper();
    let data = await this.supabaseHelper.getAnalysisData();

    data.forEach((data) => {
      let lstmData = JSON.parse(data.lstm_forecasts);
      let biLstmData = JSON.parse(data.bi_lstm_forecasts);
      let measurementsData = JSON.parse(data.measurements);

      measurementsData.forEach((measurement, index) => {
        const hourForecastData: Measurement = {
          LSTM_Forecast: lstmData[index].LSTM_Forecast,
          biLSTM_Forecast: biLstmData[index].biLSTM_Forecast,
          measurement: measurementsData[index].Rn,
        };

        const forecastHour = index + 1;
        this.addToForecastData(forecastHour, hourForecastData);
      });
    });

    this.calculateForecastMetrics(1);
  }

  private addToForecastData(forecastHour: number, data: Measurement) {
    const forecastKey = `${forecastHour}HourForecastData`;
    if (!this.forecastData[forecastKey]) {
      this.forecastData[forecastKey] = [];
    }
    this.forecastData[forecastKey].push(data);
  }

  private calculateForecastMetrics(forecastHour: number) {
    const forecastKey = `${forecastHour}HourForecastData`;
    const data = this.forecastData[forecastKey];

    if (!data) {
      console.log(`No forecast data found for ${forecastHour} hour(s).`);
      return;
    }

    const lstmErrors = [];
    const bilstmErrors = [];
    const lstmAbsolutePercentageErrors = [];
    const bilstmAbsolutePercentageErrors = [];

    data.forEach((item) => {
      const lstmError = Math.abs(item.LSTM_Forecast - item.measurement);
      const bilstmError = Math.abs(item.biLSTM_Forecast - item.measurement);

      lstmErrors.push(lstmError);
      bilstmErrors.push(bilstmError);

      const lstmAbsolutePercentageError = (lstmError / item.measurement) * 100;
      const bilstmAbsolutePercentageError =
        (bilstmError / item.measurement) * 100;

      lstmAbsolutePercentageErrors.push(lstmAbsolutePercentageError);
      bilstmAbsolutePercentageErrors.push(bilstmAbsolutePercentageError);
    });

    const metrics = {
      lstm: {
        mae:
          lstmErrors.reduce((sum, error) => sum + error, 0) / lstmErrors.length,
        rmse: Math.sqrt(
          lstmErrors.reduce((sum, error) => sum + Math.pow(error, 2), 0) /
            lstmErrors.length
        ),
        mape:
          lstmAbsolutePercentageErrors.reduce((sum, error) => sum + error, 0) /
          lstmAbsolutePercentageErrors.length,
      },
      bilstm: {
        mae:
          bilstmErrors.reduce((sum, error) => sum + error, 0) /
          bilstmErrors.length,
        rmse: Math.sqrt(
          bilstmErrors.reduce((sum, error) => sum + Math.pow(error, 2), 0) /
            bilstmErrors.length
        ),
        mape:
          bilstmAbsolutePercentageErrors.reduce(
            (sum, error) => sum + error,
            0
          ) / bilstmAbsolutePercentageErrors.length,
      },
    };

    console.log(`Forecasts for ${forecastHour} hour(s):`);
    console.log("LSTM Forecast:");
    console.log("MAE:", metrics.lstm.mae);
    console.log("RMSE:", metrics.lstm.rmse);
    console.log("MAPE:", metrics.lstm.mape);

    console.log("\nbiLSTM Forecast:");
    console.log("MAE:", metrics.bilstm.mae);
    console.log("RMSE:", metrics.bilstm.rmse);
    console.log("MAPE:", metrics.bilstm.mape);

    return metrics;
  }
}

new ForecastAnalysis();
