package com.example.app.service;

import com.example.app.Repos.ProductRepositpry;
import com.example.app.enity.ProductEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    final private ProductRepositpry productRepositpry;

    public void create(ProductEntity productEntity) {
        productRepositpry.save(productEntity);
    }

    public List<ProductEntity> findAll() {
        return productRepositpry.findAll();
    }
    public ProductEntity findById(Long id) {
        return productRepositpry.findById(id).orElse(null);
    }

    public void deleteById(Long id) {
        productRepositpry.deleteById(id);
    }

    public void update(ProductEntity productEntity) {
        productRepositpry.save(productEntity);
    }


}
