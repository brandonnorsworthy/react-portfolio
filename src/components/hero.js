import React, { Component } from 'react'
import '../styles/blob.css'

const numberOfBlobs = 40;
const baseSpeed = 20; //lowest speed every blob recieves
const sizeVariance = 75;
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
                    <svg id="visual" preserveAspectRatio="none" viewBox="0 0 900 600" width="900" height="600" xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <path d="M0 444L15 450.3C30 456.7 60 469.3 90 473.8C120 478.3 150 474.7 180 469.7C210 464.7 240 458.3 270 455.8C300 453.3 330 454.7 360 458.8C390 463 420 470 450 471C480 472 510 467 540 463.2C570 459.3 600 456.7 630 459C660 461.3 690 468.7 720 470.8C750 473 780 470 810 467.2C840 464.3 870 461.7 885 460.3L900 459L900 601L885 601C870 601 840 601 810 601C780 601 750 601 720 601C690 601 660 601 630 601C600 601 570 601 540 601C510 601 480 601 450 601C420 601 390 601 360 601C330 601 300 601 270 601C240 601 210 601 180 601C150 601 120 601 90 601C60 601 30 601 15 601L0 601Z" fill="#12192c"></path>
                        <path d="M0 479L15 483.7C30 488.3 60 497.7 90 499.8C120 502 150 497 180 498.2C210 499.3 240 506.7 270 509.8C300 513 330 512 360 507.5C390 503 420 495 450 490.3C480 485.7 510 484.3 540 486.2C570 488 600 493 630 496C660 499 690 500 720 497.2C750 494.3 780 487.7 810 489.3C840 491 870 501 885 506L900 511L900 601L885 601C870 601 840 601 810 601C780 601 750 601 720 601C690 601 660 601 630 601C600 601 570 601 540 601C510 601 480 601 450 601C420 601 390 601 360 601C330 601 300 601 270 601C240 601 210 601 180 601C150 601 120 601 90 601C60 601 30 601 15 601L0 601Z" fill="#17344d"></path>
                        <path d="M0 508L15 509.5C30 511 60 514 90 516.8C120 519.7 150 522.3 180 521.5C210 520.7 240 516.3 270 513.3C300 510.3 330 508.7 360 508.7C390 508.7 420 510.3 450 512.5C480 514.7 510 517.3 540 517.7C570 518 600 516 630 517.2C660 518.3 690 522.7 720 525C750 527.3 780 527.7 810 526.3C840 525 870 522 885 520.5L900 519L900 601L885 601C870 601 840 601 810 601C780 601 750 601 720 601C690 601 660 601 630 601C600 601 570 601 540 601C510 601 480 601 450 601C420 601 390 601 360 601C330 601 300 601 270 601C240 601 210 601 180 601C150 601 120 601 90 601C60 601 30 601 15 601L0 601Z" fill="#11526c"></path>
                        <path d="M0 548L15 549.3C30 550.7 60 553.3 90 555.3C120 557.3 150 558.7 180 557.5C210 556.3 240 552.7 270 550.3C300 548 330 547 360 547.2C390 547.3 420 548.7 450 548.3C480 548 510 546 540 545C570 544 600 544 630 546C660 548 690 552 720 549.3C750 546.7 780 537.3 810 533C840 528.7 870 529.3 885 529.7L900 530L900 601L885 601C870 601 840 601 810 601C780 601 750 601 720 601C690 601 660 601 630 601C600 601 570 601 540 601C510 601 480 601 450 601C420 601 390 601 360 601C330 601 300 601 270 601C240 601 210 601 180 601C150 601 120 601 90 601C60 601 30 601 15 601L0 601Z" fill="#037286"></path>
                        <path d="M0 572L15 570.3C30 568.7 60 565.3 90 565.7C120 566 150 570 180 569.2C210 568.3 240 562.7 270 563.8C300 565 330 573 360 576.2C390 579.3 420 577.7 450 577.8C480 578 510 580 540 577.2C570 574.3 600 566.7 630 567C660 567.3 690 575.7 720 577.2C750 578.7 780 573.3 810 569C840 564.7 870 561.3 885 559.7L900 558L900 601L885 601C870 601 840 601 810 601C780 601 750 601 720 601C690 601 660 601 630 601C600 601 570 601 540 601C510 601 480 601 450 601C420 601 390 601 360 601C330 601 300 601 270 601C240 601 210 601 180 601C150 601 120 601 90 601C60 601 30 601 15 601L0 601Z" fill="#18939a"></path>
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
