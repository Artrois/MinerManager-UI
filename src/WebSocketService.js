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
        console.log("WebSocketService.js::handleNotification(): message received " + time_stamp);
        
        {
            let tmp = options.store.miner_data;
            let tmp2 = null;
            try{
                tmp2 = JSON.parse(params.data);
                console.log(tmp2);
                //if (tmp2.dirty){
                    options.store.miner_data = tmp2;
                    tmp = null;
                //}
                options.store.backend_connected = true;
                options.store.timestamp = time_stamp;
            }
            catch(error){
                options.store.backend_message = "invalid data";
                console.log("WebSocketService.js::handleNotification(): " + error.message);
            }

        }

        //options.store.dispatch('notifications/setNotifications', params.data)
    }
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

    Vue.config.globalProperties.$webSocketsConnect();

    }
}

