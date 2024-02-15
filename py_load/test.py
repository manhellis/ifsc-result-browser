import os
import json
import pandas as pd

output_directory = "/Users/manh/Documents/GitHub/ifsc-result-browser/outputEvents"
a = []
for filename in os.listdir(output_directory):
    if filename.endswith(".json"):
        filepath = os.path.join(output_directory, filename)
        with open(filepath) as file:
            data = json.load(file)
            for event in data['d_cats']:
                # print(event['event'])
                a.append(event)
                
df = pd.DataFrame(a)
print(df)
print(df.keys())
# df.to_csv('output.csv', index=False)
# for url, event_id in zip(df['url'],df['event_id']):
#     # print(line.url + line.event_id)
#     print(url + " " + str(event_id))

# print(df[['url', 'event_id']])
for full_results_url, dcat_name, event_id, dcat_id, ranking_as_of in zip(df['full_results_url'], df['dcat_name'], df['event_id'], df['dcat_id'], df['ranking_as_of']):
    print(f"{full_results_url} {dcat_name} {event_id} {dcat_id} {ranking_as_of}")
    
print(df.size) 