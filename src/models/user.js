const { getDynamoDB } = require('../config/database');
const AWS = require('aws-sdk');

class User {
  static async create({ id, name, email }) {
    const dynamoDB = getDynamoDB();
    const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamoDB });

    const params = {
      TableName: 'Users',
      Item: {
        id,
        name,
        email,
      },
    };

    await docClient.put(params).promise();
    return { id, name, email };
  }

  static async findAll() {
    const dynamoDB = getDynamoDB();
    const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamoDB });

    const params = {
      TableName: 'Users',
    };

    const result = await docClient.scan(params).promise();
    return result.Items;
  }

  // Add findById method
  static async findById(id) {
    const dynamoDB = getDynamoDB();
    const docClient = new AWS.DynamoDB.DocumentClient({ service: dynamoDB });

    const params = {
      TableName: 'Users',
      Key: { id },
    };

    const result = await docClient.get(params).promise();
    return result.Item; // returns undefined if not found
  }
}

module.exports = User;
