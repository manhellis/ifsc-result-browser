from flask import Flask, request
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)


# Global variable to store CSRF token
CSRF_TOKEN = None

# Initialize a session object globally
session = requests.Session()


def initialize_api():
    global CSRF_TOKEN
    # Perform a GET request to the external API to fetch the CSRF token
    response = session.get('https://ifsc.results.info')
    cookies = response.cookies
    soup = BeautifulSoup(response.text, 'html.parser')
    CSRF_TOKEN = soup.find('meta', {'name': 'csrf-token'})['content']
    # Update session headers with the CSRF token
    session.headers.update({'X-CSRFToken': CSRF_TOKEN})

initialize_api()

@app.route('/proxy/<path:subpath>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def proxy(subpath):
    target_url = f'https://ifsc.results.info/"{subpath}'

    # Forward the request to the external API
    response = session.request(
        method=request.method,
        url=target_url,
        allow_redirects=False
    )

    # Exclude certain headers from the forwarded response
    excluded_headers = ['content-encoding', 'content-length', 'transfer-encoding', 'connection']
    headers = {name: value for (name, value) in response.raw.headers.items()
               if name.lower() not in excluded_headers}

    # Send the response from the external API back to the client
    return (response.content, response.status_code, headers)

if __name__ == '__main__':
    app.run(debug=True)
