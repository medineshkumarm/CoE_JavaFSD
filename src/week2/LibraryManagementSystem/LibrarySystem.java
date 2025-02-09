package week2.LibraryManagementSystem;

import week2.LibraryManagementSystem.interfaces.ILibrary;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;

abstract class LibrarySystem implements ILibrary {
    protected Map<String, Book> books;
    protected Map<String, User> users;
    protected final ReentrantLock lock;

    public LibrarySystem() {
        this.books = new ConcurrentHashMap<>();
        this.users = new ConcurrentHashMap<>();
        this.lock = new ReentrantLock();
    }

    public abstract void addBook(Book book);
    public abstract void addUser(User user);
    protected abstract void saveToFile();
    protected abstract void loadFromFile();
}