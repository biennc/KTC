package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dtos.CreateStudentRequestDto;
import com.example.demo.dtos.StudentResponseDto;
import com.example.demo.dtos.UpdateStudentRequestDto;
import com.example.demo.entities.Student;
import com.example.demo.repositories.StudenJpaRepository;

@Service
public class StudentServices {
    private final StudenJpaRepository studentJpaRepository;

    public StudentServices(StudenJpaRepository studenJpaRepository) {
        this.studentJpaRepository = studenJpaRepository;
    }

    // create method convert entity to dto
    private StudentResponseDto convertToDto(Student student) {
        return new StudentResponseDto(
                student.getId(),
                student.getName(),
                student.getEmail(),
                student.getAddress());
    }

    public List<StudentResponseDto> getAllCategories() {
        List<Student> students = this.studentJpaRepository.findAll();

        // Convert to DTOs
        return students.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public StudentResponseDto getStudentById(Long id) {
        Student student = this.studentJpaRepository.findById(id).orElseThrow();
        return convertToDto(student);
    }

    public StudentResponseDto  createStudent(CreateStudentRequestDto createStudentRequestDto) {
        Student student = new Student();
        student.setName(createStudentRequestDto.getName());
        student.setEmail(createStudentRequestDto.getEmail());
        student.setAddress(createStudentRequestDto.getAddress());
        student.setPassword(createStudentRequestDto.getPassword());

        Student createdStudent = this.studentJpaRepository.save(student);
        return convertToDto(createdStudent);
    }

    public StudentResponseDto updateStudent(Long id, UpdateStudentRequestDto student) {
        Student existingStudent = this.studentJpaRepository.findById(id).orElseThrow();
        existingStudent.setName(student.getName());
        existingStudent.setAddress(student.getAddress());
        Student updatedStudent =  this.studentJpaRepository.save(existingStudent);
        return convertToDto(updatedStudent);
    }

    public void deleteStudent(Long id) {
        this.studentJpaRepository.findById(id).orElseThrow();
        this.studentJpaRepository.deleteById(id);
    }
}
