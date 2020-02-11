export interface RoomType {
    room_type_id: number;
    room_type_name: string;
    room_type_rate: number;
}

export interface Rooms {
    room_no: string;
    room_type_id: number;
    no_of_people: number;
    room_status: string;
}

export interface RoomsData {
    room_no: string;
    room_type_id: number;
    room_type_name: string;
    no_of_people: number;
    room_status: string;
}
