import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ChildrenService {
  constructor(private readonly prisma: PrismaService) {}

  create(CreateChildDto: CreateChildDto) {
    return this.prisma.child.create({
      data: {
        name: CreateChildDto.name,
        address: CreateChildDto.address,
        wasGood: CreateChildDto.wasGood,
    }})
  }

  findAll() {
    return this.prisma.child.findMany();
  }

  async findOne(id: number) {
    const child = await this.prisma.child.findFirst({
      where: { id: id },
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return child;
  }

  async update(id: number, UpdateChildDto: UpdateChildDto) {
    const child = await this.prisma.child.findFirst({
      where: { id: id },
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return this.prisma.child.update({
      where: { id: id },
      data: {
        name: UpdateChildDto.name,
        address: UpdateChildDto.address,
        wasGood: UpdateChildDto.wasGood,
      },
    });
  }

  async remove(id: number) {
    const child = await this.prisma.child.findFirst({
      where: { id: id },
    });
    if (!child) {
      throw new NotFoundException(`Child with ID ${id} not found`);
    }
    return this.prisma.child.delete({where: {id:id}});
  }

  async assignToyToChild(childId: number, toyId: number) {
    const child = await this.prisma.child.findUnique({ where: { id: childId } });
    const toy = await this.prisma.game.findUnique({ where: { id: toyId } });
    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${toyId} not found`);
    }

    return this.prisma.ChildGames.create({
      data: {
        childId,
        toyId,
      },
    });
  }

  async deleteToyFromChild(childId: number, toyId: number) {
    const child = await this.prisma.child.findUnique({ where: { id: childId } });
    const toy = await this.prisma.game.findUnique({ where: { id: toyId } });
    if (!child) {
      throw new NotFoundException(`Child with ID ${childId} not found`);
    }
    if (!toy) {
      throw new NotFoundException(`Toy with ID ${toyId} not found`);
    }

    return this.prisma.ChildGames.delete({where: {childId: childId, toyId: toyId}});
  }
}
