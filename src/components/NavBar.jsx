/** @jsxImportSource @emotion/react */
import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./styledComponents";
export function NavBar() {
  return <div css={{
    marginTop: '15px',
    '& .active Button': {
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px',
      border: '2.5px solid #6f6fff'
    }
  }}>
         <NavLink to='/' activeclassname='active'>
          <Button>Discover</Button>
         </NavLink>
         <NavLink to='/readinglist' activeclassname='active'>
          <Button>Reading list</Button>
         </NavLink>
         <NavLink to='/finishedbooks' activeclassname='active'>
          <Button>Finished books</Button>
         </NavLink>
         </div>;
}
  