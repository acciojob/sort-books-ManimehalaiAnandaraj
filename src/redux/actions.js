import axios from 'axios';

export const fetchBooks = () => async (dispatch) => {
  dispatch({ type: 'books/fetchStart' });

  try {
    const response = await axios.get(
      `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.REACT_APP_NYT_API_KEY}`
    );

    const books = response.data.results.books;
    dispatch({ type: 'books/fetchSuccess', payload: books });
  } catch (error) {
    dispatch({ type: 'books/fetchError', payload: error.message });
  }
};

export const setSorting = (sortBy, order) => ({
  type: 'books/setSorting',
  payload: { sortBy, order },
});
