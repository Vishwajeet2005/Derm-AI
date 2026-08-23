import requests

def search(q):
    url = f'https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch={q}&gsrlimit=1&prop=pageimages&format=json&piprop=original'
    res = requests.get(url, headers={'User-Agent': 'DermAI-Bot/1.0'}).json()
    pages = res.get('query', {}).get('pages', {})
    for _, p in pages.items():
        if 'original' in p:
            return p['original']['source']
    return None

print(search('Acney'))
print(search('Ringworm'))
print(search('Eczema'))
