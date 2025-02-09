package week2.LibraryManagementSystem;

import week2.LibraryManagementSystem.customExceptions.MaxBooksAllowedException;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

class User implements Serializable {
    private String name;
    private String userID;
    private List<Book> borrowedBooks;
    private static final int MAX_BOOKS = 3;

    public User(String name, String userID) {
        this.name = name;
        this.userID = userID;
        this.borrowedBooks = new ArrayList<>();
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public String getUserID() {
        return userID;
    }

    public List<Book> getBorrowedBooks() {
        return borrowedBooks;
    }

    public boolean canBorrowBooks() {
        return borrowedBooks.size() < MAX_BOOKS;
    }

    public void borrowBook(Book book) throws MaxBooksAllowedException {
        if (!canBorrowBooks()) {
            throw new MaxBooksAllowedException("User has reached maximum book limit");
        }
        borrowedBooks.add(book);
    }

    public void returnBook(Book book) {
        borrowedBooks.remove(book);
    }
}