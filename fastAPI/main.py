from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import datetime
import os

app = FastAPI()
# Add CORSMiddleware to your FastAPI app
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
    
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["GET"],  # Allow get, do i need put? if image backend.
    allow_headers=["*"],  # Allow all headers
)

index = []
index_path = './data/athlete_index.json'
directory = "./data/output/" # directory for the data
# @app.on_event("startup")
def load_index():
    global index
    with open(index_path, 'r') as infile:
        index = json.load(infile)

load_index()

@app.get("/")
def read_root():
    return {"Manh's": "World"}


@app.get("/current/{year}")
async def read_current(year: int = 2023):
    
    file_name = f"season_{year}.json"
    file_path = os.path.join(directory, file_name)

    # Check if the file exists
    if os.path.exists(file_path):
        # Return the file
        return FileResponse(path=file_path, media_type='application/json')
    else:
        # If the file does not exist, return a 404 error
        raise HTTPException(status_code=404, detail="Season not found")

@app.get("/current/")
async def read_current_redirect():
    most_recent_year = datetime.date.today().year # year get 
    return RedirectResponse(url=f"/current/{most_recent_year}")    
    
# Modified event endpoint to use query parameters
@app.get("/event")
async def read_event(id: int = Query(default=65, alias="id")):
    directory = "../data/outputEvents/"
    file_name = f"event_{id}.json"
    file_path = os.path.join(directory, file_name)

    if os.path.exists(file_path):
        return FileResponse(path=file_path, media_type='application/json')
    else:
        raise HTTPException(status_code=404, detail="Event not found")

# Modified full results endpoint to use query parameters
@app.get("/fullResults")
async def read_full_results(id: int = Query(default=65, alias="id"), cid: int = Query(default=1, alias="cid")):
    directory = "../data/outputFullResults/"
    file_name = f"fullResults_{id}_{cid}.json"
    file_path = os.path.join(directory, file_name)

    if os.path.exists(file_path):
        return FileResponse(path=file_path, media_type='application/json')
    else:
        raise HTTPException(status_code=404, detail="Event or Result not found")

@app.get("/athlete")
async def read_athlete(id: int = Query(default=1612, alias="id")):
    directory = "../data/athlete/"
    file_name = f"athlete_{id}.json"

    file_path = os.path.join(directory, file_name)
    if os.path.exists(file_path):
        return FileResponse(path=file_path, media_type='application/json')
    else:
        raise HTTPException(status_code=404, detail="Athlete not found")
    
    



@app.get("/searchAthlete")
async def search_athlete(query: str = Query(None, min_length=3)):
    # Assuming 'index' is loaded or defined earlier with athlete data
    # Split the query into parts
    query_parts = query.lower().split()

    # Filter athletes based on the query parts
    results = [
        athlete for athlete in index
        if all(
            part in (
                athlete['firstname'].lower() + " " + 
                athlete['lastname'].lower() + " " + 
                (athlete['country'].lower() if athlete['country'] else "") + " " + 
                (athlete.get('country_name', '').lower() if athlete.get('country_name') else "") + " " + 
                (athlete['birthday'] if athlete['birthday'] else "")
            )
            for part in query_parts
        )
    ]
    
    return {"results": results}

    


