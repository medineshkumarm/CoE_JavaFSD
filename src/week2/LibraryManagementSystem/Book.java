package week2.LibraryManagementSystem;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.Queue;

public class Book implements Serializable {

    private String title;
    private String author;
    private String ISBN;
    private boolean isAvailable;
    private Queue<String> reservationQueue;

    public Book(String title, String author, String ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.isAvailable = true;
        this.reservationQueue = new LinkedList<>();
    }


    public void addReservation(String userID) {
        reservationQueue.offer(userID);
    }

    public String getNextReservation() {
        return reservationQueue.poll();
    }

    public boolean hasReservations() {
        return !reservationQueue.isEmpty();
    }



    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public Queue<String> getReservationQueue() {
        return reservationQueue;
    }

    public void setReservationQueue(Queue<String> reservationQueue) {
        this.reservationQueue = reservationQueue;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }
}
