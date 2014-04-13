Space Leap
==========

Use the Leap Motion device to help create interactive environments
for educational / practical use cases for space. Below are only a few
of the relevant space apps challenges.

Related space apps challenges:

 * Earth art:

https://2014.spaceappschallenge.org/challenge/earth-art/

 * Visualize asteroid skies:

https://2014.spaceappschallenge.org/challenge/visualize-asteroid-skies/

Code provenance
===============

space-leap makes use of open-source code from a few places. This section
documents the provenance of such code and their respective license.

https://github.com/openleap/Three.leapControls provides all of these
under the MIT license:

  * LeapControls.js
  * lib/three.min.js
  * lib/leap.js
  * lib/Detector.js
  * lib/stats.min.js

Device functionality
====================

The effective range of the Leap Motion Controller extends from
approximately 25 to 600 millimeters above the device (1 inch to 2 feet).

  * Distance resolution is in millimeters
  * Time resolution is in microseconds (unless otherwise noted?)
  * Speed resolution is given in millimeters/second
  * Angle is provided in radians

There are 3 coordinates:

![alt tag](https://developer.leapmotion.com/documentation/images/Leap_Axes.png)

Python bindings  
===============

https://developer.leapmotion.com/documentation/python/index.html

Javasript bindings
==================

https://developer.leapmotion.com/documentation/javascript/index.html

3D library aka three.js
=======================

http://threejs.org/docs

Hacking with leap
=================

All your work leap work must go under Leap.loop(), the unlderying 3D
rendering is provided by three.js. The 3D environment three.js requires you
to implement a render loop and in it you'd stuff all your code. For a leap
environemnt you want to stay under the Leap.loop() and at the end call
the renderer render(scene, camera). Each loop entry is restricted by the
3D loop environment which by default which be triggered 60 times per second.

Within the leap loop we get information from the device 60 times / second,
the information is pegged onto a frame. three.js provides the camera size
through THREE.PerspectiveCamera(), the last arguments defin the "near" and
"far", which tell three.js the limits at which to not render objects for us.
The resolution for the leap device is milimeters and the events obtained
through thea Leap.loop() should give us information of a change of an object
(hand, finger) within this resolution. If we want to be precise about distances
we must map the change in motion provided by leap onto the 3D space.

For now we simplify things by focusing on on two viewing spaces, a long view
and close up view. The long view will enable you to swiftly move between
orbits for now only for 5 planets, and 5 asteroids. Once you are focused on
an object you can enter another viewing mode which lets you rotate around the
object and we display information about it.

Objectives
=========

  * Get software, install, test access
  * Interface program that manipulate: extract data, and understand its format
