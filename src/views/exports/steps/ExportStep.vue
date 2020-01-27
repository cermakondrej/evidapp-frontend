<template>
    <div>
        <vs-prompt title="Exportovat do Excelu" class="export-options"
                   @cancel="clearFields" @accept="exportToExcel" accept-text="Exportovat"
                   @close="clearFields" :active.sync="activeExportPrompt">
            <vs-input v-model="fileName" placeholder="Název souboru.." class="w-full"/>
        </vs-prompt>

        <div class="export-table">
            <vs-table :data="exportData">


                <template slot-scope="{data}">
                    <vs-tr>
                        <vs-td>Příjmení a jméno</vs-td>
                        <vs-td>{{ data.full_name }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Pozice</vs-td>
                        <vs-td>{{ data.job_name }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Úvazek</vs-td>
                        <vs-td>{{ data.workload }}</vs-td>
                        <vs-td>{{ data.company_name }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Počet hodin v měsíci</vs-td>
                        <vs-td>{{ data.work_hours | decimal }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Měsíc</vs-td>
                        <vs-td>{{ data.month }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Rok</vs-td>
                        <vs-td>{{ data.full_name }}</vs-td>
                    </vs-tr>


                    <vs-tr>
                        <vs-td>Den</vs-td>
                        <vs-td>Činnost od</vs-td>
                        <vs-td>Činnost do</vs-td>
                        <vs-td>Přestávka od</vs-td>
                        <vs-td>Přestávka do</vs-td>
                        <vs-td>Celkem</vs-td>
                        <vs-td>Poznámka</vs-td>
                    </vs-tr>
                    <vs-tr :key="indextr" v-for="(tr, indextr) in data.export_rows">
                        <vs-td>{{ data.export_rows[indextr].day }}</vs-td>
                        <vs-td>{{ data.export_rows[indextr].work_start }}</vs-td>
                        <vs-td>{{ data.export_rows[indextr].work_end }}</vs-td>
                        <vs-td>{{ data.export_rows[indextr].break_start }}</vs-td>
                        <vs-td>{{ data.export_rows[indextr].break_end }}</vs-td>
                        <vs-td>{{ data.export_rows[indextr].hours_worked | decimalToTime }}</vs-td>
                        <vs-td>{{ data.export_rows[indextr].note }}</vs-td>
                    </vs-tr>


                    <vs-tr>
                        <vs-td>Počet odpracovaných hodin</vs-td>
                        <vs-td>{{ data.total_worked | decimal }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Počet hodin nemoci</vs-td>
                        <vs-td>{{ data.total_sickness | decimal }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Počet hodin dovolené</vs-td>
                        <vs-td>{{ data.total_vacation | decimal }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Počet hodin NV</vs-td>
                        <vs-td>{{ data.total_unpaid_vacation | decimal }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Počet hodin OČR</vs-td>
                        <vs-td>{{ data.total_nursing | decimal }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Volno s náhradou mzdy</vs-td>
                        <vs-td>{{ data.total_billable_free_time | decimal }}</vs-td>
                    </vs-tr>

                    <vs-tr>
                        <vs-td>Celkem</vs-td>
                        <vs-td>{{
                            (data.total_worked + data.total_vacation +
                            data.total_sickness + data.total_nursing +
                            data.total_unpaid_vacation + data.total_billable_free_time)| decimal }}
                        </vs-td>
                    </vs-tr>
                </template>

            </vs-table>
        </div>

    </div>
</template>

<script>
    import moment from 'moment'
    import XLSX from '@sheet/edit'

    import moduleExports from '@/store/exports/moduleExports.js'

    export default {

        data() {
            return {
                fileName: "",
                cellAutoWidth: true,
                selectedFormat: "xlsx",
                months : {
                    1: "Leden",
                    2: "Únor",
                    3: "Březen",
                    4: "Duben",
                    5: "Květen",
                    6: "Červen",
                    7: "Červenec",
                    8: "Srpen",
                    9: "Září",
                    10: "Říjen",
                    11: "Listopad",
                    12: "Prosinec"
                }
        }
        },
        props: ['exportData', 'activeExportPrompt'],
        filters: {
            decimal: function (value) {
                if (!value) return '0.00'
                return parseFloat(value).toFixed(2)
            },
            decimalToTime: function(value) {
                if(!value) return ''
                return moment(+value*3600*1000).format('HH:mm')
            }
        },
        methods: {



            exportToExcel() {
                this.$store.dispatch("exports/fetchTemplate").then(response => {
                    let wb = XLSX.read(new Uint8Array(response.data), {
                        type:"array",
                        template: true
                    });
                    const wsname = wb.SheetNames[0]
                    const constant = 11;

                    XLSX.utils.template_set_aoa(wb, wsname, "E2",[
                        [this.exportData.full_name]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "E3", [
                        [this.exportData.job_name]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "E4", [
                        [this.exportData.workload]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "E5", [
                        [this.exportData.work_hours]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "E6", [
                        [this.months[this.exportData.month]]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "E7", [
                        [""+this.exportData.year]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "H4", [
                        [this.exportData.company_name]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "G43", [
                        [this.exportData.total_sickness]
                    ]);
                    XLSX.utils.template_set_aoa(wb, wsname, "G44", [
                        [this.exportData.total_vacation]
                    ]);
                    XLSX.utils.template_set_aoa(wb, wsname, "G45", [
                        [this.exportData.total_unpaid_vacation]
                    ]);
                    XLSX.utils.template_set_aoa(wb, wsname, "G46", [
                        [this.exportData.total_nursing]
                    ]);

                    XLSX.utils.template_set_aoa(wb, wsname, "G47", [
                        [this.exportData.total_billable_free_time]
                    ]);


                    this.exportData.export_rows.forEach((element, index) =>{
                        let row = index+constant

                        XLSX.utils.template_set_aoa(
                            wb,
                            wsname,
                            "B" + row+ ":H" +row,
                            [
                                [
                                    element.day,
                                    (typeof element.work_start === 'undefined') ? "" : element.work_start,
                                    (typeof element.work_end === 'undefined') ? "" : element.work_end,
                                    (typeof element.break_start === 'undefined') ? "" : element.break_start,
                                    (typeof element.break_end === 'undefined') ? "" : element.break_end,
                                    (typeof element.hours_worked === 'undefined') ? "": moment(+element.hours_worked*3600*1000).format('HH:mm'),
                                    (typeof element.note === 'undefined') ? "" : element.note
                                ]
                            ]);

                    });

                    console.log(wb.Sheets[wsname])

                    XLSX.writeFile(wb, 'out.xlsx', {template: true});
                }).catch(err => {
                    console.error(err)
                })
                // import('@/vendor/Export2Excel').then(excel => {
                //     const list = this.export
                //     // excel.export_json_to_excel({
                //     //     header: this.headerTitle,
                //     //     data,
                //     //     filename: this.fileName,
                //     //     autoWidth: this.cellAutoWidth,
                //     //     bookType: this.selectedFormat
                //     // })
                //     this.clearFields()
                // })

            },
            clearFields() {
                this.filename = ""
            }
        },


        created() {
            if (!moduleExports.isRegistered) {
                this.$store.registerModule('exports', moduleExports)
                moduleExports.isRegistered = true
            }
        }
    }
</script>
