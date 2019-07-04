# Balder
Digital happiness deliver.

1. Fill the database with some digital content (now support game keys, links to download books and simple text).
2. Give a link and secret word to your friend.
3. Make your friend happier.

## Build app
### Production build
In root directory

`docker-compose up -d`

To generate new secret-code (with running app)

`docker exec -it [container_name] flask make-secret [secret_word]`

To get in shell to work with database

`docker exec -it [container_name] flask shell`

## REST API
| HTTP Method   | URI                                                            | Description        |
| ------------- |:--------------------------------------------------------------:| ------------------:|
| GET           | http://[hostname]/api/v1.0/gifts                        | Get gifts list     |
| GET           | http://[hostname]/api/v1.0/gift/[gift_id]               | Get gift by id     |
| POST          | http://[hostname]/api/v1.0/gift/add                     | Add new gift       |
| PUT           | http://[hostname]/api/v1.0/gift/[gift_id]/open          | Set gift open_date |
| POST          | http://[hostname]/api/v1.0/check_secret                 | Check secret word  |

## License
MIT