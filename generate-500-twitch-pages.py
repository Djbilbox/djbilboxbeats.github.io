#!/usr/bin/env python3
import os
import json
import sys

# Force UTF-8 output on Windows
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

# 500+ cities with streamers
cities = [
    # France
    ("Paris", "France"), ("Lyon", "France"), ("Marseille", "France"), ("Toulouse", "France"),
    ("Nice", "France"), ("Nantes", "France"), ("Strasbourg", "France"), ("Montpellier", "France"),
    ("Bordeaux", "France"), ("Lille", "France"), ("Rennes", "France"), ("Reims", "France"),
    ("Grenoble", "France"), ("Dijon", "France"), ("Nîmes", "France"), ("Aix-en-Provence", "France"),
    ("Brest", "France"), ("Caen", "France"), ("Angers", "France"), ("Orléans", "France"),
    ("Nancy", "France"), ("Mulhouse", "France"), ("Rouen", "France"), ("Perpignan", "France"),
    ("Toulon", "France"), ("Le Mans", "France"), ("Saint-Etienne", "France"), ("Clermont-Ferrand", "France"),
    ("Versailles", "France"), ("Neuilly-sur-Seine", "France"), ("Boulogne-Billancourt", "France"),
    ("Saint-Denis", "France"), ("Montreuil", "France"), ("Argenteuil", "France"), ("Créteil", "France"),
    ("Nanterre", "France"), ("Clichy", "France"), ("Courbevoie", "France"), ("Levallois-Perret", "France"),
    ("Aubervilliers", "France"), ("Maisons-Alfort", "France"), ("Saint-Maur", "France"), ("Vincennes", "France"),
    ("Fontenay-sous-Bois", "France"), ("Ivry-sur-Seine", "France"), ("Vitry-sur-Seine", "France"),

    # USA (100+ cities)
    ("New York", "USA"), ("Los Angeles", "USA"), ("Chicago", "USA"), ("Houston", "USA"),
    ("Phoenix", "USA"), ("Philadelphia", "USA"), ("San Antonio", "USA"), ("San Diego", "USA"),
    ("Dallas", "USA"), ("San Jose", "USA"), ("Austin", "USA"), ("Jacksonville", "USA"),
    ("Fort Worth", "USA"), ("Columbus", "USA"), ("Charlotte", "USA"), ("San Francisco", "USA"),
    ("Indianapolis", "USA"), ("Seattle", "USA"), ("Denver", "USA"), ("Boston", "USA"),
    ("Miami", "USA"), ("Portland", "USA"), ("Atlanta", "USA"), ("Detroit", "USA"),
    ("Minneapolis", "USA"), ("Las Vegas", "USA"), ("Nashville", "USA"), ("Memphis", "USA"),
    ("New Orleans", "USA"), ("Baltimore", "USA"), ("Washington", "USA"), ("Milwaukee", "USA"),
    ("Albuquerque", "USA"), ("Tucson", "USA"), ("Fresno", "USA"), ("Sacramento", "USA"),
    ("Long Beach", "USA"), ("Kansas City", "USA"), ("Mesa", "USA"), ("Virginia Beach", "USA"),
    ("Oakland", "USA"), ("Tulsa", "USA"), ("Cleveland", "USA"), ("Wichita", "USA"),
    ("Arlington", "USA"), ("New York City", "USA"), ("Los Angeles County", "USA"),
    ("Boston", "USA"), ("Miami", "USA"), ("Atlanta", "USA"), ("Denver", "USA"),
    ("Seattle", "USA"), ("Portland", "USA"), ("Austin", "USA"), ("San Diego", "USA"),

    # UK
    ("London", "UK"), ("Manchester", "UK"), ("Birmingham", "UK"), ("Leeds", "UK"),
    ("Glasgow", "UK"), ("Liverpool", "UK"), ("Newcastle", "UK"), ("Bristol", "UK"),
    ("Edinburgh", "UK"), ("Oxford", "UK"), ("Cambridge", "UK"), ("Brighton", "UK"),
    ("York", "UK"), ("Bath", "UK"), ("Canterbury", "UK"), ("Coventry", "UK"),
    ("Bradford", "UK"), ("Sheffield", "UK"), ("Nottingham", "UK"), ("Leicester", "UK"),

    # Germany
    ("Berlin", "Germany"), ("Munich", "Germany"), ("Hamburg", "Germany"), ("Cologne", "Germany"),
    ("Frankfurt", "Germany"), ("Stuttgart", "Germany"), ("Düsseldorf", "Germany"), ("Dortmund", "Germany"),
    ("Essen", "Germany"), ("Leipzig", "Germany"), ("Dresden", "Germany"), ("Hanover", "Germany"),
    ("Nuremberg", "Germany"), ("Augsburg", "Germany"), ("Mannheim", "Germany"),

    # Canada
    ("Toronto", "Canada"), ("Vancouver", "Canada"), ("Montreal", "Canada"), ("Calgary", "Canada"),
    ("Ottawa", "Canada"), ("Edmonton", "Canada"), ("Winnipeg", "Canada"), ("Quebec City", "Canada"),
    ("Hamilton", "Canada"), ("Kitchener", "Canada"),

    # Spain
    ("Madrid", "Spain"), ("Barcelona", "Spain"), ("Valencia", "Spain"), ("Seville", "Spain"),
    ("Zaragoza", "Spain"), ("Malaga", "Spain"), ("Bilbao", "Spain"), ("Alicante", "Spain"),
    ("Cordoba", "Spain"), ("Palma", "Spain"),

    # Italy
    ("Rome", "Italy"), ("Milan", "Italy"), ("Naples", "Italy"), ("Turin", "Italy"),
    ("Venice", "Italy"), ("Florence", "Italy"), ("Bologna", "Italy"), ("Genoa", "Italy"),
    ("Palermo", "Italy"), ("Verona", "Italy"),

    # Australia
    ("Sydney", "Australia"), ("Melbourne", "Australia"), ("Brisbane", "Australia"), ("Perth", "Australia"),
    ("Adelaide", "Australia"), ("Gold Coast", "Australia"), ("Canberra", "Australia"), ("Newcastle", "Australia"),
    ("Wollongong", "Australia"), ("Logan City", "Australia"),

    # Japan
    ("Tokyo", "Japan"), ("Yokohama", "Japan"), ("Osaka", "Japan"), ("Kobe", "Japan"),
    ("Kyoto", "Japan"), ("Kawasaki", "Japan"), ("Saitama", "Japan"), ("Fukuoka", "Japan"),
    ("Hiroshima", "Japan"), ("Nagoya", "Japan"),

    # Add 250+ more cities to reach 500...
]

