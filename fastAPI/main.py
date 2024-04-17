from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
# from fastapi.middleware.gzip import GZIPMiddleware
import ssl
import json
import datetime
import os

app = FastAPI()
# Add CORSMiddleware to your FastAPI app
origins = [
    "http://143.198.154.140",
    "http://24.144.69.193",
    "http://localhost",
    "http://*.manhellis.com",
    "http://ifsc.manhellis.com",
    "http://localhost:3000",
    "http://localhost:3001", 
]
# app.add_middleware(GZIPMiddleware, minimum_size=1000) # ensure this works later for page speed
app.add_middleware(
    CORSMiddleware, 
    
    allow_origins=origins,  # Allow specified origins
    allow_credentials=True,
    allow_methods=["GET"],  # Allow GET requests, you can add "PUT" if needed for image backend
    allow_headers=["*"],  # Allow all headers
   
)
# app.add_middleware(HTTPSRedirectMiddleware)
# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain('./ssl/cert.pem', keyfile='./ssl/key.pem')

index = []
# base_directory = "./data/"  # Base directory for the data
base_directory = os.getenv("DATA_DIR", "../data/")
# i should make this an env var for docker 

index_path = os.path.join(base_directory, 'athlete_index.json')

# Load index at startup
# @app.on_event("startup")
def load_index():
    global index
    try:
        with open(index_path, 'r') as infile:
            index = json.load(infile)
    except:
        index = []
        
load_index()

@app.get("/")
def read_root():
    return {"Manh's": "World"}

@app.get("/current/{year}")
async def read_current(year: int = 2023):
    file_path = os.path.join(base_directory, "output", f"season_{year}.json")
    if os.path.exists(file_path):
        return FileResponse(path=file_path, media_type='application/json')
    else:
        raise HTTPException(status_code=404, detail="Season not found")

@app.get("/current/")
async def read_current_redirect():
    most_recent_year = datetime.date.today().year
    return RedirectResponse(url=f"/current/{most_recent_year}")    

@app.get("/event")
async def read_event(id: int = Query(default=65, alias="id")):
    file_path = os.path.join(base_directory, "outputEvents", f"event_{id}.json")
    if os.path.exists(file_path):
        return FileResponse(path=file_path, media_type='application/json')
    else:
        raise HTTPException(status_code=404, detail="Event not found")

@app.get("/fullResults")
async def read_full_results(id: int = Query(default=65, alias="id"), cid: int = Query(default=1, alias="cid")):
    file_path = os.path.join(base_directory, "outputFullResults", f"fullResults_{id}_{cid}.json")
    if os.path.exists(file_path):
        return FileResponse(path=file_path, media_type='application/json')
    else:
        raise HTTPException(status_code=404, detail="Event or Result not found")

@app.get("/athlete")
async def read_athlete(id: int = Query(default=1612, alias="id")):
    file_path = os.path.join(base_directory, "athlete", f"athlete_{id}.json")
    if os.path.exists(file_path):
        return FileResponse(path=file_path, media_type='application/json')
    else:
        raise HTTPException(status_code=404, detail="Athlete not found")

@app.get("/searchAthlete")
async def search_athlete(query: str = Query(None, min_length=3)):
    if not index:
        raise HTTPException(status_code=501, detail="Index not found")
    else:
        query_parts = query.lower().split()
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
        
# @app.get("/all_results")
# async def read_all_results():
#     file_path = os.path.join(base_directory, "athletes.json")
#     if os.path.exists(file_path):
#         return FileResponse(path=file_path, media_type='application/json')
#     else:
#         raise HTTPException(status_code=404, detail="File not found")
    
@app.get("/all_results")
async def read_all_results(season: str = Query(None, title="Season Year"), rank: int = Query(None, title="Maximum Rank")):
    file_path = os.path.join(base_directory, "athletes.json")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    with open(file_path, "r") as file:
        data = json.load(file)

    if season is not None or rank is not None:
        filtered_data = []
        for athlete in data:
            all_results = athlete.get('all_results', [])
            # Apply filters based on the input parameters
            filtered_results = [
                result for result in all_results
                if (season is None or result.get('season') == season) and (rank is None or result.get('rank') <= rank)
            ]
            if filtered_results:
                athlete['all_results'] = filtered_results
                filtered_data.append(athlete)
        return filtered_data
    
    return data