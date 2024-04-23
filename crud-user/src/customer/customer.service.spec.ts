import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { IsNull, Not } from 'typeorm';

jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    IsNull: jest.fn(),
    Not: jest.fn(),
  };
});

const customerSrvcResponseMock = [
  {
    id: 1,
    customerName: 'Agner Functional Test',
    customerEmail: 'agner.functional.test@test.com',
    status: 'active',
    customerImage: 'MockTest',
    createdAt: 'MockTest',
    updatedAt: 'MockTest',
    deletedAt: 'MockTest',
  },
  {
    id: 2,
    customerName: 'Fulano Functional Test',
    customerEmail: 'fulano.functional.test@test.com',
    status: 'active',
    customerImage: 'MockTest',
    createdAt: 'MockTest',
    updatedAt: 'MockTest',
    deletedAt: 'MockTest',
  },
];
const oneCustomerSrvcResponseMock = {
  id: 3,
  customerName: 'Agner Functional Test',
  customerEmail: 'agner.functional.test@test.com',
  status: 'active',
  customerImage: 'MockTest',
  createdAt: 'MockTest',
  updatedAt: 'MockTest',
  deletedAt: 'MockTest',
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
            findOneBy: jest.fn().mockResolvedValue(oneCustomerSrvcResponseMock),
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
});
