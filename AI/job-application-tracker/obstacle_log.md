# Obstacle Log

## 1. Handling Multiple Interview Applications
Initially, the summary stored only one Interview-stage application. This was changed to use a list so that all applications currently at the Interview stage could be displayed.

## 2. Saving the Complete Report
The report needed to contain both the application summary and the complete list of applications. A separate `save_report()` function was created to calculate the status counts and write all application details to a text file.

## 3. Status Validation
Applications could initially be entered with any status. Validation was added so that only Applied, Interview, Selected, or Rejected can be entered.