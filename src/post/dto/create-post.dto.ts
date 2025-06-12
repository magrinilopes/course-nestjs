import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Título precisa ser um texto.' })
  @Length(10, 150, { message: 'Título precisa ter entre 10 e 150 caracteres.' })
  title: string;

  @IsString({ message: 'Resumo precisa ser um texto.' })
  @Length(10, 200, { message: 'Resumo precisa ter entre 10 e 200 caracteres.' })
  excerpt: string;

  @IsString({ message: 'Conteúdo precisa ser um texto.' })
  @IsNotEmpty({ message: 'Conteúdo não pode ser vazio.' })
  content: string;

  @IsOptional()
  @IsUrl(
    { require_tld: false },
    { message: 'A URL da imagem deve ser uma URL válida.' },
  )
  coverImageUrl: string;
}
