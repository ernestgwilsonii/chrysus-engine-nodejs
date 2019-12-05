# chrysus-engine-nodejs

Chrysus Engine NodeJS

- REF: https://github.com/BBC/sqs-consumer

```bash
# Build x86_64
time docker build -t ernestgwilsonii/chrysus-engine-x86-64-nodejs:1.0.0 -f Dockerfile .
docker images
# Test
#docker run --name chrysus-engine -it ernestgwilsonii/chrysus-engine-x86-64-nodejs:1.0.0 sh
#docker rm chrysus-engine

# Build Raspberry Pi ARM
time docker build -t ernestgwilsonii/chrysus-engine-rpi-arm-nodejs:1.0.0 -f Dockerfile.armhf .
docker images
# Test
#docker run --name chrysus-engine -it ernestgwilsonii/chrysus-engine-rpi-arm-nodejs:1.0.0 sh
#docker rm chrysus-engine

# Manual DEV Testing SQS
export CHRYSUS_SQS_QUEUE='https://sqs.eu-west-1.amazonaws.com/account-id/queue-name'
export CHRYSUS_AWS_ACCESS_KEY_ID='blah'
export CHRYSUS_AWS_SECRET_ACCESS_KEY='blah'
node sqsExample.js

# Manual DEV Testing Redis
export CHRYSUS_REDIS_HOST=127.0.0.1
export CHRYSUS_REDIS_PORT=6379
export CHRYSUS_REDIS_CHAN=incoming
export CHRYSUS_REDIS_PASS=yourpassword
node redisExample.js

# Manual DEV Testing MQTT
export CHRYSUS_MQTT_HOST=127.0.0.1
export CHRYSUS_MQTT_PORT=1883
export CHRYSUS_MQTT_PROTOCOL_ID=MQTT
export CHRYSUS_MQTT_TOPIC=incoming
node mqttExample.js
```

### Basic Chrysus Message Format
```
{
  "message": {
    "chrysus": "1.0.0",
    "meta": {},
    "tasks": [
      {
        "taskName": "someTask",
        "taskVersion": "1.0.0",
        "taskDetails": {
          "someOptionalTaskKey1": "someOptionalTaskValue1"
        },
        "outputs": [
          {
            "outputName": "someOutput",
            "outputVersion": "1.0.0",
            "outputDetails": {
              "someOptionalOutputKey1": "someOptionalOutputValue1"
            }
          }
        ]
      }
    ]
  }
}
```