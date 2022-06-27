/** @jsxImportSource @emotion/react */
import { FaArrowLeft, FaPlusCircle } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { Link, useParams } from "react-router-dom";
import { client } from '../utils/client';
import { Button } from './styledComponents';


function BookDetail() {
    const {bookId} = useParams() 
    const {data, error, status} = useQuery(['bookDetail', bookId], 
    () => client(`https://www.googleapis.com/books/v1/volumes/${bookId}?`))
    return (
        <div css={{
            width: 'clamp(250px, 80%, 500px)',
            marginTop: '15px',
            borderRadius: '15px',
            boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
            padding: '15px',
            }}>
            <div css={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>

                <Link to={'/'}>
                    <Button>
                        <FaArrowLeft/>
                    </Button>
                </Link>
                <Button>
                    <FaPlusCircle/>
                </Button>
            </div>
            <h2>{data?.volumeInfo.title} | {data?.volumeInfo.authors}</h2>
            <h3>{data?.volumeInfo.subtitle}</h3>
            <div css={{
                boxShadow: 'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
                borderRadius: '15px',
                width: '150px',
                height: '200px',
                backgroundColor: 'white',
                backgroundImage: `url('${data?.volumeInfo?.imageLinks?.thumbnail}')`,
                backgroundSize: 'cover',
                }}>

            </div>
        <div css={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <div css={{
                backgroundColor: 'white',
                borderRadius: '15px',
                marginTop:' 15px',
                padding: '15px',
                color: 'black',
             }} dangerouslySetInnerHTML={{__html: data?.volumeInfo.description}}>
            </div>
        </div>
        </div>
    );
}

export default BookDetail;