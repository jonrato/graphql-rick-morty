import { gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query Characters($page: Int, $name: String, $status: String) {
    characters(page: $page, filter: { name: $name, status: $status }) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        gender
        location {
          name
        }
        episode {
          name
          air_date
        }
      }
    }
  }
`;

export default GET_CHARACTERS;