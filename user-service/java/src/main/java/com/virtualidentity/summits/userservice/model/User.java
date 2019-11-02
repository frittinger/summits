package com.virtualidentity.summits.userservice.model;

public class User {
    private final String name;
    private final long id;

    public User(String name, long id) {
        this.name = name;
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public long getId() {
        return id;
    }
}
