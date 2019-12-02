### chrysus-engine-nodejs
Chrysus Engine NodeJS

- REF: https://github.com/BBC/sqs-consumer

```
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
export SQS_QUEUE='https://sqs.eu-west-1.amazonaws.com/account-id/queue-name'
export AWS_ACCESS_KEY_ID='blah'
export AWS_SECRET_ACCESS_KEY='blah'
node sqsExample.js

# Manual DEV Testing Redis
export CHRYSUS_REDISHOST=127.0.0.1
export CHRYSUS_REDISPORT=6379
export CHRYSUS_REDISCHAN=incoming
export CHRYSUS_REDISPASS=yourpassword
node redisExample.js
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