package com.virtualidentity.summits.ascentservice.model;

public class Ascent {
    private final String name;
    private final long id;

    public Ascent(String name, long id) {
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
