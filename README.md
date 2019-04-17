# Summits
This project provides a domain and wrapper to evaluate backend technologies.
The domain is just a dummy domain which is coincidentally well known to the author ...

This product should make it easy for developers to experiment with new technologies without having to think much about a real-life problem.
It should also enable them to evaluate one facet or one new library or technology without having to rebuild the complete infrastructure of a real application.


# Domain model
This product is about mountain summits, mountaineers and ascents of these mountaineers to the summits.

- Summits (a mountain summit)
- Mountaineers (the people trying to get on top of the summits)
- Ascents (successful attempts of mountaineers getting on top of a summit)

Our product consists of a database of summits with some basic information about the summit.
Mountaineers have a profile and can register, resp. log in to their profile. 
Mountaineers can document their ascents and can query for ascents of other people.

## Summit
A summit has the following attributes:
- Name
- Height
- Country

As a user, I can get a list of summits to see the details of the summits. 
I can also search for specific summits based on the attributes:
- Get all summits over or below a certain height
- Get all summits of a specific country

## Mountaineer
A mountaineer has the following attributes:
- Name (surename and given name)
- Date of birth
- Nationality
- email address
- A list of friends, who are also mountaineers

As a mountaineer, I can login to the product and edit my profile.

## Ascents
An ascent denotes if a mountaineer has reached a summit and has the following attributes:
- Date
- Type of tour, like ski, climb, etc.
- Summit
- Mountaineer

As a user, I can add ascents of myself and list my ascents and list the ascents of my friends.
