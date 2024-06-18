import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Student, Student as StudentEntity } from './entities/student.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) { }
  async create(createStudentInput: CreateStudentInput) {
    try {
      const { name } = createStudentInput;
      const check = await this.studentRepository.findOne({
        where: {
          name
        },
      });
      if (check) throw new BadRequestException('Student already exist!');
      const StudentCreated = this.studentRepository.create(createStudentInput);

      return await this.studentRepository.save(StudentCreated);
    } catch (error: any) {
      return error.message;
    }
  }

  async findAll() {
    try {
      const students = await this.studentRepository.find();
      if (students.length !== 0) {
        return students;
      }
      throw new NotFoundException({
        message: `Anyone student was found`,
      });
    } catch (error: any) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      return await this.studentRepository.findOneBy({ id });
    } catch (error: any) {
      return error.message;
    }
  }

  async findMany(id: number): Promise<Student[]> {
    try {
      return await this.studentRepository.find({
        where: {
          id
        }
      })
    } catch (error: any) {
      return error.message;
    }
  }

  async update(id: number, updateStudentInput: UpdateStudentInput) {
    try {
      const student = await this.studentRepository.findOneBy({ id });
      if (!student) {
        throw new NotFoundException({
          message: `Student with id ${id} not found`,
        });
      }

      await this.studentRepository.update({ id }, updateStudentInput);
      return updateStudentInput;
    } catch (error: any) {
      return error.message;
    }
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findOneBy({ id });

      if (!student) {
        throw new NotFoundException({
          message: `Student with id ${id} not found`,
        });
      }
      await this.studentRepository.delete(id);
      return student;
    } catch (error: any) {
      return error.message;
    }
  }
}
