import client from "../client";

export default {
    Query : {
        seeProfile: (_, {username}) => client.user.findUnique({//@unique 속성 가진 것만 찾는다
            where:{
                username,
            },
        })
    },
};