
<template>
 <!-- tblsection -->

    <div class="d-flex bd-highlight mb-3">
    <div class="p-2 bd-highlight">
        <button @click="power_off()" class="btn btn-outline-secondary"  ><i class="bi bi-power" title="power off" style="color: black; cursor: pointer; -webkit-text-stroke: 1px;"></i></button>
    </div>
    <div class="p-2 bd-highlight">
        <button @click="reboot()" class="btn btn-outline-secondary"  ><i class="bi bi-bootstrap-reboot" title="reboot" style="color: black; cursor: pointer; -webkit-text-stroke: 1px;"></i></button>
    </div>
    <div class="ms-auto p-2 bd-highlight">
        <span class="text-muted text-reset">
            Last update from miner: {{ store.miner_data[tblIndex].timestamp }}
        </span>
    </div>
    </div>

    <br>
    <span class="heading">Summary</span>
    <table id="tables">  
    <thead>
        <tr >
        <th >Uptime     </th>
        <th >Elapsed    </th>
        <th >GHS avg    </th>
        <th >Temp       </th>
        <th >Env Temp   </th>
        <th >Accepted   </th>
        <th >Rejected   </th>
        <th >FanSpeedIn </th>
        <th >FanSpeedOut</th>
        <th >Voltage    </th>
        <th >Power      </th>
        <th >Power Mode </th>
        </tr>
    </thead>
    <tbody>      
        <tr v-if="store.miner_data[tblIndex].summary !==null">
        <td data-label="Uptime">
            {{ secondsToString(accessSUMMARYelements("Uptime")) }}
        </td>
        <td data-label="Elapsed">
            <!--  Summary: {{ store.miner_data[tblIndex].summary }} -->
            {{ secondsToString(accessSUMMARYelements("Elapsed")) }}
            <!-- 3d 15h 2m 49s -->

        </td>

        <td data-label="GHS avg">
            {{ accessSUMMARYelements("MHS av")/1000 }} 
            <!--  104709.22 -->

        </td>

        <td data-label="Temp">
                {{ accessSUMMARYelements("Temperature") }} °C
        </td>

        <td data-label="Env Temp">
                {{ accessSUMMARYelements("Env Temp") }} °C
        </td>

        <td data-label="Accepted">
            {{ accessSUMMARYelements("Accepted") }}
        </td>

        <td data-label="Rejected">
            {{ accessSUMMARYelements("Rejected") }}
        </td>

        <td data-label="FanSpeedIn">
            {{ accessSUMMARYelements("Fan Speed In") }}
        </td>

        <td data-label="FanSpeedOut">
            {{ accessSUMMARYelements("Fan Speed Out") }}
        </td>

        <td data-label="Voltage">
            <p class="fst-italic">NaN</p>
        </td>

        <td data-label="Power">
            {{ accessSUMMARYelements("Power") }}
        </td>

        <td data-label="Power Mode">
            {{ accessSUMMARYelements("Power Mode") }}
        </td>
        </tr>
        <tr v-else>
            <i class="bi bi-exclamation-triangle" fill="currentColor" >Oh no, there is no summary data</i>
        </tr>                 
    </tbody>
    </table>  

    <br>
    <span class="heading">Devices</span>
    <table id="tables">
        <thead>
            <tr>
            <th >Device</th>
            <th >Status</th>
            <th >Effective Chip</th>
            <th >Frequency</th>
            <th>Temperature</th>
            <th >GHSav</th>
            <th >GHS5s</th>
            <th >GHS1m</th>
            <th >GHS5m</th>
            <th >GHS15m</th>
            </tr>
        </thead>
        <tbody>
            <tr v-if="store.miner_data[tblIndex].edevs !==null" v-for="item in store.miner_data[tblIndex].edevs.DEVS">
                <td data-label="Device">
                    ASC {{ item.ASC }} - Slot {{ item.Slot }}
                </td>
                <td data-label="Status">
                    {{ item.Status }}
                </td>
                <td data-label="Effective Chip">
                    {{ item["Effective Chips"] }}
                </td>
                <td data-label="Frequency">
                    {{ item["Chip Frequency"] }}
                </td>
                <td data-label="Temperature">
                    {{ item["Temperature"] }}
                </td>
                <td data-label="GHSav">
                    {{ item["MHS av"]/1000 }}
                </td>

                <td data-label="GHS5s">
                    {{ item["MHS 5s"]/1000 }}
                </td>

                <td data-label="GHS1m">
                    {{ item["MHS 1m"]/1000 }}
                </td>

                <td data-label="GHS5m">
                    {{ item["MHS 5m"]/1000 }}
                </td>

                <td data-label="GHS15m">
                    {{ item["MHS 15m"]/1000 }}
                </td>
            </tr>
            <tr v-else>
                <i class="bi bi-exclamation-triangle" fill="currentColor" >Oh no, there is no device data</i>
            </tr>
        </tbody>
    </table>

  
    <br> 
    <span class="heading">Pools</span>
    <table id="tables">
    <thead>
        <tr >
        <th >Pool</th>
        <th >URL</th>
        <th >Active</th>
        <th >User</th>
        <th >Status</th>
        <th >Work Difficulty</th>
        <th >GetWorks</th>
        <th >Accepted</th>
        <th >Rejected</th>
        <th >Stale</th>
        <th >LST</th>
        <th >LSD</th>
        </tr>
    </thead>
    <tbody>
        <tr v-if="store.miner_data[tblIndex].pools !==null" v-for="item in store.miner_data[tblIndex].pools.POOLS">
            <td data-label="Pool">
                {{ item["POOL"] }}
            </td>

            <td data-label="URL">
                {{ item["URL"] }}
            </td>

            <td data-label="Active">
                {{ item["Stratum Active"] }}
            </td>

            <td data-label="User">
                {{ item["User"] }}
            </td>

            <td data-label="Status">
                {{ item["Status"] }}
            </td>

            <td data-label="Work Difficulty">
                {{ item["Work Difficulty"] }}
            </td>

            <td data-label="GetWorks">
                {{ item["Getworks"] }}
            </td>

            <td data-label="Accepted">
                {{ item["Accepted"] }}
            </td>

            <td data-label="Rejected">
                {{ item["Rejected"] }}
            </td>

            <td data-label="Stale">
                {{ item["Stale"] }}
            </td>

            <td data-label="LST">
                {{ item["Last Share Time"] }}
            </td>

            <td data-label="LSD">
                {{ item["Last Share Difficulty"] }}
            </td>
        </tr>
        <tr v-else>
            <i class="bi bi-exclamation-triangle" fill="currentColor" >Oh no, there is no pool data</i>
        </tr>
    </tbody>
    </table>

    <br>
    <span class="heading">Errors</span>
    <table id="tables">
    <thead>
        <tr >
        <th >ErrorCode</th>
        <th >Cause</th>
        <th >Time</th>
        <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr >
        <td data-label="ErrorCode">
            N/A
        </td>
        <td data-label="Cause">
            N/A
        </td>
        <td data-label="Time">
            N/A
        </td>
        <td data-label="Description">

        </td>
        </tr>
    </tbody>
    </table>


    <br>
    <span class="heading">Events</span>
    <table id="tables">
    <tbody>
        <thead>
        <tr >
        <th >EventCode</th>
        <th >EventCause</th>
        <th >EventAction</th>
        <th >EventCount</th>
        <th >LastTime</th>
        <th >EventSource</th>
        </tr>
        </thead>

        <tr>
        <td data-label="EventCode">
            NA
        </td>

        <td data-label="EventCause">
            NA
        </td>

        <td data-label="EventAction">
            NA
        </td>

        <td data-label="EventCount">
            NA
        </td>

        <td data-label="LastTime">
            NA
        </td>

        <td data-label="EventSource">
            NA
        </td>
        </tr>
    </tbody>
    </table>

