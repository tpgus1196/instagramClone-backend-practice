//dotenv실행 app의 맨 위에서
//https://www.npmjs.com/package/dotenv
require('dotenv').config();
    //import dotenv from "dotenv"
    //dotenv.config()
    //이 두 줄 코드와 동일함

import {ApolloServer} from "apollo-server";
import {ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";

//server를 만들고 작동시키는 일만 한다
const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()], 
});

const PORT = process.env.PORT; //4000포트 접근 가능(따로 import필요 x)

server.listen(PORT)
    .then(()=>
        console.log(`🚀Server is running on http://localhost:${PORT}/`)
    );