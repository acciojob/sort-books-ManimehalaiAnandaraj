const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: 'title',
  order: 'asc',
};

function sortBooks(books, sortBy, order) {
  return [...books].sort((a, b) => {
    const valueA = a[sortBy]?.toLowerCase();
    const valueB = b[sortBy]?.toLowerCase();

    if (valueA < valueB) return order === 'asc' ? -1 : 1;
    if (valueA > valueB) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

export default function booksReducer(state = initialState, action) {
  switch (action.type) {
    case 'books/fetchStart':
      return { ...state, loading: true, error: null };
    case 'books/fetchSuccess':
      return {
        ...state,
        loading: false,
        books: sortBooks(action.payload, state.sortBy, state.order),
      };
    case 'books/fetchError':
      return { ...state, loading: false, error: action.payload };
    case 'books/setSorting':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        order: action.payload.order,
        books: sortBooks(state.books, action.payload.sortBy, action.payload.order),
      };
    default:
      return state;
  }
}
