package com.virtualidentity.summits.ascentservice.service;

import com.virtualidentity.summits.ascentservice.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

@Service
public class AscentServiceImpl implements AscentService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AscentServiceImpl.class);

    private CountDownLatch userLatch = new CountDownLatch(1);

    private User currentUser;

    @Override
    public User fetchUser() {
        try {
            userLatch.await(10, TimeUnit.SECONDS);
        } catch (InterruptedException e) {
            LOGGER.error("error fetching user messages from Kafka");
        }
        return currentUser;
    }

    @KafkaListener(topics = "user", containerFactory = "userKafkaListenerContainerFactory")
    public void userListener(User user) {
        LOGGER.info("Received user message: {}", user.getUsername());
        this.currentUser = user;
        this.userLatch.countDown();
    }
}
