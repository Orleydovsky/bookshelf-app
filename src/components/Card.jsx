/** @jsxImportSource @emotion/react */

function Card ({ title, imageURl }) {
  return (
    <div css={{
      backgroundColor: 'black',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      backgroundImage: `url('${imageURl}')`,
      height: '200px',
      boxSizing: 'border-box',
      backgroundSize: 'cover',
      borderRadius: '15px',
      boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
      '&:hover': {
        transition: 'all 125ms',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'
      },
      '&:hover .child': {
        transition: 'all 125ms',
        width: '100%',
        borderRadius: '15px'
      }
    }}>
      <div className='child' css={{
        boxSizing: 'border-box',
        color: 'white',
        backgroundColor: '#8080ff',
        padding: '15px',
        width: '80%',
        borderRadius: '15px 0px 15px 0px',
        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;'
      }}>
        <p css={{
          margin: '0px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '4',
          WebkitBoxOrient: 'vertical'
        }}>
          {title}
        </p>
      </div>
    </div>
  )
}

export default Card
