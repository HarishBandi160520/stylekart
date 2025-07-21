package com.stylekart.service;

import com.stylekart.entity.Product;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product saveProduct(Product product); 
    void deleteProduct(Long id);

}

