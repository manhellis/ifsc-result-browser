from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()
# Add CORSMiddleware to your FastAPI app
origins = [
    "http://localhost:3000",  # Add the origin of your Next.js app
    # Add any other origins you want to allow requests from
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}


@app.get("/current/{year}")
async def read_current(year: int = 2023):
    directory = "../data/output/"
    file_name = f"season_{year}.json"
    file_path = os.path.join(directory, file_name)

    # Check if the file exists
    if os.path.exists(file_path):
        # Return the file
        return FileResponse(path=file_path, media_type='application/json')
    else:
        # If the file does not exist, return a 404 error
        raise HTTPException(status_code=404, detail="Season not found")
    
    
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
    
    
index = []

# @app.on_event("startup")
def load_index():
    global index
    with open('athlete_index.json', 'r') as infile:
        index = json.load(infile)

load_index()


@app.get("/searchAthlete")
async def search_athlete(query: str = Query(None, min_length=3)):
    
    
    # Filter athletes based on the query
    results = [athlete for athlete in index if query.lower() in (athlete['firstname'].lower() + athlete['lastname'].lower() + athlete['country'].lower())]
    
    return {"results": results}