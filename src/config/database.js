const AWS = require('aws-sdk');

let dynamoDB;

const initDatabase = async () => {
  const isLocal = process.env.IS_LOCAL === 'true'; // set this locally for testing

  if (isLocal) {
    // Local DynamoDB (for dev)
    AWS.config.update({
      region: 'local',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
    });
  } else {
    // AWS DynamoDB (for production / EB)
    AWS.config.update({
      region: process.env.AWS_REGION || 'us-east-1',
      // credentials will be picked from the EB environment IAM role
    });
  }

  dynamoDB = new AWS.DynamoDB();

  try {
    await dynamoDB.describeTable({ TableName: 'Users' }).promise();
    console.log('Users table already exists');
  } catch (error) {
    if (error.code === 'ResourceNotFoundException') {
      const params = {
        TableName: 'Users',
        KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
        AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
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
