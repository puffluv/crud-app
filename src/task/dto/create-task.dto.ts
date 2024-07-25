import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '../task.interface';

export class CreateTaskDto {
  @IsString({ message: 'Поле обязательное!' })
  @IsNotEmpty({ message: 'Поле не должно быть пустым!' })
  task: string;

  @ArrayNotEmpty({ message: 'Необходимо указать тэги!' })
  @IsString({ each: true, message: 'Тэги должны быть строчными!' })
  tags?: string[];

  @IsOptional()
  @IsEnum(Status, { message: 'Неверный тип статуса!' })
  status?: Status;
}
