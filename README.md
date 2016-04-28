![alt tag](http://res.cloudinary.com/dmj8qtant/image/upload/c_limit,w_600/v1452900736/gxx0rmutpczk8fv0vodq.jpg)
# simon

## Tech
AngularJS watchiing, Array_Equals.js, $timeouts and $intervals, PlainJS(Audio)

## Niceties
CSS Overlays, Lights and Glows
Array deep comparison

### Details
#### CSS
 - ng-class to smooth darken background when power is on. (Using opacity on black) (Orig. used in TOS Mapdex)
 
 ```
  <div id="darkness" class="disappear" data-ng-class="{'disappear': !power, 'appear': power}"></div>
 ```
 - using box-shadow to tint a div which already has a background image.
 
 ```
  input.color = "0px 340px rgba(255, 0, 80, 0.3) inset"
  SEE BELOW for "input.color"
 ```
 - Circular glow button, iPhone-style switch
 - TM symbol and happy/frowny faces.
 
#### JS
 - Use ng-style with JSON & ng-repeat for generating and animating Xylophone bars:
 
 ```
    $scope.set_styling = function (input) {
        if (input.playing) {
            return { "height": input.length, "box-shadow": input.color }
        }
        else{
        return { "height": input.length }
        };
 ```
  - using a box-shadow on an overlayed div to give glow effect. (Used on "Pip Holder" elements that align pips)
 ```
    $scope.backlight = function (input) {
        if (input.playing) {
            return { "box-shadow": input.light }
        }
        else{
        return {  }
        };
 ```
 - Sequence:

 ```
 Up Number -> Play Demo -> Listen (allow user input) -> ":)" -> Up Number -> Play Demo....
                                                 L ---> ":(" -> Play Demo -> Listen Again...
 ```
 - Block User Action with a <div> that only disappears during Listen Phase.
 ```
    <div id="click-block" data-ng-if="!listening"></div>
 ```
 - ng-mousedown, mouseup, mouseenter: (Used in Guide-showing, hold down for long glow aesthetic)

 ```
 data-ng-mouseenter="ShowGuide(bar)" data-ng-mousedown="Play(bar)" data-ng-mouseleave="UnPlay(bar);ShowGuide(bar)" data-ng-mouseup="UnPlay(bar)"
 ```
 
 
##### TODO

would like to find a way to find and cancel all pending timeouts. 
maybe use a array of timeouts and assign each timeout to that array?

<strike>Also find a way to preload sounds so they don't lag the first time they're played</strike> Preloading sounds does not solve this problem, but this is how you do it.

```
    var sounds = [];//preload sounds
    for (var k=0;k<$scope.instrum.xyphone.length;k++){sounds.push(new Audio($scope.instrum.xyphone[k].tune))};//preload sounds
    // and then play them off of sounds array
```
