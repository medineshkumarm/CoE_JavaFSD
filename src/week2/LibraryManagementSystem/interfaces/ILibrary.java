package week2.LibraryManagementSystem.interfaces;

import week2.LibraryManagementSystem.Book;
import week2.LibraryManagementSystem.customExceptions.*;

// Library Interface
public interface ILibrary {
    void borrowBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException;

    void returnBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException;

    void reserveBook(String ISBN, String userID) throws BookNotFoundException, UserNotFoundException;

    Book searchBook(String title);
}