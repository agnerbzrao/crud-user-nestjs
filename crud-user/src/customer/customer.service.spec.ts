import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const customerSrvcResponseMock = {
  customerName: 'Agner Functional Test',
  customerEmail: 'agner.functional.test@test.com',
  status: 'active',
};

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

  it('should be defined', () => {
    expect(customerSrvc).toBeDefined();
  });

  describe('getAll', () => {
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
  });
});
