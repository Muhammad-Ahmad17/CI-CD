const AWS = require('aws-sdk');

let dynamoDB;

const initDatabase = async () => {
  // Configure AWS SDK for local DynamoDB
  AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000',
    accessKeyId: 'dummy',
    secretAccessKey: 'dummy',
  });

  dynamoDB = new AWS.DynamoDB();

  // Check if table exists, create if not
  try {
    await dynamoDB.describeTable({ TableName: 'Users' }).promise();
    console.log('Users table already exists');
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      const params = {
        TableName: 'Users',
        KeySchema: [
          { AttributeName: 'id', KeyType: 'HASH' }, // Partition key
        ],
        AttributeDefinitions: [
          { AttributeName: 'id', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      };
      await dynamoDB.createTable(params).promise();
      console.log('Created Users table');
    } else {
      throw error;
    }
  }
};

const getDynamoDB = () => dynamoDB;

module.exports = { initDatabase, getDynamoDB };