package com.virtualidentity.summits.userservice.service;

import com.virtualidentity.summits.userservice.KafkaTopicConfig;
import com.virtualidentity.summits.userservice.model.User;
import com.virtualidentity.summits.userservice.model.UserStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Override
    public User createUser(String username, String firstName, String lastName, String email, String password) {
        User user = new User(17, username, firstName, lastName, email, password, UserStatus.APPROVED);

        sendNotificationToKafka(user);

        return user;
    }

    private void sendNotificationToKafka(User user) {
        ListenableFuture<SendResult<String, String>> future =
                kafkaTemplate.send(KafkaTopicConfig.KAFKA_USER_TOPIC, user.getUsername());

        future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {

            @Override
            public void onSuccess(SendResult<String, String> result) {
                System.out.println("Sent message=[" + user.getUsername() +
                        "] with offset=[" + result.getRecordMetadata().offset() + "]");
            }

            @Override
            public void onFailure(Throwable ex) {
                System.out.println("Unable to send message=["
                        + user.getUsername() + "] due to : " + ex.getMessage());
            }
        });
    }
}
