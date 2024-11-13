package com.example.app.controller;

import com.example.app.enity.ProductEntity;
import com.example.app.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {
    final private ProductService productService;

    @GetMapping("/all")
    public List<ProductEntity> getAllProducts() {
        return productService.findAll();
    }

    @GetMapping("/{id}")
    public ProductEntity getProductById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PostMapping("/create")
    public void saveProduct(@RequestBody ProductEntity product) {
        productService.create(product);
    }

    @PutMapping("/update")
    public void updateProduct(ProductEntity product) {
        productService.update(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productService.deleteById(id);
    }
}
