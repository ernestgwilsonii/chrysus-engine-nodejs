# MQTT development notes

```bash
# Start a local Mosquitto MQTT for testing
# REF: https://hub.docker.com/_/eclipse-mosquitto
docker run --name mqtt -p 1883:1883 -p 9001:9001 -d eclipse-mosquitto
docker ps
#docker stop mqtt && docker rm mqtt

# Or using docker-compose.yml
cd MQTT
docker-compose up -d
docker ps
#docker-compose down

# Mac OS Client
brew install mosquitto

# Ubuntu Client
apt-get install mosquitto-clients

# Windows Client - https://mosquitto.org/download/

# Pub / Sub via command line (MQTT protocol)
# Subscribe to "all" channels/topics aka wildcard
#mosquitto_sub -v -h 127.0.0.1 -p 1883 -t "#"
# Subscribe to everything on Chan19
mosquitto_sub -v -h 127.0.0.1 -p 1883 -t "Chan19"
# Publish to Chan19
mosquitto_pub -d -h 127.0.0.1 -p 1883 -t "Chan19" -m "Hello MQTT from command line"

# Pub / Sub via browser (Websocket protocol)
# REF: http://mitsuruog.github.io/what-mqtt/
ws://IP:9001/mqtt
Chan19
Hello from Websocket!

# Node example:
node MQTT/mqttSubscriber_example.js
node MQTT/mqttPublisher_example.js
```
