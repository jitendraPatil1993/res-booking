export interface RoomAvail {
    "roomId": number,
    "stayDateFrom": "YYYY-MM-DD",
    "stayDateTo": "YYYY-MM-DD",
    "arrivalDays": Array<string>, //["MON","FRI"]
    "departureDays": Array<string>,
    "minStay": number,
    "maxStay": number,
}
