package week2.LibraryManagementSystem;

import week2.LibraryManagementSystem.customExceptions.BookNotFoundException;
import week2.LibraryManagementSystem.customExceptions.MaxBooksAllowedException;
import week2.LibraryManagementSystem.customExceptions.UserNotFoundException;

import java.io.*;
import java.util.Map;
import java.util.Scanner;

class LibraryManager extends LibrarySystem {
    private static final String DATA_FILE = "library_data.ser";
    private Scanner scanner;

    public LibraryManager() {
        super();
        loadFromFile();
        scanner = new Scanner(System.in);
    }


    @Override
    public void addBook(Book book) {
        books.put(book.getISBN(), book);
        saveToFile();
    }

    @Override
    public void addUser(User user) {
        users.put(user.getUserID(), user);
        saveToFile();
    }

    @Override
    public void borrowBook(String ISBN, String userID)
            throws BookNotFoundException, UserNotFoundException, MaxBooksAllowedException {
        lock.lock();
        try {
            Book book = books.get(ISBN);
            User user = users.get(userID);

            if (book == null) throw new BookNotFoundException("Book not found: " + ISBN);
            if (user == null) throw new UserNotFoundException("User not found: " + userID);

            if (!book.isAvailable()) {
                if (book.hasReservations() && !book.getNextReservation().equals(userID)) {
                    throw new BookNotFoundException("Book is reserved for another user");
                }
            }

            user.borrowBook(book);
            book.setAvailable(false);
            saveToFile();

        } finally {
            lock.unlock();
        }
    }

    @Override
    public void returnBook(String ISBN, String userID)
            throws BookNotFoundException, UserNotFoundException {
        lock.lock();
        try {
            Book book = books.get(ISBN);
            User user = users.get(userID);

            if (book == null) throw new BookNotFoundException("Book not found: " + ISBN);
            if (user == null) throw new UserNotFoundException("User not found: " + userID);

            user.returnBook(book);
            book.setAvailable(true);
            saveToFile();

        } finally {
            lock.unlock();
        }
    }

    @Override
    public void reserveBook(String ISBN, String userID)
            throws BookNotFoundException, UserNotFoundException {
        lock.lock();
        try {
            Book book = books.get(ISBN);
            User user = users.get(userID);

            if (book == null) throw new BookNotFoundException("Book not found: " + ISBN);
            if (user == null) throw new UserNotFoundException("User not found: " + userID);

            book.addReservation(userID);
            saveToFile();

        } finally {
            lock.unlock();
        }
    }

    @Override
    public Book searchBook(String title) {
        return books.values().stream()
                .filter(book -> book.getTitle().toLowerCase().contains(title.toLowerCase()))
                .findFirst()
                .orElse(null);
    }

