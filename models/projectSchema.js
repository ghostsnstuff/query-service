'use strict';

var mongoose = require('mongoose');


module.exports = {
  uid: mongoose.Schema.ObjectId,
  timestamp: { type: Date, default: Date.now },

  generalTitle: String,
  generalCreator: String,
  generalCategory: String,
  generalSubCategory: String,
  generalProjectURL: String,
  generalCreatorURL: String,
  generalAvatarURL: String,
  generalVideoURL: String,

  locationCity: String,
  locationState: String,
  locationCountry: String,
  fundingDollarsRaised: Number,

  fundingGoal: Number,
  fundingPercentRaised: Number,
  fundingCurrency: String,
  fundingSuccessful: Boolean,
  fundingBackers: Number,

  timeNumDays: Number,
  timeStart: Number,
  timeEnd: Number,

  mediaNumImages: Number,
  mediaImages: Array,

  otherUpdates: Number,
  otherComments: Number,
  otherProjectsCreated: Number,
  otherProjectsBacked: Number,
  otherWebsiteURL: String,

  pledgesNumPledges: Number,
  pledgesNumLimited: Number,
  pledgesAmounts: Array,
  pledgesData: [
    {
      amount: Number,
      numBackers: Number,
      pledgePercentage: Number,
      estimatedDelivery: String,
      estimatedDeliveryISO: String,
      description: String,
      numWords: Number,
      numAllCaps: Number
    }
  ]
};
