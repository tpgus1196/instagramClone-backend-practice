import bcrypt from "bcrypt"
import client from "../../client";
//import jwt from "jsonwebtoken"; //로그인할때 쓴 library


export default {
  Mutation: {

    editProfile: async (
      _,
      {firstName, lastName, username, email, password: newPassword}, 
      {loggedInUser , protectResolver} //모든 resolver에 접근하기위해 context에 넣음
    ) => { 
      //console.log(loggedInUser);
      protectResolver(loggedInUser);

      let uglyPassword = null;
      if(newPassword){
        uglyPassword = await bcrypt.hash(newPassword, 10)
      }
      
      const updatedUser = await client.user.update({
        where:{
          id: loggedInUser.id, 
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