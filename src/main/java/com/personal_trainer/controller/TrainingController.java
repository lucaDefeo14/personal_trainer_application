package com.personal_trainer.controller;

import com.personal_trainer.dto.TrainingDto;
import com.personal_trainer.service.TrainingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/API/training")
public class TrainingController {

    private final TrainingService trainingService;

    @Autowired
    public TrainingController(TrainingService trainingService) {
        this.trainingService = trainingService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addTraining")
    public ResponseEntity<TrainingDto> addTraining(@RequestBody TrainingDto trainingDto){
        return ResponseEntity.ok(trainingService.addTraining(trainingDto));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/trainingList")
    public ResponseEntity<List<TrainingDto>> getAllTraining(){
        List<TrainingDto> training = trainingService.getAllTraining();
        return ResponseEntity.ok(training);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'CLIENT')")
    @GetMapping("/readTraining/{id}")
    public ResponseEntity<TrainingDto> getTraining(@PathVariable Long id){
        TrainingDto training = trainingService.getTrainingById(id);
        return  ResponseEntity.ok(training);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<TrainingDto> deleteTraining(@PathVariable Long id){
        trainingService.deleteTrainingById(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/update/{id}")
    public ResponseEntity<TrainingDto> updateTraining(@PathVariable Long id, @RequestBody TrainingDto trainingDto) {
        return ResponseEntity.ok(trainingService.updateTraining(id, trainingDto));
    }



}
