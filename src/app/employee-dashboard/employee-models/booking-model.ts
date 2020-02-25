export interface Booking {
    booking_id: string;
    cust_username: string;
    adult_count: number;
    child_count: number;
    book_time: string;
    booking_status: string;
}

export interface Guest {
    cust_username: string;
    guest_username: string;
    guest_age: string;
    room_type_id: string;
    room_no: string;
    room_adult_count: number;
    room_child_count: number;
    kyc_type: string;
    kyc_number: string;
    kyc_proof: string;
}
