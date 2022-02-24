import jwt from "jsonwebtoken";
import client from "../client";

//token 받아 id 가지는 함수
export const getUser = async(token) => {
    try{ //에러 없을 때
        if(!token){//계정 만들면 토큰 없음 -> 상황 고려
            return null;
        }
        const {id}= await jwt.verify(token, process.env.SECRET_KEY); //undefined token 자동으로 보내기
        const user = await client.user.findUnique({where:{ id}}); //prisma client : id는 토큰의 id와 비교

        //user 찾으면 그 user return 명령   
        if(user){
            return user;
        } else{
            return null;
        }
    }catch{ //에러 있을 때
        return null;
    }
};

export const protectResolver = (user) => {
    if (!user){
        return{
            ok:false,
            error:"You need to login.",
          };
    }
};
