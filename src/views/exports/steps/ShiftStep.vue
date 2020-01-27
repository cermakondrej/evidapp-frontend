<template>
    <div>
        <calendar-view
                ref="calendar"
                :displayPeriodUom="period"
                :show-date="showDate"
                :events="events"
                :eventTop="windowWidth <= 400 ? '2rem' : '3rem'"
                eventBorderHeight="0px"
                eventContentHeight="1.65rem"
                class="theme-default shift-calendar"
                @click-date="openAddNewEvent"
                @click-event="openEditEvent">

            <div slot="header" class="mb-4">

                <div class="vx-row no-gutter">

                    <div class="vx-col w-1/3 items-center sm:flex hidden">
                        <p>Uvazek</p>
                        <p>Odpracovano</p>
                        <p>K odpracovani</p>
                    </div>

                    <!-- Current Month -->
                    <div class="vx-col sm:w-1/3 w-full sm:my-0 my-3 flex sm:justify-end justify-center order-last">
                        <div class="flex items-center">
                            <span class="mx-3 text-xl font-medium whitespace-no-wrap">{{ monthName }}</span>
                        </div>
                    </div>

                    <div class="vx-col sm:w-1/3 w-full flex justify-center">
                        <h1>Odpracovane smeny</h1>
                    </div>
                </div>

                <div class="vx-row sm:flex hidden mt-4">
                    <div class="vx-col w-full flex">
                        <!-- Labels -->
                        <div class="flex flex-wrap sm:justify-start justify-center">
                            <div v-for="(label, index) in labels" :key="index" class="flex items-center mr-4 mb-2">
                                <div class="h-3 w-3 inline-block rounded-full mr-2"
                                     :class="'bg-calendar-' + label.color"></div>
                                <span>{{ label.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </calendar-view>


        <!-- ADD EVENT -->
        <vs-prompt
                class="calendar-event-dialog"
                title="Přidat událost"
                accept-text="Přidat"
                @accept="addEvent"
                :is-valid="validForm"
                :active.sync="activePromptAddEvent">

            <div class="my-4">
                <small class="date-label">Druh události</small>

                <v-select class="w-full cursor-pointer" icon-pack="feather" v-validate="'required'" :clearable="false"
                          icon="icon-" icon-no-border :dir="$vs.rtl ? 'rtl' : 'ltr'" :searchable="false"
                          name="label" label="text" :options="labels" v-on:input="assignLabel" v-model="eventType">

                    <template v-slot:selected-option="option">
                        <div class="h-3 w-3 inline-block rounded-full mr-2"
                             :class="'bg-calendar-' + option.color"></div>
                        <span>{{ option.text }}</span>
                    </template>

                    <template v-slot:option="option">
                        <div class="h-3 w-3 inline-block rounded-full mr-2"
                             :class="'bg-calendar-' + option.color"></div>
                        <span>{{ option.text }}</span>

                    </template>

                </v-select>

            </div>
            <div class="my-4">

                <small class="date-label">Začátek</small>

                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <datepicker :language="langCs" name="start-date" v-model="startDate"></datepicker>
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <flat-pickr :config="configTimePicker" v-model="startTime" placeholder="Čas"/>
                    </div>
                </div>

            </div>
            <div class="my-4">
                <small class="date-label">Konec</small>
                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <datepicker :language="langCs" :disabledDates="disabledDatesTo" name="end-date"
                                    v-model="endDate"></datepicker>
                    </div>
                </div>

                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <flat-pickr :config="configTimePicker" v-model="endTime" placeholder="Čas"/>
                    </div>
                </div>

            </div>

        </vs-prompt>

        <!-- EDIT EVENT -->
        <vs-prompt
                class="calendar-event-dialog"
                title="Upravit událost"
                accept-text="Upravit"
                cancel-text="Odstranit"
                button-cancel="border"
                @cancel="removeEvent"
                @accept="editEvent"
                :is-valid="validForm"
                :active.sync="activePromptEditEvent">


            <div class="my-4">
                <small class="date-label">Druh události</small>

                <v-select class="w-full cursor-pointer" icon-pack="feather" v-validate="'required'" :clearable="false"
                          icon="icon-" icon-no-border :dir="$vs.rtl ? 'rtl' : 'ltr'" :searchable="false"
                          name="label" label="text" :options="labels" v-on:input="assignLabel" v-model="eventType">

                    <template v-slot:selected-option="option">
                        <div class="h-3 w-3 inline-block rounded-full mr-2"
                             :class="'bg-calendar-' + option.color"></div>
                        <span>{{ option.text }}</span>
                    </template>

                    <template v-slot:option="option">
                        <div class="h-3 w-3 inline-block rounded-full mr-2"
                             :class="'bg-calendar-' + option.color"></div>
                        <span>{{ option.text }}</span>

                    </template>

                </v-select>
            </div>


            <div class="my-4">

                <small class="date-label">Začátek</small>

                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <datepicker :language="langCs" name="start-date" v-model="startDate"></datepicker>
                    </div>
                </div>
                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <flat-pickr :config="configTimePicker" v-model="startTime" placeholder="Čas"/>
                    </div>
                </div>

            </div>
            <div class="my-4">
                <small class="date-label">Konec</small>
                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <datepicker :language="langCs" :disabledDates="disabledDatesTo" name="end-date"
                                    v-model="endDate"></datepicker>
                    </div>
                </div>

                <div class="vx-col md:w-1/2 w-full mt-4">
                    <div class="mt-4">
                        <flat-pickr :config="configTimePicker" v-model="endTime" placeholder="Čas"/>
                    </div>
                </div>

            </div>

        </vs-prompt>
    </div>

</template>

<script>

    require("vue-simple-calendar/static/css/default.css")

    import {CalendarView} from "vue-simple-calendar"
    import Datepicker from 'vuejs-datepicker'
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import {en, cs} from "vuejs-datepicker/src/locale"
    import vSelect from 'vue-select'

    export default {
        components: {
            CalendarView,
            'v-select': vSelect,
            flatPickr,
            Datepicker
        },
        props: ['showDate', 'monthName'],
        data() {
            return {
                configTimePicker: {
                    enableTime: true,
                    enableSeconds: false,
                    noCalendar: true,
                    time_24hr: true,
                },
                disabledFrom: false,
                id: 0,
                title: '',
                startDate: '',
                startTime: '',
                eventType: '',
                endDate: '',
                endTime: '',
                labelLocal: '',
                labels: [
                    {text: 'Směna', value: 'shift', color: 'shift'},
                    {text: 'Dovolená', value: 'vacation', color: 'vacation'},
                    {text: 'Nemocenská', value: 'sickness', color: 'sickness'},
                    {text: 'Neplacené volno', value: 'unpaid_vacation', color: 'unpaid-vacation'},
                    {text: 'Ošetřování člena rodiny', value: 'nursing', color: 'nursing'},
                    {text: 'Volno s náhradou mzdy', value: 'billable_free_time', color: 'billable-free-time'},
                ],
                langCs: cs,
                langEn: en,
                events: [],
                period: "month",

                activePromptAddEvent: false,
                activePromptEditEvent: false,
            }
        },
        computed: {
            validForm() {
                return this.eventType !== '' && this.startDate !== '' && this.endDate !== '' && this.startTime !== '' &&
                    this.endTime !== '' && (Date.parse(this.endDate) - Date.parse(this.startDate)) >= 0;
            },
            disabledDatesTo() {
                return {to: new Date(this.startDate)}
            },
            windowWidth() {
                return this.$store.state.windowWidth
            },
            labelColor() {
                return (label) => {
                    return label.replace(/_/g, "-")
                }
            }
        },
        methods: {
            assignLabel(label) {
                console.log(label)
                this.labelLocal = label.value
                this.title = label.text
            },
            addEvent() {
                const obj = {
                    id: this.id,
                    title: this.title,
                    startDate: this.startDate,
                    startTime: this.startTime,
                    endDate: this.endDate,
                    endTime: this.endTime,
                    label: this.labelLocal,
                    classes: "bg-calendar-" + this.labelColor(this.labelLocal)
                }

                this.events.push(obj)
                this.syncEvents()
            },
            clearFields() {
                this.title = this.endDate = "";
                this.id = this.events.length;
                this.labelLocal = '';
                this.startTime = '';
                this.endTime = '';
            },
            /* eslint-disable */
            promptAddNewEvent(date) {
                this.disabledFrom = false;
                this.addNewEventDialog(date);
            },
            addNewEventDialog(date) {
                this.clearFields();
                this.startDate = date;
                this.endDate = date;
                this.activePromptAddEvent = true;
            },
            openAddNewEvent(date) {
                this.disabledFrom = true;
                this.addNewEventDialog(date);
            },
            openEditEvent(event) {
                // TODO Move events to store
                const e = this.events[event.id]
                this.id = e.id
                this.title = e.title
                this.startDate = e.startDate
                this.startTime = e.startTime
                this.endDate = e.endDate
                this.endTime = e.endTime
                this.labelLocal = e.label
                this.activePromptEditEvent = true;
            },
            editEvent() {
                const obj = {
                    id: this.id,
                    title: this.title,
                    startDate: this.startDate,
                    startTime: this.startTime,
                    endDate: this.endDate,
                    endTime: this.endTime,
                    label: this.labelLocal,
                    classes: "event-" + this.labelColor(this.labelLocal)
                }

                this.events.splice(this.id, 1, obj)
                this.syncEvents()
            },
            removeEvent() {
                this.events.splice(this.id, 1)
                this.syncEvents()
            },
            syncEvents() {
                this.$emit('syncEvents', this.events)
            },
            eventDragged(event, date) {
                console.log(event)
                console.log(date)
            }
            /* eslint-enable */
        },
    }
</script>

<style lang="scss">
    @import "@/assets/scss/vuexy/apps/simple-calendar.scss";

    .shift-calendar {
        min-height: 600px;
    }

    .bg-calendar-shift {
        background-color: #27AE60 !important;
    }

    .bg-calendar-vacation {
        background-color: #EC7063 !important;
    }

    .bg-calendar-sickness {
        background-color: #AF7AC5 !important;
    }

    .bg-calendar-unpaid-vacation {
        background-color: #F1C40F !important;
    }

    .bg-calendar-nursing {
        background-color: #2874A6 !important;
    }

    .bg-calendar-billable-free-time {
        background-color: #AAB7B8 !important;
    }

</style>