</template>

<script setup>
import {store}  from '@/DataStore';
defineProps({
  tblIndex: {
    type: Number,
    required: true
  },
  msg2: {
    type: String,
    required: true
  }
});
</script>

<script>
export default {
    methods: {
        secondsToString: function(seconds)
        {
            let numdays = Math.floor(seconds / 86400);
            let numhours = Math.floor((seconds % 86400) / 3600);
            let numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
            let numseconds = ((seconds % 86400) % 3600) % 60;
            return numdays + "d " + numhours + "h " + numminutes + "m " + numseconds + "s";
        },
        accessSUMMARYelements: function(elementName)
        {
            return store.miner_data[this.tblIndex].summary.SUMMARY[0][elementName];
        },
        reboot: function()
        {
            console.log('TableWhatsminer30S.vue::reboot(): not implemented yet');
            let msg = JSON.parse('{"HostName": null, "command": "reboot", "params": null}');
            msg.HostName = store.miner_data[this.tblIndex].HostName;
            this.$webSocketsSend(msg);
        },
        power_off: function()
        {
            console.log('TableWhatsminer30S.vue::power_off(): not implemented yet');
            let msg = JSON.parse('{"HostName": null, "command": "power_off", "params": null}');
            msg.HostName = store.miner_data[this.tblIndex].HostName;
            this.$webSocketsSend(msg);
        }
        
    }
}
</script>

<style scoped>

 /* @import '@/assets/tables.css'  */
 @import '@/assets/responsive_tables.css'



</style>