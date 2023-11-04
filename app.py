import websocket
import json
import time
from queue import Queue

# Replace with your Spring Boot WebSocket server URL
websocket_url = "ws://localhost:8080/api/v1/ws"

# Queue to store incoming requests
request_queue = Queue()

# Counter to track API endpoint calls
api_call_count = 0

# Function to connect to WebSocket server
def on_message(ws, message):
    data = json.loads(message)
    if data["type"] == "request":
        request_queue.put(data)

def on_error(ws, error):
    print(f"WebSocket Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print(f"WebSocket Closed with status code {close_status_code}: {close_msg}")

def on_open(ws):
    print("WebSocket Connected")

# Function to process requests from the queue
def process_requests():
    global api_call_count
    while True:
        if not request_queue.empty():
            request = request_queue.get()
            # Process the request or forward it to the Spring Boot application
            api_call_count += 1
            print(f"Processing Request {api_call_count}: {request}")
            time.sleep(1)  # Simulate processing time

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(websocket_url,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open

    # Start a thread to process requests
    import threading
    request_thread = threading.Thread(target=process_requests)
    request_thread.daemon = True
    request_thread.start()

    # Start WebSocket connection
    ws.run_forever()