from fastapi import FastAPI

from search import HybridSearcher

app = FastAPI()

searcher = HybridSearcher("startups")


@app.get("/api/search")
def search(query: str):
    return searcher.search(query)


@app.get("/api/search_city")
def search_city(query: str, city: str):
    return searcher.search_city(query, city)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=9000)
