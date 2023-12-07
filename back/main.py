from fastapi import FastAPI
from get_data import ParseData
from fastapi.middleware.cors import CORSMiddleware
import polars as pl

data = ParseData()
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/getEnergies')
def getEnergies(year):
    return data.getEnergies(str(year))

@app.get('/getPollution')
def getPollution(year):
    return data.getPollution(str(year))

@app.get('/getInfoEnergy')
def getInfoEnergy(energy, year):
    return data.getInfoEnergy(energy, year)

@app.get('/getOverYears')
def getOverYears(energy):
    return data.getOverYears(energy)