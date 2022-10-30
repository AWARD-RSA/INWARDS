<template>
  <div class="modal rounded-0 fade modal_center" tabindex="-1" id="login-modal" data-keyboard="false" data-backdrop="static">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <img class="modal-title" src="@/assets/login_logos.png" style="width: 100%;">
        </div>
        <div class="modal-body">
          <div class="col-md-12">
                  <nav>
                  <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                      <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#login-tab" role="tab" aria-controls="nav-home" aria-selected="true" style="text-align: center;">Login</a>
                      <a class="nav-item nav-link" data-toggle="tab" href="#profile" role="tab" aria-controls="nav-profile" aria-selected="false">Register</a>
                    </div>
                    </nav>
                    <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent-login">
                        <div class="tab-pane fade show active" id="login-tab" role="tabpanel" aria-labelledby="home-tab">
                            <div class="row">
                                <div class="col-md-12">
                                      <div class="form-group">
                                      <label for="emailAddress">Email address</label>
                                        <input type="email" class="form-control rounded-0" id="emailAddress" v-model="emailAddress" aria-describedby="emailHelp">
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div class="form-group">
                                          <label for="uniqueCode">Unique Code</label>
                                          <input type="text" class="form-control rounded-0" id="uniqueCode" v-model="uniqueCode">
                                        </div>                                   
                                        <button id="verifyCode" type="submit" class="btn rounded-0 inwards_button" v-on:click="submit">Login</button>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="row register-form">
                                <div class="col-md-12">
                                    <form method="post">
                                      <div class="form-group">
                                            <div class="form-group">
                                              <label for="firstName">First Name</label>
                                              <input type="text" class="form-control rounded-0" id="firstName" v-model="firstName">
                                            </div>
                                              <div class="form-group">
                                              <label for="lastName">Last Name</label>
                                              <input type="text" class="form-control rounded-0" id="lastName" v-model="lastName">
                                              </div>
                                              <div class="form-group">
                                            <label for="regEmailAddress">Email address</label>
                                            <input type="email" class="form-control rounded-0" id="regEmailAddress" aria-describedby="emailHelp" v-model="regEmailAddress">
                                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                          </div>
                                          <div class="form-group">
                                            <label for="sectorSelect">Sector</label>
                                            <select class="form-control rounded-0" id="sectorSelect" v-model="sectorSelect">
                                              <option>Academia</option>
                                              <option>Agriculture</option>
                                              <option>Civil society</option>
                                              <option>Government</option>
                                              <option>Industry</option>
                                              <option>Other</option>
                                            </select>
                                          </div>
                                          <div class="form-group">         
                                            <label for="userDesignation">Designation</label>
                                            <input type="text" class="form-control rounded-0" id="userDesignation" v-model="userDesignation">              
                                            </div>
                                            <div class="form-group">  
                                            <label for="useReason">Reason for use of data/accessing of information</label>
                                            <textarea rows="5" class="form-control rounded-0" id="useReason" v-model="useReason">
                                          </textarea>
                                          </div>
                                          </div>
                                        <div class="form-group">
                                            <button type="submit" class="btn rounded-0 inwards_button" v-on:click="requestAccess">Request Access</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
           
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import $ from 'jquery';
import stateStore from '../store/state_handler';
const { shell } = require('electron');
const { dialog } = require('electron').remote;
export default {
  data () {
    return {
      isLoggedIn: false,
      emailAddress: '',
      uniqueCode: '',
      firstName: '',
      lastName: '',
      sectorSelect: '',
      useReason: '',
      userDesignation: '',
      regEmailAddress: ''
    };
  },
  mounted () {
    let self = this;
    this.$bus.$on('databaseValidated', () => {
      // Check user login status
      if (!this.isLoggedIn) {
        console.log('Check user login status in local store');
        stateStore.getState(
          stateStore.keys.loginStatus, (status) => {
            if (!status) {
              self.loginStatus = false;
            } else {
              if (status.hasOwnProperty('loggedIn')) {
                self.loginStatus = status['loggedIn'];
              } else {
                self.loginStatus = false;
              }
            }
            if (!self.loginStatus) {
              self.showLoginModal();
            }
          });
      }
    });
  },
  methods: {
    checkUserLoggedIn () {
      console.log('Check if user is logged in');
    },
    showLoginModal () {
      let loginModal = $('#login-modal');
      loginModal.modal({
        backdrop: 'static',
        keyboard: false
      });
    },
    requestAccess (e) {
      let self = this;
      let button = $(e.target);
      let loginModal = $('#login-modal');
      button.prop('disabled', true);
      button.html(`Submitting...`);
      console.log('https://inwards.award.org.za/app_json/user_registration.php?email=' + this.regEmailAddress + '&first_name=' + this.firstName + '&last_name=' + this.lastName + '&sector=' + this.sectorSelect + '&designation=' + this.userDesignation + '&reason=' + this.useReason);
      $.get('https://inwards.award.org.za/app_json/user_registration.php?email=' + this.regEmailAddress + '&first_name=' + this.firstName + '&last_name=' + this.lastName + '&sector=' + this.sectorSelect + '&designation=' + this.userDesignation + '&reason=' + this.useReason, function (data) {
        if (data === 'true') {
          loginModal.modal('hide');
          dialog.showMessageBox(null, {
            type: 'info',
            message: 'Successfully Submitted Request!',
            buttons: ['OK']
          });
          loginModal.modal('show');
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
    submit (e) {
      let self = this;
      let button = $(e.target);
      let loginModal = $('#login-modal');
      button.prop('disabled', true);
      button.html(`Submitting...`);
      $.get('https://inwards.award.org.za/app_json/user_verification.php?email=' + this.emailAddress + '&code=' + this.uniqueCode, function (data) {
        if (data === 'true') {
          loginModal.modal('hide');
          stateStore.setState(stateStore.keys.loginStatus, {
            'loggedIn': true,
            'emailAddress': self.emailAddress,
            'uniqueCode': self.uniqueCode,
            'timestamp': Date.now()
          }, false);
          self.loggedIn = true;
          dialog.showMessageBox(null, {
            type: 'info',
            message: 'Successfully Verified!',
            buttons: ['OK']
          });
          stateStore.updateFromServer(() => {
            setTimeout(function () {
              console.log("logged in");
            }, 200);
          });
        } else {

        }
      });
    }
  }
};
</script>