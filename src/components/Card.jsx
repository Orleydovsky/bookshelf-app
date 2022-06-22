/** @jsxImportSource @emotion/react */

function Card({title, imageURl}) {
    return (
        <div css={{
            backgroundColor: 'black',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            // backgroundImage: `url('${imageURl?.replace(/zoom=1/, 'zoom=0')}')`,
            backgroundImage: `url('${imageURl}')`,
            width: '100%',
            boxSizing: 'border-box',
            backgroundSize: 'cover',
            borderRadius: '15px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
            }}>
                <div css={{
                    color: 'black',
                    backgroundColor: '#FFF',
                    padding: '15px',
                    width: '60%',
                    borderRadius: '15px 0px 15px 0px',  
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;',
                    opacity: '0.9',
                    }}>
                    <p css={
                        {
                    margin: '0px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    '-webkit-line-clamp': '4',
                    '-webkit-box-orient': 'vertical',
                        }
                    }>
                    {title}
                    </p>
                </div>
        </div>
    );
}

export default Card;
