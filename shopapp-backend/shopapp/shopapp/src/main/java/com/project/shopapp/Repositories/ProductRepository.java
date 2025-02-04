package com.project.shopapp.Repositories;

import com.project.shopapp.models.Order;
import com.project.shopapp.models.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    boolean existsByName(String name);

    Page<Product> findAll(Pageable pageable);

    @Query("SELECT p FROM Product p WHERE " +
            "(:categoryId IS NULL OR :categoryId = 0 OR p.category.id = :categoryId)" +
            "AND (:keywork IS NULL OR :keywork = '' OR p.name LIKE %:keywork OR p.description LIKE %:keywork)")
    Page<Product> searchProducts(@Param("categoryId") Long categoryId,
                                 @Param("keywork") String keywork, Pageable pageable);
}
