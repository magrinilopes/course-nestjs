import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString({ message: 'Senha atual precisa ser preenchida' })
  @IsNotEmpty({ message: 'Senha atual não pode estar vazia' })
  currentPassword: string;

  @IsString({ message: 'Nova senha precisa ser um texto' })
  @IsNotEmpty({ message: 'Nova senha não pode estar vazia' })
  @MinLength(6, { message: 'Nova senha não deve ser menor que 6 caracteres.' })
  newPassword: string;
}
