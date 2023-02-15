# kismet-TPMS
### A Kismet plugin for plotting 'dots-on-the-map' of Tire Pressure Monitoring System (TPMS) sensors.
##### Prereqs:
Debian:<br />
&nbsp;&nbsp; ` $ sudo apt update`<br />
&nbsp;&nbsp; ` $ sudo apt install rtl-sdr rtl-433 git make pkg-config gpsd gpsd-clients`<br />
<br />
&nbsp;&nbsp; *** https://www.kismetwireless.net/docs/readme/installing/linux/ *** <br />
&nbsp;&nbsp; ` $ sudo apt update`<br />
&nbsp;&nbsp; ` $ sudo apt install kismet`<br />
<br />
&nbsp;&nbsp; <b>A working GPS is required for plotting locations, and Internet access is required for OpenMaps.</b><br />
&nbsp;&nbsp; (If you have an offline OpenMaps server, make sure to have DNS redirect web requests to it.)
<br />
<br /><br />
##### Installation:
Inside the `kismet-TPMS/plugin-kismet-tpms` directory:

` $ sudo make install `
<br /><br /><br />
##### Known Issues:
This plugin is in BETA! &nbsp; A real Frankenstein job...
- [ ] All sensors are the same color, and that's confusing.
- [ ] More than ~88 detected sensors eats RAM and causes write-delays in Kismet (RPi3).
- [ ] When using Kismet as a remote datasource, GPS-data isn't passed back to the server.
<br /><br /><br />
##### Contributions/Apologies:
Most of this code comes from the Kismet ADSB plugin from @dragorn; I'm merely butchering it.
