import { Test, TestingModule } from '@nestjs/testing';
import { ItemsListController } from '../items-list.controller';
import { ItemsListService } from '../items-list.service';
import { itemsListEntityList, updatedItemsListEntity } from './__mocks__';

describe('ItemsListController', () => {
  let itemsListController: ItemsListController;
  let itemsListService: ItemsListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsListController],
      providers: [
        {
          provide: ItemsListService,
          useValue: {
            getItemsList: jest.fn().mockResolvedValue(itemsListEntityList),
            getUniqueItemsListById: jest
              .fn()
              .mockResolvedValue(itemsListEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            updateQuantity: jest.fn().mockResolvedValue(updatedItemsListEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    itemsListController = module.get<ItemsListController>(ItemsListController);
    itemsListService = module.get<ItemsListService>(ItemsListService);
  });

  it('should be defined', () => {
    expect(itemsListController).toBeDefined();
    expect(itemsListService).toBeDefined();
  });

  describe('getItemsList', () => {
    it('should return an item list successfully', async () => {
      // Act
      const result = await itemsListController.getItemsList();

      // Assert
      expect(result).toEqual(itemsListEntityList);
      expect(typeof result).toEqual('object');
      expect(itemsListService.getItemsList).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(itemsListService, 'getItemsList')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.getItemsList()).rejects.toThrowError();
    });
  });

  describe('getItemsListById', () => {
    it('should return an item list by its id successfully', async () => {
      // Act
      const result = await itemsListController.getItemsListById('1');

      // Assert
      expect(result).toEqual(itemsListEntityList[0]);
      expect(itemsListService.getUniqueItemsListById).toHaveBeenCalledTimes(1);
      expect(itemsListService.getUniqueItemsListById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(itemsListService, 'getUniqueItemsListById')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.getItemsListById('1')).rejects.toThrowError();
    });
  });

  describe('createItemList', () => {
    it('should create a new order successfully', async () => {
      // Arrange
      const body = {
        product_id: '1',
        quantity: 32,
      };

      // Act
      const result = await itemsListController.create(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        product_id: '1',
        quantity: 32,
      };

      jest.spyOn(itemsListService, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.create(body)).rejects.toThrowError();
    });
  });

  describe('updateItemList', () => {
    it('should update a product successfully', async () => {
      // Arrange
      const body = {
        quantity: 3,
      };

      // Act
      const result = await itemsListController.update('1', body);

      // Assert
      expect(result).toEqual(updatedItemsListEntity);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        quantity: 3,
      };
      jest
        .spyOn(itemsListService, 'updateQuantity')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('deleteItemList', () => {
    it('should delete a new order successfully', async () => {
      // Act
      const result = await itemsListController.delete('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(itemsListService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListController.delete('1')).rejects.toThrowError();
    });
  });
});
