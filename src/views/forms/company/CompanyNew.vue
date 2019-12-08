<template>


  <vx-card>
    <div class="vx-row mb-12">
      <div class="vx-col w-full">
        <vs-input class="w-full" icon-pack="feather" v-validate="'required'" icon="icon-user" icon-no-border
                  label-placeholder="Název" name="name"
                  v-model="company.name"/>
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-button class="mr-3 mb-2" @click.prevent="submitForm">Uložit</vs-button>
        <vs-button color="warning" type="border" class="mb-2" @click="company.name = '';">Vymazat formulář</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
  import moduleCompanies from '@/store/companies/moduleCompanies.js'
  import {Validator} from 'vee-validate';

  const dict = {
    custom: {
      name: {
        required: 'Název společnosti je povinný',
      },
    }
  };

  // register custom messages
  Validator.localize('en', dict);
  Validator.localize('cs', dict)
  export default {
    data() {
      return {
        company: {
          name: ''
        }
      }
    },
    methods: {
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$vs.loading()

            this.$store.dispatch('companies/create', this.company)
              .then(() => {
                this.$vs.loading.close()
                this.$vs.notify({
                  color: 'success',
                  title: 'Společnost přidána',
                  text: `Společnost "${this.company.name}" byla úspěšně přidána.`
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
      if (!moduleCompanies.isRegistered) {
        this.$store.registerModule('companies', moduleCompanies)
        moduleCompanies.isRegistered = true
      }
    }
  }
</script>
