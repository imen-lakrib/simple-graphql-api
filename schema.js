export const typeDefs = `#graphql
  type Game {
    id: ID!
    title: String!
    platform: [String!]!
    author: Author!
    reviews: [Review!]
  }
  type Review {
    id: ID!
    rating: Int!
    content: String!
    author: Author!
    game: Game!
  }
  type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
  }
  type Query {
    games: [Game]
    reviews: [Review]
    review(id:ID!): Review
    authors: [Author]
    game(id: ID!): Game
    author(id: ID!): Author
  },

  type Mutation {
    addGame(game:AddGameInput!): Game
    deleteGame(id: ID!): [Game]
    editGame(id: ID!,edits:EditGameInput!): Game

  }
  # input fields fo adding a new game
  input AddGameInput{
    title: String!
    platform: [String!]!

  }
  input EditGameInput{
    title: String
    platform: [String!]

  }
`