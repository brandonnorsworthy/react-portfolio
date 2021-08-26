import React, { Component } from 'react'
import '../styles/blob.css'

const numberOfBlobs = 20;
const baseSpeed = 30; //lowest speed every blob recieves
const sizeVariance = 75
let blobs = []; //all the blob objects
let blobElements = []; //all the temporary dom blobs
let ranOnce = false; //prevents dev duplicating blobs

function createBlobs() {
    //prevent dev running twice and creating duplicate blobs
    if (ranOnce) { return (<></>) } else { ranOnce = true; }

    //create how ever many blobs are preset
    for (let index = 1; index < numberOfBlobs + 1; index++) {
        var tempBlobElement = document.createElement('div')
        var tempBlob = new Blob(index)

        //basic needs for a blob to work and look blobby
        tempBlobElement.style.borderRadius = '50%'
        tempBlobElement.classList.add('blur')
        //names the blob with the blob number so we can refer to it later
        tempBlobElement.classList.add(`blob${index}`)

        //uses the blobs class generated attributes to style the blob
        tempBlobElement.style.backgroundColor = "rgb(" + tempBlob.color.r + ", " + tempBlob.color.g + ", " + tempBlob.color.b + ")";
        tempBlobElement.style.width = String(tempBlob.size) + 'px'
        tempBlobElement.style.height = String(tempBlob.size) + 'px'

        //add the new blobs into the global blob array which we refer to later
        blobElements.push(tempBlobElement)
        blobs.push(tempBlob)
    }
}

class Blob {
    constructor(blobNumber) {
        //used to refer to the blob its like an id
        this.blobNumber = blobNumber;
        this.size = Math.floor((Math.random() * sizeVariance) + sizeVariance)
        this.color = createRGB(blobNumber);
        //vector has a x and a y, the speed can go from negative 1/2 of base speed up to 1/2 base speed in any direction
        this.vector = { x: Math.floor(Math.random() * baseSpeed - baseSpeed / 2), y: Math.floor(Math.random() * baseSpeed - baseSpeed / 2) }
        this.currentLocation = { x: 0, y: 0 }
        this.element = document.getElementById(`blob` + blobNumber)
    }

    move() {
        // console.log("Viewport", document.documentElement.clientHeight / 2, document.documentElement.clientWidth / 2)
        // console.log("Location", this.currentLocation.y, this.currentLocation.x)

        //if the current location is beyond height / 2 or below negative height / 2 (because we start in middle) added on the size to account for not going over
        if (this.currentLocation.y > (document.documentElement.clientHeight / 2) - this.size / 4 ||
            this.currentLocation.y < -(document.documentElement.clientHeight / 2) + this.size / 4) {
            //if the vector is negative make postive else make negative
            this.vector.y < 0 ? this.vector.y = -(this.vector.y) : this.vector.y = 0 - this.vector.y
        }

        //if the current location is beyond width / 2 or below negative width / 2 (because we start in middle) added on the size to account for not going over
        if (this.currentLocation.x > (document.documentElement.clientWidth / 2) - this.size / 4 ||
            this.currentLocation.x < -(document.documentElement.clientWidth / 2) + this.size / 4) {
            //if the vector is negative make postive else make negative
            this.vector.x < 0 ? this.vector.x = -(this.vector.x) : this.vector.x = 0 - this.vector.x
        }

        //push elements in the direction they need to go
        this.element.style["-webkit-transform"] = `translate(${(this.vector.x + this.currentLocation.x) + 'px'},${(this.vector.y + this.currentLocation.y) + 'px'})`;
        this.element.style["-moz-transform"] = `translate(${(this.vector.x + this.currentLocation.x) + 'px'},${(this.vector.y + this.currentLocation.y) + 'px'})`;
        this.element.style["-ms-transform"] = `translate(${(this.vector.x + this.currentLocation.x) + 'px'},${(this.vector.y + this.currentLocation.y) + 'px'})`;
        this.element.style["-o-transform"] = `translate(${(this.vector.x + this.currentLocation.x) + 'px'},${(this.vector.y + this.currentLocation.y) + 'px'})`;
        this.element.style["transform"] = `translate(${(this.vector.x + this.currentLocation.x) + 'px'},${(this.vector.y + this.currentLocation.y) + 'px'})`;

        //update to the new location
        this.currentLocation.x += this.vector.x
        this.currentLocation.y += this.vector.y
    }
}

