package com.personal_trainer.mapper;

import com.personal_trainer.dto.PaymentDto;
import com.personal_trainer.dto.TrainingDto;
import com.personal_trainer.entity.Payment;
import com.personal_trainer.entity.Training;
import com.personal_trainer.repository.TrainingRepository;
import com.personal_trainer.repository.UserRepository;
import org.springframework.stereotype.Component;

@Component
public class TrainingMapper {

    private final TrainingRepository trainingRepository;
    private final UserRepository userRepository;

    public TrainingMapper(TrainingRepository trainingRepository, UserRepository userRepository) {
        this.trainingRepository = trainingRepository;
        this.userRepository = userRepository;
    }

    public TrainingDto maptoTrainingDto (Training training){
        if ( training == null) return null;
        return new TrainingDto(
                training.getId(),
                training.getTitle(),
               // training.getUser().getId(),
                training.getClientName(),
                training.getPtName(),
                training.getStartDate(),
                training.getEndDate(),
                training.getDescription()
        );
    }

    public Training maptoTraining (TrainingDto trainingDto){
        if ( trainingDto == null) return null;

        Training training = new Training();
        training.setId(trainingDto.getId());
        training.setTitle(trainingDto.getTitle());
       /* training.setUser(userRepository.findById(trainingDto.getUser()).orElseThrow(
                () -> new RuntimeException("Utente non trovato!")
           )
        );*/


        training.setClientName(trainingDto.getClientName());
        training.setPtName(trainingDto.getPtName());
        training.setStartDate(trainingDto.getStartDate());
        training.setEndDate(trainingDto.getEndDate());
        training.setDescription(trainingDto.getDescription());

        return training;
    }


}
