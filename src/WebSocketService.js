//let webSocketsService = {}
"use strict";

export default {
    install: (Vue, options) => {
    let ws;
    let reconnectInterval = options.reconnectInterval || 1000
    let run_reconnect = true;

    Vue.config.globalProperties.$webSocketsConnect = () => {
        run_reconnect = true;
        ws = new WebSocket(options.url)
        console.log('WebSocketService.js::$webSocketsConnect():connect to: ' + options.url);
        ws.onopen = () => {
            // Restart reconnect interval
            reconnectInterval = options.reconnectInterval || 1000
            options.store.backend_connected = true;
        }

        ws.onmessage = (event) => {
            // New message from the backend - use JSON.parse(event.data)
            handleNotification(event);
        }

        ws.onclose = (event) => {
        if (event) {
            // Event.code 1000 is our normal close event
            options.store.backend_connected = false;
            /*if (event.code !== 1000)*/ {
            let maxReconnectInterval = options.maxReconnectInterval || 3000
            options.maxReconnectInterval = maxReconnectInterval;
            if (run_reconnect) setTimeout(() => {
                console.log('WebSocketService::ws.onclose=> run reconnect timeout');
                if (reconnectInterval < maxReconnectInterval) {
                // Reconnect interval can't be > x seconds
                reconnectInterval += 1000
                }
                Vue.config.globalProperties.$webSocketsConnect()
            }, reconnectInterval)
            }
        }
        }

        ws.onerror = (error) => {
            console.log(error);
            ws.close();
            options.store.backend_connected = false;
/*             let maxReconnectInterval = options.maxReconnectInterval || 3000
            if (this.run_reconnect) setTimeout(() => {
                console.log('WebSocketService::ws.onerror=> run reconnect timeout');
                if (reconnectInterval < maxReconnectInterval) {
                // Reconnect interval can't be > x seconds
                reconnectInterval += 1000
                }
                Vue.config.globalProperties.$webSocketsConnect()
            }, reconnectInterval) */
        }
        
    }

    Vue.config.globalProperties.$webSocketsDisconnect = () => {
        // Our custom disconnect event
        run_reconnect = false;
        options.store.backend_connected = false;
        ws.close();  
    }

    Vue.config.globalProperties.$webSocketsSend = (value) => {
        // Send data to the backend - use JSON.stringify(data)
        let dt = JSON.parse('{"time_stamp": null, "data": null}');
        dt.time_stamp = new Date();
        dt.data = value;
        ws.send(JSON.stringify(dt))
    }

    /*
        Here we write our custom functions to not make a mess in one function
    */
    function handleNotification (params) {
        // New message from the backend - use JSON.parse(event.data)
        //console.log(params);
        let time_stamp = getDateTime();
        let data_processed_successfully = false;
        console.log("WebSocketService.js::handleNotification(): message received " + time_stamp);
        
        {
            let tmp = options.store.miner_data;
            let tmp2 = null;
            try{
                tmp2 = JSON.parse(params.data);
                //check that we have at least 1 entry in the received array
                if(tmp2.length == 0) return;
                console.log(tmp2);
                //if (tmp2.dirty){
                    options.store.miner_data = tmp2;
                    tmp = null;
                //}
                options.store.backend_connected = true;
                options.store.timestamp = time_stamp;
                data_processed_successfully = true;
            }
            catch(error){
                options.store.backend_message = "invalid data";
                console.log("***error:WebSocketService.js::handleNotification(): " + error.message);
            }
            
            //from here we collect the data for the dashboard, the bindings to the graphs/diagrams will be done in vue
            if(data_processed_successfully)process_data_for_dashboard();
        }

        //options.store.dispatch('notifications/setNotifications', params.data)
    }

    //returns current time in format yyyy/mm/dd hh:mm:ss
    function getDateTime() {
        var now     = new Date(); 
         var year    = now.getFullYear();
         var month   = now.getMonth()+1; 
         var day     = now.getDate();
         var hour    = now.getHours();
         var minute  = now.getMinutes();
         var second  = now.getSeconds(); 
         if(month.toString().length == 1) {
              month = '0'+month;
         }
         if(day.toString().length == 1) {
              day = '0'+day;
         }   
         if(hour.toString().length == 1) {
              hour = '0'+hour;
         }
         if(minute.toString().length == 1) {
              minute = '0'+minute;
         }
         if(second.toString().length == 1) {
              second = '0'+second;
         }   
         var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
          return dateTime;
       }

       //processess current data in options.store.miner_data and stores the condensed results ready for dashboard consumption in options.store.dashboard_data
       function process_data_for_dashboard(){
            options.store.dashboard_data.total_amount_miners = options.store.miner_data.length;
            let online_miners = 0;
            let hashrate_5s = 0;
            let hashrate_1m = 0;
            let miners_with_errors = [];
            let temp_fan_threshold_alarms = [];
            let total_expected_hashrate_MHS = 0;
            //this part seems to be Whatsminer_M30S+ specific. We will have to put this to a more modular design to allow other miners to be addded as well
            options.store.miner_data.forEach((miner_object, index) => { 
                //count online miners
                if(miner_object.isAlive) ++online_miners;

                //calc 5s hashrate in Megahash
                if(miner_object.summary !==null )hashrate_5s += miner_object.summary.SUMMARY[0]["MHS 5s"];

                //calc 1m hashrate in Megahash
                if(miner_object.summary !==null )hashrate_1m += miner_object.summary.SUMMARY[0]["MHS 1m"];

                //calc expected hashrate
                total_expected_hashrate_MHS += miner_object.expected_hashrate_MHS;
                
                //check if current miner has errors and store its IP in an array
                if(miner_object.error_codes !==null ) {if(miner_object.error_codes.length>0)miners_with_errors.push(miner_object.HostName);};

                //check if temp and fan thresholds exceeded => miner specific
                if(miner_object.summary !==null ) {

                    let Fan_Speed_In = miner_object.summary.SUMMARY[0]["Fan Speed In"];
                    let Fan_Speed_Out = miner_object.summary.SUMMARY[0]["Fan Speed Out"];
                    let Temperature = miner_object.summary.SUMMARY[0]["Temperature"];
                    let Env_Temp = miner_object.summary.SUMMARY[0]["Env Temp"];
                    if ( (Fan_Speed_In >= miner_object.Fan_Speed_In_threshold) || (Fan_Speed_In == 0) || (Fan_Speed_Out >= miner_object.Fan_Speed_Out_threshold) || (Fan_Speed_Out == 0) || (Temperature >= miner_object.Temperature_threshold) || (Env_Temp >= miner_object.Env_Temp_threshold)){
                        //create new item for the array
                        let item = JSON.parse('{"HostName": "", "Model": "", "Fan_Speed_In": 0, "Fan_Speed_Out": 0, "Temperature": 0, "Env_Temp": 0 }');
                        item.HostName = HostName;
                        item.Model = miner_object.MinerModel;
                        item.Fan_Speed_In = Fan_Speed_In;
                        item.Fan_Speed_Out = Fan_Speed_Out;
                        item.Temperature = Temperature;
                        item.Env_Temp = Env_Temp;
                        temp_fan_threshold_alarms.push(item);
                    }
                    miners_with_errors.push(miner_object.HostName);
                }
            });
            options.store.dashboard_data.total_amount_miners = options.store.miner_data.length;
            options.store.dashboard_data.online_miners = online_miners;
            options.store.dashboard_data.percentage_online_miners = Math.round(100 * online_miners/options.store.miner_data.length);
            options.store.dashboard_data.total_hashr_5s = hashrate_5s;
            if(total_expected_hashrate_MHS == 0){
                //handle division by zero
                console.log("WebSocketService::process_data_for_dashboard(): warning, total_expected_hashrate_MHS == 0");
                total_expected_hashrate_MHS = 1;
            }
            options.store.dashboard_data.total_expected_hashrate_MHS = total_expected_hashrate_MHS;
            options.store.dashboard_data.percentage_total_hashr_5s = Math.round(100 * hashrate_5s / total_expected_hashrate_MHS);
            options.store.dashboard_data.percentage_total_hasr_1m = Math.round(100 * hashrate_1m / total_expected_hashrate_MHS);
            options.store.dashboard_data.total_hashr_1m = hashrate_1m;
            if(miners_with_errors.length > 0) options.store.dashboard_data.miners_with_errors = miners_with_errors;
            if(temp_fan_threshold_alarms.lenght > 0) options.store.dashboard_data.temp_fan_threshold_alarms = temp_fan_threshold_alarms;
            if(options.store.debug_flag){
                console.log("WebSocketService::process_data_for_dashboard(): print dashboard_data:");
                console.log(JSON.stringify(options.store.dashboard_data), null, 2);
            }
       }

    Vue.config.globalProperties.$webSocketsConnect();
       
    }
}

