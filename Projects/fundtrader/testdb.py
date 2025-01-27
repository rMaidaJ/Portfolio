import MySQLdb

# Create a connection
connection = MySQLdb.connect(
    host="localhost",
    user="root",
    passwd="M3ll0Tr0n!",
    database="fundtrader"
)

# Create a cursor
cursor = connection.cursor()

# Test query
cursor.execute("SELECT VERSION()")
data = cursor.fetchone()
print(f"Database version: {data[0]}")

# Close connection
cursor.close()
connection.close()