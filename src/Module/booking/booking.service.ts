import { Injectable } from '@nestjs/common';
import { Booking } from 'src/models/booking.model';
import { CreateBookingInput } from './booking.dto';

@Injectable()
export class BookingService {
  private bookings: Booking[] = [];
  private id = 1;

  create(input: CreateBookingInput): Booking {
    const booking: Booking = {
      id: this.id++,
      ...input,
      is_checked_in: false,
    };
    this.bookings.push(booking);
    return booking;
  }

  cancel(id: number): boolean {
    const idx = this.bookings.findIndex(b => b.id === id);
    if (idx === -1) return false;
    this.bookings.splice(idx, 1);
    return true;
  }

  checkIn(id: number): Booking {
    const booking = this.bookings.find(b => b.id === id);
    if (!booking) return null;
    booking.is_checked_in = true;
    return booking;
  }

  listByDateRange(start: Date, end: Date): Booking[] {
    return this.bookings.filter(
      b => new Date(b.start_date) >= new Date(start) &&
           new Date(b.end_date) <= new Date(end)
    );
  }
}
