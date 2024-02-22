import os
import json
from alive_progress import alive_bar

directory_path = "../data/athlete/"
files = [f for f in os.listdir(directory_path) if f.endswith('.json')]  # List comprehension to filter JSON files
index = []

with alive_bar(len(files), title='Creating Index') as bar:  # alive_bar uses the number of files as the total count
    for filename in files:
        filepath = os.path.join(directory_path, filename)
        with open(filepath, 'r') as file:
            data = json.load(file)
            index.append({
                "athlete_id": data.get("id"),
                "firstname": data.get("firstname"),
                "lastname": data.get("lastname"),
                "country": data.get("country"),
                "birthday": data.get("birthday"),
                "gender": data.get("gender"),
                "file_path": filepath
            })
        bar()  # Update the progress bar for each file processed

with open('athlete_index.json', 'w') as outfile:
    json.dump(index, outfile)
