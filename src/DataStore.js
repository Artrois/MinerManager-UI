import {reactive} from 'vue';

export const store = reactive({
    count: 0,
    debug_flag: 0,
    backend_connected: false, 
    timestamp: "",
    backend_message: "",
    dashboard_data: {
      total_amount_miners: 0,
      online_miners: 0,
      percentage_online_miners: 0,
      total_hashr_5s: 0,
      percentage_total_hashr_5s: 0,
      total_hasr_1m: 0,
      percentage_total_hasr_1m: 0,
      total_expected_hashrate_MHS: 0,
      /* array of IPs of type string */
      miners_with_errors: null, 
      /**array if JSON objects with the structure 
       * {"HostName": HostName,
       *  "Model": "",
       *  "Fan_Speed_In": Fan_Speed_In, 
       *  "Fan_Speed_Out": Fan_Speed_Out,
       *  "Temperature": Temperature, 
       *  "Env_Temp": Env_Temp }
       */
      temp_fan_threshold_alarms: null
    },
    miner_data: null,
    miner_data_bak: JSON.parse(`[
        {
            "HostName": "192.168.3.3", 
            "port": 4028, 
            "isAlive": false,
            "timestamp": "NaN",
            "dirty": true,
            "expected_hashrate_MHS": 104709140,
            "MinerModel": "Whatsminer_M30S+",
            "Fan_Speed_In_threshold": 6000,
            "Fan_Speed_Out_threshold": 6000,
            "Temperature_threshold": 80,
            "Env_Temp_threshold": 38,
            "summary": {
                "STATUS":[{"STATUS":"S","Msg":"Summary"}],
                "SUMMARY":[
                {
                "Elapsed":2648,
                "MHS av":84983730.62,
                "MHS 5s":102423869.64,
                "MHS 1m":86361423.06,
                "MHS 5m":84941366.02,
                "MHS 15m":84969424.09,
                "HS RT":84941366.02,
                "Accepted":804,
                "Rejected":0,
                "Total MH":225043191209.0000,
                "Temperature":80.00,
                "freq_avg":646,
                "Fan Speed In":4530,
                "Fan Speed Out":4530,
                "Power":3593,
                "Power Rate":42.31,
                "Pool Rejected%":0.0000,
                "Pool Stale%":0.0000,
                "Last getwork":0,
                "Uptime":20507,
                "Security Mode":0,
                "Hash Stable":true,
                "Hash Stable Cost Seconds":17569,
                "Hash Deviation%":0.1398,
                "Target Freq":574,
                "Target MHS":76157172,
                "Env Temp":32.00,
                "Power Mode":"Normal",
                "Factory GHS":84773,
                "Power Limit":3600,
                "Chip Temp Min":75.17,
                "Chip Temp Max":101.25,
                "Chip Temp Avg":89.60,
                "Debug":"-0.0_100.0_354",
                "Btminer Fast Boot":"disable" }
                ]
                },
            "pools": null,
            "edevs": null,
            "psu": null,
            "error_codes": null
        }, 
        {
            "HostName": "127.0.0.1", 
            "port": 4028, 
            "isAlive": false,
            "timestamp": "NaN",
            "dirty": true,
            "expected_hashrate_MHS": 104709140,
            "MinerModel": "Whatsminer_M30S+",
            "summary": null,
            "pools": null,
            "edevs": null,
            "psu": null,
            "error_codes": null
        }
                ]
    ` )
  })
