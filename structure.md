https://ifsc.results.info/api/v1/
returns json in 
{current:
,seasons:
}

where current is one object of the year containing api links, cup and league info

and seasons is a list of year objects.


combine 

mongodb
json scrape of results api
store response.json as different objects
call views across the files as required

1. create schema 
2. create mongodb
3. scrape required pages through python - start with 2022 only 
3.1 upload to mongodb
4. fetch json views of mongodb and serve as react front end
x``