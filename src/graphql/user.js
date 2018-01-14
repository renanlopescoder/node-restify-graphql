export default `
  type User {
    _id: String!,
    name: String!,
    email: String!
  }

  type Query {
    allUsers: [User!]!,
    findUser(_id: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
