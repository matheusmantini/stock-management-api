import { Test, TestingModule } from '@nestjs/testing';
import { ItemsListService } from '../../items-list/items-list.service';
import { ProductsRepository } from '../../products/products.repository';
import { OrdersRepository } from '../orders.repository';
import { OrdersService } from '../orders.service';
import {
  orderItem,
  ordersEntityList,
  ordersEntityListResult,
  productsList,
  updatedOrderEntity,
} from './__mocks__';

describe('ItemsListService', () => {
  let ordersService: OrdersService;
  let ordersRepository: OrdersRepository;
  let productsRepository: ProductsRepository;
  let itemsListService: ItemsListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(ordersEntityList),
            /* findByUnique: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue([]), */
          },
        },
        {
          provide: ProductsRepository,
          useValue: {
            findByUniqueId: jest.fn().mockResolvedValue(productsList),
          },
        },
        {
          provide: ItemsListService,
          useValue: {
            getUniqueItemsListById: jest.fn().mockResolvedValue([]), // Colocar o retorno relacionado ao itemsList id
          },
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
    ordersRepository = module.get<OrdersRepository>(OrdersRepository);
    itemsListService = module.get<ItemsListService>(ItemsListService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(ordersService).toBeDefined();
    expect(ordersRepository).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  describe('getOrders', () => {
    it('should return an order list successfully', async () => {
      // Act
      jest
        .spyOn(itemsListService, 'getUniqueItemsListById')
        .mockResolvedValueOnce(orderItem[0])
        .mockResolvedValueOnce(orderItem[1])
        .mockResolvedValueOnce(orderItem[2])
        .mockResolvedValue(orderItem[3]);

      jest
        .spyOn(productsRepository, 'findByUniqueId')
        .mockResolvedValueOnce(productsList[0])
        .mockResolvedValueOnce(productsList[1])
        .mockResolvedValueOnce(productsList[0])
        .mockResolvedValue(productsList[1]);

      const result = await ordersService.getOrders();

      // Assert
      expect(result).toEqual(ordersEntityListResult);
      expect(typeof result).toEqual('object');
      expect(ordersRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
