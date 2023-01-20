# kismet-TPMS
### A Kismet plugin for plotting 'dots-on-the-map' of Tire Pressure Monitoring System (TPMS) sensors.
##### Prereqs:
- rtl-sdr, rtl-433, kismet
<br /><br />
##### Installation:
Inside the `kismet-TPMS/plugin-kismet-tpms` directory:

` $ sudo make install `
<br /><br />
##### Known Issues:
This plugin is in BETA! &nbsp; A real Frankenstein job...
- [ ] All sensors are the same color, and that's confusing.
- [ ] More than ~88 detected sensors eats RAM and causes write-delays in Kismet (RPi3)
<br /><br />
##### Contributions/Apologies:
Most of this code comes from the Kismet ADSB plugin from @dragorn; I'm merely butchering it.
