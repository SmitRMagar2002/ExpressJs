const express = require('express');
const app = express();
const port = 3000;

const books = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
];

app.use(express.json());

// GET all
app.get('/books', (req, res) => {
  res.json(books);
});

// GET by id
app.get('/books/:id', (req, res) => {
  const bookid = Number(req.params.id);
  if (Number.isNaN(bookid)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  const book = books.find(b => b.id === bookid);
  if (!book) {
    return res.status(404).json({ error: `Book with id ${bookid} not found` });
  }
  res.json(book);
});

// POST create
let nextId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;

app.post('/books', (req, res) => {
  const title = (req.body.title || '').trim();
  const author = (req.body.author || '').trim();

  if (!title || !author) {
    return res.status(400).json({ error: 'Author and title are required' });
  }

  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// DELETE by id (since you had a section header for it)
app.delete('/books/:id', (req, res) => {
  const bookid = Number(req.params.id);
  if (Number.isNaN(bookid)) {
    return res.status(400).json({ error: 'Invalid book ID' });
  }

  const idx = books.findIndex(b => b.id === bookid);
  if (idx === -1) {
    return res.status(404).json({ error: `Book with id ${bookid} not found` });
  }

  const [removed] = books.splice(idx, 1);
  res.json(removed);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
