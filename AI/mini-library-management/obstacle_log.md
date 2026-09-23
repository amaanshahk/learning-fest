# Obstacle Log

## 1. Dictionary Access

Initially, accessing dictionary values was confusing. I learned to use keys such as `book["title"]` and `book["author"]` to access the required data.

## 2. Boolean Values

I learned that Python uses `True` and `False` for boolean values and these were used to track book availability.

## 3. Borrowing Records

A challenge was keeping the borrowing history even after a book was returned. I solved this by maintaining a separate `borrowing_records` list.

## 4. Data Persistence

The initial data existed only while the program was running. I used JSON to save books, users, and borrowing records so that the data remains available after restarting the program.

## 5. Input Validation

The program initially crashed when a non-numeric value was entered in the menu. I added `try-except` to handle invalid input without terminating the program.
