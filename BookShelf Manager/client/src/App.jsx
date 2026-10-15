import { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/books`;

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [toast, setToast] = useState(null);
  const notify = (message, type = 'add') => setToast({ message, type });

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    axios.get(API_URL)
      .then(({ data }) => setBooks(data.data || []))
      .catch(() => {
        const message = 'Could not load your shelf. Check that the server is running.';
        notify(message, 'loadError');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (book) => {
    try {
      const { data } = await axios.post(API_URL, book);
      setBooks((current) => [data.data, ...current]);
      notify('Book added to your shelf.');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Could not add this book.';
      notify(message, 'error');
      return false;
    }
  };

  const handleUpdate = async (id, changes) => {
    try {
      const { data } = await axios.put(`${API_URL}/${id}`, changes);
      setBooks((current) => current.map((book) => book.id === id ? data.data : book));
      setEditingBook(null);
      notify('Book details updated.', 'edit');
      return true;
    } catch (err) {
      const message = err.response?.data?.message || 'Could not update this book.';
      notify(message, 'error');
      return false;
    }
  };

  const handleToggleRead = async (book) => {
    try {
      const { data } = await axios.put(`${API_URL}/${book.id}`, {
        status: book.status === 'read' ? 'unread' : 'read',
      });
      setBooks((current) => current.map((item) => item.id === book.id ? data.data : item));
      notify(book.status === 'read' ? 'Book marked as unread.' : 'Book marked as read.', book.status === 'read' ? 'unread' : 'read');
    } catch (err) {
      const message = err.response?.data?.message || 'Could not update this book.';
      notify(message, 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks((current) => current.filter((book) => book.id !== id));
      notify('Book deleted from your shelf.', 'delete');
    } catch (err) {
      const message = err.response?.data?.message || 'Could not remove this book.';
      notify(message, 'error');
    }
  };

  const readCount = books.filter((book) => book.status === 'read').length;
  const unreadCount = books.length - readCount;
  const toastStyles = {
    add: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    edit: 'border-indigo-200 bg-indigo-50 text-indigo-900',
    read: 'border-green-200 bg-green-50 text-green-900',
    unread: 'border-amber-200 bg-amber-50 text-amber-950',
    delete: 'border-rose-200 bg-rose-50 text-rose-900',
    error: 'border-red-200 bg-red-50 text-red-900',
    loadError: 'border-orange-200 bg-orange-50 text-orange-950',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="border-b border-gray-100 bg-white shadow-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2"><span className="text-2xl" aria-hidden="true"></span><h1 className="text-xl font-bold text-gray-800">Book Shelf Manager</h1></div>
          <span className="hidden text-xs font-medium text-gray-400 sm:block">DIPTI MERN Exam Batch-04//Abdur Rakib</span>
        </div>
      </nav>
      <main className="mx-auto max-w-3xl px-4 py-6">
        <div className="mb-4 grid w-full grid-cols-3 gap-2">
          <div className="rounded-lg border border-gray-100 bg-white px-2 py-2 text-center shadow-sm"><p className="text-xl font-bold leading-6 text-indigo-600">{books.length}</p><p className="mt-0.5 text-[11px] font-medium text-gray-500">Total</p></div>
          <div className="rounded-lg border border-yellow-100 bg-white px-2 py-2 text-center shadow-sm"><p className="text-xl font-bold leading-6 text-yellow-600">{unreadCount}</p><p className="mt-0.5 text-[11px] font-medium text-gray-500">To read</p></div>
          <div className="rounded-lg border border-green-100 bg-white px-2 py-2 text-center shadow-sm"><p className="text-xl font-bold leading-6 text-green-700">{readCount}</p><p className="mt-0.5 text-[11px] font-medium text-gray-500">Read</p></div>
        </div>
        <BookForm key={editingBook?.id || 'new-book'} onAdd={handleAdd} editingBook={editingBook} onUpdate={handleUpdate} onCancelEdit={() => setEditingBook(null)} />
        <div className="mb-4 flex items-center justify-between"><h2 className="text-base font-semibold text-gray-700">Book List</h2>{books.length > 0 && <span className="text-xs text-gray-400"> Status: {readCount} of {books.length} are read</span>}</div>
        {loading ? <div className="flex items-center justify-center py-16"><div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" /><span className="ml-3 text-sm text-gray-500">Loading books…</span></div> : <BookList books={books} onToggleRead={handleToggleRead} onEdit={setEditingBook} onDelete={handleDelete} />}
      </main>
      {toast && <div role={toast.type.toLowerCase().includes('error') ? 'alert' : 'status'} aria-live={toast.type.toLowerCase().includes('error') ? 'assertive' : 'polite'} className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border px-5 py-4 text-center text-sm font-semibold shadow-xl ${toastStyles[toast.type] || toastStyles.add}`}>{toast.message}</div>}
      <footer className="py-6 text-center text-xs text-gray-400">Book Shelf Manager — MERN Stack Exam Project</footer>
    </div>
  );
}

export default App;
