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

The details of the API and data model is described as an OpenAPI (Swagger) specification to eliminate duplication: ![openapi.yaml](./openapi.yaml)

# Ideas for further enhancements of the application
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
