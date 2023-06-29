import React, { useEffect, useState } from 'react'
import User from '../Users/User'
import axios from '../../../services/axios';
import Pagination from '../../Pagination/Pagination';

const Home = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([])
  const [sort, setSort] = useState('updated');
  const [page, setPage] = useState(1);
  const [countPages, setcountPages] = useState(0);

  const handleQueryInput = (e) => {
    const value = e.target.value;
    setQuery(value);
  }

  const handlePrevPage = () => {
    setPage( page => {
      if(page === 1) return page
      else return page - 1;
    })
  }

  const handleNextPage = () => {
    setPage( page =>  page + 1);
  }

  const handleNumberPage = (value) => {
    setPage(value);
  }

  const handleSort = (e) => {
    const value = e.target.value;
    setSort(value)
  }

  const fetchUsers =  () => {
    //{&page,per_page,sort,order}
    axios.get(`/search/users?q=${query}&page=${page}&per_page=15&sort=${sort}`)
      .then( res => {
        const searchUsers = res.data.items;
        const totalItems = res.data.total_count
        setUsers(searchUsers);
        setcountPages(totalItems);
        console.log(res.data.items)
        return searchUsers
      }).catch((error )=> {
        console.error(error)
      })
  }

  const handleSearchUsers =  async (e) => {
    e.preventDefault();
    console.log(query)
    if(query) {
      const items = await fetchUsers();
      setUsers(items);
    }
    else {
      console.log('query empty')
    }
  }

  useEffect(() => {
    console.log(page)
    console.log(sort)
    const usersUpdate =  async () => {
      if(query) {
        const items =  await fetchUsers();
        setUsers(items);
      }
    }
    usersUpdate();
  }, [page, sort]);

  return (
    <div className='container p-3'>
      <div className="input-group m-3 col-xs-12 col-md-4">
        <div className="input-group-prepend">
          <span className="input-group-text" id="search-input"><i className="bi bi-search"></i></span>
        </div>
        <input  value={query} onChange={handleQueryInput} type="text" className="form-control" placeholder="Search users from Github" aria-label="Github search" aria-describedby="search-input" />
        <button onClick={handleSearchUsers} className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
      </div>

      {countPages > 0 ? 
        <div className='container mb-3'>
        <div className='row'>
          <div className='col-sm-6 col-md-3 '>
            <div className="input-group">
              <select onChange={handleSort} className="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                <option defaultValue={sort}>Sort by</option>
                <option value="stars">Stars</option>
                <option value="forks">Forks</option>
                <option value="help-wanted-issues">Help wanted Issues</option>
                <option value="updated">Updated</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      : null
      }

      <div className='container text-center'>
        <div className='row'>
        {users ? users.map(user =>{
            return <User user={user} key={user.id} />
          }): <div class="spinner-border text-primary mx-auto d-block" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
        }
        </div>
      </div>
      {countPages > 0 ? 
        <Pagination  
        numberPages={countPages} 
        handleNumberPage={handleNumberPage} 
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        currentPage={page} />
      : null
      }
    </div>
  )
}

export default Home