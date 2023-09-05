import pandas as pd
from pymongo import MongoClient


def csv_to_mongodb(csv_file, mongo_uri, db_name, collection_name):
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(csv_file)

    # Convert the DataFrame to a list of dictionaries
    records = df.to_dict(orient='records')

    # Connect to the remote MongoDB instance
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]

    # Insert records into the MongoDB collection
    collection.insert_many(records)


if __name__ == "__main__":
    csv_file_path = 'videos.csv'
    mongo_connection_uri = 'mongodb+srv://kikogoncalves:XlYJBZmCAYe2qfSE@finishershub.fkag1ww.mongodb.net/finishers-club?retryWrites=true&w=majority'
    database_name = 'finishers-club'
    coll_name = 'Videos'

    csv_to_mongodb(csv_file_path, mongo_connection_uri, database_name, coll_name)
