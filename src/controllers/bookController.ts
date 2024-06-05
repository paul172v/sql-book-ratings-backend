import { Request, Response } from "express";
import Book from "../models/bookModel";
import { Op } from "sequelize";

// Add a new book
export const addBook = async (req: Request, res: Response) => {
  const { title, author, rating } = req.body;

  // Basic validation
  if (!title || !author || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newBook = await Book.create({
      title,
      author,

      rating,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ message: "Failed to add book" });
  }
};

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ message: "Failed to retrieve books" });
  }
};

// Get a book by ID
export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error("Error retrieving book:", error);
    res.status(500).json({ message: "Failed to retrieve book" });
  }
};

// Delete a book by ID
export const deleteBook = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book" });
  }
};

// Update a book by ID
export const updateBook = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, rating } = req.body;

  // Basic validation
  if (!title || !author || !rating) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.set({ title, author, rating }).save();
    res.status(200).json(book);
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book" });
  }
};

// Search for a book by title
export const searchBookByTitle = async (req: Request, res: Response) => {
  const { title } = req.body;

  try {
    const book = await Book.findOne({ where: { title: title } });
    if (book === null) {
      console.log("Not found!");
    } else {
      console.log(book instanceof Book); // true
      console.log(book); // 'My Title'
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error searching books by title:", error);
    res.status(500).json({ message: "Failed to search books by title" });
  }
};

// Search for a book by author
export const searchBookByAuthor = async (req: Request, res: Response) => {
  const { author } = req.body;

  try {
    const book = await Book.findAll({ where: { author: author } });
    if (book === null) {
      console.log("Not found!");
    } else {
      console.log(book instanceof Book); // true
      console.log(book);
    }

    res.status(200).json(book);
  } catch (error) {
    console.error("Error searching books by author:", error);
    res.status(500).json({ message: "Failed to search books by author" });
  }
};

// export const queryTest = async (req: Request, res: Response) => {
//   let query = req.query;
//   let criteriaArr;
//   let books;

//   if (query.criteria) {
//     criteriaArr = String(query.criteria).split(" ");
//   }

//   query.criteria
//     ? (books = await Book.findAll({ attributes: criteriaArr }))
//     : (books = await Book.findAll());

//   res.status(200).json(books);
// };
