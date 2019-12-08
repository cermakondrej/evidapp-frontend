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

              this.$router.push("/users/edit/" + this.params.data.id).catch(() => {})

          },
          confirmDeleteRecord() {
            this.$vs.dialog({
              type: 'confirm',
              color: 'danger',
              title: `Potvrdit smazání`,
              text: `Chystáte se smazat "${this.params.data.full_name}"`,
              accept: this.deleteRecord,
              acceptText: "Smazat"
            })
          },
          deleteRecord() {

            this.$store.dispatch("users/remove", this.params.data.id)
              .then(()   => { this.showDeleteSuccess() })
              .catch(err => {
                console.log(err)
                this.$vs.notify({
                  color: 'danger',
                  title: 'Chyba!',
                  text: 'Uživatele se nepodařilo smazat :('
                })
              })
          },
          showDeleteSuccess() {
            this.$vs.notify({
              color: 'success',
              title: 'Uživatel smazán',
              text: `Uživatel "${this.params.data.full_name}" byl smazán.`
            })
          }
        }
    }
</script>
