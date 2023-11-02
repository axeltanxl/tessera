import time
from queue import Queue
import requests

# Initialize a request queue
request_queue = Queue()

# Define the URL of your Spring Boot application
spring_boot_url = "http://localhost:8080"  # Replace with your Spring Boot app's URL

class Request:
    def __init__(self, data):
        self.data = data

def get_current_traffic():
    # Simulate fetching traffic metrics from your Spring Boot app
    try:
        response = requests.get(f"{spring_boot_url}/actuator/metrics/http.server.requests")
        if response.status_code == 200:
            data = response.json()
            return data["measurements"][0]["value"]
        else:
            return 0
    except Exception as e:
        print(f"Error measuring traffic: {e}")
        return 0

def monitor_traffic():
    while True:
        current_traffic = get_current_traffic()
        print(f"Current Traffic: {current_traffic} requests/second")
        if current_traffic >= 10:  # Adjust the threshold as needed
            enqueue_request()
        time.sleep(1)

def enqueue_request():
    request_data = f"Request Data - {time.time()}"
    request_queue.put(Request(data=request_data))
    print(f"Enqueued Request: {request_data}")

if __name__ == "__main__":
    try:
        monitor_traffic()

        while True:
            if not request_queue.empty():
                request = request_queue.get()
                # Process and forward the request to your Spring Boot app as needed
                response = requests.post(f"localhost:8080/api/v1", json={"data": request.data})
                print(f"Response from Spring Boot: {response.status_code}")
    except KeyboardInterrupt:
        print("Monitoring and processing stopped.")