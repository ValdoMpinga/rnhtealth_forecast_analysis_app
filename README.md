# RnHealth Forecast Analysis Application

This GitHub repository contains the code responsible for evaluating the performance of the RnHealth AI models created to forecast indoor radon concentration. The script runs continuously until manually stopped by the developer. A scheduler triggers the script every 7 hours, utilizing the models trained and executed on the [RnHealth Backend application]([url](https://github.com/ValdoMpinga/rnhealthBackend)).

## Functionality Overview:

- Every 7 hours, the script generates 6-hour forecasts of radon concentration using the models trained in the RnHealth Backend app.
- The forecasts are stored in the Supabase database.
- On subsequent runs, 7 hours later, the script retrieves real-time measurements and stores them in the Supabase database as well.
- The script then generates new forecasts based on the updated data.

This iterative process ensures accurate and up-to-date forecasts of radon concentration.

This work is a result of the project TECH - Technology, Environment, Creativity and Health, Norte-01-0145-FEDER-000043, supported by Norte Portugal Regional Operational Program (NORTE 2020), under the PORTUGAL 2020 Partnership Agreement, through the European Regional Development Fund (ERDF).
