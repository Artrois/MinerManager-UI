


<template>

<!-- 
    <div class="animated_connection" :title="[connect_status?'connected':'connecting...']">
        <svg width="3em" height="3em" viewBox="0 0 80 80">
        <g transform="matrix(6.306054, 0, 0, 6.306054, -9.529148, -9.529148) scale(0.6 0.6)">
            <path :class="[connect_status?'upper_socket_conn':'upper_socket_anim']" d="M21.7803 3.28033C22.0732 2.98744 22.0732 2.51256 21.7803 2.21967C21.4874 1.92678 21.0126 1.92678 20.7197 2.21967L18.7077 4.23161C17.0483 3.05263 14.7323 3.20693 13.2448 4.6945L12.1767 5.76252C11.4933 6.44594 11.4933 7.55398 12.1767 8.2374L15.7625 11.8232C16.446 12.5066 17.554 12.5066 18.2374 11.8232L19.3054 10.7552C20.793 9.26761 20.9473 6.9517 19.7684 5.29228L21.7803 3.28033ZM18.1945 5.75516L18.2173 5.77798L18.2197 5.78033L18.222 5.78267L18.2448 5.80542C19.3187 6.87936 19.3187 8.62056 18.2448 9.6945L17.1767 10.7625C17.0791 10.8602 16.9208 10.8602 16.8232 10.7625L13.2374 7.17674C13.1398 7.07911 13.1398 6.92082 13.2374 6.82318L14.3054 5.75516C15.3794 4.68122 17.1206 4.68122 18.1945 5.75516Z" />
            <path :class="[connect_status?'lower_socket_conn':'lower_socket_anim']" d="M10.7803 11.2803C11.0732 10.9874 11.0732 10.5126 10.7803 10.2197C10.4874 9.92678 10.0126 9.92678 9.71967 10.2197L8.00001 11.9393L7.53035 11.4697C7.23746 11.1768 6.76258 11.1768 6.46969 11.4697L4.69456 13.2448C3.20701 14.7324 3.0527 17.0483 4.23163 18.7077L2.21967 20.7197C1.92678 21.0126 1.92678 21.4874 2.21967 21.7803C2.51256 22.0732 2.98744 22.0732 3.28033 21.7803L5.29229 19.7684C6.95171 20.9473 9.26766 20.793 10.7552 19.3055L12.5303 17.5303C12.8232 17.2374 12.8232 16.7626 12.5303 16.4697L12.0607 16L13.7803 14.2803C14.0732 13.9874 14.0732 13.5126 13.7803 13.2197C13.4874 12.9268 13.0126 12.9268 12.7197 13.2197L11 14.9393L9.06067 13L10.7803 11.2803ZM7.46631 13.527L7.46967 13.5303L7.47305 13.5337L10.4664 16.527L10.4697 16.5303L10.473 16.5336L10.9394 17L9.69456 18.2448C8.62062 19.3187 6.87942 19.3187 5.80548 18.2448L5.75522 18.1945C4.68128 17.1206 4.68128 15.3794 5.75522 14.3055L7.00002 13.0607L7.46631 13.527Z"/>
        </g>
        </svg>
    </div> -->
<!-- you control the filled area by setting stroke-dasharray="30 70" => 30% filled, 70% not filled 
update inner text by setting the classes donut-percent and donut-data
-->

<div class="svg-item">
  <svg width="100%" height="100%" viewBox="0 0 40 40" class="donut">
    <circle class="donut-hole" cx="20" cy="20" r="15.91549430918954" fill="#fff"></circle>
    <circle class="donut-ring" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5"></circle>
    <circle class="donut-segment donut-segment-4" cx="20" cy="20" r="15.91549430918954" fill="transparent" stroke-width="3.5" :stroke-dasharray="[percentage + ' ' + (100-percentage)]" stroke-dashoffset="25"></circle>
    <g class="donut-text donut-text-2">

      <text y="50%" transform="translate(0, 2)">
        <tspan x="50%" text-anchor="middle" class="donut-percent">{{ percentage }}%</tspan>   
      </text>
      <text y="60%" transform="translate(0, 2)">
        <tspan x="50%" text-anchor="middle" class="donut-data">{{ text_inside }}</tspan>   
      </text>
    </g>
  </svg>
</div>


</template>

<script setup>

defineProps({
    percentage: {
        type: Number,
        required: true
    },
    text_inside: {
        type: Text,
        required: true
    }
});
</script>

<script>
export default {
    methods: {
        template_function: function()
        {
            let tmp = null;
            return tmp;
        }
    }
}
</script>

<style scoped>
.svg-item {
    width: 100%;
    font-size: 16px;
    margin: 0 auto;
    animation: donutfade 1s;
}

@keyframes donutfade {
  /* this applies to the whole svg item wrapper */
    0% {
        opacity: .2;
    }
    100% {
        opacity: 1;
    }
}

@media (min-width: 992px) {
    .svg-item {
        width: 80%;
    }
}

.donut-ring {
    stroke: #EBEBEB;
}

.donut-segment {
    transform-origin: center;
    stroke: #FF6200;
}

.donut-segment-2 {
    stroke: aqua;
    animation: donut1 1s;
}

.donut-segment-3 {
    stroke: #d9e021;
    animation: donut2 2s;
}

.donut-segment-4 {
    stroke: #15bd15;
    animation: donut3 2s;
}

.segment-1{fill:#ccc;}
.segment-2{fill:aqua;}
.segment-3{fill:#d9e021;}
.segment-4{fill:#ed1e79;}

.donut-percent {
    animation: donutfadelong 1s;
}

@keyframes donutfadelong {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

@keyframes donut1 {
    0% {
        stroke-dasharray: 0, 100;
    }
    100% {
        stroke-dasharray: 69, 31;
    }
}

@keyframes donut2 {
    0% {
        stroke-dasharray: 0, 100;
    }
    100% {
        stroke-dasharray: 30, 70;
    }
}

@keyframes donut3{
    from {
        stroke-dasharray: 0, 100;
    }

/*     0% {
        stroke-dasharray: 0, 100;
    }
    100% {
        stroke-dasharray;
    } */
}

.donut-text {
    font-family: Arial, Helvetica, sans-serif;
    fill: #FF6200;
}
.donut-text-1 {
    fill: aqua;
}
.donut-text-2 {
    fill: #15bd15;
}
.donut-text-3 {
    fill: #ed1e79;
}

.donut-label {
    font-size: 0.28em;
    font-weight: 700;
    line-height: 1;
    fill: #000;
    transform: translateY(0.25em);
}

.donut-percent {
    font-size: 0.5em;
    line-height: 1;
    transform: translateY(0.5em);
    font-weight: bold;
}

.donut-data {
    font-size: 0.2em;
    line-height: 1;
    transform: translateY(0.5em);
    text-align: center;
    text-anchor: middle;
    color:#666;
    fill: #666;
    font-weight: bold;
    animation: donutfadelong 1s;
}

</style>