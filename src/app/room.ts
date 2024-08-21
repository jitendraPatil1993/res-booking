export interface Room {
    "roomId": number,
    "locationId": number,
    "locationName": string,
    "roomName": string,
    "pricePerDayPerPerson": number,
    "guestCapacity": number,
}
export interface Availability {
    "roomId": number,
    "stayDateFrom": "YYYY-MM-DD",
    "stayDateTo": "YYYY-MM-DD",
    "arrivalDays": Array<string>, //["MON","FRI"]
    "departureDays": Array<string>,
    "minStay": number,
    "maxStay": number,
}