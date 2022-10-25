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
  updatedOrderEntityRepositoryReturn,
  updatedOrderEntityResult,
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
            findByUnique: jest.fn().mockResolvedValue(ordersEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue([]),
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

  describe('getUniqueOrderById', () => {
    it('should return an order by its id successfully', async () => {
      // Act
      jest
        .spyOn(itemsListService, 'getUniqueItemsListById')
        .mockResolvedValueOnce(orderItem[0])
        .mockResolvedValue(orderItem[1]);

      jest
        .spyOn(productsRepository, 'findByUniqueId')
        .mockResolvedValueOnce(productsList[0])
        .mockResolvedValue(productsList[1]);

      const result = await ordersService.getUniqueOrderById('1');

      // Assert
      expect(result).toEqual(ordersEntityListResult[0]);
      expect(typeof result).toEqual('object');
      expect(ordersRepository.findByUnique).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception if it didn't work at all", async () => {
      // Act
      jest
        .spyOn(ordersRepository, 'findByUnique')
        .mockResolvedValueOnce(undefined);

      try {
        await ordersService.getUniqueOrderById('55');
      } catch (error) {
        expect(error.message).toEqual("order not found with id '55'");
      }
    });
  });

  describe('createOrder', () => {
    it('should create a new order successfully', async () => {
      // Arrange
      const body = {
        delivery_date: new Date('2023-03-18'),
        client_name: 'Joaquim',
        items_list_id: ['1', '2'],
      };

      jest
        .spyOn(itemsListService, 'getUniqueItemsListById')
        .mockResolvedValueOnce(orderItem[0])
        .mockResolvedValue(orderItem[1]);

      // Act
      const result = await ordersService.createOrder(body);

      // Assert
      expect(result).toBeUndefined();
      expect(ordersRepository.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception if product item was not found by informed id', async () => {
      // Arrange
      const body = {
        delivery_date: new Date('2023-03-18'),
        client_name: 'Joaquim',
        items_list_id: ['11', '2'],
      };

      jest
        .spyOn(itemsListService, 'getUniqueItemsListById')
        .mockResolvedValueOnce(undefined);

      // Assert
      try {
        await ordersService.createOrder(body);
      } catch (error) {
        expect(error.message).toEqual("item not found with id '11'");
      }
    });

    it("should throw an exception if it didn't work at all", async () => {
      // Arrange
      const body = {
        delivery_date: new Date('2023-03-18'),
        client_name: 'Joaquim',
        items_list_id: ['1', '2'],
      };

      jest.spyOn(ordersRepository, 'create').mockRejectedValueOnce(undefined);

      try {
        await ordersService.createOrder(body);
      } catch (error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });

  describe('updateOrder', () => {
    it('should update an order successfully', async () => {
      // Arrange
      jest
        .spyOn(ordersRepository, 'update')
        .mockResolvedValueOnce(updatedOrderEntityRepositoryReturn);

      // Act
      const result = await ordersService.updateOrder('1', updatedOrderEntity);

      // Assert
      expect(result).toEqual(updatedOrderEntityRepositoryReturn);
    });

    it("should throw an exception if it didn't work at all", async () => {
      // Arrange
      jest.spyOn(ordersRepository, 'update').mockRejectedValueOnce(undefined);

      // Assert
      try {
        await ordersService.updateOrder('1', updatedOrderEntity);
      } catch (error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });
});
