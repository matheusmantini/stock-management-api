import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { productsEntityList, updatedProductsEntity } from './__mocks__';

describe('ProductsController', () => {
  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: jest.fn().mockResolvedValue(productsEntityList),
            getUniqueProductById: jest
              .fn()
              .mockResolvedValue(productsEntityList[0]),
            getUniqueProductByName: jest
              .fn()
              .mockResolvedValue(productsEntityList[0]),
            createProduct: jest.fn().mockResolvedValue(undefined),
            updateProduct: jest.fn().mockResolvedValue(updatedProductsEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(productsController).toBeDefined();
    expect(productsService).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return a products list successfully', async () => {
      // Act
      const result = await productsController.getProducts();

      // Assert
      expect(result).toEqual(productsEntityList);
      expect(typeof result).toEqual('object');
      expect(productsService.getProducts).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsService, 'getProducts')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsController.getProducts()).rejects.toThrowError();
    });
  });

  describe('getUniqueProductById', () => {
    it('should return a product by its id successfully', async () => {
      // Act
      const result = await productsController.getUniqueProductById('1');

      // Assert
      expect(result).toEqual(productsEntityList[0]);
      expect(productsService.getUniqueProductById).toHaveBeenCalledTimes(1);
      expect(productsService.getUniqueProductById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsService, 'getUniqueProductById')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        productsController.getUniqueProductById('1'),
      ).rejects.toThrowError();
    });
  });

  describe('getUniqueProductByName', () => {
    it('should return a product by its name successfully', async () => {
      // Act
      const result = await productsController.getUniqueProductByName(
        'AZEITE  PORTUGUÊS EXTRA VIRGEM GALLO 500ML',
      );

      // Assert
      expect(result).toEqual(productsEntityList[0]);
      expect(productsService.getUniqueProductByName).toHaveBeenCalledTimes(1);
      expect(productsService.getUniqueProductByName).toHaveBeenCalledWith(
        'AZEITE  PORTUGUÊS EXTRA VIRGEM GALLO 500ML',
      );
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsService, 'getUniqueProductByName')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        productsController.getUniqueProductByName(
          'AZEITE  PORTUGUÊS EXTRA VIRGEM GALLO 500ML',
        ),
      ).rejects.toThrowError();
    });
  });

  describe('createProduct', () => {
    it('should create a new product successfully', async () => {
      // Arrange
      const body = {
        id: '4',
        name: 'Product 4',
        price: 4.44,
        qty_stock: 444,
      };

      // Act
      const result = await productsController.createProduct(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        id: '4',
        name: 'Product 4',
        price: 4.44,
        qty_stock: 444,
      };

      jest
        .spyOn(productsService, 'createProduct')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsController.createProduct(body)).rejects.toThrowError();
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      // Arrange
      const body = {
        quantity: 1,
      };

      // Act
      const result = await productsController.updateProduct('1', body);

      // Assert
      expect(result).toEqual(updatedProductsEntity);
    });

    it('should throw an exception', () => {
      // Arrange
      const body = {
        quantity: 1,
      };
      jest
        .spyOn(productsService, 'updateProduct')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(
        productsController.updateProduct('1', body),
      ).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a product successfully', async () => {
      // Act
      const result = await productsController.deleteProduct('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(productsService, 'delete').mockRejectedValueOnce(new Error());

      // Assert
      expect(productsController.deleteProduct('1')).rejects.toThrowError();
    });
  });
});
