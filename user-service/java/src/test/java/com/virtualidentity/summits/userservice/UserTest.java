package com.virtualidentity.summits.userservice;

import com.virtualidentity.summits.userservice.model.User;
import com.virtualidentity.summits.userservice.model.UserStatus;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

public class UserTest {

    private static final long ID = 17;
    private static final String USERNAME = "username";
    private static final String FIRST_NAME = "First";
    private static final String LAST_NAME = "Last";
    private static final String EMAIL = "username@mail.org";
    private static final String PASSWORD = "password";
    private static final UserStatus USER_STATUS = UserStatus.APPROVED;

    @Test
    void given_parameters_then_user_is_created_with_given_parameters() {
        // Arrange

        // Act
        final User user = new User(ID, USERNAME, FIRST_NAME, LAST_NAME, EMAIL, PASSWORD, USER_STATUS);

        // Assert
        Assertions.assertEquals(ID, user.getId());
        Assertions.assertEquals(USERNAME, user.getUsername());
        Assertions.assertEquals(FIRST_NAME, user.getFirstName());
        Assertions.assertEquals(LAST_NAME, user.getLastName());
        Assertions.assertEquals(EMAIL, user.getEmail());
        Assertions.assertEquals(PASSWORD, user.getPassword());
        Assertions.assertEquals(USER_STATUS, user.getUserStatus());
    }
}
