# 5. Use Kafka to send events between services

Date: 2019-11-02

## Status

Accepted

## Context

This project serves as a test bed for various technologies around microservices. Kafka is a messaging system to send events between microservices.

## Decision

Introduce Kafka to send events about updates to users to the ascent service.

## Consequences

Apache Kafka must be running to send and consume events. 

When a user is changed in the user service an event is sent to Kafka and the ascent service has an event listener that listens for these events to update information on users.

Through this mechanism the ascent service does not have to call the user service to fetch information on users or to keep the user information in sync.

