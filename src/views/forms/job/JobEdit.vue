<template>

  <vx-card>
    <div class="vx-row mb-12">
      <div class="vx-col w-full">
        <vs-input class="w-full" icon-pack="feather" icon="icon-user" v-validate="'required'" name="name" icon-no-border label-placeholder="Název"
                  v-model="job.name"/>

        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-button class="mr-3 mb-2" @click="submitForm">Uložit</vs-button>
        <vs-button color="warning" type="border" class="mb-2" @click.prevent="job.name = '';">Vymazat formulář</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
  import moduleJobs from '@/store/jobs/moduleJobs.js'
  import { Validator } from 'vee-validate';
  const dict = {
    custom: {
      name: {
        required: 'Název pracovní pozice je povinný',
      },
    }
  };

  // register custom messages
  Validator.localize('en', dict);
  Validator.localize('cs', dict)

  export default {
    data() {
      return {
        job: {
          id: 0,
          name: ''
        },
        job_not_found: false

      }
    },
    watch: {
      activeTab() {
        this.fetch_job_data(this.$route.params.jobId)
      }
    },
    methods: {
      fetch_job_data(jobId) {
        this.$store.dispatch("jobs/fetchOne", jobId)
          .then(res => { this.job = res.data })
          .catch(err => {
            if(err.response.status === 404) {
              this.job_not_found = true
              return
            }
            console.error(err) })
      },
      submitForm() {
        this.$validator.validateAll().then(result => {
          if (result) {
            this.$vs.loading()
            const payload = this.job
            this.$store.dispatch('jobs/edit', payload)
              .then(() => {

                this.$vs.loading.close()
                this.$vs.notify({
                  color: 'success',
                  title: 'Pracovní pozice upravena',
                  text: `Pracovní pozice "${this.job.name}" byla úspěšně upravena.`
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
      if(!moduleJobs.isRegistered) {
        this.$store.registerModule('jobs', moduleJobs)
        moduleJobs.isRegistered = true
      }
      this.fetch_job_data(this.$route.params.jobId)
    }
  }
</script>
