import { Template } from 'meteor/templating';
 
import { Cijfers } from '../api/cijfers.js';
import './body.js';
import './cijfer.html';

Template.body.helpers({
	cijfers() {
		return Cijfers.find()
	}
})
 
Template.body.events({

  'submit .wijzigen'(event) {
  	// Prevent default browser form submit
    event.preventDefault();

  	// Get value from form element
    const target = event.target;
    const anderCijfer = target.anderCijfer.value;

    // Insert a task into the collection
    if (isNaN(anderCijfer) || anderCijfer < 0.0 || anderCijfer > 10.0 || anderCijfer === "") {
      alert('Het cijfer moet een getal zal dat tussen de 0.0 en 10.0 ligt. Probeer het opnieuw.') 
    } else {
    	Cijfers.update(this._id, {
      $set: { cijfer: anderCijfer},
    });
    }
  },
  'click .delete'() {
    Cijfers.remove(this._id);
  },
    'click .gemiddelde'() {

    var behaaldeResultaten = [];
    behaaldeResultaten.push(this.cijfer)

  	var gemiddelde = 0;  
  	  
  	for (var i=0; i < behaaldeResultaten.length; i++) {  
  	    gemiddelde += behaaldeResultaten[i];  
  	    var gemiddeldCijfer = (gemiddelde/behaaldeResultaten.length);  
  	}

  	alert('Het gemiddelde is: ' + (gemiddeldCijfer));
    },

});