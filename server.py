from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from search import HybridSearcher

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

searcher = HybridSearcher("startups")


@app.get("/api/search")
def search(query: str, limit: int = 5, score_threshold: float = 0.7):
    return searcher.search(query, limit=limit, score_threshold=score_threshold)


@app.get("/api/search_city")
def search_city(query: str, city: str, limit: int = 5, score_threshold: float = 0.7):
    return searcher.search_city(
        query, city, limit=limit, score_threshold=score_threshold
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=9000)
