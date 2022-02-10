import { gql, ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const typeDefs = gql`
    type Movie{
        id: Int!
        title: String!
        year: Int!
        genre : String
        createdAt : String!
        updatedAt : String!
    }
    type Query{
        movies: [Movie]
        movie: Movie
    }
    type Mutation{
        createMovie(title:String!):Boolean
        deleteMovie(title:String!):Boolean
    }
`;

const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: () => ({"title":"Hello", year: 2022}), //"title", year의 차이
    },
    Mutation: {
        createMovie: (_,{title,year,genre}) => 
        {
            console.log({title});
            return true;
        },
        deleteMovie: (_,{title}) => 
       { 
            console.log({title});
            return true;
        }, 
    },
    
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(()=> console.log("S is runnig"));