### Redis development notes

```
# Start a local Redis for testing
docker run --name redis -p 6379:6379 -d redis

# Optional Redis Commander
sudo npm install -g redis-commander
redis-commander --help
redis-commander --open

# Redis cli on Mac
xcode-select --install
brew tap ringohub/redis-cli
brew update && brew doctor
brew install redis-cli
redis-cli --version
redis-cli --help

# Redis Pub/Sub via cli - REF: https://www.redisgreen.net/blog/pubsub-howto/

# Window 2 - Subscriber
redis-cli
SUBSCRIBE chan19

# Window 1 - Publisher
redis-cli
PUBLISH chan19 "Hello world"
```
