uvicorn main:app --reload

it works !

uvicorn main:app --ssl-keyfile ./ssl/key.pem --ssl-certfile ./ssl/cert.pem

data directory should be located by default above this fastAPI directory