import { Injectable } from '@nestjs/common';
import { Hotel } from 'src/models/hotel.model';
import { CreateHotelInput, UpdateHotelInput } from './hotel.dto';

@Injectable()
export class HotelService {
  private hotels: Hotel[] = [];
  private id = 1;

  create(input: CreateHotelInput): Hotel {
    const hotel: Hotel = { id: this.id++, ...input };
    this.hotels.push(hotel);
    return hotel;
  }

  update(input: UpdateHotelInput): Hotel {
    const idx = this.hotels.findIndex(h => h.id === input.id);
    if (idx === -1) return null;
    this.hotels[idx] = { ...this.hotels[idx], ...input };
    return this.hotels[idx];
  }

  delete(id: number): boolean {
    const idx = this.hotels.findIndex(h => h.id === id);
    if (idx === -1) return false;
    this.hotels.splice(idx, 1);
    return true;
  }

  findOne(id: number): Hotel {
    return this.hotels.find(h => h.id === id);
  }

  findAll(): Hotel[] {
    return this.hotels;
  }
}
