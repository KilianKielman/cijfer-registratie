import { Mongo } from 'meteor/mongo';
 
export const Cijfers = new Mongo.Collection('resultaten');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('cijfers', function cijfersPubliceren() {
    return Cijfers.find();
  });
}