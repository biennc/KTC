package com.example.demo.exceptions;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {
    /*
     * - Trong Java Spring Boot, MethodArgumentNotValidException là ngoại lệ được
     * ném ra
     * khi validation trên @RequestBody không thành công.
     * 
     * - Khi bạn dùng @Valid (hoặc @Validated) để kiểm tra dữ liệu đầu vào của một
     * API, mà dữ liệu gửi lên không thỏa mãn
     * các ràng buộc (constraints), Spring sẽ ném ra
     * MethodArgumentNotValidException.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, List<String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, List<String>> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.computeIfAbsent(fieldName, k -> new ArrayList<>()).add(errorMessage);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // Other exception handlers can be added here
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, List<String>>> handleGeneralException(Exception ex) {
        Map<String, List<String>> errors = new HashMap<>();
        errors.computeIfAbsent("errors", k -> new ArrayList<>()).add(ex.getMessage());

        return new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
