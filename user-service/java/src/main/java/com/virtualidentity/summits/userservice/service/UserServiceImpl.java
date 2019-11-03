package com.virtualidentity.summits.userservice.service;

import com.virtualidentity.summits.userservice.KafkaTopicConfig;
import com.virtualidentity.summits.userservice.model.User;
import com.virtualidentity.summits.userservice.model.UserStatus;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

@Service
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
    private KafkaTemplate<String, User> userKafkaTemplate;

    @Override
    public User createUser(String username, String firstName, String lastName, String email, String password) {
        User user = new User(17, username, firstName, lastName, email, password, UserStatus.APPROVED);

        sendNotificationToKafka(user);

        return user;
    }

    private void sendNotificationToKafka(User user) {
        ListenableFuture<SendResult<String, User>> future =
                userKafkaTemplate.send(KafkaTopicConfig.KAFKA_USER_TOPIC, user);

        future.addCallback(new ListenableFutureCallback<SendResult<String, User>>() {

            @Override
            public void onSuccess(SendResult<String, User> result) {
                LOGGER.info("Sent message=[{}] with offset=[{}]", user.getUsername(), result.getRecordMetadata().offset());
            }

            @Override
            public void onFailure(Throwable ex) {
                LOGGER.error("Unable to send message=[{}] due to: {}", user.getUsername(), ex.getMessage());
            }
        });
    }
}