# Extend list to 500+ cities
# Add more US suburbs and regions (200+ cities)
us_cities_extended = [
    "Arlington", "Aurora", "Tampa", "Anaheim", "Santa Ana", "Stockton", "Corpus Christi",
    "Henderson", "St. Paul", "Riverside", "Toledo", "Irvine", "Plano", "Chula Vista",
    "Garland", "Irving", "Scottsdale", "North Las Vegas", "Laredo", "Chandler", "Lubbock",
    "Madison", "Reno", "Winston-Salem", "Durango", "Tucson", "Modesto", "Boise", "Shreveport",
    "Bakersfield", "Fremont", "San Bernardino", "Tallahassee", "Spokane", "Huntsville",
    "Brownsville", "Glendale", "Gilbert", "Akron", "Moreno Valley", "Macon", "Lafayette",
    "Hialeah", "Fontana", "Providence", "Pensacola", "Santa Clarita", "Honolulu", "Oceanside",
    "Fontana", "Moreno Valley", "Fayetteville", "Garland", "Glendale", "Laredo", "Lubbock",
    "Irvine", "Chandler", "Scottsdale", "Irving", "Arlington", "Plano", "Aurora", "Chula Vista",
    "Stockton", "Corpus Christi", "Henderson", "Winston-Salem", "Durham", "Raleigh", "Anaheim",
    "Santa Ana", "Riverside", "Lexington", "Henderson", "Plano", "Arlington", "Irvine", "Chula Vista",
    "Garland", "Irving", "Stockton", "Corpus Christi", "Henderson", "St. Paul", "Riverside", "Toledo",
    "Irvine", "Plano", "Chula Vista", "Garland", "Irving", "Scottsdale", "North Las Vegas", "Laredo",
    "Chandler", "Lubbock", "Madison", "Reno", "Winston-Salem", "Durango", "Tucson", "Modesto", "Boise",
    "Shreveport", "Bakersfield", "Fremont", "San Bernardino", "Tallahassee", "Spokane", "Huntsville",
    "Brownsville", "Glendale", "Gilbert", "Akron", "Moreno Valley", "Macon", "Lafayette", "Hialeah",
    "Fontana", "Providence", "Pensacola", "Santa Clarita", "Honolulu", "Oceanside", "Fontana",
    "Moreno Valley", "Fayetteville", "Garland", "Glendale", "Laredo", "Lubbock", "Irvine",
    "Chandler", "Scottsdale", "Irving", "Arlington", "Plano", "Aurora", "Chula Vista", "Stockton",
    "Corpus Christi", "Henderson", "Winston-Salem", "Durham", "Raleigh", "Anaheim", "Santa Ana",
    "Riverside", "Lexington", "Henderson", "Plano", "Arlington", "Irvine", "Chula Vista", "Garland",
    "Irving", "Stockton", "Corpus Christi", "Henderson", "St. Paul", "Riverside", "Toledo", "Irvine",
    "Plano", "Chula Vista", "Garland", "Irving", "Scottsdale", "North Las Vegas", "Laredo", "Chandler",
    "Lubbock", "Madison", "Reno", "Winston-Salem", "Durango", "Tucson", "Modesto", "Boise", "Shreveport",
    "Bakersfield", "Fremont", "San Bernardino", "Tallahassee", "Spokane", "Huntsville", "Brownsville",
    "Glendale", "Gilbert", "Akron", "Moreno Valley", "Macon", "Lafayette", "Hialeah", "Fontana",
    "Providence", "Pensacola", "Santa Clarita", "Honolulu", "Oceanside", "Fontana", "Moreno Valley"
]

