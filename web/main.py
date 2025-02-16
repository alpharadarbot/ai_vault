from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 在生產環境中應該設置具體的域名
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 掛載靜態文件目錄
app.mount("/images", StaticFiles(directory="dist/images"), name="images")
# 掛載整個 dist 目錄作為靜態文件目錄
app.mount("/", StaticFiles(directory="dist", html=True), name="static")

# 處理根路徑請求
@app.get("/")
async def read_root():
    return FileResponse("dist/index.html")

# 健康檢查端點
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    print("Starting server on http://0.0.0.0:8888")
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8888,
        log_level="info"
    )