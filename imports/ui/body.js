import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Cijfers } from '../api/cijfers.js';
import './cijfers.js';
import './body.html';
 
Template.body.helpers({
  cijfers() {
	return Cijfers.find({
  }, 
  { sort: { createdAt: -1 } });
  },
});

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('cijfers');
});

 
Template.body.events({
  'submit .nieuw-cijfer'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const leerling = target.leerling.value;
    const vak = target.vak.value;
    const cijfer = target.cijfer.value;
 
    // Insert a task into the collection
    if (isNaN(cijfer) || cijfer < 0.0 || cijfer > 10.0) {
      alert('Het cijfer moet een getal zal dat tussen de 0.0 en 10.0 ligt. Probeer het opnieuw.') 
    } else if (leerling === "" || cijfer === "" || vak === "" || isNaN(leerling) === false) {
      alert('Vul alstublieft alle gegevens correct in!')
    }
    else {
      Cijfers.insert({
      leerling,
      vak,
      cijfer,
      createdAt: new Date(), // current time
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
    }
 
    // Clear form
    target.leerling.value = '';
    target.vak.value = '';
    target.cijfer.value = '';
  },
});