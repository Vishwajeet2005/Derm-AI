import requests

def search(q):
    url = f'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&redirects=1&titles={q}'
    res = requests.get(url, headers={'User-Agent': 'DermAI-Bot/1.0'}).json()
    pages = res.get('query', {}).get('pages', {})
    for _, p in pages.items():
        if 'original' in p:
            return p['original']['source']
    return None

print(search('Acne Vulgaris'))
print(search('Eczema'))
print(search('Psoriasis'))
