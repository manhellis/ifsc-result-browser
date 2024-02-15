from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware

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
    
    
@app.get("/event/{id}")
async def read_event(id: int = 65):
    directory = "../data/outputEvents/"
    file_name = f"event_{id}.json"
    file_path = os.path.join(directory, file_name)

    # Check if the file exists
    if os.path.exists(file_path):
        # Return the file
        return FileResponse(path=file_path, media_type='application/json')
    else:
        # If the file does not exist, return a 404 error
        raise HTTPException(status_code=404, detail="Event not found")

@app.get("/fullResults/{id}/{cid}") #id is event id, cid is category id
async def read_event(id: int = 65, cid: int = 1):
    directory = "../data/outputFullResults/"
    file_name = f"fullResults_{id}_{cid}.json"
    file_path = os.path.join(directory, file_name)

    # Check if the file exists
    if os.path.exists(file_path):
        # Return the file
        return FileResponse(path=file_path, media_type='application/json')
    else:
        # If the file does not exist, return a 404 error
        raise HTTPException(status_code=404, detail="Event or Result not found")