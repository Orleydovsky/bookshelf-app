# BookshelfApp!
## About
BookshelfApp is a small but very important project for me: This is my very first React app made from scratch!

## Features

- Login, or register if the user does not have an account.
- Once on the dashboard, (known by the user as the discover page),the user can search for any book. Any search performed will return some relevant information since the data is sent from google books API.
- Search results will be shown as a set of ten cards that show the book title and cover image, you can click on those cards to be redirected to a dynamic route that renders more details. On that detailed card, you should be able to add that book to a reading list, and then park it as read.
- Users can navigate to the reading list tab, or the finished book tab to see a list of the books you have added to either of those lists.
- Users can delete books from either list

## Environment Variables

Before you can search for books, there is the need to get a google books API key and save it on `.env.local` which is on the root folder

`VITE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY`



## Installation

Once forked or cloned, locate on the root folder and execute

```bash
  npm install
  npm run dev
```
    
## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Tech Stack

**Client:** React, Styled-Components

**Backend as a Service:** Node, Express
        

