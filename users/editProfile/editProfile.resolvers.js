import bcrypt from "bcrypt"
import client from "../../client";


//user가 누군지 모르고 누가 profile 업데이트하고싶은지 알지 못하는 resolver
//login resolver에서 제공한 토큰 이용 -> authentication을 implement할 예정
//현재 - 누가 editProfile업데이트하고 싶은지 안다고 가정
//prisma에 undefined를 보내면 데이터베이스에 그 값들을 보내지 않음 확인
export default {
  Mutation: {

    editProfile: async (_,{
      firstName,
      lastName,
      username,
      email,
      password: newPassword //typedefs에선 바꾸지 않음(resolver에서만)
    }) => {

      //password hash하기
      let uglyPassword = null;
      if(newPassword){
        uglyPassword = await bcrypt.hash(newPassword, 10)
      }
      
      //각각 인자에 undefinde 보내는 것 확인 작업(email빼고 다 undefined)
      // console.log(firstName,lastName,username,email,password)
      const updatedUser = await client.user.update({
        where:{
          id:12,
        },
        data:{ 
          firstName,lastName,username,email, //user가 새 패스워드 전달하므로 hash해야함
          ...(uglyPassword &&{password:uglyPassword}), //uglyPassword가 true면 뒤 object 리턴한다
          //es6문법
        }});
        
        if(updatedUser.id){
          return {
            ok:true,
          };
        } else{
          return{ 
            ok:false,
            error: "could not update profile"
          }
        }
    },
  },
};