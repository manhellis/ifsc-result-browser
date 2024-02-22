import os
import json
from alive_progress import alive_bar
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor

class HTTPClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.csrf_token = None;

    def get_csrf_token(self, url):
        response = self.session.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        self.csrf_token = soup.find('meta', {'name': 'csrf-token'})['content'] 
        return soup.find('meta', {'name': 'csrf-token'})['content']

    def get_api_response(self, api_endpoint):
        if self.csrf_token is None:
            self.csrf_token = self.get_csrf_token(self.base_url)
        headers = {'X-CSRFToken': self.csrf_token, 'Referer': self.base_url + api_endpoint}
        response = self.session.get(self.base_url + api_endpoint, headers=headers)
        
        # Check if the response was successful
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API request failed with status code {response.status_code}")

    def close(self):
        self.session.close()



def search_athlete_ids(directory):
    def recursive_search(data, ids_set):
        if isinstance(data, dict):
            if 'athlete_id' in data:
                ids_set.add(data['athlete_id'])
            for value in data.values():
                recursive_search(value, ids_set)
        elif isinstance(data, list):
            for item in data:
                recursive_search(item, ids_set)

    athlete_ids_set = set()
    files = [f for f in os.listdir(directory) if f.endswith('.json')]
    
    with alive_bar(len(files), title='Processing JSON files') as bar:
        for filename in files:
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r') as file:
                data = json.load(file)
                recursive_search(data, athlete_ids_set)
            bar()  # Update the progress bar for each file processed

    return list(athlete_ids_set)


def save_variable_as_json(variable, filename):
    with open(filename, 'w') as file:
        json.dump(variable, file)

def get_athlete_data(athlete_id):
    return client.get_api_response(f"/api/v1/athletes/{athlete_id}")

def fetch_and_save_athlete_data(athlete_id):
    try:
        data = get_athlete_data(str(athlete_id))
        save_variable_as_json(data, f"athlete_{athlete_id}.json")
        print(f'saved athlete_{athlete_id}.json')
        return True
    except Exception as e:
        print(f"Error fetching data for athlete {athlete_id}: {e}")
        return False

# Multithreaded fetch and save
def process_athlete_data_multithreaded(athlete_ids):
    with alive_bar(len(athlete_ids)) as bar:
        with ThreadPoolExecutor(max_workers=10) as executor:
            futures = [executor.submit(fetch_and_save_athlete_data, athlete_id) for athlete_id in athlete_ids]
            for future in futures:
                future.result()  # Wait for each task to complete
                bar()  # Update progress bar
                
client = HTTPClient("https://ifsc.results.info")

# Usage example
example_url = "/api/v1/athletes/2276"
directory_path = "../data/outputFullResults/"
athlete_ids_list = search_athlete_ids(directory_path)
print(f'Found {len(athlete_ids_list)} unique athlete ids.')

# save_variable_as_json(client.get_api_response(f"{example_url}"), "example_athlete.json")
# print('saved example_athlete.json')
base_url = "https://ifsc.results.info"
api_url = "/api/v1/athletes/"
# with alive_bar(len(athlete_ids_list)) as bar:
#     for athlete_id in athlete_ids_list:
#         # print(base_url + api_url + str(athlete_id))
#         save_variable_as_json(get_athlete_data(str(athlete_id)), f"athlete_{athlete_id}.json")
#         bar()  # Update the progress bar for each athlete processed
#         print(f'saved athlete_{athlete_id}.json')

    


# Usage
process_athlete_data_multithreaded(athlete_ids_list)