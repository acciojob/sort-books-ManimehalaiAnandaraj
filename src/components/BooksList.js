import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSorting } from '../redux/actions';

const BooksList = () => {
  const dispatch = useDispatch();
  const { books, loading, error, sortBy, order } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortChange = (e) => {
    dispatch(setSorting(e.target.value, order));
  };

  const handleOrderChange = (e) => {
    dispatch(setSorting(sortBy, e.target.value));
  };

  return (
    <div>
      <h1>NYT Books</h1>

      <div>
        <label>
          Sort By:
          <select onChange={handleSortChange} value={sortBy}>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </label>

        <label>
          Order:
          <select onChange={handleOrderChange} value={order}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading books...</p>}
      {error && <p>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Title</th><th>Author</th><th>Publisher</th><th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.primary_isbn13}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
