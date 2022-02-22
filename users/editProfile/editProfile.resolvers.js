import bcrypt from "bcrypt"
import client from "../../client";
import jwt from "jsonwebtoken"; //로그인할때 쓴 library

export default {
  Mutation: {

    editProfile: async (
      _,
      {firstName, lastName, username, email, password: newPassword}, 
      {loggedInUser}//context ->{token} (server의 토큰 받는다) -> user/null 리턴 -> context에 token 갖지 않음
    ) => { 
        console.log(loggedInUser);
        // console.log(context);
          //server의 object, context 출력(playground 실행 후 콘솔 확인)

      //user가 보낸 token 확인(해독 시작)
      //verify는 decoded(해독된) token 리턴
      //token이 맞으면 token 리턴
      //우리가 이 토큰 만들었고, 토큰이 변형되지 않았다는 확인 필요(private key 서명이 맞는지 확인)
      //그 후 id 안에 있는 토큰을 볼 수 있다.
  
      // const verifiedToken = await jwt.verify(token,process.env.SECRET_KEY);
      //console.log(verifiedToken);
        //-> es6문법 이용, verifiedToken 오브젝트를 열어 id property 가져오기
      
      let uglyPassword = null;
      if(newPassword){
        uglyPassword = await bcrypt.hash(newPassword, 10)
      }
      
      const updatedUser = await client.user.update({
        where:{
          id: loggedInUser.id, //작동이 양호할 경우 - id가 로그인한 유저의 id와 같은 유저를 찾을 것
        },
        data:{ 
          firstName,lastName,username,email, 
          ...(uglyPassword &&{password:uglyPassword}), 
        },
      });
        
        if(updatedUser.id){
          return {
            ok:true,
          };
        } else{
          return{ 
            ok:false,
            error: "could not update profile",
          }
        }
    },
  },
};