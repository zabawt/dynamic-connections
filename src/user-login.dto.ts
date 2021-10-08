import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  firstName: string;
}
