# The (New) Benchmark Ordering System #

At Benchmark, we use a paper system to file and retrive our orders. This
system works... as long as everyone puts the orders back in the right spot,
and they don't get lost, and... yeah. I went to look at making an online order
tracking/entering system for us.


# History #

We make cemetery monuments, granite yard ornaments, pet memorials, bronze
statuary bases, and many more things. Even our monuments get pretty complex.

Our orders get lost *mostly* through being moved around to be filed and/or
processed.


# The Online Order Tracking System #

So. My vision for a computerized order tracking system.

## Version One (Initial)

All this needs to do is allow the user to enter the existing fields in a
computerized fashion. It should look as much like the current paper version
*as possible*.

This step might get scratched.


## Version One-Point-One (Save)

### ...Point-Oh
Before printing, save the order to localstorage

### ...Point-One
Save the order to the /orders.json file.

## Version One-Point-Two (Read)

Allow loading of orders from /orders.json

## Version Two (Order Tracking)
- Implement an interface to manage the orders.

I like the look of Trello's interface for this, actually.


# Eventual Features

- A complete order-tracking system
	- Smart queries in the interface to retieve lost orders.
	- Saves to a local JSON file
- An order-entry form
	- Should represent the entire range of forms that we use:
		- Order Status Sheets
		- Order Tracking Forms
		- Lettering Order Forms
	- ... for each place that sells for us.

## To Implement

- [https://github.com/thelinuxlich/knockout.live.plugin.git][]
- [https://github.com/romanych/ko.editables.git][]