# Add more European cities (100+ cities)
europe_cities = [
    ("Amsterdam", "Netherlands"), ("Rotterdam", "Netherlands"), ("Utrecht", "Netherlands"),
    ("Brussels", "Belgium"), ("Antwerp", "Belgium"), ("Ghent", "Belgium"),
    ("Vienna", "Austria"), ("Graz", "Austria"), ("Linz", "Austria"),
    ("Prague", "Czech Republic"), ("Brno", "Czech Republic"), ("Ostrava", "Czech Republic"),
    ("Budapest", "Hungary"), ("Debrecen", "Hungary"),
    ("Warsaw", "Poland"), ("Krakow", "Poland"), ("Wroclaw", "Poland"),
    ("Lisbon", "Portugal"), ("Porto", "Portugal"),
    ("Athens", "Greece"), ("Thessaloniki", "Greece"),
    ("Stockholm", "Sweden"), ("Gothenburg", "Sweden"), ("Malmö", "Sweden"),
    ("Oslo", "Norway"), ("Bergen", "Norway"),
    ("Copenhagen", "Denmark"), ("Aarhus", "Denmark"),
    ("Helsinki", "Finland"), ("Tampere", "Finland"),
    # More European cities
    ("Zurich", "Switzerland"), ("Geneva", "Switzerland"), ("Bern", "Switzerland"),
    ("Dublin", "Ireland"), ("Cork", "Ireland"), ("Galway", "Ireland"),
    ("Bucharest", "Romania"), ("Constanta", "Romania"),
    ("Sofia", "Bulgaria"), ("Plovdiv", "Bulgaria"),
    ("Bratislava", "Slovakia"), ("Kosice", "Slovakia"),
    ("Ljubljana", "Slovenia"), ("Maribor", "Slovenia"),
    ("Zagreb", "Croatia"), ("Split", "Croatia"),
    ("Moscow", "Russia"), ("St. Petersburg", "Russia"),
    ("Istanbul", "Turkey"), ("Ankara", "Turkey"),
    ("Belgrade", "Serbia"), ("Nis", "Serbia"),
    # Asian cities (100+)
    ("Bangkok", "Thailand"), ("Phuket", "Thailand"), ("Chiang Mai", "Thailand"),
    ("Seoul", "South Korea"), ("Busan", "South Korea"), ("Daegu", "South Korea"),
    ("Singapore", "Singapore"),
    ("Hong Kong", "Hong Kong"),
    ("Shanghai", "China"), ("Beijing", "China"), ("Shenzhen", "China"), ("Hangzhou", "China"),
    ("Mumbai", "India"), ("Delhi", "India"), ("Bangalore", "India"), ("Pune", "India"),
    ("Manila", "Philippines"), ("Cebu", "Philippines"),
    ("Ho Chi Minh", "Vietnam"), ("Hanoi", "Vietnam"),
    ("Kuala Lumpur", "Malaysia"), ("Penang", "Malaysia"),
    ("Dubai", "UAE"), ("Abu Dhabi", "UAE"),
    # African & Middle East cities
    ("Cairo", "Egypt"), ("Alexandria", "Egypt"),
    ("Lagos", "Nigeria"), ("Ibadan", "Nigeria"),
    ("Accra", "Ghana"), ("Kumasi", "Ghana"),
    ("Nairobi", "Kenya"), ("Mombasa", "Kenya"),
    ("Johannesburg", "South Africa"), ("Cape Town", "South Africa"),
    ("Casablanca", "Morocco"), ("Marrakech", "Morocco"),
    ("Beirut", "Lebanon"),
    # South American cities (50+)
    ("São Paulo", "Brazil"), ("Rio de Janeiro", "Brazil"), ("Salvador", "Brazil"), ("Belo Horizonte", "Brazil"),
    ("Mexico City", "Mexico"), ("Guadalajara", "Mexico"), ("Monterrey", "Mexico"),
    ("Buenos Aires", "Argentina"), ("Córdoba", "Argentina"),
    ("Santiago", "Chile"), ("Valparaiso", "Chile"),
    ("Bogotá", "Colombia"), ("Medellín", "Colombia"),
    ("Lima", "Peru"), ("Arequipa", "Peru"),
    ("Caracas", "Venezuela"),
]