/* export const set_data = (val) => { received_miner_data = val };
export const get_data = () => {return received_miner_data}; */
//export default received_miner_data;
/* export default  received_miner_data = reactive( {
   test_var: 1, 
   miner_data: [
    {
      "HostName": "192.168.3.3",
      "port": 4028,
      "isAlive": false,
      "timestamp": "2022/06/22 23:18:39",
      "dirty": true,
      "summary": {},
      "pools": {},
      "edevs": {},
      "psu": {},
      "error_codes": {}
    },
    {
      "HostName": "127.0.0.1",
      "port": 4028,
      "isAlive": true,
      "timestamp": "2022/06/22 23:18:39",
      "dirty": false,
      "psu": {
        "STATUS": "S",
        "When": 1643182793,
        "Code": 131,
        "Msg": {
          "name": "P221B",
          "hw_version": "V01.00",
          "sw_version": "V01.00.V01.03",
          "model": "P221B",
          "iin": "8718",
          "vin": "22400",
          "fan_speed": "6976",
          "version": "-1",
          "serial_no": "A1232B0120100049",
          "vender": "7"
        },
        "Description": ""
      },
      "summary": {
        "STATUS": [
          {
            "STATUS": "S",
            "Msg": "Summary"
          }
        ],
        "SUMMARY": [
          {
            "Elapsed": 2648,
            "MHS av": 84983730.62,
            "MHS 5s": 102423869.64,
            "MHS 1m": 86361423.06,
            "MHS 5m": 84941366.02,
            "MHS 15m": 84969424.09,
            "HS RT": 84941366.02,
            "Accepted": 804,
            "Rejected": 0,
            "Total MH": 225043191209,
            "Temperature": 80,
            "freq_avg": 646,
            "Fan Speed In": 4530,
            "Fan Speed Out": 4530,
            "Power": 3593,
            "Power Rate": 42.31,
            "Pool Rejected%": 0,
            "Pool Stale%": 0,
            "Last getwork": 0,
            "Uptime": 20507,
            "Security Mode": 0,
            "Hash Stable": true,
            "Hash Stable Cost Seconds": 17569,
            "Hash Deviation%": 0.1398,
            "Target Freq": 574,
            "Target MHS": 76157172,
            "Env Temp": 32,
            "Power Mode": "Normal",
            "Factory GHS": 84773,
            "Power Limit": 3600,
            "Chip Temp Min": 75.17,
            "Chip Temp Max": 101.25,
            "Chip Temp Avg": 89.6,
            "Debug": "-0.0_100.0_354",
            "Btminer Fast Boot": "disable"
          }
        ]
      },
      "pools": {
        "STATUS": [
          {
            "STATUS": "S",
            "Msg": "1 Pool(s)"
          }
        ],
        "POOLS": [
          {
            "POOL": 1,
            "URL": "stratum+tcp://btc.ss.poolin.com:443",
            "Status": "Alive",
            "Priority": 0,
            "Quota": 1,
            "Long Poll": "N",
            "Getworks": 1,
            "Accepted": 0,
            "Rejected": 0,
            "Works": 0,
            "Discarded": 0,
            "Stale": 0,
            "Get Failures": 0,
            "Remote Failures": 0,
            "User": "microbtinitial",
            "Last Share Time": 0,
            "Diff1 Shares": 0,
            "Proxy Type": "",
            "Proxy": "",
            "Difficulty Accepted": 0,
            "Difficulty Rejected": 0,
            "Difficulty Stale": 0,
            "Last Share Difficulty": 0,
            "Work Difficulty": 0,
            "Has Stratum": 1,
            "Stratum Active": true,
            "Stratum URL": "btc-vip-3dcoa7jxu.ss.poolin.com",
            "Stratum Difficulty": 65536,
            "Best Share": 0,
            "Pool Rejected%": 0,
            "Pool Stale%": 0,
            "Bad Work": 0,
            "Current Block Height": 0,
            "Current Block Version": 536870916
          }
        ]
      },
      "edevs": {
        "STATUS": [
          {
            "STATUS": "S",
            "Msg": "3 ASC(s)"
          }
        ],
        "DEVS": [
          {
            "ASC": 0,
            "Slot": 0,
            "Enabled": "Y",
            "Status": "Alive",
            "Temperature": 80,
            "Chip Frequency": 587,
            "MHS av": 10342284.8,
            "MHS 5s": 5298845.66,
            "MHS 1m": 8508905.3,
            "MHS 5m": 10351110.56,
            "MHS 15m": 10296867.74,
            "HS RT": 10351110.56,
            "Accepted": 18,
            "Rejected": 0,
            "Last Valid Work": 1643183296,
            "Upfreq Complete": 0,
            "Effective Chips": 156,
            "PCB SN": "HEM1EP9C400929K60003",
            "Chip Data": "K88Z347-2039 BINV01-195001D",
            "Chip Temp Min": 80.56,
            "Chip Temp Max": 97,
            "Chip Temp Avg": 89.89,
            "chip_vol_diff": 9
          },
          {
            "ASC": 1,
            "Slot": 1,
            "Enabled": "Y",
            "Status": "Alive",
            "Temperature": 80,
            "Chip Frequency": 590,
            "MHS av": 10259948.84,
            "MHS 5s": 5413853.9,
            "MHS 1m": 8577249.68,
            "MHS 5m": 10441143.92,
            "MHS 15m": 10214893.36,
            "HS RT": 10441143.92,
            "Accepted": 16,
            "Rejected": 0,
            "Last Valid Work": 1643183291,
            "Upfreq Complete": 0,
            "Effective Chips": 156,
            "PCB SN": "HEM1EP9C400929K60001",
            "Chip Data": "K88Z347-2039 BINV01-195001D",
            "Chip Temp Min": 77.94,
            "Chip Temp Max": 96.5,
            "Chip Temp Avg": 88.23,
            "chip_vol_diff": 9
          },
          {
            "ASC": 2,
            "Slot": 2,
            "Enabled": "Y",
            "Status": "Alive",
            "Temperature": 80,
            "Chip Frequency": 590,
            "MHS av": 10258829.89,
            "MHS 5s": 5571781.71,
            "MHS 1m": 8675316.17,
            "MHS 5m": 10479953.41,
            "MHS 15m": 10213779.32,
            "HS RT": 10479953.41,
            "Accepted": 19,
            "Rejected": 0,
            "Last Valid Work": 1643183296,
            "Upfreq Complete": 0,
            "Effective Chips": 156,
            "PCB SN": "HEM1EP9C400929K60002",
            "Chip Data": "K88Z347-2039 BINV01-195001D",
            "Chip Temp Min": 80.5,
            "Chip Temp Max": 97.44,
            "Chip Temp Avg": 90.91,
            "chip_vol_diff": 9
          }
        ]
      },
      "error_codes": {
        "STATUS": "S",
        "When": 1642392343,
        "Code": 131,
        "Msg": {
          "error_code": [
            "329",
            "2022-01-17 11:28:11"
          ]
        },
        "Description": ""
      }
    }
  ] 
  
}); */
