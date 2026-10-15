function BookItem({ book, onToggleRead, onEdit, onDelete }) {
  const isRead = book.status === 'read';
  return (
    <li className={`flex items-center gap-2 rounded-lg border bg-white px-3 py-2 shadow-sm transition-colors ${isRead ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-indigo-200'}`}>
      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${isRead ? 'bg-green-500' : 'bg-yellow-400'}`} aria-hidden="true" />
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold leading-5 ${isRead ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{book.title}</p>
        <p className="truncate text-xs text-gray-500">By: {book.author}</p>
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <button type="button" onClick={() => onToggleRead(book)} className={`whitespace-nowrap rounded-md px-2 py-1.5 text-xs font-semibold ${isRead ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-green-100 text-green-800 hover:bg-green-200'}`}>{isRead ? 'Unread' : 'Read'}</button>
        <button type="button" onClick={() => onEdit(book)} className="whitespace-nowrap rounded-md bg-indigo-100 px-2 py-1.5 text-xs font-semibold text-indigo-800 hover:bg-indigo-200" aria-label={`Edit ${book.title}`}>Edit</button>
        <button type="button" onClick={() => onDelete(book.id)} className="whitespace-nowrap rounded-md bg-red-100 px-2 py-1.5 text-xs font-semibold text-red-800 hover:bg-red-200" aria-label={`Delete ${book.title}`}>Delete</button>
      </div>
    </li>
  );
}

export default BookItem;
