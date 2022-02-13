//스키마는 typeDefs, resolvers(query, mutation)를 기본으로 다룸

import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
    //graphql-tools를 import해서 loadFileSync를 사용 가능 
    //자동으로 import 됨

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)
//${__dirname}/**/*.typeDefs.js 의미
    // ** -> 모든 폴더에 있는 파일을 찾아서
    // * -> 파일 이름이 뭐든 간에(movies나 movie, users, user 등 상관 x)
    //.typeDefs.js로 끝나는 지가 중요함

const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries,mutation}.js`);
//마찬가지, queries.js 혹은 mutation.js로 끝나는 파일 찾기
//"pattern language"

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({typeDefs, resolvers});
//https://www.graphql-tools.com/docs/generate-schema#executable-schemas


export default schema;