# Balder
Digital happiness deliver.

1. Fill the database with some digital content (now support game keys, links to download books and simple text).
2. Give a link and secret word to your friend.
3. Make your friend happier.

## Build app
TODO: Dockerize it!

## REST API
| HTTP Method   | URI                                                            | Description       |
| ------------- |:--------------------------------------------------------------:| -----------------:|
| GET           | http://[hostname]/balder/api/v1.0/gifts                        | Get gifts list    |
| GET           | http://[hostname]/balder/api/v1.0/gift/[gift_id]               | Get gift by id    |
| POST          | http://[hostname]/balder/api/v1.0/gift/add                     | Add new gift      |
| POST          | http://[hostname]/balder/api/v1.0/check_secret                 | Check secret word |