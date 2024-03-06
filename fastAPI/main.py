from fastapi import FastAPI, HTTPException, Query
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
import ssl
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
    allow_methods=["GET"],  # Allow GET requests, you can add "PUT" if needed for image backend
    allow_headers=["*"],  # Allow all headers
   
)
# app.add_middleware(HTTPSRedirectMiddleware)
# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain('./ssl/cert.pem', keyfile='./ssl/key.pem')

index = []
base_directory = "./data/"  # Base directory for the data
index_path = os.path.join(base_directory, 'athlete_index.json')

# Load index at startup
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
