# Posts Service

Small Node.js service. Express, MongoDB, Kafka. Code is split into DDD layers and the whole thing runs in docker.

- Node + Express for the API
- MongoDB (mongoose) for the data
- Kafka (kafkajs) to publish events
- A separate consumer process that listens to those events
- Docker compose to run everything together

# Folder layout

src/
server.js -> API entry
consumer.js -> kafka consumer process
config.js -> reads .env
domain/post.js -> validation, no frameworks or db here
application/ -> use cases (createPost, getPost, listPosts)
infrastructure/ -> mongo + kafka
api/postRoutes.js -> express routes

The rule I tried to follow: inner folders never import outer ones. So `domain/` doesn't know about express or mongoose.

## Setup

You need a `.env` file in the root. Mine looks like this:

```
PORT=3000
MONGO_URI=mongodb://mongo:27017/postsdb
KAFKA_CLIENT_ID=task-service
KAFKA_BROKERS=kafka:9092
KAFKA_TOPIC=post.created
KAFKA_GROUP_ID=task-consumer-group
```

## Running it

With docker:

```
 run this command "docker compose up --build"
```

That spins up mongo, zookeeper, kafka, the API, and the consumer.

Or locally if you already have mongo/kafka running:

```
npm install
npm start
```

And in another terminal for the consumer:

```
npm run start:consumer
```

## Endpoints

- `POST /api/posts` – create a post (body: `title`, `content`, `authorId`)
- `GET  /api/posts` – list posts
- `GET  /api/posts/:id` – get one
- `GET  /health` – health check

Quick test:

```
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"world","authorId":"u1"}'
```

After this, check the `task-consumer` container logs. You should see the `post.created` event come through.

## Scripts

- `npm start` – run the API
- `npm run start:consumer` – run the consumer
- `npm run dev` / `npm run dev:consumer` – same but with nodemon
