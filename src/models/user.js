const { getDynamoDB } = require('../config/database');

class User {
  static async create({ id, name, email }) {
    const db = getDynamoDB();
    const params = {
      TableName: 'Users',
      Item: {
        id: { S: id },
        name: { S: name },
        email: { S: email },
      },
    };
    await db.putItem(params).promise();
    return { id, name, email };
  }

  static async findAll() {
    const db = getDynamoDB();
    const data = await db.scan({ TableName: 'Users' }).promise();
    return data.Items.map((item) => ({
      id: item.id.S,
      name: item.name.S,
      email: item.email.S,
    }));
  }

  static async findById(id) {
    const db = getDynamoDB();
    const data = await db.getItem({
      TableName: 'Users',
      Key: { id: { S: id } },
    }).promise();
    if (!data.Item) return null;
    return { id: data.Item.id.S, name: data.Item.name.S, email: data.Item.email.S };
  }
}

module.exports = User;
  