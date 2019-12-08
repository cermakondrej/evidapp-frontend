<template>


  <vx-card>
    <div class="vx-row mb-12">

      <div class="vx-col w-full">
        <div class="mt-4">
          <label class="vs-input--label">Zaměstnanec</label>
          <v-select class="w-full" icon-pack="feather" v-validate="'required'" icon="icon-user" icon-no-border
                    name="user" label="full_name" :options="usersData"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="work.user"/>
          <span class="text-danger text-sm" v-show="errors.has('user')">{{ errors.first('user') }}</span>
        </div>
      </div>

      <div class="vx-col w-full">
        <div class="mt-4">
          <label class="vs-input--label">Společnost</label>
          <v-select class="w-full" v-validate="'required'" icon-pack="feather" icon="icon-user" icon-no-border
                    name="company" label="name" :options="companiesData"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="work.company"/>
          <span class="text-danger text-sm" v-show="errors.has('company')">{{ errors.first('company') }}</span>
        </div>
      </div>

      <div class="vx-col w-full">
        <div class="mt-4">
          <label class="vs-input--label">Pracovní pozice</label>
          <v-select class="w-full" v-validate="'required'" icon-pack="feather" icon="icon-calendar" icon-no-border
                    name="job" label="name" :options="jobsData"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="work.job"/>
          <span class="text-danger text-sm" v-show="errors.has('job')">{{ errors.first('job') }}</span>
        </div>
      </div>

      <div class="vx-col w-full">
        <div class="mt-4">
          <label class="vs-input--label">Úvazek</label>
          <vs-input class="w-full mt-4" v-validate="'required|min_value:0|max_value:1'"
                    icon="icon-user" icon-no-border icon-pack="feather"
                    name="workload" v-model="work.workload"/>
          <span class="text-danger text-sm" v-show="errors.has('workload')">{{ errors.first('workload') }}</span>
        </div>
      </div>

      <div class="vx-col w-1/3">
        <div class="mt-4">
          <label class="vs-input--label">Začátek pracovní doby</label>
          <flat-pickr class="w-full" :config="configdateTimePicker" v-model="work.start" name="start"
                      v-validate="'required'"
                      icon-pack="feather" icon="icon-calendar" icon-no-border/>
          <span class="text-danger text-sm" v-show="errors.has('start')">{{ errors.first('start') }}</span>
        </div>
      </div>
      <div class="vx-col w-1/3">
        <div class="mt-4">
          <label class="vs-input--label">Začátek pracovní pauzy</label>
          <flat-pickr class="w-full" :config="configdateTimePicker" v-model="work.break_start" name="break_start"
                      con-pack="feather" icon="icon-calendar" icon-no-border/>
          <span class="text-danger text-sm" v-show="errors.has('break_start')">{{ errors.first('break_start') }}</span>
        </div>
      </div>
      <div class="vx-col w-1/3">
        <div class="mt-4">
          <label class="vs-input--label">Konec pracovní pauzy</label>
          <flat-pickr class="w-full" :config="configdateTimePicker" v-model="work.break_end" name="break_end"
                      icon-pack="feather" icon="icon-calendar" icon-no-border/>
          <span class="text-danger text-sm" v-show="errors.has('break_end')">{{ errors.first('break_end') }}</span>
        </div>
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
  import moduleCompanies from '@/store/companies/moduleCompanies.js'
  import moduleJobs from '@/store/jobs/moduleJobs.js'
  import moduleWorks from '@/store/works/moduleWorks.js'

  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import vSelect from 'vue-select'
  import {Validator} from 'vee-validate';

  const dict = {
    custom: {
      user: {
        required: 'Musíte vybrat zaměstnance',
      },
      company: {
        required: 'Musíte vybrat společnost',
      },
      job: {
        required: 'Musíte vybrat pracovní pozici'
      },
      workload: {
        required: 'Musíte vyplnit úvazek',
        min_value: 'Úvazek nesmí být menší než 0',
        max_value: 'Úvazek nesmí být větší než 1'
      },
      start: {
        required: "Vyplňte prosím začátek pracovní doby",
        date_format: "Nesprávný format času"
      },
      break_start: {
        date_format: "Nesprávný format času"
      },
      break_end: {
        date_format: "Nesprávný format času"
      }
    }
  };

  // register custom messages
  Validator.localize('en', dict);
  Validator.localize('cs', dict)
  export default {
    data() {
      return {
        work: {
          id: 0,
          user: {},
          company: {},
          job: {},
          workload: null,
          start: null,
          break_start: null,
          break_end: null
        },
        configdateTimePicker: {
          enableTime: true,
          time_24hr: true,
          defaultHour: 9,
          enableSeconds: false,
          noCalendar: true
        }
      }
    },
    watch: {
      activeTab() {
        this.fetch_work_data(this.$route.params.workId)
      }
    },
    components: {
      flatPickr,
      'v-select': vSelect
    },
    computed: {
      usersData() {
        return this.$store.getters['users/getAll']

      },
      jobsData() {
        return this.$store.getters['jobs/getAll']

      },
      companiesData() {
        return this.$store.getters['companies/getAll']

      },
    },
    methods: {
      fetch_work_data(workId) {
        this.$store.dispatch("works/fetchOne", workId)
          .then(res => {
            this.work = {
              id: res.data.id,
              user: this.fetch_user_data(res.data.employee.id),
              job: this.fetch_job_data(res.data.job.id),
              company: this.fetch_company_data(res.data.company.id),
              workload: res.data.workload,
              start: res.data.start,
              break_start: res.data.break_start,
              break_end: res.data.break_end
            }
          })
          .catch(err => {
            if(err.response.status === 404) {
              this.user_not_found = true
              return
            }
            console.error(err) })
      },
      fetch_user_data(userId) {
        this.$store.dispatch("users/fetchOne", userId)
          .then(res => { this.work.user = res.data })
          .catch(err => {
            if(err.response.status === 404) {
              this.user_not_found = true
              return
            }
            console.error(err) })
      },
      fetch_company_data(companyId) {
        this.$store.dispatch("companies/fetchOne", companyId)
          .then(res => { this.work.company = res.data })
          .catch(err => {
            if(err.response.status === 404) {
              this.company_not_found = true
              return
            }
            console.error(err) })
      },
      fetch_job_data(jobId) {
        this.$store.dispatch("jobs/fetchOne", jobId)
          .then(res => { this.work.job = res.data })
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
            const payload = {
              id: this.work.id,
              employee: this.work.user.id,
              job: this.work.job.id,
              company: this.work.company.id,
              workload: this.work.workload * 1,
              start: this.work.start,
              break_start: this.work.break_start,
              break_end: this.work.break_end
            }
            this.$store.dispatch('works/edit', payload)
              .then(() => {
                this.$vs.loading.close()
                this.$vs.notify({
                  color: 'success',
                  title: 'Pracovní úvazek uprave',
                  text: `Pracovní úvazek pro uživatele "${this.work.user.full_name}" byl úspěšně upraven.`
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
      },
      clearForm() {

        this.work.user = []
        this.work.job = []
        this.work.company = []
        this.work.workload = ''
        this.work.start = ''
        this.work.break_start = ''
        this.work.break_end = ''
      }
    },
    created() {
      if (!moduleWorks.isRegistered) {
        this.$store.registerModule('works', moduleWorks)
        moduleWorks.isRegistered = true
      }
      if (!moduleUsers.isRegistered) {
        this.$store.registerModule('users', moduleUsers)
        moduleUsers.isRegistered = true
      }
      if (!moduleJobs.isRegistered) {
        this.$store.registerModule('jobs', moduleJobs)
        moduleJobs.isRegistered = true
      }
      if (!moduleCompanies.isRegistered) {
        this.$store.registerModule('companies', moduleCompanies)
        moduleCompanies.isRegistered = true
      }
      this.$store.dispatch("users/fetchAll").catch(err => {
        console.error(err)
      })
      this.$store.dispatch("jobs/fetchAll").catch(err => {
        console.error(err)
      })
      this.$store.dispatch("companies/fetchAll").catch(err => {
        console.error(err)
      })
      this.fetch_work_data(this.$route.params.workId)
    }
  }
</script>
