<template>

  <div id="page-work-list">

    <div class="vx-card p-6">

      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <vs-dropdown vs-trigger-click class="cursor-pointer">
            <div
              class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * paginationPageSize - (paginationPageSize - 1) }} - {{ worksData.length - currentPage * paginationPageSize > 0 ? currentPage * paginationPageSize : worksData.length }} z {{ worksData.length }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4"/>
            </div>
            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
            <vs-dropdown-menu>

              <vs-dropdown-item @click="gridApi.paginationSetPageSize(10)">
                <span>10</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(20)">
                <span>20</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(25)">
                <span>25</span>
              </vs-dropdown-item>
              <vs-dropdown-item @click="gridApi.paginationSetPageSize(30)">
                <span>30</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <!-- TABLE ACTION COL-2: SEARCH & EXPORT AS CSV -->
        <vs-input class="sm:mr-4 mr-0 sm:w-auto w-full sm:order-normal order-3 sm:mt-0 mt-4" v-model="searchQuery"
                  @input="updateSearchQuery" placeholder="Hledat..."/>


      </div>


      <!-- AgGrid Table -->
      <ag-grid-vue
        ref="agGridTable"
        :components="components"
        :gridOptions="gridOptions"
        class="ag-theme-material w-100 my-4 ag-grid-table"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :rowData="worksData"
        rowSelection="multiple"
        colResizeDefault="shift"
        :animateRows="true"
        :floatingFilter="true"
        :pagination="true"
        :paginationPageSize="paginationPageSize"
        :suppressPaginationPanel="true"
        :enableRtl="$vs.rtl">
      </ag-grid-vue>

      <vs-pagination
        :total="totalPages"
        :max="7"
        v-model="currentPage"/>

    </div>
  </div>

</template>

<script>
  import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

  // Store Module
  import moduleWorks from '@/store/works/moduleWorks.js'

  // Cell Renderer


  export default {
    data() {
      return {
        searchQuery: "",

        // AgGrid
        gridApi: null,
        gridOptions: {},
        defaultColDef: {
          sortable: true,
          resizable: true,
          suppressMenu: true
        },
        columnDefs: [
          {
            headerName: 'ID',
            field: 'id',
            width: 125,
            filter: true,
            checkboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            headerCheckboxSelection: true,
          },
          {
            headerName: 'Zaměstnanec',
            field: 'employee.full_name',
            filter: true,
            width: 320,
            cellRendererFramework: 'CellRendererLink'
          },
          {
            headerName: 'Pozice',
            field: 'job.name',
            filter: true,
            width: 400,
          },
          {
            headerName: 'Úvazek',
            field: 'workload',
            filter: true,
            width: 150,
          },
          {
            headerName: 'Společnost',
            field: 'company.name',
            filter: true,
            width: 250,
          },
          {
            headerName: 'Akce',
            field: 'transactions',
            width: 150,
            cellRendererFramework: 'CellRendererActions'
          },
        ],

      }
    },
    computed: {
      worksData() {
        return this.$store.getters['works/getAll']

      },
      paginationPageSize() {
        if (this.gridApi) return this.gridApi.paginationGetPageSize()
        else return 10
      },
      totalPages() {
        if (this.gridApi) return this.gridApi.paginationGetTotalPages()
        else return 0
      },
      currentPage: {
        get() {
          if (this.gridApi) return this.gridApi.paginationGetCurrentPage() + 1
          else return 1
        },
        set(val) {
          this.gridApi.paginationGoToPage(val - 1)
        }
      }
    },
    methods: {
      updateSearchQuery(val) {
        this.gridApi.setQuickFilter(val)
      }
    },
    mounted() {
      this.gridApi = this.gridOptions.api

      /* =================================================================
        NOTE:
        Header is not aligned properly in RTL version of agGrid table.
        However, we given fix to this issue. If you want more robust solution please contact them at gitHub
      ================================================================= */
      if (this.$vs.rtl) {
        const header = this.$refs.agGridTable.$el.querySelector(".ag-header-container")
        header.style.left = "-" + String(Number(header.style.transform.slice(11, -3)) + 9) + "px"
      }
    },
    created() {
      if (!moduleWorks.isRegistered) {
        this.$store.registerModule('works', moduleWorks)
        moduleWorks.isRegistered = true
      }
      this.$store.dispatch("works/fetchAll").catch(err => {
        console.error(err)
      })
    }
  }

</script>

<style lang="scss">
  #page-work-list {
    .work-list-filters {
      .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
      }
    }
  }
</style>
