import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';
import { Status } from './enum/status.enum';
import * as fs from 'fs/promises';

jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    IsNull: jest.fn(),
    Not: jest.fn(),
  };
});
jest.mock('fs/promises', () => {
  const actual = jest.requireActual('fs/promises');
  return {
    ...actual,
    readFile: jest.fn(),
  };
});

const customerSrvcResponseMock = [
  {
    id: 1,
    customerName: 'Agner Functional Test',
    customerEmail: 'agner.functional.test@test.com',
    status: Status.ACTIVE,
    customerImage: 'MockTest',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
  {
    id: 2,
    customerName: 'Fulano Functional Test',
    customerEmail: 'fulano.functional.test@test.com',
    status: Status.ACTIVE,
    customerImage: 'MockTest',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  },
];
const oneCustomerSrvcResponseMock = {
  id: 3,
  customerName: 'Agner Functional Test',
  customerEmail: 'agner.functional.test@test.com',
  status: Status.ACTIVE,
  customerImage: 'MockTest',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: new Date(),
};
const mockToinsertCustomer = {
  customerEmail: 'agner.functional.test@test.com',
  customerImage: 'fileMock',
  customerName: 'Agner Functional Test',
  status: Status.ACTIVE,
};
const expressMuterFile = {
  filename: 'fileMock',
  originalname: 'cachorrinhos-filhotes.Mock.png',
  size: 51828,
} as Express.Multer.File;

const customerRepositoryMockToInsert = {
  customerName: 'customerNameMock',
  customerEmail: 'customerEmailMock',
  customerImage: 'filenameMock',
};
describe('Test the CustomerService', () => {
  let customerSrvc: CustomerService;
  let customerRepo: Repository<Customer>;

  const idUser = 1;
  const res = {} as unknown as Response;
  res.status = jest.fn(() => res);
  res.json = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {
            find: jest.fn().mockResolvedValue(customerSrvcResponseMock),
            findOneBy: jest.fn().mockResolvedValue(mockToinsertCustomer),
            create: jest.fn().mockResolvedValue(customerRepositoryMockToInsert),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    customerSrvc = module.get<CustomerService>(CustomerService);
    customerRepo = module.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  it('should be defined', () => {
    expect(customerSrvc).toBeDefined();
  });

  it('should be called the method find', async () => {
    await customerSrvc.findAll(res);
    const repoSpy = jest.spyOn(customerRepo, 'find');
    expect(repoSpy).toHaveBeenCalled();
    expect(repoSpy).toHaveBeenCalledTimes(1);
  });

  it('should be called method findAll and it throw NotFoundException', async () => {
    jest.spyOn(customerRepo, 'find').mockResolvedValue([]);
    const responseFindAll = async () => {
      await customerSrvc.findAll(res);
    };

    expect(responseFindAll).rejects.toThrow(NotFoundException);
    expect(responseFindAll).rejects.toThrow(`Anyone customer was found`);
  });

  it('should be called the method find with where and withDeleted parameters', async () => {
    await customerSrvc.findForAllCustomersEvenDeleted(res);
    const repoSpy = jest.spyOn(customerRepo, 'find');
    expect(repoSpy).toHaveBeenCalled();
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith({
      where: {
        deleteAt: Not(IsNull),
      },
      withDeleted: true,
    });
  });

  it('should be called method findForAllCustomersEvenDeleted and it throw NotFoundException', async () => {
    jest.spyOn(customerRepo, 'find').mockResolvedValue([]);
    const responseFindForAllEvenDeleted = async () => {
      await customerSrvc.findForAllCustomersEvenDeleted(res);
    };

    expect(responseFindForAllEvenDeleted).rejects.toThrow(NotFoundException);
    expect(responseFindForAllEvenDeleted).rejects.toThrow(
      `Anyone customer was found even deleted`,
    );
  });

  it('should be called the method findOne with idUser', async () => {
    await customerSrvc.findOne(idUser, res);
    const repoSpy = jest.spyOn(customerRepo, 'findOneBy');
    expect(repoSpy).toHaveBeenCalled();
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith({ id: idUser });
  });

  it('should be called method findOne with idUser and it throw NotFoundException', async () => {
    jest.spyOn(customerRepo, 'findOneBy').mockResolvedValue(null);
    const responseFindOne = async () => {
      await customerSrvc.findOne(idUser, res);
    };

    expect(responseFindOne).rejects.toThrow(NotFoundException);
    expect(responseFindOne).rejects.toThrow(
      `Customer with id ${idUser} not found`,
    );
  });

  it('should be called the method getCustomerImageBuffer with idUser', async () => {
    await customerSrvc.getCustomerImageBuffer(idUser, res);
    const repoSpy = jest.spyOn(customerRepo, 'findOneBy');
    expect(repoSpy).toHaveBeenCalled();
    expect(repoSpy).toHaveBeenCalledTimes(1);
    expect(repoSpy).toHaveBeenCalledWith({ id: idUser });
  });

  it('should be called method getCustomerImageBuffer with idUser and it throw NotFoundException', async () => {
    jest.spyOn(customerRepo, 'findOneBy').mockResolvedValue(null);
    const responseFindOne = async () => {
      await customerSrvc.getCustomerImageBuffer(idUser, res);
    };

    expect(responseFindOne).rejects.toThrow(NotFoundException);
    expect(responseFindOne).rejects.toThrow(
      `Customer image with id ${idUser} not found`,
    );
  });

  it('should be called the method create and insert a customer with image', async () => {
    await customerSrvc.create(expressMuterFile, oneCustomerSrvcResponseMock);
    expect(customerRepo.create).toHaveBeenCalled();
    expect(customerRepo.create).toHaveBeenCalledTimes(1);
    expect(customerRepo.create).toHaveBeenCalledWith(mockToinsertCustomer);
    expect(customerRepo.save).toHaveBeenCalled();
    expect(customerRepo.save).toHaveBeenCalledTimes(1);
  });
});
