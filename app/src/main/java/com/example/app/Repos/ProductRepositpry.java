package com.example.app.Repos;

import com.example.app.enity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepositpry extends JpaRepository<ProductEntity, Long> {
}
