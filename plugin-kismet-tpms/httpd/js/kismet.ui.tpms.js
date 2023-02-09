
"use strict";

var local_uri_prefix = ""; 
if (typeof(KISMET_URI_PREFIX) !== 'undefined')
    local_uri_prefix = KISMET_URI_PREFIX;

/* Highlight ADSB devices */
kismet_ui.AddDeviceRowHighlight({
    name: "TPMS",
    description: "TPMS-tagged vehicles",
    priority: 50,
    defaultcolor: "#ffb3b3",
    defaultenable: true,
    fields: [
        'kismet.alert.location',
        'kismet.device.base.location_cloud',
        'kismet.device.base.phyname',
        'kismet.devices.view.size',
        'kismet.device.base.location',
        'kismet.device.base',
        'rtl433.device',
    ],
    selector: function(data) {
        var target_list = [
	        '9ff7d658',
        ];

        var exclude_list = [
            'sharp-SPC775',
            'Efergy-e2CT',
            //'',
        ];

        if (data['kismet.device.base.phyname'] === 'RTL433') {
            for (var re of target_list) {
		        var retval = false;
		        if (data['rtl433.device']['rtl433.device.common']['rtl433.device.id'].toLowerCase().includes(re)) {
	                retval = true;
                }
            }

            for (var excld of exclude_list) {
		        if (data['rtl433.device']['rtl433.device.common']['rtl433.device.id'].toLowerCase().includes(excld)) {
			        retval=false;
		        } //else if (data['kismet.device.base.commonname'].toLowerCase().includes(excld)) {
                  //  retval=false;
                //}
	        }

		    if (Boolean(retval)) {
		        return true;
		    }
        }
	   // for (var re of icao_list) {
	   //	 if (data['rtl433.device']['adsb.device.icao'].toLowerCase().includes(re))
           //         return true;
           // }
    
        return false;
    }
});

// Adds device info to the left panel when you click on a device of the main Devices UI tab.
kismet_ui.AddDeviceDetail("adsb", "TPMS (SDR)", 0, {
    filter: function(data) {
        return (data['kismet.device.base.phyname'] === "RTL433");
    },
    draw: function(data, target) {
        target.devicedata(data, {
            "id": "adsbData",
            "fields": [
            {
                field: "rtl433.device/rtl433.device.common/rtl433.device.id",
                liveupdate: true,
                title: "Sensor ID",
                empty: "<i>Unknown</i>"
            },
            {
                field: "kismet.device.base.commonname",
                liveupdate: true,
                title: "Make/Model",
                filterOnZero: true,
                filterOnEmpty: true,
		        // The help window might be good for showing analytics data about this single  device...
                help: "Something Fancy!",
            },
	        // This draw opens a new browser tab!  Could be cool...
            //draw: function(opts) {
            //    return '<a href="https://flightaware.com/live/flight/' + opts['value'] + '" target="_new">Track ' + opts['value'] + ' on FlightAware</a>';
            {
                field: "kismet.device.base.location/kismet.common.location.alt",
                liveupdate: true,
                title: "Altitude",
                filterOnZero: true,
            },
            {
                field: "kismet.device.base.location/kismet.common.location.last/kismet.common.location.speed",
                liveupdate: true,
                title: "Speed",
                //filterOnZero: false,
                //filterOnEmpty: false,
		        empty: "<i>Unknown</i>",
                draw: function(opts) {
                    return opts['value'];
                },
            },
            {
                field: "kismet.device.base.location/kismet.common.location.last/kismet.common.location.heading",
                liveupdate: true,
                title: "Heading",
                filterOnZero: false,
		        empty: "<i>Unknown</i>",
                draw: function(opts) {
                    return Math.round(opts['value']) + '&deg; <i class="fa fa-plane" style="transform: rotate(' + (opts['value'] -45) + 'deg)" />';
                    //return opts['value'];
                },
            },
            {
                field: "kismet.device.base.location/kismet.common.location.last/kismet.common.location.geopoint",
                liveupdate: true,
                title: "Location",
                filterOnZero: false,
                filterOnEmpty: false,
                draw: function(opts) {
                    try {
                        return opts['value'] + '<br/><a target="_new" href="https://openstreetmap.org/?mlat=' +
                            opts['value'][1] + '&mlon=' + opts['value'][0] +
                            '#map=17/' + opts['value'][1] + '/' + opts['value'][0] + '">View on Open Street Maps</a>';
                    } catch (error) {
                        return 'n/a'
                    } // Comma after this bracket breaks the JS & UI.
                },
            },
            ],
        });
	},
});

kismet_ui_tabpane.AddTab({
    id: 'tpms_live',
    tabTitle: 'TPMS',
    expandable: false,
    createCallback: function(div) {
        var url = new URL(parent.document.URL);
        url.searchParams.append('parent_url', url.origin);
        url.searchParams.append('local_uri_prefix', local_uri_prefix);
        url.searchParams.append('KISMET_PROXY_PREFIX', KISMET_PROXY_PREFIX);
        url.pathname = `${local_uri_prefix}${KISMET_PROXY_PREFIX}tpms_map_panel.html`;
   
        div.append(
            $('<iframe>', {
                width: '100%',
                height: '100%',
                src: url.href,
            })
        );
    },

    priority: -99,

}, 'center');

