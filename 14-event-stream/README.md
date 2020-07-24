Considered you're hired by a car dealership to build a system to keep track of which cars are "sold" and which are "for sale". Your instinct might be to model a car that considers its various properties; price, year, make, model and finally `isSold`. When information about a specific car is requested we can mark it as "for sale" or "sold".

```
Car {
    year
    make
    model
    price
    isSold
}
```

Perfect. You stand up a database and populate it with information about the cars on the lot. You build a service over HTTP to expose a lightweight api for "querying for all cars on the lot", "querying for a specific car", "selling a car", and "buying a 'used' car".
The car dealership is happy, cheers.

Fast forward another year and now the car dealerships customers begin to expect more from the dealership. They want to know the history of this vehicle. How many times has it exchanged hands and how many previous owners? Oh no. For the past year our service has enabled "selling a car" and "buying a 'used' car", but our model only kept track of whether the car is currently sold. We can update our model and our service to account for a history of exchanges and satisfy the customer's question moving forward, but we still won't know how the last year has impacted the answer.

Here lies event-driven architecture. By modeling the car dealerships domain as a series of sequential events we can satisfy the original requirements from the car dealership and the new ones being made by the car dealership's customers. Instead of modeling "things", like the car itself, we will model "events", like selling the car.

```
used <car:1> purchased <date:X>
<car:1> sold <date:Y>
used <car:2> purchased <date:Y>
used <car:1> purchased <date:Z>
```

When asking the question "is car 1 sold" we can process the stream of events and determine most recently car 1 was purchased by the car dealership and therefore is not marked as sold. If the customer asks "how many previous owners has car 1 had" we can filter the event stream by events of type "user car purchased" and again by "such that the car purchased was car 1" to determine the car dealership has known of two previous owners; the first time they bought the used car on date:X and the most recent buyback of the used car by date:Z.

Notice that the event never captured what the individual sold the dealership the car. Is it possible the car was sold to the dealership, bought from the dealership, and then sold back to the dealership all by the same person? If so then the event stream processing we performed won't come up with an accurate depiction of how many previous owners the car had. The questions we can answer are limited by the type of events and what data about the event is captured.

## Experiment
