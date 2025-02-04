package com.project.shopapp.controllers;

import com.project.shopapp.dto.CategoryDTO;
import com.project.shopapp.models.Category;
import com.project.shopapp.responses.ResponseObject;
import com.project.shopapp.responses.UpdateCategoryResponse;
import com.project.shopapp.services.CategoryService;
import com.project.shopapp.components.LocalizationUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/categories")
@RequiredArgsConstructor
//@Validated
public class CategoryController {

    private final CategoryService categoryService;
    private final LocalizationUtils localizationUtils;

    @PostMapping("")
    public ResponseEntity<?> createCategories(@Valid @RequestBody CategoryDTO categoryDTO,
                                                   BindingResult result) {
        if (result.hasErrors()) {
            List<String> errorMessages = result.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .toList();
            return ResponseEntity.badRequest().body(errorMessages);
        }
        categoryService.creatCategory(categoryDTO);
        return ResponseEntity.ok("Thêm category thành công");


    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllCategories(
            @RequestParam("page") int page,
            @RequestParam("limit") int limit
    ) {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(ResponseObject.builder()
                .message("Lấy danh sách thuộc tính thành công")
                .status(HttpStatus.OK)
                .data(categories)
                .build()
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<UpdateCategoryResponse> updateCategories(@PathVariable Long id,
                                                                   @Valid @RequestBody CategoryDTO categoryDTO) {

        categoryService.updateCategory(id, categoryDTO);
        return ResponseEntity.ok(UpdateCategoryResponse.builder()
                .message(localizationUtils.getLocalizedMessage("category.update_category.update_successfully"))
                .build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategories(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok("Xóa thành công" + id);
    }
}
