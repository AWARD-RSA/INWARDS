<template>
    <div>
      <StatusBar/>
      <div class="container-fluid" style="width:50%">
        <div class="v-space"></div>
        <div class="card rounded-0 box" v-bind:style="styleObject" style="margin-top:25%">
        <div class="card-header inwards_card"><h5>Submit Support Ticket</h5>
        </div>
        <div class="card-body">
        <div class="row no-gutters">
          
          <div class="v-space"></div>
          <div class="col-md-12" style="background: #fff; padding-bottom: 50px; padding-left: 10px; padding-right: 10px; overflow: auto;">
            <form id="contact-form" method="post" role="form">
              <hr>
              <div class="messages"></div>

              <div class="controls">

                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group">
                              <label for="form_name">Firstname *</label>
                              <input id="firstName" v-model="firstName" type="text" name="name" class="form-control" placeholder="Please enter your firstname *" required="required" data-error="Firstname is required.">
                              <div class="help-block with-errors"></div>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                              <label for="form_lastname">Lastname *</label>
                              <input id="lastName" v-model="lastName" type="text" name="surname" class="form-control" placeholder="Please enter your lastname *" required="required" data-error="Lastname is required.">
                              <div class="help-block with-errors"></div>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-6">
                          <div class="form-group">
                              <label for="form_email">Email *</label>
                              <input id="regEmailAddress" v-model="regEmailAddress" type="email" name="email" class="form-control" placeholder="Please enter your email *" required="required" data-error="Valid email is required.">
                              <div class="help-block with-errors"></div>
                          </div>
                      </div>
                      <div class="col-md-6">
                          <div class="form-group">
                              <label for="form_need">Please specify your need *</label>
                              <select id="supportSelect" v-model="supportSelect" name="need" class="form-control" required="required" data-error="Please specify your need.">
                                  <option value=""></option>
                                  <option value="Report an Issue">Report an Issue </option>
                                  <option value="Request UWASP Access">Request Password Reset</option>
                                  <option value="Request Profile Removal">Request Profile Removal</option>
                                  <option value="Request Help with Using INWARDS">Request Help with Using INWARDS</option>
                                  
                                  <option value="Other">Other</option>
                              </select>
                              <div class="help-block with-errors"></div>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12">
                          <div class="form-group">
                              <label for="form_message">Message *</label>
                              <textarea id="supportMessage" v-model="supportMessage" name="message" class="form-control" placeholder="Message for me *" rows="4" required="required" data-error="Please, leave us a message."></textarea>
                              <div class="help-block with-errors"></div>
                          </div>
                      </div>
                      <div class="col-md-12">
                          <p class="text-muted">
                              <strong>*</strong> These fields are required.</p>
                      </div>
                      <div class="col-md-12">
                        <button type="submit" class="btn rounded-0 inwards_button" v-on:click="submitTicket">Submit Support Ticket</button>
                      </div>
                  </div>

              </div>

              </form>
          </div>
        </div>
      </div>
    </div>
        <NavButtons/>
      </div>
    </div>
  </template>
  <script>
    import $ from 'jquery';
    import stateStore from '../../store/state_handler';
    import router from '@/router/index';
    import NavButtons from '../../components/NavButtons';
    import StatusBar from '../StatusBar';
    const { dialog } = require('electron').remote;
  
    export default {
    components: {
        NavButtons,
        router,
        StatusBar
        
    },
      data () {
        return {
          selectedWMA: [],
          selectedFeatures: {}
        };
      },
      mounted () {

      },
      methods: {
        submitTicket (e) {
        let self = this;
        let button = $(e.target);
        button.prop('disabled', true);
        button.html(`Submitting...`);
        console.log('https://inwards.award.org.za/app_json/admin/support_request.php?email=' + this.regEmailAddress + '&first_name=' + this.firstName + '&last_name=' + this.lastName + '&request_select=' + this.supportSelect + '&support_message=' + this.supportMessage);
        $.get('https://inwards.award.org.za/app_json/admin/support_request.php?email=' + this.regEmailAddress + '&first_name=' + this.firstName + '&last_name=' + this.lastName + '&request_select=' + this.supportSelect + '&support_message=' + this.supportMessage, function (data) {
          if (data === 'true') {
            dialog.showMessageBox(null, {
              type: 'info',
              message: 'Successfully Submitted Support Ticket!',
              buttons: ['OK']
            });
            button.html(`Submit Another Support Ticket`);
          } else {
            button.prop('disabled', false);
            button.html(`Submit`);
            dialog.showMessageBox(null, {
              type: 'error',
              message: 'Failed to Submit Request!',
              buttons: ['OK']
            });
          }
        });
      },
      }
    };
  </script>