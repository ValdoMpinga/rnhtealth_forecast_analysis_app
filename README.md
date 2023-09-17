# RnHealth Forecast Analysis Application

This repository hosts the code responsible for evaluating the performance of RnHealth AI models, predicting indoor radon concentration. Data for analysis is collected and stored by the [RnHealth API Consumer Application](https://github.com/ValdoMpinga/persistent-rnhealth_api_consumer_app/tree/main).

## Functionality Overview:

- The application collects data for Supabase, utilizing three tables: `lstm_forecasts`, `bi_lstm_forecasts`, and `measurements`.
- Following data collection, the script calculates Mean Absolute Error (MAE), Root Mean Square Error (RMSE), and Mean Absolute Percentage Error (MAPE) for each forecast hour on both algorithms.

---

*Project Acknowledgment:*
This work is a result of the project **TECH - Technology, Environment, Creativity, and Health**, supported by Norte Portugal Regional Operational Program (NORTE 2020) under the PORTUGAL 2020 Partnership Agreement, through the European Regional Development Fund (ERDF). Project ID: Norte-01-0145-FEDER-000043.