function createRGB(number) {
    const colorRangeLimit = 30;
    var rgbObj = { r: 0, g: 0, b: 0 };

    console.log(number, number % 3, number + 1 % 3)

    //if the blobs number is %3 then main color is red, %2 main color is green, %1 is blue
    number % 3 === 0 ? rgbObj = { r: 255, g: Math.floor(Math.random() * 255), b: Math.floor(Math.random() * 255) }
        : number % 2 === 0 ? rgbObj = { r: Math.floor(Math.random() * 255), g: 255, b: Math.floor(Math.random() * 255) }
            : rgbObj = { r: Math.floor(Math.random() * 255), g: Math.floor(Math.random() * 255), b: 255 }

    //prevent white blobs
    if (rgbObj.r < rgbObj.g + colorRangeLimit && rgbObj.r > rgbObj.g - colorRangeLimit) {
        rgbObj.r = 0
    } else if (rgbObj.g < rgbObj.b + colorRangeLimit && rgbObj.g > rgbObj.b - colorRangeLimit) {
        rgbObj.g = 0
    } else if (rgbObj.b < rgbObj.r + colorRangeLimit && rgbObj.b > rgbObj.r - colorRangeLimit) {
        rgbObj.b = 0
    }

    return rgbObj
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let i = 0;
async function moveBlobs() {
    i++;
    if (i > 20000) { return; }
    sleep(250).then(() => {
        blobs.map(blob => blob.move());

        moveBlobs()
    });
}

class Hero extends Component {
    componentDidMount() {
        //after the component renders add all the blobs onto the dom
        var container = document.getElementById("blob-container")
        //map over the global blobElements variable that gets created earlier
        blobElements.map(blobElement => (
            container.appendChild(blobElement)
        ))
        for (let child of container.children) {
            //look through all the divs in the blob container
            if (child.nodeName === 'DIV') {
                //split class 'blob12' into just the number '12'
                let temp = child.classList[1].substr(4, child.classList[1].length)
                //use the blob number to find the corresponding class '12' == blobNumber
                let found = blobs.find(element => element.blobNumber === Number(temp))
                //once we find the class let the class know who belongs to it so we can move that div around
                found.element = child
            }
        }
        //after we created all the blobs go move them
        moveBlobs();
    }

    render() {
        return (
            <section className="hero-background" id="landing" >
                <div className="spacer">
                    <svg preserveAspectRatio="none" id="visual" viewBox="0 0 960 540" width="960" height="540" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <path d="M0 429L16 428C32 427 64 425 96 425C128 425 160 427 192 425.3C224 423.7 256 418.3 288 418.8C320 419.3 352 425.7 384 427.8C416 430 448 428 480 427.3C512 426.7 544 427.3 576 428.7C608 430 640 432 672 428C704 424 736 414 768 413.8C800 413.7 832 423.3 864 425.7C896 428 928 423 944 420.5L960 418L960 541L944 541C928 541 896 541 864 541C832 541 800 541 768 541C736 541 704 541 672 541C640 541 608 541 576 541C544 541 512 541 480 541C448 541 416 541 384 541C352 541 320 541 288 541C256 541 224 541 192 541C160 541 128 541 96 541C64 541 32 541 16 541L0 541Z" fill="#12192c">
                        </path>
                        <path d="M0 453L16 448.8C32 444.7 64 436.3 96 433.8C128 431.3 160 434.7 192 434.8C224 435 256 432 288 435.5C320 439 352 449 384 450.5C416 452 448 445 480 443C512 441 544 444 576 443.8C608 443.7 640 440.3 672 440.2C704 440 736 443 768 445C800 447 832 448 864 449.5C896 451 928 453 944 454L960 455L960 541L944 541C928 541 896 541 864 541C832 541 800 541 768 541C736 541 704 541 672 541C640 541 608 541 576 541C544 541 512 541 480 541C448 541 416 541 384 541C352 541 320 541 288 541C256 541 224 541 192 541C160 541 128 541 96 541C64 541 32 541 16 541L0 541Z" fill="#3e284e">
                        </path>
                        <path d="M0 458L16 458.2C32 458.3 64 458.7 96 458C128 457.3 160 455.7 192 455.7C224 455.7 256 457.3 288 460.3C320 463.3 352 467.7 384 469.7C416 471.7 448 471.3 480 472.7C512 474 544 477 576 474.3C608 471.7 640 463.3 672 459C704 454.7 736 454.3 768 455.7C800 457 832 460 864 462.8C896 465.7 928 468.3 944 469.7L960 471L960 541L944 541C928 541 896 541 864 541C832 541 800 541 768 541C736 541 704 541 672 541C640 541 608 541 576 541C544 541 512 541 480 541C448 541 416 541 384 541C352 541 320 541 288 541C256 541 224 541 192 541C160 541 128 541 96 541C64 541 32 541 16 541L0 541Z" fill="#7b2f5d">
                        </path>
                        <path d="M0 498L16 495.7C32 493.3 64 488.7 96 489C128 489.3 160 494.7 192 493.5C224 492.3 256 484.7 288 483.5C320 482.3 352 487.7 384 490.5C416 493.3 448 493.7 480 494C512 494.3 544 494.7 576 494.2C608 493.7 640 492.3 672 492.7C704 493 736 495 768 493C800 491 832 485 864 483.2C896 481.3 928 483.7 944 484.8L960 486L960 541L944 541C928 541 896 541 864 541C832 541 800 541 768 541C736 541 704 541 672 541C640 541 608 541 576 541C544 541 512 541 480 541C448 541 416 541 384 541C352 541 320 541 288 541C256 541 224 541 192 541C160 541 128 541 96 541C64 541 32 541 16 541L0 541Z" fill="#b43953">
                        </path>
                        <path d="M0 502L16 501.8C32 501.7 64 501.3 96 504.7C128 508 160 515 192 517.7C224 520.3 256 518.7 288 516C320 513.3 352 509.7 384 508.5C416 507.3 448 508.7 480 510C512 511.3 544 512.7 576 514C608 515.3 640 516.7 672 516.8C704 517 736 516 768 516.2C800 516.3 832 517.7 864 517.7C896 517.7 928 516.3 944 515.7L960 515L960 541L944 541C928 541 896 541 864 541C832 541 800 541 768 541C736 541 704 541 672 541C640 541 608 541 576 541C544 541 512 541 480 541C448 541 416 541 384 541C352 541 320 541 288 541C256 541 224 541 192 541C160 541 128 541 96 541C64 541 32 541 16 541L0 541Z" fill="#d95b35">
                        </path>
                    </svg>
                </div>
                <div className="blob-filter">
                    &nbsp;
                </div>
                <div className="main-content" id="blob-container">
                    <p className="myname blur">
                        <b>Brandon Norsworthy</b>
                    </p>
                    {createBlobs()}
                </div>
            </section>
        )
    }
}

export default Hero
