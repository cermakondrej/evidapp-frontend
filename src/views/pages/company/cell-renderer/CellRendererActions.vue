<template>
    <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer" @click="confirmDeleteRecord" />
    </div>
</template>

<script>
    export default {
        name: 'CellRendererActions',
        methods: {
          editRecord() {

              this.$router.push("/companies/edit/" + this.params.data.id).catch(() => {})

          },
          confirmDeleteRecord() {
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Potvrdit smazání`,
              text: `Chystáte se smazat "${this.params.data.name}"`,
              accept: this.deleteRecord,
              acceptText: "Smazat"
            })
          },
          deleteRecord() {

            this.$store.dispatch("companies/remove", this.params.data.id)
              .then(()   => { this.showDeleteSuccess() })
              .catch(err => { console.error(err)       })
          },
          showDeleteSuccess() {
            this.$vs.notify({
              color: 'success',
              title: 'Společnost smazána',
              text: `Společnost "${this.params.data.name}" byla smazána.`
            })
          }
        }
    }
</script>
