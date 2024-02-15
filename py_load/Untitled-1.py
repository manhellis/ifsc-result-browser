# %%
import requests
from bs4 import BeautifulSoup
import pandas as pd

# %%


# Step 1: Initial GET request to collect cookies and CSRF token
url_main = "https://ifsc.results.info"
session = requests.Session()
response_main = session.get(url_main)
cookies = response_main.cookies

# Use BeautifulSoup to parse the response and extract CSRF token
soup = BeautifulSoup(response_main.text, 'html.parser')



# %%
csrf_token = soup.find('meta', {'name': 'csrf-token'})['content']
print(csrf_token)


# %%

# Step 2: Use the collected cookies and CSRF token to make an authorized request to the API
url_api = "https://ifsc.results.info/api/v1/"
headers = {
    'X-CSRFToken': csrf_token,
    'Referer': url_main
}
response_api = session.get(url_api, headers=headers, cookies=cookies)

# Process the API response
data = response_api.json()
data['current'].keys()

# %%
data['current']['leagues']
df = pd.DataFrame(data['current']['leagues'])

# %%
import json

# Specify the file path
file_path = "data.json"

# Write the data variable to the JSON file
with open(file_path, 'w') as file:
    json.dump(data, file)


# %%


# %%
df

# %%
data['current']['url']

# %%
preset_string = "World Cups and World Championships"  # Replace "example" with your preset string

filtered_lines = [line for line in data['current']['leagues'] if line['name'] == preset_string]
print(filtered_lines)
cup_id = filtered_lines[0]['cups'][0]['id']
filtered_lines[0]['cups'][0]['id']


# %%

response_event = session.get(url_main + data['current']['url'], headers=headers, cookies=cookies)

# %%
eventData = response_event.json()

# %%
eventData['events']
for x in eventData['events']:
    if x['cup_id'] == cup_id:
        print(x['event'] + " " + str(x['event_id']))

# %%
import json
# Specify the file path
file_path = "/Users/manh/Documents/GitHub/ifsc-result-browser/py_load/eventData.json"

# Write the eventData variable to the JSON file
with open(file_path, 'w') as file:
    json.dump(eventData, file)


# %%
eventFrame = pd.DataFrame(eventData['events'])

# %%
eventFrame

# %%
filtered_eventFrame = eventFrame[eventFrame['cup_id'] == cup_id]

# %%
filtered_eventFrame

# %%

singleEventR = session.get(url_main + '/api/v1/events/1291', headers=headers, cookies=cookies)
singleEvent = singleEventR.json()
singleEvent

# %%

# Specify the file path
file_path = "singleEvent.json"

# Write the singleEvent variable to the JSON file
with open(file_path, 'w') as file:
    json.dump(singleEvent, file)


# %%
singleEvent['d_cats'][0]['category_rounds'][0]


# %%
# parse the api/event/{eventId} response and get the url of each round result api 
for e in singleEvent['d_cats'][0]['category_rounds']:
    print(e['name'], e['kind'], e['category'], e['result_url'])
    


