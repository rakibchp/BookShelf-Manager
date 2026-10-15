import BookItem from './BookItem';

function BookList({ books, onToggleRead, onEdit, onDelete }) {
  if (books.length === 0) {
    return <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white px-6 py-16 text-center"><p className="mb-3 text-4xl" aria-hidden="true">📚</p><p className="font-medium text-gray-500">No books yet</p><p className="mt-1 text-sm text-gray-400">Add your first book above to get started!</p></div>;
  }
  return <ul className="flex flex-col gap-3">{books.map((book) => <BookItem key={book.id} book={book} onToggleRead={onToggleRead} onEdit={onEdit} onDelete={onDelete} />)}</ul>;
}

export default BookList;
