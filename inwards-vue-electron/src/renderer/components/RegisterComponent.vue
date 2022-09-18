<template>
    <div class="modal rounded-0 fade modal_center" tabindex="-1" id="register-modal" data-keyboard="false" data-backdrop="static">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <img class="modal-title" src="@/assets/logos.png" style="width: 100%;">
          </div>
          <div class="modal-body">
            <div class="form-group">
              <h5 class="modal-title"><b>Create an INWARDS account</b></h5>
              <div class="form-group">
              <label for="firstName">First Name</label>
              <input type="text" class="form-control rounded-0" id="firstName" placeholder="First Name">
                </div>
                <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" class="form-control rounded-0" id="lastName" placeholder="Last Name">
                </div>
              <label for="emailAddress">Email address</label>
              <input type="email" class="form-control rounded-0" id="emailAddress" aria-describedby="emailHelp" placeholder="Enter email" required>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
              <label for="sectorSelect">Sector</label>
              <select class="form-control rounded-0" id="sectorSelect" placeholder="Select your sector">
                <option>Agriculture</option>
                <option>Industry</option>
                <option>Mining</option>
                <option>National Government</option>
                <option>NPOs (NGOs, CSOs, CBOs)</option>
                <option>Parastatal</option>
                <option>Provincial Goverment</option>
                <option>SMME</option>
                <option>R&D (including Higher Education)</option>
              </select>            
              <label for="userDesignation">Designation</label>
              <input type="text" class="form-control rounded-0" id="userDesignation" placeholder="Please specify your designation" required>              
              <label for="useReason">Reason for use of data/accessing of information</label>
              <input type="text" class="form-control rounded-0" id="useReason" placeholder="Please specify your designation" required>
            </div>
            <button id="submitRequest" type="submit" class="btn rounded-0 inwards_button" v-on:click="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import $ from 'jquery';
  const { shell } = require('electron');
  const { dialog } = require('electron').remote;
  export default {
    data () {
      return {
        isLoggedIn: false,
        emailAddress: '',
        firstName: '',
        lastName: ''
      };
    },
    methods: {
      showregisterModal () {
        let registerModal = $('#register-modal');
        registerModal.modal({
          backdrop: 'static',
          keyboard: false
        });
      },
      submit (e) {
        let self = this;
        let button = $(e.target);
        let registerModal = $('#register-modal');
        button.prop('disabled', true);
        button.html(`Submitting...`);
        $.get('https://uwasp.award.org.za/app_json/user_registration.php?email=' + this.emailAddress + '&code=' + this.uniqueCode, function (data) {
          if (data === 'true') {
            registerModal.modal('hide');
            dialog.showMessageBox(null, {
              type: 'info',
              message: 'Your application as been submitted once accepted you will recieve login details',
              buttons: ['OK']
            });
          } else {
            button.prop('disabled', false);
            button.html(`Submit`);
            dialog.showMessageBox(null, {
              type: 'error',
              message: 'Failed to submit request!',
              buttons: ['OK']
            });
          }
        });
      }
    }
  };
  </script>