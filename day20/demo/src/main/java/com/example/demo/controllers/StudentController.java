package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dtos.CreateStudentRequestDto;
import com.example.demo.dtos.StudentResponseDto;
import com.example.demo.dtos.UpdateStudentRequestDto;
import com.example.demo.services.StudentServices;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    private final StudentServices studentServices;

    public StudentController (StudentServices studentServices) {
        this.studentServices = studentServices;
    }

    @GetMapping()
    public List<StudentResponseDto> getAllCategories() {
        return this.studentServices.getAllCategories();
    }

    @PostMapping()
    public StudentResponseDto createStudent(@RequestBody CreateStudentRequestDto createStudentRequestDto) {
        return this.studentServices.createStudent(createStudentRequestDto);
    }

    @GetMapping("/{id}")
    public StudentResponseDto getStudentById(@PathVariable("id") Long id) {
        return this.studentServices.getStudentById(id);
    }

    @PatchMapping("/{id}")
    public void updateStudent(@PathVariable("id") Long id, @RequestBody UpdateStudentRequestDto student) {
        this.studentServices.updateStudent(id, student);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable("id") Long id) {
        this.studentServices.deleteStudent(id);
    }
}
