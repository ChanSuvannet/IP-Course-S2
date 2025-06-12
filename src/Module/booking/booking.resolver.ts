import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Booking } from 'src/models/booking.model';
import { CreateBookingInput } from './booking.dto';
import { BookingService } from './booking.service';

@Resolver(() => Booking)
export class BookingResolver {
  constructor(private readonly service: BookingService) {}

  @Mutation(() => Booking)
  bookHotel(@Args('input') input: CreateBookingInput) {
    return this.service.create(input);
  }

  @Mutation(() => Boolean)
  cancelBooking(@Args('id', { type: () => Int }) id: number) {
    return this.service.cancel(id);
  }

  @Mutation(() => Booking)
  checkIn(@Args('id', { type: () => Int }) id: number) {
    return this.service.checkIn(id);
  }

  @Query(() => [Booking])
  getBookingsByDate(
    @Args('start') start: Date,
    @Args('end') end: Date,
  ) {
    return this.service.listByDateRange(start, end);
  }
}
