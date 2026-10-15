import { useState } from 'react';

function BookForm({ onAdd, editingBook, onUpdate, onCancelEdit }) {
  const [title, setTitle] = useState(() => editingBook?.title || '');
  const [author, setAuthor] = useState(() => editingBook?.author || '');
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !author.trim()) return;
    setSaving(true);
    try {
      const saved = editingBook
        ? await onUpdate(editingBook.id, { title: title.trim(), author: author.trim() })
        : await onAdd({ title: title.trim(), author: author.trim() });
      if (saved) { setTitle(''); setAuthor(''); }
    } finally {
      setSaving(false);
    }
  };

  const inputClass = 'min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 placeholder:text-gray-500 focus:border-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200';
  return (
    <form onSubmit={submit} className="mb-5 flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label className="sr-only" htmlFor="book-title">Book title</label>
        <input id="book-title" required maxLength="160" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Book title" className={inputClass} />
        <label className="sr-only" htmlFor="book-author">Author</label>
        <input id="book-author" required maxLength="120" value={author} onChange={(event) => setAuthor(event.target.value)} placeholder="Author" className={inputClass} />
      </div>
      <div className="flex gap-2">
        <button disabled={saving} type="submit" className="min-h-10 flex-1 cursor-pointer rounded-lg bg-indigo-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-800 disabled:cursor-wait disabled:opacity-60">{saving ? 'Saving…' : editingBook ? 'Update Book' : '+ Add Book'}</button>
        {editingBook && <button type="button" onClick={onCancelEdit} className="min-h-10 cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100">Cancel</button>}
      </div>
    </form>
  );
}

export default BookForm;
