import express from "express";
import {
  addBook,
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  searchBookByTitle,
  searchBookByAuthor,
  // queryTest,
} from "../controllers/bookController";

const router = express.Router();

router.route("/book").post(addBook).get(getBooks);
router.route("/book/:id").get(getBookById).delete(deleteBook).patch(updateBook);
router.route("/book/search/title").post(searchBookByTitle);
router.route("/book/search/author").post(searchBookByAuthor);
// router.route("/test").get(queryTest);

export default router;
