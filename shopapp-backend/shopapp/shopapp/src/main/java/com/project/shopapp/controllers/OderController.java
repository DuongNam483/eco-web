package com.project.shopapp.controllers;

import com.project.shopapp.components.LocalizationUtils;
import com.project.shopapp.dto.*;
import com.project.shopapp.exceptions.DataNotFound;
import com.project.shopapp.models.Order;
import com.project.shopapp.services.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${api.prefix}/orders")
@RequiredArgsConstructor
public class OderController {
    private final OrderService orderService;
    private final LocalizationUtils localizationUtils;

    @PostMapping("")
    public ResponseEntity<?> createOrder(@Valid @RequestBody OrderDTO orderDTO,
                                                   BindingResult result){
        try{
            if (result.hasErrors()) {
                List<String> errorMessages = result.getFieldErrors()
                        .stream()
                        .map(FieldError::getDefaultMessage)
                        .toList();
                return ResponseEntity.badRequest().body(errorMessages);
            }
            Order order = orderService.creatOrder(orderDTO);
            return ResponseEntity.ok(order);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<?> getOrders(@Valid @PathVariable("user_id") Long userId){
        try {
            List<Order> orders = orderService.findByUserId(userId);
            return ResponseEntity.ok(orders);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@Valid @PathVariable("id") Long id){
        try {
            Order existingOrder = orderService.getOrderById(id);
            return ResponseEntity.ok(existingOrder);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrders(@Valid @PathVariable Long id,
                                       @Valid @RequestBody OrderDTO orderDTO) throws Exception {
        try {
            Order order = orderService.updateOrder(id, orderDTO);
            return ResponseEntity.ok(order);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@Valid @PathVariable Long id){
        orderService.deleteOrder(id);
        return ResponseEntity.ok("Xóa thành công");
    }
}