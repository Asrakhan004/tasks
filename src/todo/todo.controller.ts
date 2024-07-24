import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { JwtModule } from '@nestjs/jwt';
import { JwtauthGuard } from 'src/auth/dto/auth.guard';
import { UserEmail } from 'src/common/decorator/user-email.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiBearerAuth()
@UseGuards(JwtauthGuard)
@ApiOperation({description:'to add a new task wrt user email.', summary: 'add new task'})
  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @UserEmail()
  userEmail: string) {
    console.log("output")
    return await this.todoService.create(createTodoDto, userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtauthGuard)
  @ApiOperation({description:'to get all users task', summary: 'to get all the user tasks'})
  @Get() 
  async findAll(@UserEmail()
userEmail: string) 
{
  console.log(userEmail)
    return await this.todoService.findAll(userEmail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtauthGuard)
  @ApiOperation({description:'to get a specific user task', summary: 'to get a specific user task'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtauthGuard)
  @ApiOperation({description:'to update a specific user task.', summary: 'to update a specific user yask'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtauthGuard)
  @ApiOperation({description:'to delete a specific user task.', summary: 'to delete a specific user yask'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
