# %%
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd
import json



# %%
def scrape_static_content(url, url_api): # take any base url (ifsc.result.info) and the api url_api param then return json object of the api response
    # Step 1: Initial GET request to collect cookies and CSRF token
    session = requests.Session()
    response_main = session.get(url)
    cookies = response_main.cookies
    # Use BeautifulSoup to parse the response and extract CSRF token
    soup = BeautifulSoup(response_main.text, 'html.parser')

    csrf_token = soup.find('meta', {'name': 'csrf-token'})['content']
    print(csrf_token)

    
    headers = {
        'X-CSRFToken': csrf_token,
        'Referer': url + url_api
    }
    response_api = session.get(url + url_api, headers=headers, cookies=cookies)

    # Process the API response
    processed_data = response_api.json()
    
    # processed_data['current'].keys()

    session.close()  # Close the session object
    return processed_data

# %%
def scrape_dynamic_content(url):
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.get(url)
    # Implement the logic to interact with the page and extract data
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    # Extract and process data from soup
    driver.quit()
    return processed_data

# Additional scraping functions...


# %%
def process_scraped_data(data):
    # Process and transform the scraped data
    # This could involve cleaning data, restructuring it, or performing calculations
    return processed_data

# Additional data processing functions...


# %%
def export_data_to_json(data, filepath):
    with open(filepath, 'w') as file:
        json.dump(data, file)

def export_data_to_database(data, db_connection):
    # Implement logic to export data to a database
    pass

# Additional exporting functions...


# %%
def process_api_home(data): # takes in /api/v1/ and returns current api year, filter data, new api links etc.
    current_api = data['current']['url']
    preset_string = "World Cups and World Championships"  # Replace "example" with your preset string

    filtered_lines = [line for line in data['current']['leagues'] if line['name'] == preset_string]
    print(filtered_lines)
    cup_id = filtered_lines[0]['cups'][0]['id']
    filtered_lines[0]['cups'][0]['id']
    print(f'current season api: {data["current"]["url"]}')

# %%
def process_api_season(data): #takes in json /apo/v1/seasons/## and return data for that season
    data['events']
    for x in data['events']:
        if x['cup_id'] == cup_id:
            print(x['event'] + str(x['event_id']))

# %%
url_api = "/api/v1/" # get the current season api url from here 
# /v1/ response contains filtering data to select different cups, seasons, years etc.
# current is the current year, seasons contains all the past season and cup data.
url_main = "https://ifsc.results.info"
api_home_response = scrape_static_content(url_main, url_api)


# %%
#home df represents a list of season objects that contain all the data for each season
homeDf = pd.DataFrame(api_home_response['seasons'])
homeDf.head()


# %%
homeDf.url

# %%
# homeDf.apply(lambda x: x.leagues)
homeDf['leagues'].apply(lambda x: [print(x[0]['name'] + " " + str(x[0]['id']))])


# %%
selected_year = "2022"  # Replace "2022" with your selected year
# selected_row = homeDf[homeDf['leagues'].apply(lambda x: any(item['name'] == selected_year for item in x))]
selected_row = homeDf[homeDf['name'] == selected_year]
selected_row.leagues[2]
# homeDf.leagues[0]

# %%


# %%
selected_league = 'World Cups and World Championships'
league_id = selected_row.leagues[2][0]['id']
print(league_id)


# %%
process_api_home(api_home_response)

# %%
api_currentSeason_url = api_home_response['current']['url'] 
print(api_currentSeason_url)

# %%


# %%
api_currentSeason_response  = scrape_static_content(url_main, api_currentSeason_url)

# %%
api_currentSeason_response['events']
df = pd.DataFrame(api_currentSeason_response['events'])
df.head()

# %%
df.url

# %%



