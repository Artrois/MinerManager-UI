
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
<!-- <span class="text-muted text-reset">
  Last update from miner: {{ store.miner_data[tblIndex].timestamp }}
</span> -->

<!--     <pre>
        {{ JSON.stringify(store.miner_data[tblIndex], null, 2) }}
    </pre>
    <br/> -->
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
                         {{ accessSUMMARYelements("Temperature") }} 
                    </td>

                    <td data-label="Env Temp">
                         {{ accessSUMMARYelements("Env Temp") }} 
                    </td>

                    <td data-label="Accepted">
                        13,309
                    </td>

                    <td data-label="Rejected">
                        67
                    </td>

                    <td data-label="FanSpeedIn">
                        3,900
                    </td>

                    <td data-label="FanSpeedOut">
                        3,930
                    </td>

                    <td data-label="Voltage">
                        1,210
                    </td>

                    <td data-label="Power">
                        3,568
                    </td>

                    <td data-label="Power Mode">
                        Normal
                    </td>
                    </tr>
                    <tr v-else>
                             <i class="bi bi-exclamation-triangle" fill="currentColor" >Oh no, there is no summary data</i>
                    </tr>                 
                </tbody>
              </table>  


          <!-- /tblsection --><!-- tblsection -->
            <br>
            <span class="heading">Devices</span>
              <table id="tables">
                <thead>
                  <tr>
                    <th >Device</th>
                    <th >Frequency</th>
                    <th >GHSav</th>
                    <th >GHS5s</th>
                    <th >GHS1m</th>
                    <th >GHS5m</th>
                    <th >GHS15m</th>
                  </tr>
                </thead>
                <tbody>
                  <tr >
                    <td data-label="Device">
                        SM0
                    </td>

                    <td data-label="Frequency">
                        662
                    </td>

                    <td data-label="GHSav">
                        35158.71
                    </td>

                    <td data-label="GHS5s">
                        35205.71
                    </td>

                    <td data-label="GHS1m">
                        35203.57
                    </td>

                    <td data-label="GHS5m">
                        35161.35
                    </td>

                    <td data-label="GHS15m">
                        35137.81
                    </td>
                  </tr>
                  <tr >
                    <td data-label="Device">
                        SM1
                    </td>

                    <td data-label="Frequency">
                        651
                    </td>

                    <td data-label="GHSav">
                        34463.18
                    </td>

                    <td data-label="GHS5s">
                        34443.08
                    </td>

                    <td data-label="GHS1m">
                        34433.76
                    </td>

                    <td data-label="GHS5m">
                        34471.17
                    </td>

                    <td data-label="GHS15m">
                        34481.26
                    </td>
                  </tr>
                  <tr >
                    <td data-label="Device">
                        SM2
                    </td>

                    <td data-label="Frequency">
                        664
                    </td>

                    <td data-label="GHSav">
                        35087.25
                    </td>

                    <td data-label="GHS5s">
                        34850.87
                    </td>

                    <td data-label="GHS1m">
                        35189.91
                    </td>

                    <td data-label="GHS5m">
                        35200.93
                    </td>

                    <td data-label="GHS15m">
                        35158.73
                    </td>
                  </tr>
                  <tr >
                    <td data-label="Total">
                        Total
                    </td>

                    <td data-label="Frequency">
                        659
                    </td>

                    <td data-label="GHSav">
                        104709.14
                    </td>

                    <td data-label="GHS5s">
                        104499.67
                    </td>

                    <td data-label="GHS1m">
                        104827.24
                    </td>

                    <td data-label="GHS5m">
                        104833.46
                    </td>

                    <td data-label="GHS15m">
                        104777.80
                    </td>
                  </tr>
                </tbody>
              </table>


          <!-- /tblsection --><!-- tblsection -->
            <br>
            <span class="heading">Device Status</span>
              <table id="tables">
                <thead>
                  <tr >
                    <th >Device</th>
                    <th >Status</th>
                    <th >UpfreqCompleted</th>
                    <th >EffectiveChips</th>
                    <th >Temperature</th>
                  </tr>
                </thead>
                <tbody>

                  <tr >
                    <td data-label="Device">
                        SM0
                    </td>

                    <td data-label="Status">
                        Alive
                    </td>

                    <td data-label="UpfreqCompleted">
                        1
                    </td>

                    <td data-label="EffectiveChips">
                        111
                    </td>
                    <td data-label="Temperature">
                        80.00
                    </td>
                  </tr>
                  <tr >
                    <td data-label="Device">
                        SM1
                    </td>

                    <td data-label="Status">
                        Alive
                    </td>

                    <td data-label="UpfreqCompleted">
                        1
                    </td>

                    <td data-label="EffectiveChips">
                        111
                    </td>

                    <td data-label="Temperature">
                        78.50
                    </td>
                  </tr>
                  <tr>
                    <td data-label="Device">
                        SM2
                    </td>

                    <td data-label="Status">
                        Alive
                    </td>

                    <td data-label="UpfreqCompleted">
                        1
                    </td>

                    <td data-label="EffectiveChips">
                        111
                    </td>

                    <td data-label="Temperature">
                        79.50
                    </td>
                  </tr>
                </tbody>
              </table>


          <!-- /tblsection --><!-- tblsection -->    
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
                    <th >Difficulty</th>
                    <th >GetWorks</th>
                    <th >Accepted</th>
                    <th >Rejected</th>
                    <th >Stale</th>
                    <th >LST</th>
                    <th >LSD</th>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td data-label="Pool">
                        1
                    </td>

                    <td data-label="URL">
                        stratum+tcp://btc.f2pool.com:1314
                    </td>

                    <td data-label="Active">
                        true
                    </td>

                    <td data-label="User">
                        phaantm.001
                    </td>

                    <td data-label="Status">
                        Alive
                    </td>

                    <td data-label="Difficulty">
                        524288
                    </td>

                    <td data-label="GetWorks">
                        13374
                    </td>

                    <td data-label="Accepted">
                        13288
                    </td>

                    <td data-label="Rejected">
                        67
                    </td>

                    <td data-label="Stale">
                        9
                    </td>

                    <td data-label="LST">
                        Sun Apr 10 14:07:15 2022
                    </td>

                    <td data-label="LSD">
                        524288
                    </td>
                  </tr>
                  <tr>
                    <td data-label="Pool">
                        2
                    </td>

                    <td data-label="URL">
                        stratum+tcp://btc.f2pool.com:3333
                    </td>

                    <td data-label="Active">
                        false
                    </td>

                    <td data-label="User">
                        phaantm.002
                    </td>

                    <td data-label="Status">
                        Alive
                    </td>

                    <td data-label="Difficulty">
                        0
                    </td>

                    <td data-label="GetWorks">
                        15
                    </td>

                    <td data-label="Accepted">
                        21
                    </td>

                    <td data-label="Rejected">
                        0
                    </td>

                    <td data-label="Stale">
                        0
                    </td>

                    <td data-label="LST">
                        Sun Apr 10 07:36:11 2022
                    </td>

                    <td data-label="LSD">
                        524288
                    </td>
                  </tr>
                  <tr>
                    <td data-label="Pool">
                        3
                    </td>

                    <td data-label="URL">
                        stratum+tcp://btc.f2pool.com:25
                    </td>

                    <td data-label="Active">
                        false
                    </td>

                    <td data-label="User">
                        phaantm.003
                    </td>

                    <td data-label="Status">
                        Alive
                    </td>

                    <td data-label="Difficulty">
                        0
                    </td>

                    <td data-label="GetWorks">
                        2
                    </td>

                    <td data-label="Accepted">
                        0
                    </td>

                    <td data-label="Rejected">
                        0
                    </td>

                    <td data-label="Stale">
                        0
                    </td>

                    <td data-label="LST">
                        Never
                    </td>

                    <td data-label="LSD">
                        0
                    </td>
                  </tr>
                </tbody>
              </table>


          <!-- /tblsection --><!-- tblsection -->
          <br>
          <span class="heading">Errors</span>
              <table id="tables">
                <thead>
                  <tr >
                    <th >ErrorCode</th>
                    <th >Cause</th>
                    <th >Time</th>
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
                  </tr>
                </tbody>
              </table>

          <!-- /tblsection --><!-- tblsection -->
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
                        E013
                    </td>

                    <td data-label="EventCause">
                        change pool[3] user from 'phaantm.003' to 'phaantm.001'
                    </td>

                    <td data-label="EventAction">
                        Pools Change
                    </td>

                    <td data-label="EventCount">
                        31
                    </td>

                    <td data-label="LastTime">
                        Wed Apr 6 22:44:36 2022
                    </td>

                    <td data-label="EventSource">
                        btminer
                    </td>
                  </tr>
                </tbody>
              </table>

          <!-- /tblsection -->
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