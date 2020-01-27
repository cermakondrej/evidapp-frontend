<template>
    <vx-card title="Exportovat výkaz">

        <div class="mt-5">
            <form-wizard color="rgba(var(--vs-primary), 1)" errorColor="rgba(var(--vs-danger), 1)" :title="null"
                         :subtitle="null" nextButtonText="Další" backButtonText="Předchozí" finishButtonText="Odeslat"
                         @on-complete="formSubmit">
                <tab-content title="Období" class="mb-5" icon="feather icon-clock" :before-change="validateStep1">

                    <form data-vv-scope="step-1">
                        <div class="vx-row">

                            <div class="vx-col w-full">
                                <div class="mt-4">
                                    <label class="vs-input--label">Pracovní úvazek</label>
                                    <v-select class="w-full" icon-pack="feather" v-validate="'required'"
                                              icon="icon-user" icon-no-border
                                              name="work" label="name" :options="worksData"
                                              :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="work"/>
                                    <span class="text-danger text-sm" v-show="errors.has('work')">{{ errors.first('work') }}</span>
                                </div>
                            </div>

                            <div class="vx-col md:w-1/2 w-full mt-4">
                                <div class="mt-4">
                                    <label class="vs-input--label">Měsíc</label>
                                    <v-select class="w-full" icon-pack="feather" v-validate="'required'"
                                              icon="icon-user" icon-no-border
                                              name="month" label="name" :options="months"
                                              :dir="$vs.rtl ? 'rtl' : 'ltr'" v-model="month"/>
                                    <span class="text-danger text-sm" v-show="errors.has('month')">{{ errors.first('month') }}</span>
                                </div>
                            </div>
                            <div class="vx-col md:w-1/2 w-full mt-4">
                                <div class="mt-4">
                                    <label class="vs-input--label">Rok</label>
                                    <vs-input v-model="year" class="w-full" name="year" v-validate="'required|numeric'"
                                              icon-pack="feather" icon="icon-user" icon-no-border/>
                                    <span class="text-danger text-sm" v-show="errors.has('year')">{{ errors.first('year') }}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </tab-content>

                <!-- tab 2 content -->
                <tab-content title="Pracovní doba" class="mb-5" icon="feather icon-briefcase"
                             :before-change="validateStep2">
                    <form data-vv-scope="step-2">
                        <div class="vx-row">

                            <div class="vx-col md:w-1/2 w-full mt-4">
                                <div class="mt-4">
                                    <label class="vs-input--label">Začátek pracovní doby</label>
                                    <flat-pickr class="w-full" :config="configdateTimePicker" v-model="workStart"
                                                name="start"
                                                icon-pack="feather" icon="icon-clock" icon-no-border/>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('break_end')">{{ errors.first('break_end') }}</span>
                                </div>
                            </div>

                            <div class="vx-col md:w-1/2 w-full mt-4">
                                <div class="mt-4">
                                    <label class="vs-input--label">Začátek pracovní pauzy</label>
                                    <flat-pickr class="w-full" :config="configdateTimePicker" v-model="workBreakStart"
                                                name="break_start"
                                                icon-pack="feather" icon="icon-clock" icon-no-border/>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('break_end')">{{ errors.first('break_end') }}</span>
                                </div>
                            </div>

                            <div class="vx-col md:w-1/2 w-full mt-4">
                                <div class="mt-4">
                                    <label class="vs-input--label">Konec pracovní doby</label>
                                    <flat-pickr class="w-full" :config="configdateTimePicker" v-model="workEnd"
                                                name="end"
                                                icon-pack="feather" icon="icon-clock" icon-no-border/>
                                </div>
                            </div>
                            <div class="vx-col md:w-1/2 w-full mt-4">
                                <div class="mt-4">
                                    <label class="vs-input--label">Konec pracovní pauzy</label>
                                    <flat-pickr class="w-full" :config="configdateTimePicker" v-model="workBreakEnd"
                                                name="end"
                                                icon-pack="feather" icon="icon-clockr" icon-no-border/>
                                    <span class="text-danger text-sm"
                                          v-show="errors.has('break_end')">{{ errors.first('break_end') }}</span>
                                </div>
                            </div>
                        </div>
                    </form>
                </tab-content>

                <!-- tab 3 content -->
                <tab-content title="Absence" class="mb-5" icon="feather icon-image" :before-change="validateStep3">
                    <form data-vv-scope="step-3">
                        <absence-step v-on:syncAbsence="setAbsence"></absence-step>
                    </form>
                </tab-content>

                <tab-content title="Export" class="mb-5" icon="feather icon-clock">
                    <export-step :export-data="exportData" :active-export-prompt="activeExportPrompt"></export-step>
                </tab-content>

            </form-wizard>
        </div>
    </vx-card>
