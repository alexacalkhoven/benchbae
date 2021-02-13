import pandas as pd

df = pd.read_csv("../data/Parks_Seating.csv")
conn = psycopg


for row in df.itertuples(index=False):
    print(row)

