package com.virtualidentity.summits.summitservice.model;

public class Summit {
    private final String name;
    private final long id;

    public Summit(String name, long id) {
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
