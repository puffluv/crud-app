import { plainToInstance } from 'class-transformer';
import { CreateTaskDto } from './create-task.dto';
import { validate } from 'class-validator';
import { Status } from '../task.interface';

describe('create-task.dto', () => {
  let dto;
  beforeAll(() => {
    dto = {
      task: '',
      tags: [],
      status: '',
    };
  });
  it('Поле task пустое', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('task')).toBeTruthy();
  });

  it('Поле task не пустое', async () => {
    dto.task = 'task-1';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('task')).toBeFalsy();
  });

  it('Поле tags пустое', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);

    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).toBe(0);
  });

  it('Все элементы tags являются строкой', async () => {
    dto.tags = ['task', 1];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).not.toBe(0);
    expect(dto.tags.every((el) => typeof el === 'string')).not.toBeTruthy();
  });

  it('Элементы tags являются строкой и массив не пустой', async () => {
    dto.tags = ['task', '1'];
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('tags')).toBeFalsy();
  });

  it('Тип status не является значением enum Status', async () => {
    dto.status = 'status';
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('status')).toBeTruthy();
  });

  it('Тип status является значением enum Status', async () => {
    dto.status = Status.ERROR;
    const ofImportDto = plainToInstance(CreateTaskDto, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((err) => err.property).includes('status')).toBeFalsy();
    expect(dto.status).toBe('error');
  });
});
