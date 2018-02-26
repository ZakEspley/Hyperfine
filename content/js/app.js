$(document).ready(function(){

    PIXI.utils.sayHello();

    var folder = "https://zakespley.github.io/Hyperfine/images/thefloatinghourglass/";

    let type = "WebGL"
    if (!PIXI.utils.isWebGLSupported()) {
        type = 'canvas'
    }

    let app = new PIXI.Application({
        width: 512,
        height: 512,
        antialias: true,
        transparent: false,
        resolution: 1
    });

    //Place Origin in Bottom Right
    app.stage.position.y = app.renderer.height;
    app.stage.scale.y = -1;
    // var container = document.querySelector(".container").getBoundingClientRect()
    // var stageWidth =  window.innerWidth;
    var stageWidth = $(".container").width()*0.95;
    var stageHeight = 512;
    app.renderer.backgroundColor = 0x38c9ff;
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(stageWidth, stageHeight);
    var play = false;
    var running = false;
    window.addEventListener("resize", function (e) {
        var stageWidth = $(".container").width()*0.95;
        // stageWidth =  window.innerWidth;
        // stageHeight = 512;
        app.renderer.resize(stageWidth, stageHeight);
        //Place Origin in Bottom Right
        app.stage.position.y = app.renderer.height;
        app.stage.scale.y = -1;
        mb.setX(0.33*app.renderer.width);
        mt.setX(0.66*app.renderer.width);
        mt.width = 0.25*stageWidth;
        mb.width = 0.25*stageWidth;
    })

    function updateSimulation(event, ui) {
        if (ui.handle.parentElement == lambdaSlide[0]) {
            lambda = ui.value;
            lamVal.val(lambda);
        } else if (ui.handle.parentElement == kappaSlide[0]) {
            kappa = ui.value;
            kapVal.val(kappa);
        }
        mt.sand.height = lambda*mt.border.height;
        mb.sand.height = (1-lambda)*mb.border.height;
        mt.sand.alpha = (1/kMax**j)*kappa**j
        mb.sand.alpha = (1/kMax**j)*kappa**j
        mt.mg_vec.height = mw*g*kappa*lambda;
        mb.mg_vec.height = mw*g*kappa*(1-lambda);
        at = (1/(lambda*kappa) - 1)*g;
        ab = (1/((1-lambda)*kappa)-1)*g;
        functionPlot({
            target: '#canchart',
            data: [
                {
                    fn: '(1/({0}*x)-1)'.format(kappa.toString())
                }, {
                    fn: '(1/((1-x)*{0})-1)'.format(kappa.toString())
                }, {
                    fn: '1/({0}*x) + 1/((1-x){0}) -2'.format(kappa.toString())
                }, {
                    x: 'x={0}'.format(lambda),
                    y: 'y=t',
                    fnType: 'parametric',
                    graphType: "polyline",
                    range: [-1,10],
                    nSamples:4
                }
            ],
            xAxis:{
                label:"Lambda",
                domain: [0,1]
            },
            yAxis:{
                domain:[-1,3]
            },
            annotations: [{
                x: lambda,
                text: "Current Lambda",
            }]
        });

    }

    
    var lamVal = $('#lamVal');
    var kapVal = $("#kapVal");
    var lambdaSlide = $("#lambda");

    console.log(lambdaSlide)

    lambdaSlide = lambdaSlide.slider({
        orientation: "horizontal",
        max: 1,
        min: 0,
        step: 0.01,
        value: 0.5,
        slide: updateSimulation,
        change: updateSimulation,
        stop: updateSimulation,
        start: updateSimulation
    }
    )

    var kappaSlide = $("#kappa")
    kappaSlide.slider({
        orientation: 'horizontal',
        min: 0,
        max: 3,
        step: 0.1,
        value: 2,
        slide: updateSimulation,
        change: updateSimulation,
        stop: updateSimulation,
        start: updateSimulation
    })


    var lambda = lambdaSlide.slider('value');
    var kappa = kappaSlide.slider('value');
    var mbp = 1 - lambda;
    var mtp = lambda;
    var mw = 8;
    var g = 10;
    var at = (1/(lambda*kappa) - 1)*g;
    var ab = (1/((1-lambda)*kappa)-1)*g;
    lamVal.val(lambda);
    kapVal.val(kappa);


    var mt = new Can("mt", 0.66 * app.renderer.width, 0.5 * stageHeight, 0.25 * stageWidth, 0.25 * stageHeight,
        0xe7990a, mtp, mw, g, kappa);
    var mb = new Can("mb", 0.33 * app.renderer.width, 0.5 * stageHeight, 0.25 * stageWidth, 0.25 * stageHeight,
        0xe7990a, mbp, mw, g, kappa);

    var kMax = kappaSlide.slider('option',"max");
    var j = 0.3;
    // mt.sand.alpha = (1/Math.PI * Math.asin(2/kMax*kappa-1)+1/2);
    // mb.sand.alpha = (1/Math.PI * Math.asin(2/kMax*kappa-1)+1/2);
    mt.sand.alpha = (1/kMax**j)*kappa**j;
    mb.sand.alpha = (1/kMax**j)*kappa**j;

    var playTexture = PIXI.Texture.fromImage(folder + 'play.svg');
    var pauseTexture = PIXI.Texture.fromImage(folder + 'pause.svg')

    function playSim() {
        if (play){
            controlButton.setTexture(playTexture);
        } else {
            controlButton.setTexture(pauseTexture);
        }
        play = !play;
    }

    function runSim() {
        reset();
        lambdaSlide.slider('value', 0.99);
        running = true;
        playSim();
    }

    function reset() {
        time = 0;
        mb.y = mb.y0;
        mt.y = mt.y0;
        mt.vy = 0;
        mb.vy = 0;
        counter = 0;
        running=false;
    }

    var controlButton = new PIXI.Sprite(playTexture);

    controlButton.interactive = true;
    controlButton.buttonMode = true;
    controlButton.x=20;
    controlButton.y=20;
    controlButton.on('pointerdown', playSim);

    resetButton = new PIXI.Sprite.fromImage(folder + "refresh-ccw.svg");
    resetButton.interactive = true;
    resetButton.buttonMode = true;
    resetButton.x = 100;
    resetButton.y = 20;
    resetButton.on("pointerdown", reset);

    runButton = new PIXI.Sprite.fromImage(folder + "run.png");
    runButton.interactive = true;
    runButton.buttonMode = true;
    runButton.scale.y=-0.7;
    runButton.scale.x=0.7
    runButton.x = 50;
    runButton.y = 50;
    runButton.on('pointerdown', runSim);
    

    app.stage.addChild(mt);
    app.stage.addChild(mb);
    app.stage.addChild(controlButton);
    app.stage.addChild(resetButton);
    app.stage.addChild(runButton);
    document.getElementById('display').appendChild(app.view);
    var timescale = 0.00025;
    var time = 0;
    var counter = 0
    app.ticker.add(delta => gameloop(delta));
    function gameloop(delta) {
        
        if (play) {
            time += delta*timescale;
            counter += 1;
            mt.y = mt.y + mt.vy*time;
            mb.y = mb.y + mb.vy*time;
            mt.vy = mt.vy + at*time;
            mb.vy = mb.vy + ab*time;
            // mt.y = mt.y0 + 1/2*at*(time)**2;
            // mb.y = mb.y0 + 1/2*ab*time**2;
            if (running && counter%3==0 && lambda>=0.02) {
                lambdaSlide.slider('value', lambda-0.01);
            }
        }
    }

    //
    //  Charts are below here
    //
    // var lambdaX = range(0, 1.01, 0.01);
    // var aty = lambdaX.map(l => (1/(l*kappa) -1)*g);
    // var aty = lambdaX.multiply(2);
    // var atb = (1/((1-lambdaX)*kappa) -1)*g;
    // var data1 = concateV(lambdaX, aty);
    // var data1 = [[1,1], [3,2]]

    
    // $('#canchart').highcharts({
    //     chart: {
    //         type: 'line'
    //     },
    //     plotOptions: {
    //         marker: {
    //             enabled: false
    //         },
    //         linewidth: 2,
    //     },
    //     series : [
    //         {type:"line",
    //         data:data1}
    //     ]
    // })

    // var trace1 = {
    //     type: 'scatter',
    //     x: lambdaX,
    //     y: aty,
    //     name: "Acceleration of Top Can",
    //     line: {
    //         color: '#e8e20b',
    //         width: 3
    //     }
    // };
    
    // var data1 = [trace1];
    // Plotly.newPlot('canchart', data1);

    functionPlot({
        target: '#canchart',
        data: [
            {
                fn: '(1/({0}*x)-1)'.format(kappa.toString()),
                text: "a_t"
            }, {
                fn: '(1/((1-x)*{0})-1)'.format(kappa.toString())
            }, {
                fn: '1/({0}*x) + 1/((1-x){0}) -2'.format(kappa.toString())
            }, {
                x: 'x={0}'.format(lambda),
                y: 'y=t',
                fnType: 'parametric',
                graphType: "polyline",
                range: [-1,10],
                nSamples:4
            }
        ],
        xAxis:{
            label:"Lambda",
            domain: [0,1]
        },
        yAxis:{
            domain:[-1,3]
        },
        annotations: [{
            x: lambda,
            text: "Current Lambda",
        }],
        width:500
    });

    
});