</template>

<script>
    import {FormWizard, TabContent} from 'vue-form-wizard'
    import 'vue-form-wizard/dist/vue-form-wizard.min.css'

    import AbsenceStep from "./steps/AbsenceStep.vue"
    import ExportStep from "./steps/ExportStep.vue"
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import vSelect from 'vue-select'


    // Store Module
    import moduleWorks from '@/store/works/moduleWorks.js'
    import moduleExports from '@/store/exports/moduleExports.js'

    // For custom error message
    import {Validator} from 'vee-validate';

    const dict = {
        custom: {}
    };

    // register custom messages
    Validator.localize('en', dict);


    export default {
        data() {
            return {
                absence: {
                    vacation: [],
                    sickness: [],
                    unpaid_vacation: [],
                    nursing: [],
                    billable_free_time: []
                },
                work: null,
                year: "",
                month: "",
                workStart: null,
                workEnd: null,
                workBreakStart: null,
                workBreakEnd: null,
                months: [
                    {val: 1, name: "Leden"},
                    {val: 2, name: "Únor"},
                    {val: 3, name: "Březen"},
                    {val: 4, name: "Duben"},
                    {val: 5, name: "Květen"},
                    {val: 6, name: "Červen"},
                    {val: 7, name: "Červenec"},
                    {val: 8, name: "Srpen"},
                    {val: 9, name: "Září"},
                    {val: 10, name: "Říjen"},
                    {val: 11, name: "Listopad"},
                    {val: 12, name: "Prosinec"},
                ],
                configdateTimePicker: {
                    enableTime: true,
                    time_24hr: true,
                    defaultHour: 9,
                    enableSeconds: false,
                    noCalendar: true
                },
                activeExportPrompt: false,
                exportData: [],

            }
        },
        computed: {
            worksData() {
                return this.$store.getters['works/getAll']
            },
        },
        methods: {
          setAbsence(absence) {
            this.absence = absence
          },

          formSubmit() {
              console.log(this.activeExportPrompt)
            this.activeExportPrompt = true
          },

          validateStep1() {
            return new Promise((resolve, reject) => {
              this.$validator.validateAll('step-1').then(result => {
                if (result) {
                  resolve(true)
                } else {
                  reject("correct all values");
                }
              })
            })
          },
          validateStep2() {
            return new Promise((resolve, reject) => {
              this.$validator.validateAll("step-2").then(result => {
                if (result) {
                  resolve(true)
                } else {
                  reject("correct all values");
                }
              })
            })
          },
          validateStep3() {
            return new Promise((resolve, reject) => {

              const payload = {
                job_name: "Test",
                employee: this.work.employee.id,
                work: this.work.id,
                work_start: this.workStart,
                break_start: this.workBreakStart,
                year: +this.year,
                month: this.month.val,
                vacation: this.absence.vacation,
                sickness: [],
                unpaid_vacation: [],
                nursing: [],
                billable_free_time: []
              }

              this.$vs.loading()

              this.$store.dispatch('exports/createEmployee', payload).then(response => {

                this.$vs.loading.close()
                this.exportData = response.data
                resolve(true)
              }).catch(error => {
                this.$vs.loading.close()
                reject("correct values")
                this.$vs.notify({
                  title: 'Error',
                  text: error.message,
                  iconPack: 'feather',
                  icon: 'icon-alert-circle',
                  color: 'danger'
                })
              })
            })
          }
        },
        components: {
            FormWizard,
            flatPickr,
            'v-select': vSelect,
            TabContent,
            AbsenceStep,
            ExportStep,
        },
        created() {
            if (!moduleWorks.isRegistered) {
                this.$store.registerModule('works', moduleWorks)
                moduleWorks.isRegistered = true
            }

            if (!moduleExports.isRegistered) {
                this.$store.registerModule('exports', moduleExports)
                moduleExports.isRegistered = true
            }
            this.$store.dispatch("works/fetchAll").catch(err => {
                console.error(err)
            })
        }
    }
</script>
