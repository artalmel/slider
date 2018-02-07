function slider(options){
    var elem = options.elem; //slider element
    var thumb = elem.children[0]; //thumb element
    var thumbText = thumb.children[0]; //thumb element text
    var showStartColor = options.showStartColor; //start color div
    var showCurrentColor = options.showCurrentColor; //current color div
    var showEndColor = options.showEndColor; //end color div
    var showCurrentValue = options.showCurrentValue; //current color value: tag <p>

    //start and end values
    var startColor = '#000000';
    var endColor = '#ffffff';

    //convert hex colors to rgb
    var startHex = convertColor(startColor);
    var endHex = convertColor(endColor);

    //buttons
    var startBtn = options.startBtn;
    var endBtn = options.endBtn;

    //get start color value from input
    startBtn.onclick = function () {
        startColor = '#'+options.startColor.value || '#000000';
        //set background color to start color div
        showStartColor.style.backgroundColor = startColor;

        //set background color to currnet color div
        showCurrentColor.style.backgroundColor = startColor;

        //set current color value
        showCurrentValue.innerHTML = startColor;

        //convert start color hex to rgb
        startHex = convertColor(startColor);

        //set thumb start color
        thumb.style.backgroundColor = startColor;
    }

    //get end color value from input
    endBtn.onclick = function () {
        endColor = '#'+options.endColor.value || '#ffffff';
        //set background color to current color div
        showEndColor.style.backgroundColor = endColor;

        //convert end color hex to rgb
        endHex = convertColor(endColor);

    }

    //set background color to start color div
    showStartColor.style.backgroundColor = startColor;

    //set background color to current color div
    showCurrentColor.style.backgroundColor = startColor;

    //set background color to current color div
    showEndColor.style.backgroundColor = endColor;

    //set current color value
    showCurrentValue.innerHTML = startColor;

    //slider width
    var moveWidth = elem.getBoundingClientRect().width;

    //set thumb default background color
    thumb.style.backgroundColor = startColor;

    //set thumb text
    thumbText.innerHTML =startColor;

    //mouse press to thumb element
    thumb.onmousedown = function (e) {

        document.body.appendChild(elem);
        
        moveat(e);

        function moveat(e) {
            //thumb position
            var newWidth = e.pageX - thumb.offsetWidth/2;

            //slider start
            if(newWidth < 0){
                newWidth = 0;
            }

            //slider end
            if(newWidth > moveWidth){
                newWidth = moveWidth;
            }

            //move thumb
            thumb.style.left = newWidth + 'px';

            //get rgb color
            var rgb = getRGB(startHex,endHex,newWidth,moveWidth);

            //set color to current color div
            showCurrentColor.style.backgroundColor = getHex(rgb);

            //set color value to tag <p> text
            showCurrentValue.innerHTML = getHex(rgb);

            //set color to thumb
            thumb.style.backgroundColor = getHex(rgb);

            //set color value to thumb text
            thumbText.innerHTML = getHex(rgb)+" "+rgb;

        }

        document.onmousemove = function (e) {
            moveat(e);
        }

        document.onmouseup = function () {
            document.onmousemove = null;
        }
    };

    //taurn off ondragstart function
    thumb.ondragstart = function () {
        return false;
    }

    /*
    * Convert hex to rgb
    * @param color - string ex. #000000
    * @return array
    * */
    function convertColor (color) {
        var colorn =color !== undefined ? color.slice(1, color.length) : '#000000';

        var colorArray = [];

        for(var i = 0; i < colorn.length; i+=2){
            colorArray.push(colorn[i] + colorn[i+1]);
        }

        return { red: parseInt(colorArray[0],16), green: parseInt(colorArray[1],16), blue: parseInt(colorArray[2],16)};
    }

    /*
    * @startHex - object
    * @endHex - object
    * @newWidth - number
    * @moveWidth - number
    * */
    function getRGB(startHex,endHex, newWidth, moveWidth) {
        var step_r = 0;
        var step_g = 0;
        var step_b = 0;
        if(endHex.red > startHex.red){
            step_r = Math.ceil(newWidth/(moveWidth/(endHex.red - startHex.red)))+startHex.red;
        } else {
            step_r = startHex.red - Math.ceil(newWidth/(moveWidth/(startHex.red - endHex.red)));
        }

        if(endHex.green > startHex.green){
            step_g = Math.ceil(newWidth/(moveWidth/(endHex.green - startHex.green)))+startHex.green;
        } else {
            step_g = startHex.green - Math.ceil(newWidth/(moveWidth/(startHex.green - endHex.green)));
        }

        if(endHex.blue > startHex.blue){
            step_b = Math.ceil(newWidth/(moveWidth/(endHex.blue - startHex.blue)))+startHex.blue;
        } else {
            step_b = startHex.blue - Math.ceil(newWidth/(moveWidth/(startHex.blue - endHex.blue)));
        }

        return 'rgb(' + [step_r,step_g,step_b].join(', ')+')';
    }

    function getHex(rgb) {
        var cText =  rgb !== undefined ? rgb.slice(4, rgb.length).slice(0,-1).split(', ') : 0;
        var r = +cText[0];
        var g = +cText[1];
        var b = +cText[2];
        return '#'+hexText(r)+hexText(g)+hexText(b);
    }

    function hexText(num) {
        var c = num.toString(16);
        var k = c.length == 1 ?  "0" +c : c;
        return k;
    }
}
