import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { CreateChildDto } from './dto/create-child.dto';
import { UpdateChildDto } from './dto/update-child.dto';

@Controller('children')
export class ChildrenController {
  constructor(private readonly childrenService: ChildrenService) {}

  @Post(':childId/toys/:toyId')
  assignToyToChild(@Param('childId') childId: string, @Param('toyId') toyId: string,) {
    return this.childrenService.assignToyToChild(+childId, +toyId);
  }

  @Delete(':childId/toys/:toyId')
  deleteToyFromChild(@Param('childId') childId: string, @Param('toyId') toyId: string,) {
    return this.childrenService.deleteToyFromChild(+childId, +toyId);
  }

  @Post()
  create(@Body() createChildDto: CreateChildDto) {
    return this.childrenService.create(createChildDto);
  }

  @Get()
  findAll() {
    return this.childrenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.childrenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChildDto: UpdateChildDto) {
    return this.childrenService.update(+id, updateChildDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.childrenService.remove(+id);
  }
}
