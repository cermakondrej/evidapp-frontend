<template>


  <vx-card>
    <div class="vx-row mb-12">
      <div class="vx-col w-full">
        <vs-input class="w-full" icon-pack="feather" v-validate="'required'" icon="icon-user" icon-no-border
                  label-placeholder="Celé jméno" name="name"
                  v-model="user.full_name"/>
        <span class="text-danger text-sm" v-show="errors.has('full_name')">{{ errors.first('full_name') }}</span>
      </div>

      <div class="vx-col w-full">
        <vs-input class="w-full" icon-pack="feather" type="email" v-validate="'required|email'" icon="icon-at-sign"
                  icon-no-border
                  label-placeholder="Email" name="email"
                  v-model="user.email"/>
        <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
      </div>


      <div class="vx-col w-full">
        <vs-input type="password" v-validate="'min:5'" label-placeholder="Heslo" name="password" ref="password" icon-pack="feather"
                  v-model="user.password" class="w-full" icon-no-border icon="icon-lock"/>
        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
      </div>

      <!-- Confirm Password -->
      <div class="vx-col w-full">
        <vs-input type="password" v-validate="'confirmed:password'" label-placeholder="Potvrdit heslo"
                  name="confirm_password" icon-pack="feather" icon="icon-lock" icon-no-border
                  v-model="confirm_password" class="w-full" data-vv-as="password"/>
        <span class="text-danger text-sm"
              v-show="errors.has('confirm_password')">{{ errors.first('confirm_password') }}</span>
      </div>
    </div>


    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-button class="mr-3 mb-2" @click.prevent="submitForm">Uložit</vs-button>
        <vs-button color="warning" type="border" class="mb-2" @click="clearForm">Vymazat formulář</vs-button>
      </div>
    </div>
  </vx-card>
</template>
<script>
  import moduleUsers from '@/store/users/moduleUsers.js'
  import {Validator} from 'vee-validate';

  const dict = {
    custom: {
      full_name: {
        required: 'Jméno uživatele je povinné',
      },
      email: {
        required: 'Email je povinný',
        email: 'Email není ve správném tvaru'
      },
      password: {
        min: 'Heslo musí mít minimálně 5 znaků'
      },
      confirm_password: {
        confirmed: 'Hesla se musí shodovat'
      }
    }
  };

  // register custom messages
  Validator.localize('en', dict);
  Validator.localize('cs', dict)

  export default {
    data() {
      return {
        user: {
          full_name: '',
          email: '',
          password: '',
        },
        confirm_password: ''
      }
    },
    watch: {
      activeTab() {
        this.fetch_user_data(this.$route.params.userId)
      }
    },
    methods: {
      fetch_user_data(userId) {
        this.$store.dispatch("users/fetchOne", userId)
          .then(res => { this.user = res.data })
          .catch(err => {
            if(err.response.status === 404) {
              this.user_not_found = true
              return
            }
            console.error(err) })
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$vs.loading()
            this.$store.dispatch('users/edit', this.user)
              .then(() => {

                this.$vs.loading.close()
                this.$vs.notify({
                  color: 'success',
                  title: 'Uživatel upraven',
                  text: `Uživatel "${this.user.full_name}" byla úspěšně upraven.`
                })

              })
              .catch(error => {
                this.$vs.loading.close()
                this.$vs.notify({
                  title: 'Error',
                  text: error.message,
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger'
                })
              })
          } else {
            // form has errors
          }
        })
      }
    },
    created() {
      if(!moduleUsers.isRegistered) {
        this.$store.registerModule('users', moduleUsers)
        moduleUsers.isRegistered = true
      }
      this.fetch_user_data(this.$route.params.userId)
    }
  }
</script>
