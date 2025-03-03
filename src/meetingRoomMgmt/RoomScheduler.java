package meetingRoomMgmt;

import java.util.*;

public class RoomScheduler {
    //map to store meeting rooms
    private final Map<String, MeetingRoom> rooms = new HashMap<>();

    //add meeting
    public void addMeetingRoom(MeetingRoom room){
        rooms.put(room.roomId,room);

        System.out.println("ROOM ADDED: " + room.roomName + " ID: "+ room.roomId);
    }

    //book rooms
    public String bookRoom(String roomId, EnumSet<RoomFeature> requiredFeatures){
        MeetingRoom  room = rooms.get(roomId);
        //if room matches all sp features return room
        if(room != null && room.features.containsAll(requiredFeatures)){
            return "Room " + roomId + " Booked successfully";
        }
        //else tell room does not meet the req
        else{
            return "Room" + roomId + "does not meet the requirements";
        }
    }

    //list available rooms
    public List<String> listAvailableRooms(EnumSet<RoomFeature> requiredFeatures){
        List<String> availableRooms = new ArrayList<>();
        for(MeetingRoom room : rooms.values()){
            if(room.features.containsAll(requiredFeatures)){
                availableRooms.add(room.roomName);
            }
        }
        System.out.println("Available rooms with" + requiredFeatures + " : "+ availableRooms);
        return availableRooms;
    }
}
