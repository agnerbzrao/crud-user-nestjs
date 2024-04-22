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
    customerName: 'Agner Functional Test',
    customerEmail: 'agner.functional.test@test.com',
    status: 'active',
  },
  {
    customerName: 'Fulano Functional Test',
    customerEmail: 'fulano.functional.test@test.com',
    status: 'active',
  },
];

describe('TweetsService', () => {
  let customerSrvc: CustomerService;
  let customerRepo: Repository<Customer>;

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
          },
        },
      ],
    }).compile();

    customerSrvc = module.get<CustomerService>(CustomerService);
    customerRepo = module.get<Repository<Customer>>(
      getRepositoryToken(Customer),
    );
  });

  describe('Unit test on the customer service', () => {
    it('should be defined', () => {
      expect(customerSrvc).toBeDefined();
    });

    it('should be called the method find', async () => {
      await customerSrvc.findAll(res);
      const repoSpy = jest.spyOn(customerRepo, 'find');
      expect(repoSpy).toHaveBeenCalled();
      expect(repoSpy).toHaveBeenCalledTimes(1);
    });

    it('should be called method find and it throw NotFoundException', async () => {
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
  });
});
