/** @jsxImportSource @emotion/react */
import { FaSearch, FaSpinner, FaTimes,  } from "react-icons/fa";

export default function SearchBar({handleSearch, isError, isLoading}) {
  return (
    <form onSubmit={handleSearch} css={{
      border: `5px solid ${isError ? 'red' : '#8080ff'}`,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '10px 20px',
      borderRadius: '5px',
      backgroundColor: 'transparent',
      width: '60%'
      }}>
        <input id="search" type="search" placeholder="Search books..." css={{
          border: 'none',
          fontSize: '1em',
          width: '100%',
            '&:focus': {
              outline: 'none'
            }
          }}/>
            {isLoading ? <FaSpinner /> : isError ? <FaTimes color='red' /> : <FaSearch color='#8080ff' />}
        </form>
        )
    }
  
  