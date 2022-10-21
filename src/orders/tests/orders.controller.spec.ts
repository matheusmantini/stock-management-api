import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { OrdersService } from '../orders.service';
import { ordersEntityList, updatedOrderEntity } from './__mocks__';

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            getOrders: jest.fn().mockResolvedValue(ordersEntityList),
            getUniqueOrderById: jest
              .fn()
              .mockResolvedValue(ordersEntityList[0]),
            createOrder: jest.fn().mockResolvedValue(undefined),
            updateOrder: jest.fn().mockResolvedValue(updatedOrderEntity),
          },
        },
      ],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
    expect(ordersService).toBeDefined();
  });

  describe('getOrders', () => {
    it('should return an order list successfully', async () => {
      // Act
      const result = await ordersController.getOrders();

      // Assert
      expect(result).toEqual(ordersEntityList);
      expect(typeof result).toEqual('object');
      expect(ordersService.getOrders).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(ordersService, 'getOrders').mockRejectedValueOnce(new Error());

      // Assert
      expect(ordersController.getOrders()).rejects.toThrowError();
    });
  });

  describe('getUniqueOrderById', () => {
    it('should return an order by its id successfully', async () => {
      // Act
      const result = await ordersController.getUniqueOrderById('1');

      // Assert
      expect(result).toEqual(ordersEntityList[0]);
      expect(ordersService.getUniqueOrderById).toHaveBeenCalledTimes(1);
      expect(ordersService.getUniqueOrderById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(ordersService, 'getUniqueOrderById')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(ordersController.getUniqueOrderById('1')).rejects.toThrowError();
    });
  });

  describe('createOrder', () => {
    it('should create a new order successfully', async () => {
      // Arrange
      const body = {
        id: '1',
        client_name: 'João',
        delivery_date: new Date('2023-07-05'),
        items_list_id: ['1', '2', '3'],
        total_amount: 125.99,
      };

      // Act
      const result = await ordersController.createOrder(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        id: '1',
        client_name: 'João',
        delivery_date: new Date('2023-07-05'),
        items_list_id: ['1', '2', '3'],
        total_amount: 125.99,
      };

      jest
        .spyOn(ordersService, 'createOrder')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(ordersController.createOrder(body)).rejects.toThrowError();
    });
  });

  describe('updateOrder', () => {
    it('should update a product successfully', async () => {
      // Arrange
      const body = {
        client_name: 'Joana',
        delivery_date: new Date('2022-11-05'),
        items_list_id: ['7', '8'],
      };

      // Act
      const result = await ordersController.updateOrder('1', body);

      // Assert
      expect(result).toEqual(updatedOrderEntity);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        client_name: 'Joana',
        delivery_date: new Date('2022-11-05'),
        items_list_id: ['7', '8'],
      };
      jest
        .spyOn(ordersService, 'updateOrder')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(ordersController.updateOrder('1', body)).rejects.toThrowError();
    });
  });
});
