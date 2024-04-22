import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TweetsService', () => {
  let customerSrvc: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: getRepositoryToken(Customer), useValue: jest.fn() },
      ],
    }).compile();

    customerSrvc = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(customerSrvc).toBeDefined();
  });
});
