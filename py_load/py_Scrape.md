hit api/v1 for current/seasons

find all event urls in each season 

each
/api/v1/events/1291

has

# parse the api/event/{eventId} response and get the url of each round result api 
for e in singleEvent['d_cats'][0]['category_rounds']:
    print(e['name'], e['kind'], e['category'], e['result_url'])
    
where result_url is
/api/v1/category_rounds/7669/results

which contains the relevant results


which is all the request needed to load results (i believe)