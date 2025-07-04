/**
 * as graphql para el lintado de eslint
 */
import { buildSchema as graphql } from 'graphql';

export const schema = graphql(`
  type Hotel {
    id: ID!
    type: String!
    name: String!
    address1: String!
    city: String!
    hotelRating: Float!
    shortDescription: String!
    thumbNailUrl: String!
    tripAdvisorRating: Float!
    tripAdvisorRatingUrl: String!
  }

  type City {
    id: ID!
    name: String!
  }

  type Query {
    hotels: [Hotel!]!
    hotel(id: ID!): Hotel!
    cities: [City!]!
  }

  input HotelInput {
    id: ID!
    name: String!
    address1: String!
    city: String!
    hotelRating: Float!
    shortDescription: String!
  }
  type Mutation {
    saveHotel(hotel: HotelInput!): Boolean
    deleteHotel(id: ID!): Boolean
  }
`);
