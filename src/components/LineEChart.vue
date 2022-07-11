<template>
<!-- style/width is linked to bootstrap 5 card-body -->
    <div ref="EchartID" style="width: 400px; min-width: 100%; height:400px;"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import bar charts, all suffixed with Chart
import { LineChart } from 'echarts/charts';
// Import the tooltip, title, rectangular coordinate system, dataset and transform components
// all suffixed with Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components';
// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from 'echarts/features';
// Import the Canvas renderer
// Note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from 'echarts/renderers';

// Register the required components
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);
export default {
  methods: {
    drawChart() {
      //Initialize the echarts instance based on the prepared dom
      let myChart = echarts.init(this.$refs.EchartID);
      //Specify configuration items and data for the chart
      let option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                        data: [820, 932, 901, 934, 1290, 1330, 1320],
                        type: 'line',
                        smooth: true
                        }
                    ]
                    };
      //Use the configuration items and data just specified to display the chart.
      myChart.setOption(option);
      //make the chart responsive towards the container size
      window.onresize = function() {
            myChart.resize();
        };
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style> 
    @media (min-width: 1183) {
        .chartBody {
            width: 400px;
            height: 300px;
        } 
    }
    @media (maxwidth: 1182) {
        .chartBody {
            width: 600px;
            height: 300px;
        } 
    }
</style>
