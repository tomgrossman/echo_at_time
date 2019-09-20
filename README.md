# Echo At Time
Tom Grossman

## Running with docker-compose
1. clone repo https://github.com/tomgrossman/echo_at_time.git
2. cd into the folder
3. run `docker-compose up -d --build`

## Sending messages
- You can use any REST application (like postman, curl, etc...).
- The server is listening on port 3000
- Example for curl POST message:
```
curl -X POST \
  http://localhost:3000/echoAtTime \
  -H 'Content-Type: application/json' \
  -d '{
	"time": 1577836800000,
	"message": "this is a test message"
}'
```
This message will be printed at "2020-01-01"

## Reading messages
- The server is printing the messages to the console
- In order to read the console, use:
```
docker logs echo-node -f
```

## Additional Information
- In order to test the persistence:
    1. POST message
    2. Stop node server with `docker rm -f echo-node`
    3. Run the node after the time of the message has passed with `docker-compose up -d` 
    4. The app will print all messages that should have been printed while the app was down