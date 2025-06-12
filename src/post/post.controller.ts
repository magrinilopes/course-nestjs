import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { CreatePostDto } from './dto/create-post.dto';
import { PostResponseDto } from './dto/post-response.dto';
import { JwtAuthGuad } from 'src/auth/guards/jwt-auth.guard';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuad)
  @Get('me')
  async findAllOwned(@Req() req: AuthenticatedRequest) {
    const posts = await this.postService.findAllOwned(req.user);
    return posts.map(post => new PostResponseDto(post));
  }

  @UseGuards(JwtAuthGuad)
  @Get('me/:id')
  async findOneOwned(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const post = await this.postService.findOneOwnedOrFail({ id }, req.user);
    return new PostResponseDto(post);
  }

  @Get()
  async findAllPublished() {
    const posts = await this.postService.findAll({ published: true });
    return posts.map(post => new PostResponseDto(post));
  }

  @Get(':slug')
  async findOnePublished(
    @Req() req: AuthenticatedRequest,
    @Param('slug') slug: string,
  ) {
    const post = await this.postService.findOneOrFail({
      slug,
      published: true,
    });
    return new PostResponseDto(post);
  }

  @UseGuards(JwtAuthGuad)
  @Post('me')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreatePostDto) {
    const post = await this.postService.create(dto, req.user);
    return new PostResponseDto(post);
  }

  @UseGuards(JwtAuthGuad)
  @Patch('me/:id')
  async update(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdatePostDto,
  ) {
    const post = await this.postService.update({ id }, dto, req.user);
    return new PostResponseDto(post);
  }

  @UseGuards(JwtAuthGuad)
  @Delete('me/:id')
  async remove(
    @Req() req: AuthenticatedRequest,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const post = await this.postService.remove({ id }, req.user);
    return new PostResponseDto(post);
  }
}
