/** @jsxImportSource @emotion/react */
import { FaSearch, FaTimes } from 'react-icons/fa'
import { Spinner } from './styledComponents'

export default function SearchBar ({ handleSearch, isError, isLoading }) {
  return (
    <>
      <form onSubmit={handleSearch} css={{
        border: `5px solid ${isError ? 'red' : '#8080ff'}`,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: 'transparent',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <input id="search" type="search" placeholder="Search books..." css={{
          border: 'none',
          fontSize: '1em',
          width: '100%',
          '&:focus': {
            outline: 'none'
          }
        }}/>
        {isLoading ? <Spinner /> : isError ? <FaTimes color='red' /> : <FaSearch color='#8080ff' />}
      </form>

      {isError
        ? <div>
          <p>Nothing found</p>
          <pre>{error.message}</pre>
        </div>
        : null}
    </>
  )
}