    @Override
    protected void saveToFile() {
        try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(DATA_FILE))) {
            oos.writeObject(books);
            oos.writeObject(users);
        } catch (IOException e) {
            System.err.println("Error saving library data: " + e.getMessage());
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    protected void loadFromFile() {
        File file = new File(DATA_FILE);
        if (!file.exists()) return;

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            books = (Map<String, Book>) ois.readObject();
            users = (Map<String, User>) ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error loading library data: " + e.getMessage());
        }
    }


    public void displayMenu() {
        System.out.println("\n=== Library Management System ===");
        System.out.println("1. Add Book");
        System.out.println("2. Add User");
        System.out.println("3. Borrow Book");
        System.out.println("4. Return Book");
        System.out.println("5. Reserve Book");
        System.out.println("6. Search Book");
        System.out.println("7. Display All Books");
        System.out.println("8. Display All Users");
        System.out.println("9. Exit");
        System.out.print("Enter your choice: ");
    }

    public void handleUserInput() {
        boolean running = true;
        while (running) {
            displayMenu();
            String choice = scanner.nextLine();

            try {
                switch (choice) {
                    case "1" -> addNewBook();
                    case "2" -> addNewUser();
                    case "3" -> handleBorrowBook();
                    case "4" -> handleReturnBook();
                    case "5" -> handleReserveBook();
                    case "6" -> handleSearchBook();
                    case "7" -> displayAllBooks();
                    case "8" -> displayAllUsers();
                    case "9" -> running = false;
                    default -> System.out.println("Invalid choice. Please try again.");
                }
            } catch (Exception e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
        System.out.println("Thank you for using the Library Management System!");
    }

    private void addNewBook() {
        System.out.print("Enter book title: ");
        String title = scanner.nextLine();
        System.out.print("Enter author name: ");
        String author = scanner.nextLine();
        System.out.print("Enter ISBN: ");
        String isbn = scanner.nextLine();

        Book book = new Book(title, author, isbn);
        addBook(book);
        System.out.println("Book added successfully!");
    }

    private void addNewUser() {
        System.out.print("Enter user name: ");
        String name = scanner.nextLine();
        System.out.print("Enter user ID: ");
        String userId = scanner.nextLine();

        User user = new User(name, userId);
        addUser(user);
        System.out.println("User added successfully!");
    }

    private void handleBorrowBook() {
        System.out.print("Enter user ID: ");
        String userId = scanner.nextLine();
        System.out.print("Enter book ISBN: ");
        String isbn = scanner.nextLine();

        try {
            borrowBook(isbn, userId);
            System.out.println("Book borrowed successfully!");
        } catch (Exception e) {
            System.out.println("Error borrowing book: " + e.getMessage());
        }
    }

    private void handleReturnBook() {
        System.out.print("Enter user ID: ");
        String userId = scanner.nextLine();
        System.out.print("Enter book ISBN: ");
        String isbn = scanner.nextLine();

        try {
            returnBook(isbn, userId);
            System.out.println("Book returned successfully!");
        } catch (Exception e) {
            System.out.println("Error returning book: " + e.getMessage());
        }
    }

    private void handleReserveBook() {
        System.out.print("Enter user ID: ");
        String userId = scanner.nextLine();
        System.out.print("Enter book ISBN: ");
        String isbn = scanner.nextLine();

        try {
            reserveBook(isbn, userId);
            System.out.println("Book reserved successfully!");
        } catch (Exception e) {
            System.out.println("Error reserving book: " + e.getMessage());
        }
    }

    private void handleSearchBook() {
        System.out.print("Enter book title to search: ");
        String title = scanner.nextLine();

        Book book = searchBook(title);
        if (book != null) {
            displayBookDetails(book);
        } else {
            System.out.println("Book not found.");
        }
    }

    private void displayAllBooks() {
        if (books.isEmpty()) {
            System.out.println("No books in the library.");
            return;
        }

        System.out.println("\n=== Library Books ===");
        for (Book book : books.values()) {
            displayBookDetails(book);
        }
    }

    private void displayBookDetails(Book book) {
        System.out.println("\nTitle: " + book.getTitle());
        System.out.println("Author: " + book.getAuthor());
        System.out.println("ISBN: " + book.getISBN());
        System.out.println("Status: " + (book.isAvailable() ? "Available" : "Borrowed"));
        System.out.println("Has Reservations: " + (book.hasReservations() ? "Yes" : "No"));
        System.out.println("-----------------");
    }

    private void displayAllUsers() {
        if (users.isEmpty()) {
            System.out.println("No users registered.");
            return;
        }

        System.out.println("\n=== Registered Users ===");
        for (User user : users.values()) {
            displayUserDetails(user);
        }
    }

    private void displayUserDetails(User user) {
        System.out.println("\nName: " + user.getName());
        System.out.println("User ID: " + user.getUserID());
        System.out.println("Books borrowed: " + user.getBorrowedBooks().size());
        if (!user.getBorrowedBooks().isEmpty()) {
            System.out.println("Borrowed Books:");
            for (Book book : user.getBorrowedBooks()) {
                System.out.println("- " + book.getTitle());
            }
        }
        System.out.println("-----------------");
    }
}
