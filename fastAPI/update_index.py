import os
import json
from alive_progress import alive_bar
import pycountry
import pandas as pd

def get_country_name(alpha_3_code):
    country = pycountry.countries.get(alpha_3=alpha_3_code)
    return country.name if country else None

ioc = pd.read_html('https://en.wikipedia.org/wiki/List_of_IOC_country_codes')[0]
ioc = ioc.assign(Code=ioc['Code'].str[-3:]).set_index('Code')['National Olympic Committee']

def get_ioc_name(ioc_code):
    country_name = ioc.get(ioc_code)
    return country_name if country_name else None

with open('./athlete_index.json', 'r') as file:
    data = json.load(file)

with alive_bar(len(data)) as bar:
    for athlete in data:
        # out = get_country_name(alpha_3_code=athlete['country'])
        out = get_ioc_name(ioc_code=athlete['country'])
        if out is not None:
            athlete['country_name'] = out
            # Add your code here

        bar()
    
# Save the result
with open('./athlete_index.json', 'w') as file:
    json.dump(data, file)
