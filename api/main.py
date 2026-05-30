from fastapi import FastAPI

# Initialize the FastAPI application
app = FastAPI()

# Define a root endpoint (GET request to "/")
@app.get("/")
def read_root():
    return {"message": "Hello, World! Your FastAPI app is up and running."}

# Define a dynamic endpoint with a path parameter
@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query_param": q}