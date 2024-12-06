import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToyDto } from './dto/create-toy.dto';
import { UpdateToyDto } from './dto/update-toy.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ToysService {
  constructor(private readonly prisma: PrismaService) {}

  create(CreateToyDto: CreateToyDto) {
    return this.prisma.game.create({
      data: {
        name: CreateToyDto.name,
        material: CreateToyDto.material,
        weight: CreateToyDto.weight,
      },
    });
  }

  findAll() {
    return this.prisma.game.findMany();
  }

  async findOne(id: number) {
    const toy = await this.prisma.game.findFirst({
      where: { id: id },
    });
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }
    return toy;
  }

  async update(id: number, UpdateToyDto: UpdateToyDto) {
    const toy = await this.prisma.game.findFirst({
      where: { id: id },
    });
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }
    return this.prisma.game.update({
      where: { id: id },
      data: {
        name: UpdateToyDto.name,
        material: UpdateToyDto.material,
        weight: UpdateToyDto.weight,
      },
    });
  }

  async remove(id: number) {
    const toy = await this.prisma.game.findFirst({
      where: { id: id },
    });
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${id} not found`);
    }
    return this.prisma.game.delete({ where: { id: id } });
  }
}