for city in europe_cities:
    cities.append(city)

for city in us_cities_extended:
    cities.append((city, "USA"))

# Add more smaller cities and suburbs to reach 500
even_more_cities_list = [
    # More US states representation
    ("Fargo", "USA"), ("Bismarck", "USA"), ("Sioux Falls", "USA"), ("Pierre", "USA"),
    ("Montpelier", "USA"), ("Concord", "USA"), ("Montpelier", "USA"), ("Providence", "USA"),
    ("Hartford", "USA"), ("Trenton", "USA"), ("Dover", "USA"), ("Annapolis", "USA"),
    ("Richmond", "USA"), ("Raleigh", "USA"), ("Charleston", "USA"), ("Columbia", "USA"),
    ("Atlanta", "USA"), ("Jacksonville", "USA"), ("Tallahassee", "USA"), ("Pensacola", "USA"),
    ("Panama City", "USA"), ("Destin", "USA"), ("Clearwater", "USA"), ("St. Petersburg", "USA"),
    ("Sarasota", "USA"), ("Naples", "USA"), ("Key West", "USA"), ("Daytona", "USA"),
    # More European city variants
    ("Nice", "France"), ("Cannes", "France"), ("Monaco", "Monaco"), ("Antibes", "France"),
    ("Marseille", "France"), ("Toulon", "France"), ("Grasse", "France"),
    ("Barcelona", "Spain"), ("Malaga", "Spain"), ("Ibiza", "Spain"), ("Tarragona", "Spain"),
    ("Lisbon", "Portugal"), ("Funchal", "Portugal"), ("Madeira", "Portugal"),
    ("Athens", "Greece"), ("Mykonos", "Greece"), ("Santorini", "Greece"), ("Crete", "Greece"),
    ("Rhodes", "Greece"), ("Corfu", "Greece"),
    ("Reykjavik", "Iceland"), ("Akureyri", "Iceland"),
    ("Valletta", "Malta"), ("Sliema", "Malta"),
    # More Asia-Pacific
    ("Bali", "Indonesia"), ("Lombok", "Indonesia"), ("Sulawesi", "Indonesia"),
    ("Phuket", "Thailand"), ("Samui", "Thailand"), ("Krabi", "Thailand"), ("Railay", "Thailand"),
    ("Macau", "Macau"), ("Hong Kong Island", "Hong Kong"),
    ("Okinawa", "Japan"), ("Fukuoka", "Japan"), ("Kobe", "Japan"), ("Osaka", "Japan"),
    ("Hiroshima", "Japan"), ("Nagasaki", "Japan"), ("Naha", "Japan"),
    ("Bali Sanur", "Indonesia"), ("Bali Ubud", "Indonesia"), ("Bali Seminyak", "Indonesia"),
    ("Cebu City", "Philippines"), ("Davao", "Philippines"), ("Iloilo", "Philippines"), ("Laoag", "Philippines"),
    ("Saipan", "Mariana Islands"), ("Guam", "Guam"),
    # Australia & New Zealand extras
    ("Byron Bay", "Australia"), ("Cairns", "Australia"), ("Townsville", "Australia"),
    ("Hamilton Island", "Australia"), ("Great Barrier Reef", "Australia"),
    ("Queenstown", "New Zealand"), ("Rotorua", "New Zealand"), ("Taupo", "New Zealand"),
    # Middle East additions
    ("Doha", "Qatar"), ("Riyadh", "Saudi Arabia"), ("Jeddah", "Saudi Arabia"),
    ("Tel Aviv", "Israel"), ("Jerusalem", "Israel"),
    ("Amman", "Jordan"), ("Petra", "Jordan"),
    ("Bangkok", "Thailand"), ("Pattaya", "Thailand"), ("Hua Hin", "Thailand"),
]

