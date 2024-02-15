import requests
from bs4 import BeautifulSoup
import pandas as pd
import os
import json

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

class DataParser:
    @staticmethod
    def process_api_home(data):
        df = pd.DataFrame(data['seasons'])
        # print(df)
        # Processing logic for /api/v1/
        # ...
        return df

    @staticmethod
    def process_api_season(data):
        return data
        # df = pd.DataFrame(data['events'])
        # print(data['events']['event'])
        # Processing logic for /api/v1/seasons/##
        # ...

class DataExporter:
    @staticmethod
    def export_to_json(data, filepath):
        output_dir = "outputFullResults" # change for directory head
        os.makedirs(output_dir, exist_ok=True)

        # Export the JSON object to a file
        output_file = os.path.join(output_dir, filepath)
        with open(output_file, "w") as file:
            json.dump(data, file)
    
    def export_list_to_json(self, data, filepath):
        for index, item in enumerate(data):
            self.export_to_json(item, f"{filepath}_{index}")

    # Additional methods for other export formats or databases

class Scraper:
    
    def __init__(self, base_url):
        self.client = HTTPClient(base_url)
        self.home_data = None
        self.seasonList = []

    def scrape_season_data(self, season_api): # is this redundant?
        season_data = self.client.get_api_response(season_api)
        return DataParser.process_api_season(season_data)

    def run(self):
        # home_api = "/api/v1/"
        # self.home_data = self.client.get_api_response(home_api)
        # home_df = DataParser.process_api_home(self.home_data)
        
        # print(home_df)  # Uncomment this line to print the home_df DataFrame
        
        # for url in home_df['url']:  # Assuming 'url' is a column in the data frame
        #     season = DataParser.process_api_season(self.client.get_api_response(url))
        #     self.seasonList.append(season)
            # Process season_df or store it for further use
            
        # Save each item in seasonList as a JSON file
        # for index, item in enumerate(self.seasonList):
        #     filepath = f"season_{index}.json"
        #     DataExporter.export_to_json(item, filepath)
            
        # output_directory = "/Users/manh/Documents/GitHub/ifsc-result-browser/output"
        # a = []
        # for filename in os.listdir(output_directory):
        #     if filename.endswith(".json"):
        #         filepath = os.path.join(output_directory, filename)
        #         with open(filepath) as file:
        #             data = json.load(file)
        #             for event in data['events']:
        #                 # print(event['event'])
        #                 a.append(event)
        # outEvents = []
        # print('events loaded, saving.')
        # df = pd.DataFrame(a)
        # # df['url'].head()
        # print(f"{df['url'].size} events found, beginning saving" )
        # output_directory2 = "/Users/manh/Documents/GitHub/ifsc-result-browser/outputEvents"
        # existingEvents = []
        # for filename in os.listdir(output_directory2):
        #     existingEvents.append(filename)
            
        # for url, event_id in zip(df['url'], df['event_id']):
        #     if f"event_{event_id}.json" in existingEvents:
        #         print(f"event_{event_id}.json already exists, skipping")
        #         continue

        #     try:
        #         event = self.client.get_api_response(url)
        #         outEvents.append(event)
        #         filepath = f"event_{event['id']}.json"
        #         DataExporter.export_to_json(event, filepath)
        #         print(filepath + ' saved')
        #     except Exception as e:
        #         print(f"An error occurred with event_id {event_id}: {e}")
        #         continue
 
        #  Save each item in seasonList as a JSON file
        # for index, item in enumerate(outEvents):
        #     filepath = f"event_{index}.json"
        #     DataExporter.export_to_json(item, filepath)
        # print('saved')
        # results scraping begins
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
        # print(df)
        print(df.keys())
        # df.to_csv('output.csv', index=False)
        # for url, event_id in zip(df['url'],df['event_id']):
        #     # print(line.url + line.event_id)
        #     print(url + " " + str(event_id))

        # print(df[['url', 'event_id']])
        existingFullResults = []
        output_directory3 = "/Users/manh/Documents/GitHub/ifsc-result-browser/outputFullResults"
        for filename in os.listdir(output_directory3):
            existingFullResults.append(filename)
        
        print(f"{df.size} events found, beginning saving")
        for full_results_url, dcat_name, event_id, dcat_id, ranking_as_of in zip(df['full_results_url'], df['dcat_name'], df['event_id'], df['dcat_id'], df['ranking_as_of']):
            print(f"{full_results_url} {dcat_name} {event_id} {dcat_id} {ranking_as_of}")
            if f"fullResults_{event_id}_{dcat_id}.json" in existingFullResults:
                print(f"fullResults_{event_id}_{dcat_id}.json already exists, skipping")
                continue

            try:
                event = self.client.get_api_response(full_results_url)
                filepath = f"fullResults_{event_id}_{dcat_id}.json"
                DataExporter.export_to_json(event, filepath)
                print(filepath + ' saved')
            except Exception as e:
                print(f"An error occurred with fullResult_{event_id}_{dcat_id}: {e}")
                continue 
            
        # Additional scraping logic
        self.client.close()

# Usage
scraper = Scraper("https://ifsc.results.info")
scraper.run()