function range(start, stop, step=1) {
    var range = [];
    i=0;
    while (start < stop) {
        range[i] = start;
        start += step;
        i += 1;
    }
    return range
}

function concateV(a1, a2) {
    i = 0;
    a = [];
    while (i < a1.length) {
        a[i] = [a1[i], a2[i]];
        i += 1;
    }

    return a;

}

String.prototype.format = function() {
    a = this;
    for (k in arguments) {
      a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k])
    }
    return a
  }

class Arrow extends PIXI.Container {
    constructor(x0,y0,dx,dy, color, lw=1) {
        super();
        this.arrow = new PIXI.Graphics();
        this.x = x0 - lw;
        this.y = y0;
        this.x0 = this.x;
        this.y0 = this.y;
        this.xc = x0;
        this.yc = 0;
        this.arrow.beginFill(color);
        this.arrow.moveTo(lw,0);
        this.arrow.lineStyle(lw, color);
        this.arrow.lineTo(lw+dx, 0.9*dy);
        this.arrow.drawPolygon([dx,0.9*dy,dx+2*lw,0.9*dy,lw+dx,dy,dx,0.9*dy])
        this.addChild(this.arrow);
    }
}

class Can extends PIXI.Container {
    constructor(name, x, y, width, height, color, percent = 1, mw=1, g=1, kappa=1) {
        super();

        this.sand = new PIXI.Graphics();
        this.border = new PIXI.Graphics();
        this.name = new PIXI.Sprite.fromImage("https://zakespley.github.io/Hyperfine/images/thefloatinghourglass/" + name + ".png");
        this.origin = new PIXI.Graphics();
        this.x = x - width/2;
        this.y = y - height/2;
        this.x0 = this.x;
        this.y0 = this.y;
        this.xc = x;
        this.yc = y;
        this.vx = 0;
        this.vy = 0;
        this.height = height;
        this.width = width;
        
        this.sand.beginFill(color);
        this.sand.drawRect(0, 0, width, height * percent);
        this.border.lineStyle(3, 0x000000, 1);
        this.border.endFill();
        this.border.drawRect(0, 0, width, height);
        // this.origin.beginFill(0xff0000);
        // this.origin.drawCircle(0, 0, 5);
        
        this.name.anchor.x = 0.5;
        this.name.anchor.y = 0.5;
        this.name.x = width/2;
        this.name.y = height/2;
        this.name.scale.y = -0.5;
        this.name.scale.x = 0.5;

        this.fb = mw*g;
        this.mg = -percent*kappa*mw*g;
        this.fb_vec = new Arrow(width/2, height/2, 0, this.fb, 0xb90025, 5);
        this.mg_vec = new Arrow(width/2, height/2, 0, this.mg, 0x6c2eb8, 5)
        this.addChild(this.sand);
        this.addChild(this.border);
        // this.addChild(this.origin);
        this.addChild(this.fb_vec);
        this.addChild(this.mg_vec);
        this.addChild(this.name);
    }

    setX(x) {
        this.x = x-this.width/2;
    }

    setY(y) {
        this.y = y-this.height/2;
    }
}


// lambda = 0.4;