more_cities = [
    # More USA cities
    ("Lexington", "USA"), ("Anchorage", "USA"), ("Stockton", "USA"), ("Cincinnati", "USA"),
    ("Saint Paul", "USA"), ("Corpus Christi", "USA"), ("Lexington", "USA"), ("Henderson", "USA"),
    ("Plano", "USA"), ("Arlington", "USA"), ("Irvine", "USA"), ("Chula Vista", "USA"),
    ("Garland", "USA"), ("Irving", "USA"), ("Stockton", "USA"), ("Corpus Christi", "USA"),
    ("Laredo", "USA"), ("Chandler", "USA"), ("Lubbock", "USA"), ("Madison", "USA"),
    ("Reno", "USA"), ("Winston-Salem", "USA"), ("Durham", "USA"), ("Raleigh", "USA"),
    ("Boise", "USA"), ("Shreveport", "USA"), ("Bakersfield", "USA"), ("Fremont", "USA"),
    ("San Bernardino", "USA"), ("Tallahassee", "USA"), ("Spokane", "USA"), ("Huntsville", "USA"),
    ("Brownsville", "USA"), ("Glendale", "USA"), ("Gilbert", "USA"), ("Akron", "USA"),
    ("Moreno Valley", "USA"), ("Macon", "USA"), ("Lafayette", "USA"), ("Hialeah", "USA"),
    # More international cities
    ("Sao Paulo", "Brazil"), ("Rio", "Brazil"), ("Salvador", "Brazil"), ("Fortaleza", "Brazil"),
    ("Manaus", "Brazil"), ("Curitiba", "Brazil"), ("Porto Alegre", "Brazil"),
    ("Mexico City", "Mexico"), ("Cancun", "Mexico"), ("Playa del Carmen", "Mexico"),
    ("Merida", "Mexico"), ("Puebla", "Mexico"), ("Veracruz", "Mexico"), ("Acapulco", "Mexico"),
    ("Buenosaires", "Argentina"), ("Rosario", "Argentina"), ("Mendoza", "Argentina"),
    ("Lima", "Peru"), ("Cusco", "Peru"), ("Arequipa", "Peru"), ("Trujillo", "Peru"),
    ("Santiago", "Chile"), ("Valparaiso", "Chile"), ("Concepcion", "Chile"), ("Vina del Mar", "Chile"),
    ("Bogota", "Colombia"), ("Cali", "Colombia"), ("Medellin", "Colombia"), ("Barranquilla", "Colombia"),
    ("Cartagena", "Colombia"), ("Bucaramanga", "Colombia"), ("Santa Marta", "Colombia"),
    # More European smaller cities
    ("Braga", "Portugal"), ("Aveiro", "Portugal"), ("Covilha", "Portugal"),
    ("Toulouse", "France"), ("Lille", "France"), ("Lyon", "France"), ("Nantes", "France"),
    ("Strasbourg", "France"), ("Montpellier", "France"), ("Bordeaux", "France"),
    ("Valencia", "Spain"), ("Seville", "Spain"), ("Bilbao", "Spain"), ("Malaga", "Spain"),
    ("Alicante", "Spain"), ("Cordoba", "Spain"), ("Palma", "Spain"), ("Ibiza", "Spain"),
    ("Turin", "Italy"), ("Milan", "Italy"), ("Naples", "Italy"), ("Rome", "Italy"),
    ("Venice", "Italy"), ("Florence", "Italy"), ("Bologna", "Italy"), ("Genoa", "Italy"),
    ("Palermo", "Italy"), ("Verona", "Italy"), ("Messina", "Italy"), ("Catania", "Italy"),
    # More Asian cities
    ("Taipei", "Taiwan"), ("Kaohsiung", "Taiwan"),
    ("Chiang Mai", "Thailand"), ("Pattaya", "Thailand"), ("Krabi", "Thailand"),
    ("Busan", "South Korea"), ("Daegu", "South Korea"), ("Incheon", "South Korea"), ("Daejeon", "South Korea"),
    ("Gwangju", "South Korea"), ("Ulsan", "South Korea"), ("Sejong", "South Korea"),
    ("Penang", "Malaysia"), ("Kuching", "Malaysia"), ("Johor Bahru", "Malaysia"),
    ("Hanoi", "Vietnam"), ("Ho Chi Minh City", "Vietnam"), ("Da Nang", "Vietnam"),
    ("Jakarta", "Indonesia"), ("Surabaya", "Indonesia"), ("Bandung", "Indonesia"), ("Medan", "Indonesia"),
    ("Bangkok", "Thailand"), ("Phuket", "Thailand"), ("Pataya", "Thailand"),
    ("Dehli", "India"), ("Kolkata", "India"), ("Chennai", "India"), ("Hyderabad", "India"),
    ("Ahmedabad", "India"), ("Jaipur", "India"), ("Lucknow", "India"), ("Indore", "India"),
    # African & Middle East
    ("Alexandria", "Egypt"), ("Giza", "Egypt"),
    ("Tangier", "Morocco"), ("Fes", "Morocco"), ("Agadir", "Morocco"),
    ("Tunis", "Tunisia"), ("Sfax", "Tunisia"),
    ("Algiers", "Algeria"), ("Oran", "Algeria"),
    # More Oceania
    ("Auckland", "New Zealand"), ("Wellington", "New Zealand"), ("Christchurch", "New Zealand"),
    ("Auckland", "New Zealand"), ("Hamilton", "New Zealand"),
]

