import { gql } from "apollo-server";

export default gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
    ): EditProfileResult!
  }
`;//유저가 자신이 누군지 알려줘야 하기 때문에 token 필수