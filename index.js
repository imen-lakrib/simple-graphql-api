import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// data
import data from './db.js'
// types
import { typeDefs } from './schema.js'

// resolvers
const resolvers = {
  Query: {
    games() {
      return data.games
    },
    authors() {
      return data.authors
    },
    reviews() {
      return data.reviews
    },
    //     review(parent, args,context ) {
    review(_, args) {
      return data.reviews.find((rev) => rev.id === args.id)
    },
    game(_, args) {
      return data.games.find((game) => game.id === args.id)
    },
    author(_, args) {
      return data.authors.find((auth) => auth.id === args.id)
    }
  },
  // we can access to the parent of game wish is game declared in entry point query
  Game: {
    reviews(parent) {
      return data.reviews.filter((r) => r.game_id === parent.id)
    }
  },
  Mutation: {
    addGame(_, args) {
      let newGame = {
        ...args.game,
        // here args.game is the inputfilelds
        id: Math.floor(Math.random() * 10000).toString()
      }
      data.games.push(newGame);
      return newGame
    },

    editGame(_, args) {
      data.games= data.games.map(e=> {
        if(e.id === args.id){
          return {...e, ...args.edits}
        }
        return e
      })
      return data.games.find(game=> game.id === args.id)
    },
    deleteGame(_, args) {
      return data.games.filter((game) => game.id !== args.id)
    }
  }
}

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)