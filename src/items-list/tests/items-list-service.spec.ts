import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../../products/products.service';
import { ItemsListRepository } from '../items-list.repository';
import { ItemsListService } from '../items-list.service';
import {
  allItemsListEntity,
  itemsListEntityList,
  itemsListEntityResult,
  productById,
  updatedItemsListEntity,
} from './__mocks__';

describe('ItemsListService', () => {
  let itemsListService: ItemsListService;
  let productsService: ProductsService;
  let itemsListRepository: ItemsListRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsListService,
        {
          provide: ProductsService,
          useValue: {
            getUniqueProductById: jest
              .fn()
              .mockResolvedValueOnce(productById[0])
              .mockResolvedValueOnce(productById[1])
              .mockResolvedValue(productById[2]),
          },
        },
        {
          provide: ItemsListRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(allItemsListEntity),
            findByUnique: jest.fn().mockResolvedValue(itemsListEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            updateQuantity: jest.fn().mockResolvedValue(updatedItemsListEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    itemsListService = module.get<ItemsListService>(ItemsListService);
    productsService = module.get<ProductsService>(ProductsService);
    itemsListRepository = module.get<ItemsListRepository>(ItemsListRepository);
  });

  it('should be defined', () => {
    expect(itemsListService).toBeDefined();
    expect(productsService).toBeDefined();
    expect(itemsListRepository).toBeDefined();
  });

  describe('getItemsList', () => {
    it('should return an item list successfully', async () => {
      // Act
      jest
        .spyOn(itemsListRepository, 'findByUnique')
        .mockResolvedValueOnce(itemsListEntityList[0])
        .mockResolvedValueOnce(itemsListEntityList[1])
        .mockResolvedValue(itemsListEntityList[2]);

      const result = await itemsListService.getItemsList();

      // Assert
      expect(result).toEqual(itemsListEntityResult);
      expect(typeof result).toEqual('object');
      expect(itemsListRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getUniqueItemsListById', () => {
    it('should return an item list by its id successfully', async () => {
      // Act
      const result = await itemsListService.getUniqueItemsListById('1');

      // Assert
      expect(result).toEqual(itemsListEntityResult[0]);
      expect(typeof result).toEqual('object');
      expect(itemsListRepository.findByUnique).toHaveBeenCalledTimes(1);
    });

    /* it('should throw an exception if item list was not found by informed id', async () => {
      // Arrange
      jest
        .spyOn(itemsListRepository, 'findByUnique')
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(itemsListService.getUniqueItemsListById('body')).rejects.toThrowError();
    }); */

    /* it('should throw an exception if product item was not found by informed id', async () => {
      // Arrange
      jest
        .spyOn(itemsListRepository, 'findByUnique')
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(itemsListService.getUniqueItemsListById('body')).rejects.toThrowError();
    }); */
  });

  describe('create', () => {
    it('should create a new item list successfully', async () => {
      // Arrange
      const body = {
        product_id: '1',
        quantity: 3,
      };

      // Act
      const result = await itemsListService.create(body);

      // Assert
      expect(result).toBeUndefined();
      expect(itemsListRepository.create).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        product_id: '1',
        quantity: 3,
      };

      jest
        .spyOn(itemsListRepository, 'create')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListService.create(body)).rejects.toThrowError();
    });

    /* it('should throw an exception if was not found any product with informed product_id', async () => {
      // Assert
      try {
        jest
          .spyOn(productsService, 'getUniqueProductById')
          .mockResolvedValueOnce(undefined);

        await itemsListService.create({
          product_id: '5',
          quantity: 3,
        });
      } catch (error) {
        expect(error.message).toEqual("product not found with id '5'");
      }
    }); */

    it('should throw an exception if informed quantity is less or equals to 0', async () => {
      // Assert
      try {
        await itemsListService.create({
          product_id: '1',
          quantity: 0,
        });
      } catch (error) {
        expect(error.message).toEqual('Quantity must be higher than 0.');
      }
    });
  });

  describe('updateQuantity', () => {
    it('should update an item list quantity successfully', async () => {
      // Arrange
      const body = {
        quantity: 5,
      };
      jest
        .spyOn(itemsListRepository, 'findByUnique')
        .mockResolvedValueOnce(allItemsListEntity[0]);

      // Act
      const result = await itemsListService.updateQuantity('1', body);

      // Assert
      expect(result).toEqual(updatedItemsListEntity);
    });

    /* it("should throw an exception if there's no item list with informed id", async () => {
      // Assert
      try {
        await itemsListService.updateQuantity('1', {
          quantity: 5,
        });
      } catch (error) {
        expect(error.message).toEqual("item list with id '1' not found");
      }
    }); */

    /* it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        quantity: 5,
      };
      jest
        .spyOn(itemsListService, 'updateQuantity')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListService.updateQuantity('1', body)).rejects.toThrowError();
    }); */
  });

  describe('delete', () => {
    it('should delete an item list successfully', async () => {
      // Act
      const result = await itemsListService.delete('1');

      // Assert
      expect(result).toBeUndefined();
    });

    /* it("should throw an exception if there's no item list with informed id", async () => {
      // Assert
      try {
        await itemsListService.delete('1');
      } catch (error) {
        expect(error.message).toEqual("item list with id '1' not found");
      }
    }); */

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(itemsListRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(itemsListService.delete('1')).rejects.toThrowError();
    });
  });
});
