import React from 'react';
import { Link, useParams } from "react-router-dom";


function BookDetail() {
    const {bookId} = useParams()
    return (
        <div>
            <Link to="/">
            Volver
            </Link>
            Libro detallado {bookId}
        </div>
    );
}

export default BookDetail;