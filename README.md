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

# Manual DEV Testing
export SNS_QUEUE='https://sqs.eu-west-1.amazonaws.com/account-id/queue-name'
export AWS_ACCESS_KEY_ID='blah'
export AWS_SECRET_ACCESS_KEY='blah'
node app.js
```

### Basic Chrysus Message Format
```
{
  "message": {
    "chrysus": "1.0.0",
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