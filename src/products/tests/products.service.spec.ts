import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from '../products.repository';
import { ProductsService } from '../products.service';
import { productsEntityList, updatedProductsEntity } from './__mocks__';

describe('ProductsService', () => {
  let productsService: ProductsService;
  let productsRepository: ProductsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: {
            findAll: jest.fn().mockResolvedValue(productsEntityList),
            findByUniqueId: jest.fn().mockResolvedValue(productsEntityList[0]),
            create: jest.fn().mockResolvedValue(undefined),
            update: jest.fn().mockResolvedValue(updatedProductsEntity),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);
    productsRepository = module.get<ProductsRepository>(ProductsRepository);
  });

  it('should be defined', () => {
    expect(productsService).toBeDefined();
    expect(productsRepository).toBeDefined();
  });

  describe('getProducts', () => {
    it('should return a products list successfully', async () => {
      // Act
      const result = await productsService.getProducts();

      // Assert
      expect(result).toEqual(productsEntityList);
      expect(typeof result).toEqual('object');
      expect(productsRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsRepository, 'findAll')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.getProducts()).rejects.toThrowError();
    });
  });

  describe('getUniqueProductById', () => {
    it('should return a product by its id successfully', async () => {
      // Act
      const result = await productsService.getUniqueProductById('1');

      // Assert
      expect(result).toEqual(productsEntityList[0]);
      expect(productsRepository.findByUniqueId).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception if there's no product with informed id", async () => {
      
      jest
        .spyOn(productsRepository, 'findByUniqueId')
        .mockResolvedValueOnce(null);
      
      
        expect(productsService.getUniqueProductById('1')).rejects.toThrowError();
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

      jest
        .spyOn(productsRepository, 'findAll')
        .mockResolvedValueOnce(productsEntityList);

      // Act
      const result = await productsService.createProduct(body);

      // Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exception if name already exists', () => {
      // Arrange
      const body = { id: '1', name: 'Product 1', price: 1.11, qty_stock: 110 };

      jest
        .spyOn(productsRepository, 'findAll')
        .mockResolvedValueOnce(productsEntityList);

      // Assert
      expect(productsService.createProduct(body)).rejects.toThrowError();
    });

    it('should throw an exception if price is lower or equals to 0', () => {
      // Arrange
      const body = {
        id: '4',
        name: 'Product 4',
        price: 0,
        qty_stock: 444,
      };

      jest
        .spyOn(productsRepository, 'findAll')
        .mockResolvedValueOnce(productsEntityList);

      // Assert
      expect(productsService.createProduct(body)).rejects.toThrowError();
    });

    it('should throw an exception if quanty in stock is lower or equals to 0', () => {
      // Arrange
      const body = {
        id: '4',
        name: 'Product 4',
        price: 4.44,
        qty_stock: 0,
      };

      jest
        .spyOn(productsRepository, 'findAll')
        .mockResolvedValueOnce(productsEntityList);

      // Assert
      expect(productsService.createProduct(body)).rejects.toThrowError();
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        id: '4',
        name: 'Product 4',
        price: 4.44,
        qty_stock: 0,
      };

      jest
        .spyOn(productsRepository, 'create')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.createProduct(body)).rejects.toThrowError();
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      // Arrange
      const body = {
        quantity: 1,
      };
      jest
        .spyOn(productsRepository, 'findAll')
        .mockResolvedValueOnce(undefined);

      // Act
      const result = await productsService.updateProduct('1', body);

      // Assert
      expect(result).toEqual(updatedProductsEntity);
    });

    it("should throw an exception if there's no product with informed id", () => {
      // Arrange
      const body = { quantity: 110 };

      jest
        .spyOn(productsRepository, 'findByUniqueId')
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(productsService.updateProduct('1', body)).rejects.toThrowError();
    });

    it('should throw an exception if new stock quantity is less or equals to 0', () => {
      // Assert
      try {
        productsService.handleNewQuantity(1, 2);
      } catch (error) {
        expect(error.message).toEqual(
          'The stock quantity of this product is equals to 0.',
        );
      }
    });

    it("should throw an exception if it didn't work at all", () => {
      // Arrange
      const body = {
        quantity: 1,
      };
      jest
        .spyOn(productsService, 'updateProduct')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.updateProduct('1', body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete a product successfully', async () => {
      // Act
      const result = await productsService.delete('1');

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception if there's no product with informed id", () => {
      // Arrange

      jest
        .spyOn(productsRepository, 'findByUniqueId')
        .mockResolvedValueOnce(undefined);

      // Assert
      expect(productsService.delete('1')).rejects.toThrowError();
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(productsRepository, 'delete')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(productsService.delete('1')).rejects.toThrowError();
    });
  });
});
