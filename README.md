<h1>BookshelfApp!</h1>
<h2>About</h2>
    <p>BookshelfApp is a small but very important project for me: This is my very first React app made from scratch!</p>
    <p>On this app users will be able to: 
        <ul>
            <li>
            login, or register if the user does not have an account.
            </li>
            <li>
            Once on the dashboard, (known by the user as the <strong>discover<strong> page) user can search for any book. Any search performed will return some relevant information since the data is sent from google books API. 
            </li>
            <li>
            Search results will be shown as a set of ten cards that show the book title and cover image, you can click on those cards to be redirected to a dynamic route that renders more details. 
            </li>
            <li>
            On that detailed card, you should be able to add that book to a reading list, and then park it as read. 
            </li>
            <li>
            Users can navigate to the reading list tab, or the finished book tab to see a list of the books you have added to either of those lists.
            </li>
            <li>
            Users can delete books from either list.
            </li>
        </ul>
    </p>
    <h2>Installing and running the project</h2>
        <p>
        <ul>
            <li>Fork the repository</li>
            <li>Clone it on your local machine and run npm install command</li>
            <li>The project uses vite, so to start the development server use npm run dev</li>
            <li>Now you should see the project and be able to create an account to login</li>
            <li>Before you can search for books, there is the need to get a a google books API key and save it on an .env file, then call it from the client function so that requests for book information via the search bar works</li>
        </ul>
        </p>
        

