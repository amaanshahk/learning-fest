import json
from datetime import date, timedelta

with open("library_data.json", "r") as file:
    data = json.load(file)

Books = data["books"]
Users = data["users"]
BorrowingRecords = data["borrowing_records"]

def add_book():
    title = input("Enter title: ")
    author = input("Enter author: ")

    Books.append({
        "title": title,
        "author": author,
        "availability": True,
        "borrower": "",
        "borrow_date": "",
        "due_date": ""
    })

    save_data()
    print("Book added successfully.")

def search_book():
    book_name = input("Enter book title: ")

    for i in Books:
        if i["title"].lower() == book_name.lower():
            print(f'Title: {i["title"]}')
            print(f'Author: {i["author"]}')
            print(f'Availability: {"Available" if i["availability"] else "Borrowed"}')

            if not i["availability"]:
                print(f'Borrower: {i["borrower"]}')
                print(f'Due Date: {i["due_date"]}')

            return i

    print("No matches were found.")

def borrow_book():
    book = search_book()

    if book:
        uid = int(input("Enter user id: "))
        name = "NIL"

        for i in Users:
            if i["user_id"] == uid:
                name = i["name"]

        if name == "NIL":
            print("User doesn't exist.")
            return

        if book["availability"]:
            book["borrower"] = name
            book["borrow_date"] = str(date.today())
            book["due_date"] = str(date.today() + timedelta(days=14))
            book["availability"] = False

            BorrowingRecords.append({
                "title": book["title"],
                "borrower": name,
                "borrow_date": book["borrow_date"],
                "due_date": book["due_date"]
            })

            save_data()
            print("Book borrowed successfully.")

        else:
            print("Book is already borrowed.")

    else:
        print("Book doesn't exist.")

def return_book():
    book = search_book()

    if book:
        if not book["availability"]:
            book["availability"] = True
            book["borrower"] = ""
            book["borrow_date"] = ""
            book["due_date"] = ""

            save_data()
            print("Book returned successfully.")

        else:
            print("Book isn't currently borrowed.")

    else:
        print("Book doesn't exist.")

def libsum():
    bcount = 0
    borrowed = 0
    available = 0

    for i in Books:
        if i["availability"]:
            available += 1
        else:
            borrowed += 1

        bcount += 1

    print(f"Total books: {bcount}")
    print(f"Available books: {available}")
    print(f"Borrowed books: {borrowed}")

def overdue():
    ocount = 0

    for i in Books:
        if not i["availability"]:
            if date.fromisoformat(i["due_date"]) < date.today():
                print(f'{i["title"]} is overdue by user {i["borrower"]}')
                ocount += 1

    if ocount == 0:
        print("No books are overdue")

def brecords():
    file = open("borrowing_records.txt", "w")

    for i in BorrowingRecords:
        file.write(f'Title: {i["title"]}\n')
        file.write(f'Borrower: {i["borrower"]}\n')
        file.write(f'Borrow Date: {i["borrow_date"]}\n')
        file.write(f'Due Date: {i["due_date"]}\n')
        file.write("\n")

    file.close()
    print("Borrowing records saved successfully.")

def save_data():
    data = {
        "books": Books,
        "users": Users,
        "borrowing_records": BorrowingRecords
    }

    with open("library_data.json", "w") as file:
        json.dump(data, file, indent=4)

while True:

    try:
        choice = int(input("""-Library Operations-
    1. Add Book
    2. Search Book
    3. Borrow Book
    4. Return Book
    5. Library Summary
    6. Check Overdue Books
    7. Save Borrowing Records
    8. Exit
    Enter your choice: """))
    except ValueError:
        print("Please enter a number.")
        continue

    match choice:
        case 1:
            add_book()

        case 2:
            search_book()

        case 3:
            borrow_book()

        case 4:
            return_book()

        case 5:
            libsum()

        case 6:
            overdue()

        case 7:
            brecords()

        case 8:
            break

        case _:
            print("Invalid choice.")