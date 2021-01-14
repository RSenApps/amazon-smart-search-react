import json

with open('db.json') as file:
    d = json.load(file)['products']

d_unique = []
asin = set()
for item in d:
    if item['asin'] not in asin:
        new_item = {}
        new_item['asin'] = item['asin']
        new_item['price'] = item['price']['current_price']
        new_item['rating'] = item['reviews']['rating']
        new_item['reviews'] = item['reviews']['total_reviews']
        new_item['title'] = item['title']
        d_unique.append(new_item)
        asin.add(item['asin'])

with open('db.json', 'w') as file:
    json.dump({'products' : d_unique}, file)