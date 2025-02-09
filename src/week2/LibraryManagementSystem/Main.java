package week2.LibraryManagementSystem;

public class Main {
    public static void main(String[] args) {
        LibraryManager library = new LibraryManager();

        // Add some sample data
        library.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald", "123456"));
        library.addBook(new Book("1984", "George Orwell", "789012"));
        library.addUser(new User("John Doe", "U001"));
        library.addUser(new User("Jane Smith", "U002"));

        // Start the console application
        library.handleUserInput();
    }
}