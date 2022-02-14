import { gql } from "apollo-server";

export default gql`
  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }
  type Mutation {
    createAccount(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User
  }
  type Query {
    seeProfile(username: String!): User
  }
`;


//gql에서(schema.prisma에는 있음) User 정의에 password 필요 없음. 묻지 않을 것이기 때문

