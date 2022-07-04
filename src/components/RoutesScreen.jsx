import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { BookDetail } from "./BookDetail";
import Discover from "./Discover";
import FinishedBooks from "./FinishedBooks";
import ReadingList from "./ReadingList";
export function RoutesScreen({
  handleSearch,
  query
}) {
  return <Routes>
          <Route path="/" element={<Discover handleSearch={handleSearch} query={query} />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/readinglist" element={<ReadingList />} />
          <Route path="/finishedbooks" element={<FinishedBooks />} />
          <Route path="*" element={<h1>Nothing found <Link to="/">Back</Link></h1>} />
        </Routes>;
}
  