import json

with open("application_data.json", "r") as file:
    Applications = json.load(file)

def add_application():
    company = input("Enter company name: ")
    role = input("Enter role: ")
    status = input("Enter status: ")
    while status not in ["Applied", "Interview", "Selected", "Rejected"]:
        print("Invalid status.")
        status = input("Enter status: ")
    application_date = input("Enter application_date: ")
    Applications.append({"company": company, "role": role, "status": status, "application_date": application_date})

def search_status():
    status = input("Enter status: ")
    for i in Applications:
        if i["status"] == status:
            print(i)

def search_company():
    company = input("Enter company name: ")
    for i in Applications:
        if i["company"] == company:
            print(i)

def update_status():
    company = input("Enter company name: ")
    role = input("Enter role: ")
    status = input("Enter status: ")

    while status not in ["Applied", "Interview", "Selected", "Rejected"]:
        print("Invalid status.")
        status = input("Enter status: ")

    found = False

    for i in Applications:
        if i["company"] == company and i["role"] == role:
            i["status"] = status
            found = True

    if not found:
        print("Application not found.")

def summary():
    applied = 0
    interview = 0
    selected = 0
    rejected = 0
    interview_applications = []
    for i in Applications:
        if i["status"] == "Applied": applied+=1
        elif i["status"] == "Interview": 
            interview+=1
            interview_applications.append(i)
        elif i["status"] == "Selected": selected+=1
        elif i["status"] == "Rejected": rejected+=1
    print(f"\n -Application by Status- \n Applied: {applied} \n Interview: {interview} Selected: {selected} \n Rejected: {rejected} \n")
    for i in interview_applications:
        print(f"Company: {i['company']}")
        print(f"Role: {i['role']}")

def save_report():
    applied = 0
    interview = 0
    selected = 0
    rejected = 0

    for i in Applications:
        if i["status"] == "Applied": applied+=1
        elif i["status"] == "Interview": 
            interview+=1
        elif i["status"] == "Selected": selected+=1
        elif i["status"] == "Rejected": rejected+=1
    with open("job_tracker_report.txt","w") as file:
        file.write("")
        file.write("-Summary-\n")
        file.write(f"Applied; {applied}\n")
        file.write(f"Interview: {interview}\n")
        file.write(f"Selected: {selected}\n")
        file.write(f"Rejected: {rejected}\n")

        file.write("\n-Applications-\n")
        for i in Applications:
            file.write(f"Company: {i['company']}\n")
            file.write(f"Role: {i['role']}\n")
            file.write(f"Status: {i['status']}\n")
            file.write(f"Application Date: {i['application_date']}\n")
            file.write("\n")


while True:

    try:
        choice = int(input("""-Job Tracking Operations-
    1. Add Application
    2. Search Status
    3. Search Company
    4. Update Status
    5. Summary
    6. Save Report
    7. Exit
    Enter your choice: """))
    except ValueError:
        print("Please enter a number.")
        continue

    match choice:
        case 1:
            add_application()

        case 2:
            search_status()

        case 3:
            search_company()

        case 4:
            update_status()

        case 5:
            summary()

        case 6:
            save_report()

        case 7:
            break

        case _:
            print("Invalid choice.")