import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
       //step1) find user with args.username
      const user = await client.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }

       //step2) check password with args.password
      const passwordOk = await bcrypt.compare(password, user.password);
        // console.log(passwordOk);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }

       //step3) both pass => issue a token and send it to the user
            //누구나 토큰 볼 수 있음(비밀정보 아님)
            //개인정보는 들어가면 안됨(패스워드 등)
      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            //dotenv -> process.env 로 .env파일에 있는 정보 불러오기
      return {
        ok: true,
        token,
      };
    },
  },
};