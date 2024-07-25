import { plainToInstance } from 'class-transformer';
import { UpdateTaskDto } from './update-task.dto';
import { validate } from 'class-validator';

describe('update-task.dto', () => {
  it('Обновленные поля должны правильно валидироваться', async () => {
    const dto = {
      task: 'Updated task',
      tags: ['tag1', 'tag2'],
      status: 'processing',
    };
    const ofImportDto = plainToInstance(UpdateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.length).toBe(0);
  });

  it('Обновленные поля неправильно валидируются', async () => {
    const dto = {
      task: 'Updated task',
      tags: ['tag1', 'tag2'],
      status: 'invalid-status',
    };
    const ofImportDto = plainToInstance(UpdateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('status')).toBeTruthy();
  });
});
