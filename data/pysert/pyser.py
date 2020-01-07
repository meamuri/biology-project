
def get_obj(row: str):
    elems = row.split(',')
    return list(map(lambda e: e.strip(), elems))


flowers = dict()

with open('../Classification.csv') as f:
    for line in f:
        obj = get_obj(line)
        print(obj)
