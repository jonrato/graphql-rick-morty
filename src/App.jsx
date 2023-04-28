import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import ImageCard from "./components/ImageCard/ImageCard";
import { useQuery } from '@apollo/react-hooks';
import Row from 'react-bootstrap/Row';
import Pagination from 'react-js-pagination';
import Loading from './loading/portal-rick-and-morty.gif'
import SelectStatus from './components/Select/SelectStatus';
import SearchName from './components/Search/SearchName';
import GET_CHARACTERS from './queries/getCharacterById';

function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  
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


  return (
    <div className="App bg-black" >
      <h1 className="text-center text-white mb-4 mt-4">The Rick and Morty API</h1>
      <div className="container">
        <div className="row">
          
          {error && 'Error'}
          <Row className='col-12 mt-3 mb-3 d-flex justify-content-center'>
            <SearchName
              nameFilter={nameFilter}
              setNameFilter={setNameFilter}
            />
            <SelectStatus
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          </Row>

          <div>
            {loading && (
              <img className='mt-3 mb-3' src={Loading} style={{width:'8rem'}}/>
            )}
            <Row>
              {data?.characters?.results
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
          totalItemsCount={data?.characters?.info?.count}
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
