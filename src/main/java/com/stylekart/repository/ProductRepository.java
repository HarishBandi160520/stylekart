package com.stylekart.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.stylekart.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
