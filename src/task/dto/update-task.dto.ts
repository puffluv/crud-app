import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../task.interface';

export class UpdateTaskDto {
  @IsOptional()
  @IsString({ message: 'Обновленное поле должно быть строкой!' })
  @IsNotEmpty({ message: 'Обновленное поле не должно быть пустым!' })
  task: string;

  @IsOptional()
  @IsString({ each: true, message: 'Обновленные тэги должны быть строчными!' })
  tags?: string[];

  @IsOptional()
  @IsEnum(Status, { message: 'Неверный тип обновленного статуса!' })
  status?: Status;
}
