import json

with open("order_data.json", "r") as file:
    data = json.load(file)

Menu = data["menu"]
Orders = data["orders"]

def order_total(order):
    total = 0

    for item in order["items"]:
        for menu_item in Menu:
            if menu_item["id"] == item["menu_id"]:
                total += menu_item["price"] * item["quantity"]

    return total

def discount(total):
    if total >= 500:
        return total * 0.10
    else:
        return 0

def delivery_charge():
    return 40

def valid_order(order):
    if not order["items"]:
        print(f'Order {order["order_id"]} is empty.')
        return False

    for item in order["items"]:
        found = False

        for menu_item in Menu:
            if menu_item["id"] == item["menu_id"]:
                found = True

        if not found:
            print(f'Invalid menu item in order {order["order_id"]}.')
            return False

    return True

def process_order(order):
    if not valid_order(order):
        return

    total = order_total(order)
    discount_amount = discount(total)
    delivery = delivery_charge()
    final_total = total - discount_amount + delivery

    print(f'Order {order["order_id"]}')
    print(f'Order Total: ₹{total}')
    print(f'Discount: ₹{discount_amount}')
    print(f'Delivery Charge: ₹{delivery}')
    print(f'Final Bill: ₹{final_total}')
    print()

def highest_order():
    highest = 0
    highest_id = 0

    for order in Orders:
        if valid_order(order):
            total = order_total(order)
            discount_amount = discount(total)
            final_total = total - discount_amount + delivery_charge()

            if final_total > highest:
                highest = final_total
                highest_id = order["order_id"]

    print(f"Highest-value order: Order {highest_id}")
    print(f"Order value: ₹{highest}")

def sales_summary():
    total_revenue = 0
    total_orders = 0
    highest = 0
    highest_id = 0

    for order in Orders:
        if valid_order(order):
            total = order_total(order)
            discount_amount = discount(total)
            final_total = total - discount_amount + delivery_charge()

            total_revenue += final_total
            total_orders += 1

            if final_total > highest:
                highest = final_total
                highest_id = order["order_id"]

    file = open("sales_summary.txt", "w")

    file.write("Daily Sales Summary\n")
    file.write("-------------------\n")
    file.write(f"Total Orders: {total_orders}\n")
    file.write(f"Total Revenue: ₹{total_revenue}\n")
    file.write(f"Highest-Value Order: Order {highest_id}\n")
    file.write(f"Highest Order Value: ₹{highest}\n")

    file.close()

    print("Sales summary saved successfully.")

for order in Orders:
    process_order(order)
highest_order()
sales_summary()