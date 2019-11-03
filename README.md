# Summits
This project provides a domain and wrapper to evaluate backend technologies.
It works as a playground which already provides all functionality needed for a real life example, such that one can focus on the things to evaluate.
The domain is just a dummy domain which is coincidentally well known to the author ...

This project should make it easy for developers to experiment with new technologies without having to think much about a real-life problem.
It should also enable them to evaluate one facet or one new library or technology without having to rebuild the complete infrastructure of a real application.

# Domain model
This product is about mountain summits, mountaineers (the users of the platform) and ascents of these mountaineers to the summits.

Our product consists of a database of summits with some basic information about the summit.
Mountaineers have a profile and can log in to the system. 
Mountaineers can document their ascents and can query for summits and ascents of mountaineers (either their own or others).

The details of the API and data model is described as an OpenAPI (Swagger) specification to eliminate duplication: ![openapi.yaml](openapi/openapi.yaml)

# Note on the repository layout
I chose a monorepository to make it easier to check out the whole system and to keep everything together, since this most likely will not grow too big and will not be managed by different teams.

TODO: move the services to top level and create language subfolders ...

# Ideas for further enhancements of the application
- Add centralized logging for production but also local for development ...
- Mountaineers can become friends
- add SSO
- add GraphQL API
- use different persistence implementations
- deploy to different runtimes (Kubernetes, AWS, Azure, ...)
- Use different frameworks and technologies
    - MicroProfile
    - Golang
- Monitoring and Logging
- add UI with maps and vue.js or react
- Security vulnerability scanning and hardening

# Building and running the application

For each service (adapt the port mapping for each service):
1. cd nodejs/summit-service
2. docker build -t summit-service .
3. docker run -d -p 3000:3000 --init summit-service

- the "--init" is needed to handle unix signals correctly since node can't handle properly running as process 1
  
## Kafka
To use Kafka it is easiest to get appropriate Docker images from https://github.com/wurstmeister/kafka-docker.git

This creates a zookeeper and kafka docker image and runs them in docker-compose.

The value for the following property must be changed to IP address of the local computer (not localhost or 127.0.0.1): kafka.bootstrapAddress
