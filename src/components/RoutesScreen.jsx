import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { BookDetail } from "./BookDetail";
import Discover from "./Discover";
import FinishedBooks from "./FinishedBooks";
import ReadingList from "./ReadingList";
import nothingfound from "../assets/nothingfound.png";


function NothingOnRoute() {
  return (
    <>
    <h2>Oops! Nothing to show here.</h2>
    <p>You should probably go back to the <strong><Link to="/">Discover</Link></strong> page</p>
    <img src={nothingfound} alt="Bookshelf logo" width="40%" height="40%"/>
    </>
  )
}

export function RoutesScreen({handleSearch, query}) {
  return (<Routes>
      <Route path="/" element={<Discover handleSearch={handleSearch} query={query}/>}/>
      <Route path="/book/:bookId" element={<BookDetail />}/>
      <Route path="/readinglist" element={<ReadingList/>} />
      <Route path="/finishedbooks" element={<FinishedBooks />}/>
      <Route path="*" element={<NothingOnRoute/>}/>
    </Routes>)
}
  