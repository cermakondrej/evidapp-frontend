<template>


  <vx-card title="New Company">
    <div class="vx-row mb-12">
      <div class="vx-col w-full">
        <vs-input class="w-full" icon-pack="feather" icon="icon-user" icon-no-border label-placeholder="First Name"
                  v-model="name"/>
      </div>
    </div>

    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-button class="mr-3 mb-2" @click="submitForm">Submit</vs-button>
        <vs-button color="warning" type="border" class="mb-2" @click="name = '';">Reset</vs-button>
      </div>
    </div>
  </vx-card>
</template>

<script>
  export default {
    data() {
      return {
        id: 0,
        name: '',
      }
    },
    methods: {
      submitForm() {

        this.$vs.loading()
        const payload = {
          name: this.name
        }
        this.$store.dispatch('company/create', payload)
          .then(() => { this.$vs.loading.close() })
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
        if (!this.checkLogin()) return
        this.$router.push('/pages/register').catch(() => {})
      }
    }
  }
</script>
