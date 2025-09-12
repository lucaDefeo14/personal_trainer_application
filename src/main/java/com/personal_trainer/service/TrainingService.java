package com.personal_trainer.service;

import com.personal_trainer.dto.TrainingDto;
import com.personal_trainer.dto.UserDto;
import com.personal_trainer.entity.Training;
import com.personal_trainer.entity.User;
import com.personal_trainer.enums.Role;
import com.personal_trainer.mapper.TrainingMapper;

import com.personal_trainer.repository.TrainingRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class TrainingService {

    private final TrainingMapper trainingMapper;
    private final TrainingRepository trainingRepository;

    public TrainingService(TrainingMapper trainingMapper, TrainingRepository trainingRepository) {
        this.trainingMapper = trainingMapper;
        this.trainingRepository = trainingRepository;
    }

    public TrainingDto addTraining(TrainingDto trainingDto) {

        Training training = trainingMapper.maptoTraining(trainingDto);

        Training saved = trainingRepository.save(training);

        return trainingMapper.maptoTrainingDto(saved);
    }

    public List<TrainingDto> getAllTraining(){
        List<Training> trainings = trainingRepository.findAll();
        return trainings.stream()
                .map(trainingMapper::maptoTrainingDto)
                .toList();
    }

    public TrainingDto getTrainingById( Long id){
        Training training = trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Allenamento non trovato"));
        return trainingMapper.maptoTrainingDto(training);
    }

    public void deleteTrainingById(Long id){
        Training existingTraining = trainingRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Allenamento non trovato"));
        trainingRepository.deleteById(existingTraining.getId());
    }


    public TrainingDto updateTraining (Long id, TrainingDto trainingDto ) {
        Training existingTraining = trainingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("utente inesistente" + id));

        if(trainingDto.getTitle() != null) {
            existingTraining.setTitle(trainingDto.getTitle());
        }
        if(trainingDto.getClientName() != null) {
            existingTraining.setClientName(trainingDto.getClientName());
        }
        if(trainingDto.getPtName() != null) {
            existingTraining.setPtName(trainingDto.getPtName());
        }
        if(trainingDto.getStartDate() != null) {
            existingTraining.setStartDate(trainingDto.getStartDate());
        }
        if(trainingDto.getEndDate() != null) {
            existingTraining.setEndDate(trainingDto.getEndDate());
        }
        if(trainingDto.getEndDate() != null) {
            existingTraining.setDescription(trainingDto.getDescription());
        }

        Training updateTraining = trainingRepository.save(existingTraining);
        return trainingMapper.maptoTrainingDto(updateTraining);
    }

}
