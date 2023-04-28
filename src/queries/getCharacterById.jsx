import { gql } from '@apollo/client';

const GET_CHARACTER_BY_ID = gql`
  query GetCharacterById($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
      image
      created
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      episode {
        id
        name
        air_date
      }
    }
  }
`;

export default GET_CHARACTER_BY_ID;