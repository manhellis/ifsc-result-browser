from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
import pandas as pd

app = Flask(__name__)
url_main = "https://ifsc.results.info"

@app.route('/get_csrf_token', methods=['GET'])
def get_csrf_token():
    session = requests.Session()
    response_main = session.get(url_main)
    soup = BeautifulSoup(response_main.text, 'html.parser')
    csrf_token = soup.find('meta', {'name': 'csrf-token'})['content']
    return jsonify({'csrf_token': csrf_token})

@app.route('/', methods=['GET'])
def default_route():
    return "Welcome to the API!"


@app.route('/api/v1/<path:subpath>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(subpath):
    # External API base URL
    external_api_base_url = "https://ifsc.results.info/api/v1/"

    # Complete external API URL by appending the subpath
    external_api_url = f"{external_api_base_url}{subpath}"

    # Forward the request to the external API
    response = requests.request(
        method=request.method,
        url=external_api_url,
        headers={key: value for key, value in request.headers if key != 'Host'},
        data=request.get_data(),
        cookies=request.cookies,
        allow_redirects=False)

    # Return the response from the external API to the client
    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = [(name, value) for (name, value) in response.raw.headers.items()
               if name.lower() not in excluded_headers]

    # Return response with the same status code and headers
    return (response.content, response.status_code, headers)

if __name__ == '__main__':
    app.run(debug=True)
