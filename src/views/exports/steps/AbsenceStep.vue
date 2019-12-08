<template>

  <div class="vx-row">

    <vs-popup classContent="popup-example" title="Cely den nebo pul dne" :active.sync="popupActive" :button-close-hidden="true">
      <vs-button @click="absenceSelected(popupAction, 0.5)" color="primary" type="filled">Půl dne</vs-button>
      <vs-button @click="absenceSelected(popupAction, 1)" color="primary" type="filled">Celý den</vs-button>

    </vs-popup>

    <div class="vx-col md:w-1/2 w-full mt-4">
      <div class="mt-4">
        <label class="vs-input--label">Dovolená</label>
        <datepicker @selected="vacationSelected()" :inline="true" :language="cs" :minimumView="'day'"
                    :maximumView="'day'" v-model="absence.vacation.selected" :disabled-dates="disabledDates"
                    :highlighted="absence.vacation.highlighted" :monday-first="true"/>
      </div>
    </div>

    <div class="vx-col md:w-1/2 w-full mt-4">
      <div class="mt-4">
        <label class="vs-input--label">Nemocenská</label>
        <datepicker @selected="sicknessSelected()" :inline="true" :language="cs" :minimumView="'day'"
                    :maximumView="'day'" v-model="absence.sickness.selected" :disabled-dates="disabledDates"
                    :highlighted="absence.sickness.highlighted" :monday-first="true"/>
      </div>
    </div>

    <div class="vx-col md:w-1/3 w-full mt-4">
      <div class="mt-4">
        <label class="vs-input--label">Neplacené volno</label>
        <datepicker @selected="unpaidVacationSelected()" :inline="true" :language="cs" :minimumView="'day'"
                    :maximumView="'day'" v-model="absence.unpaidVacation.selected"
                    :disabled-dates="disabledDates"
                    :highlighted="absence.unpaidVacation.highlighted" :monday-first="true"/>
      </div>
    </div>

    <div class="vx-col md:w-1/3 w-full mt-4">
      <div class="mt-4">
        <label class="vs-input--label">Ošetřování člena rodiny</label>
        <datepicker @selected="nursingSelected()" :inline="true" :language="cs" :minimumView="'day'"
                    :maximumView="'day'" v-model="absence.nursing.selected" :disabled-dates="disabledDates"
                    :highlighted="absence.nursing.highlighted" :monday-first="true"/>
      </div>
    </div>

    <div class="vx-col md:w-1/3 w-full mt-4">
      <div class="mt-4">
        <label class="vs-input--label">Volno s náhradou mzdy</label>
        <datepicker @selected="billableFreeTimeSelected()" :inline="true" :language="cs" :minimumView="'day'"
                    :maximumView="'day'" v-model="absence.billableFreeTime.selected"
                    :disabled-dates="disabledDates"
                    :highlighted="absence.billableFreeTime.highlighted" :monday-first="true"/>
      </div>
    </div>

  </div>

</template>

<script>
  import Datepicker from 'vuejs-datepicker';
  import {cs} from "vuejs-datepicker/dist/locale";

  const datesAreOnSameDay = (first, second) =>
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  export default {
    data() {
      return {
        popupActive: false,
        popupAction: null,
        cs: cs,
        disabledDates: {},
        absence: {
          vacation: {
            selected: null,
            filled: [],
            highlighted: {
              dates: []
            }
          },
          sickness: {
            selected: null,
            filled: [],
            highlighted: {
              dates: []
            }
          },
          unpaidVacation: {
            selected: null,
            filled: [],
            highlighted: {
              dates: []
            }
          },
          nursing: {
            selected: null,
            filled: [],
            highlighted: {
              dates: []
            }
          },
          billableFreeTime: {
            selected: null,
            filled: [],
            highlighted: {
              dates: []
            }
          },
        },
      }
    },
    methods: {

      absenceSelected(absence, value) {

        absence.highlighted.dates.unshift(absence.selected)
        let abs = {
          day: absence.selected.getDate(),
          value: value
        }
        absence.filled.unshift(abs)
        absence.selected = null

        this.popupAction = null
        this.popupActive = false
      },

      handleAbsence(absence, popup) {
        let index = absence.highlighted.dates.findIndex(
          (d) => datesAreOnSameDay(d, absence.selected))

        if (index > -1) {
          absence.highlighted.dates.splice(index, 1)
          let filledIndex = absence.filled.findIndex((d) => absence.selected.getDate() === d.day)
          absence.filled.splice(filledIndex, 1)
          absence.selected = null;

        } else {
          if (popup) {
            this.popupActive = true
            this.popupAction = absence
          } else {
            this.absenceSelected(absence, 1)
          }
        }

        this.$emit('syncAbsence', this.absence)
      },

      vacationSelected() {
        this.$nextTick(function () {
          this.handleAbsence(this.absence.vacation, true)
        })
      },
      sicknessSelected() {
        this.$nextTick(function () {
          this.handleAbsence(this.absence.sickness, false)
        })
      },
      unpaidVacationSelected() {
        this.$nextTick(function () {
          this.handleAbsence(this.absence.unpaidVacation, true)
        })
      },
      nursingSelected() {
        this.$nextTick(function () {
          this.handleAbsence(this.absence.nursing, false)
        })
      },
      billableFreeTimeSelected() {
        this.$nextTick(function () {
          this.handleAbsence(this.absence.billableFreeTime, false)
        })
      },
    },
    components: {
      Datepicker
    }
  }
</script>

<style scoped>

</style>
