var k1 = 'z';
var k2 = 'x';
var BPM = 120;
var seconds = 30;
var start = false;
var step = 1000 / (BPM / 15);
var stepper = 0 - step;

function resetvalues()
{
    k1 = 'z';
    k2 = 'x';
    BPM = 120;
    seconds = 30;
    start = false;
    step = 1000 / (BPM / 15);
    stepper = 0 - step;
    document.getElementById("key1").value = k1;
    document.getElementById("key2").value = k2;
    document.getElementById("seconds").value = seconds;
    document.getElementById("BPM").value = BPM;
    updatevalues();
}
function begin()
{
    if (start)
    {
        start = false;
        updatevalues();
        enable();
        endTest();
    }
    else
    {
        if (checkvalues() != 0)
        {
            return;
        }
        else
        {
            start = true;
            updatevalues();
            disable();
            beginTest();
        }
    }
}
function enable()
{
    var list = document.getElementsByClassName("inputbutton");
    for (var i = 0; i < list.length; i++)
    {
        list[i].disabled = false;
    }
}
function disable()
{
    var list = document.getElementsByClassName("inputbutton");
    for (var i = 0; i < list.length; i++)
    {
        list[i].disabled = true;
    }
    if (document.activeElement)
    {
        document.activeElement.blur();
    }
}
function updatevalues()
{
    k1 = document.getElementById("key1").value;
    k2 = document.getElementById("key2").value;
    seconds = document.getElementById("seconds").value;
    BPM = document.getElementById("BPM").value;
    step = 1000 / (BPM / 15);
    stepper = 0 - step;
    changeTempo(BPM);
    if (start)
    {
        play();
    }
    else
    {
        if (isPlaying)
        {
            play();
        }
    }
}
function checkvalues()
{
    if (k1 == '')
    {
        alert("Keys must not be empty!");
        k1 = "z";
        document.getElementById("key1").value = "z";
        return 1;
    }
    if (k2 == '')
    {
        alert("Keys must not be empty!");
        k2 = "x";
        document.getElementById("key2").value = "x";
        return 1;
    }
    if (k1 == k2)
    {
        alert("Keys must not be the same!");
        return 1;
    }
    if (seconds <= 2)
    {
        alert("Seconds must be 3 or greater!");
        seconds = 30;
        document.getElementById("seconds").value = "30";
        return 1;
    }
    if (BPM < 1)
    {
        alert("BPM must be 1 or greater!");
        return 1;
    }
    if (isNaN(seconds))
    {
        alert("Seconds must be a number!");
        seconds = 30;
        document.getElementById("seconds").value = "30";
        return 1;
    }
    if (isNaN(BPM))
    {
        alert("BPM must be a number!");
        BPM = 120;
        document.getElementById("BPM").value = 120;
        return 1;
    }
    return 0;
}
