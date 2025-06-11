import { Type } from 'class-transformer';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Senha precisa ser um texto' })
  @IsNotEmpty({ message: 'Senha não pode estar vazia' })
  password: string;
}
