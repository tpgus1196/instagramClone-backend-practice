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
        movie(id:Int!): Movie
    }
    type Mutation{
        createMovie(title:String! year:Int! genre:String):Movie
        deleteMovie(id:Int!):Movie
        updateMovie(id:Int! year:Int!):Movie
    }
`;
//playgroun에서 mutation데이터 뽑는 법
const resolvers = {
    Query: {
        movies: () => client.movie.findMany(),
        movie: (_,{id}) => client.movie.findUnique({where:{id}}), //"title", year의 차이
    },
    Mutation: {
        createMovie: (_,{title,year,genre}) => 
        client.movie.create(
            {
                data:{
                    title,
                    year,
                    genre,
                },
            }
        ),
        deleteMovie: (_,{id}) => client.movie.delete({where:{id}}), 
        updateMovie: (_,{id, year}) => client.movie.update({where:{id}, data:{year}})
    },
    
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(()=> console.log("S is runnig"));