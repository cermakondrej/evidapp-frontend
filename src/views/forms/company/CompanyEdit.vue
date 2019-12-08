<template>


  <vx-card>
    <div class="vx-row mb-12">
      <div class="vx-col w-full">
        <vs-input class="w-full" icon-pack="feather" icon="icon-user" v-validate="'required'" name="name" icon-no-border label-placeholder="Název"
                  v-model="company.name"/>

        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-button class="mr-3 mb-2" @click="submitForm">Uložit</vs-button>
        <vs-button color="warning" type="border" class="mb-2" @click.prevent="company.name = '';">Vymazat formulář</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
  // For custom error message

  import moduleCompanies from '@/store/companies/moduleCompanies.js'
  import { Validator } from 'vee-validate';
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
          id: 0,
          name: ''
        },
        company_not_found: false

      }
    },
    watch: {
      activeTab() {
        this.fetch_company_data(this.$route.params.companyId)
      }
    },
    methods: {
      fetch_company_data(companyId) {
        this.$store.dispatch("companies/fetchOne", companyId)
          .then(res => { this.company = res.data })
          .catch(err => {
            if(err.response.status === 404) {
              this.company_not_found = true
              return
            }
            console.error(err) })
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$vs.loading()
            const payload = this.company
            this.$store.dispatch('companies/edit', payload)
              .then(() => {

                this.$vs.loading.close()
                this.$vs.notify({
                  color: 'success',
                  title: 'Společnost upravena',
                  text: `Společnost "${this.company.name}" byla úspěšně upravena.`
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
      if(!moduleCompanies.isRegistered) {
        this.$store.registerModule('companies', moduleCompanies)
        moduleCompanies.isRegistered = true
      }
      this.fetch_company_data(this.$route.params.companyId)
    }
  }
</script>
