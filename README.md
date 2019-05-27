# Balder
Digital happiness deliver.

1. Fill the database with some digital content.
2. Give a link and secret code to your friend.
3. Make your friend happier.

## Build app
TODO: Describe how to build app.

## REST API
| HTTP Method   | URI                                                            | Description     |
| ------------- |:--------------------------------------------------------------:| ---------------:|
| GET           | http://[hostname]/balder/api/v1.0/gifts                        | Get gifts list  |
| GET           | http://[hostname]/balder/api/v1.0/gift/[gift_id]               | Get gift by id  |
| POST          | http://[hostname]/balder/api/v1.0/check_secret/[secret_string] | Create new gift |