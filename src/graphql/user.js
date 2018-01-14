export default `
  type User {
    _id: String!,
    name: String!,
    email: String!
  }

  type Query {
    allUsers: [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;
