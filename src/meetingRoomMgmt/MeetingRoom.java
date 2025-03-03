package meetingRoomMgmt;

import java.util.EnumSet;

public class MeetingRoom {
    String roomId;
    String roomName;
    int capacity;
    EnumSet<RoomFeature> features;


    public MeetingRoom(String roomId, String roomName, int capacity, EnumSet<RoomFeature> features) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.capacity = capacity;
        this.features = features;
    }


    @Override
    public String toString() {
        return "MeetingRoom{" + "roomId='" + roomId + '\'' + ", roomName='" + roomName + '\'' + ", capacity=" + capacity + ", features=" + features + '}';
    }
}
