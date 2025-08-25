require('dotenv').config();
const AWS = require('aws-sdk');

let dynamoDB;

const initDatabase = async () => {
  const isLocal = process.env.IS_LOCAL === 'true';

  if (isLocal) {
    AWS.config.update({
      region: 'us-east-1',
      endpoint: 'http://localhost:8000',
      accessKeyId: 'dummy',
      secretAccessKey: 'dummy',
    });
  } else {
    AWS.config.update({
      region: process.env.AWS_REGION || 'us-east-1',
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
      await dynamoDB.waitFor('tableExists', { TableName: 'Users' }).promise();
      console.log('Created Users table');
    } else {
      throw error;
    }
  }
};

const getDynamoDB = () => dynamoDB;

module.exports = { initDatabase, getDynamoDB };
