import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return this.prisma.child.findFirst({
      where: {
        id: id,
      }
    });
  }

  update(id: number, UpdateChildDto: UpdateChildDto) {
    return this.prisma.child.update({
      where: {
        id: id,
      },
      data: {
        name: CreateChildDto.name,
        address: UpdateChildDto.address,
        wasGood: UpdateChildDto.wasGood,
      },
    });
  }

  remove(id: number) {
    return this.prisma.child.delete({where: {id:id}});
  }

}
