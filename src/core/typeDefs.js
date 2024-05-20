

export const typeDefs = `#graphql
  scalar Date

  type Query {
    getUser: User
    getPost(postId: ID!): Post
    getPosts: [Post]
  }

  type Mutation {
    createUser(username: String!, name: String!, password: String!,): Token
    loginUser(username: String, password: String!): Token
    likePost(postId: ID!): Boolean
    createPost(content: String!): Post
  }

  type Post {
    id: ID
    owner: User
    createdAt: Date
    content: String
    comments: [Post]
    likes: [ID]
    isLiking: Boolean
  }

  type Token {
    accessToken: String
    refreshToken: String
  }

  type User {
    id: ID!
    name: String
    username: String
    posts: [Post]
  }
`;
