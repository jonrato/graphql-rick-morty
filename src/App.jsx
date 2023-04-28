import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import Search from "./components/Search/SearchName";
import ImageCard from "./components/ImageCard/ImageCard";
// import Pagination from "./components/Paginator/Paginator";
import Filter from "./components/Select/SelectStatus";
import Navbar from "./components/Navbar/Navbar";
import {gql} from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { Card } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-js-pagination';

function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

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
          air_date
        }
      }
    }
  }
`;
  
  const [page, setPage] = useState(1);
  const [activePage, setActivePage] = useState(1)
  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      page: activePage,
      name: nameFilter,
      status: statusFilter
    },
  });

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber)
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;


  return (
    <div className="App bg-black" >
      <h1 className="text-center mb-3">Characters</h1>
      <div className="container">
      <div className="row">
        Filter component will be placed here
        <div className="col-lg-8 col-12">
          <div className="row">
          <div className="filter-container">
            <input type="text" placeholder="Search by name" value={nameFilter} onChange={handleNameFilterChange} />
            <select value={statusFilter} onChange={handleStatusFilterChange}>
              <option value="">All</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
          </div>
        </div>
        <div>
        <Row>
          {data.characters.results
            // .filter((character) => character.name.toLowerCase().includes(nameFilter.toLowerCase()))
            // .filter((character) => !statusFilter || character.status === statusFilter)
            .map((character) => (
            <div className='col-6' key={character.id}>
              <ImageCard character={character}/>
            </div>
          ))}
        </Row>
        </div>
      </div>
      <Pagination
            activePage={activePage}
            itemsCountPerPage={20}
            totalItemsCount={data.characters.info.count}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            prevPageText="Previous"
            nextPageText="Next"
            hideFirstLastPages={true}
            itemClass="page-item"
            linkClass="page-link"
            innerClass="pagination justify-content-center"
            activeClass="active"
          />
      </div>
    </div>

  );
}

export default App;
