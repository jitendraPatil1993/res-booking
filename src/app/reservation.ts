export interface Reservation {
    "reservationId": number,
    "locationId": number,
    "roomId": number,
    "customerId" : number,
    "arrivalDate": "YYYY-MM-DD",
    "departureDate": "YYYY-MM-DD",
    "reservationDate": "YYYY-MM-DD HH:MM:SS",
    "totalPrice": number,
    "status": "CONFIRM" | "CHECKED-IN" | "CHECKED-OUT",
    "paidAmount": number,
    "numberOfGuest": number,
}