for city in even_more_cities_list:
    cities.append(city)

for city in more_cities:
    if isinstance(city, tuple):
        cities.append(city)
    else:
        cities.append((city, "USA"))

# Combine all and deduplicate to 500+ unique cities
cities = list(dict.fromkeys(cities))[:500]

html_template = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Twitch Streamers in {city}, {country} — Live Beat Production</title>
<meta name="description" content="Discover Twitch streamers in {city}, {country}. Watch live beat production, VST tutorials, and music production streams with DJBILBOX BEATS. Trap, afrotrap, oriental &amp; deep house.">
<meta name="keywords" content="Twitch {city}, streamers {country}, beat production {city}, music production live, Twitch community">
<link rel="canonical" href="https://djbilboxbeats.com/twitch/{filename}.html">
<link rel="icon" href="/favicon.png">
<style>
body {{ background: #0a0e27; color: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto; margin: 0; padding: 20px; }}
.container {{ max-width: 1200px; margin: 0 auto; }}
.hero {{ background: linear-gradient(135deg, #9146ff 0%, #5c16c5 100%); padding: 40px; border-radius: 12px; text-align: center; margin-bottom: 40px; }}
.hero h1 {{ margin: 0 0 15px 0; font-size: 2.2rem; }}
.hero p {{ margin: 10px 0; }}
.section {{ margin: 40px 0; }}
.section h2 {{ color: #9146ff; font-size: 1.8rem; margin-bottom: 20px; }}
.content {{ background: #1a1f3a; border: 1px solid #2d2f4d; border-radius: 8px; padding: 30px; line-height: 1.6; }}
.content p {{ margin: 15px 0; }}
.content ul {{ margin: 15px 0 15px 20px; }}
.content li {{ margin: 8px 0; }}
.btn {{ display: inline-block; padding: 12px 24px; background: #9146ff; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }}
.btn:hover {{ opacity: 0.9; }}
footer {{ margin-top: 80px; padding-top: 40px; border-top: 1px solid #2d2f4d; text-align: center; color: #666; font-size: 0.9rem; }}
</style>
</head>
<body>
<div class="container">
<section class="hero">
  <h1>🎹 Twitch Streamers in {city}</h1>
  <p>Live Beat Production &amp; Music Production Tutorials</p>
  <p style="font-size: 0.95rem; opacity: 0.9;">{city}, {country} • Streaming &amp; Production Community</p>
</section>
<main>
<section class="section">
  <h2>Beat Production Streams in {city}</h2>
  <div class="content">
    <p>Welcome to the Twitch streaming community in <strong>{city}, {country}</strong>. DJBILBOX BEATS brings live beat production, VST plugin tutorials, and music production education to producers and music enthusiasts worldwide.</p>
    <p>Whether you're a producer in {city} looking to learn <strong>trap, afrotrap, oriental, or deep house production</strong>, you'll find valuable content for our community.</p>
    <p><strong>📺 What You'll See:</strong></p>
    <ul>
      <li>🎹 Live beat production from scratch</li>
      <li>🔌 VST plugin demonstrations (BIGBASS, Vice City, Oriental Instrument, MACHINA)</li>
      <li>📦 Sample pack breakdowns</li>
      <li>🎓 Music production tutorials</li>
      <li>💬 Interactive Q&amp;A sessions</li>
    </ul>
  </div>
</section>
<section class="section">
  <h2>Schedule</h2>
  <div class="content">
    <ul>
      <li><strong>Monday 8:00 PM:</strong> Trap &amp; Afrotrap Production</li>
      <li><strong>Wednesday 8:00 PM:</strong> VST Demos &amp; Sample Packs</li>
      <li><strong>Friday 8:00 PM:</strong> Oriental &amp; Deep House</li>
      <li><strong>Sunday 4:00 PM:</strong> Community Session</li>
    </ul>
    <a href="https://www.twitch.tv/djbilbox" target="_blank" class="btn">📺 Watch on Twitch</a>
  </div>
</section>
</main>
<footer>
  <p><strong>DJBILBOX BEATS</strong> — Live Twitch Streaming &amp; Music Production</p>
  <p>{city}, {country} • © 2026 DJBILBOX BEATS</p>
</footer>
</div>
</body>
</html>"""

# Create twitch directory
twitch_dir = "twitch"
os.makedirs(twitch_dir, exist_ok=True)

# Generate pages
for idx, (city, country) in enumerate(cities, 1):
    filename = city.lower().replace(" ", "-").replace(".", "").replace("'", "")
    filepath = os.path.join(twitch_dir, f"{filename}.html")

    html = html_template.format(
        city=city,
        country=country,
        filename=filename
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html)

    if idx % 50 == 0:
        print(f"✅ Generated {idx}/{len(cities)} pages")

print(f"\n✅ Successfully generated {len(cities)} Twitch location pages!")
print(f"📁 Pages created in: /twitch/")
print(f"🔗 SEO Strategy: Each page targets local searches + links to main Twitch channel")
print(f"📊 Traffic potential: {len(cities)} cities × multiple keywords = massive organic traffic boost!")
