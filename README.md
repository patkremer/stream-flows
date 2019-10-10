# Colorado Flows 

Live website: [coloradoflows.com](http://coloradoflows.com)

## About the project
The idea behind stream-flows is to create an easy way to check the flows of rivers in colorado, maybe one day, across the USA. 
In addition to an easy way to search for and view flows, it will also provide an easy way to view data like weather, location, historical data. 

Currently the data for river flows is in two locations, https://waterdata.usgs.gov and https://colorado.data.gov. My goal is to combine those two datasets to create one clean interface for viewing river data.

Eventually, it would be nice to integrate data with the colorado fishing atlas so speicies can be listed if applicable. 

Depending on general feedback from the community, I'd like to create the abiltity to have profiles, favorite rivers, like rivers, comment on rivers/sections, get alerted about flow increases or decreases.

## Project built with

materializecss and Vue.js

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

co-flows.surge.sh
Deploy with surge [see link](https://cli.vuejs.org/guide/deployment.html#surge).

surge dist co-flows.surge.sh

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Built with
Vue.js 
Leaflet,vue2-leaflet,vue2-leaflet-markercluster
axios
OpenStreetMap
Firebase
ChartJs and VueChartJs
