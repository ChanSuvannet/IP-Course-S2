import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateHotelInput {
  @Field()
  name: string;

  @Field()
  address: string;

  @Field()
  phone: string;
}

@InputType()
export class UpdateHotelInput extends PartialType(CreateHotelInput) {
  @Field(() => Int)
  id: number;
}