import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Hotel } from 'src/models/hotel.model';
import { CreateHotelInput, UpdateHotelInput } from './hotel.dto';
import { HotelService } from './hotel.service';

@Resolver(() => Hotel)
export class HotelResolver {
    constructor(private readonly service: HotelService) { }

    @Mutation(() => Hotel)
    createHotel(@Args('input') input: CreateHotelInput) {
        return this.service.create(input);
    }

    @Mutation(() => Hotel)
    updateHotel(@Args('input') input: UpdateHotelInput) {
        return this.service.update(input);
    }

    @Mutation(() => Boolean)
    deleteHotel(@Args('id', { type: () => Int }) id: number) {
        return this.service.delete(id);
    }

    @Query(() => Hotel)
    getHotel(@Args('id', { type: () => Int }) id: number) {
        return this.service.findOne(id);
    }

    @Query(() => [Hotel])
    getAllHotels() {
        return this.service.findAll();
    }
}
