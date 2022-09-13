let engine;
let balls;
let boxes;
let mouse;

let bottomWall;
let topWall;
let leftWall;
let rightWall;

let spinner;
let angle = 0;
let direction = 1;

function setup() {
  const canvas = createCanvas(760, 760);
  canvas.parent('matter-container');

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;

  // add stacks
  boxes = new Stack(world, {
    x: 200,
    y: 0,
    cols: 1,
    rows: 3,
    colGap: 3,
    rowGap: 3,
    color: '#9bbc0f',
    create: (x, y) => Matter.Bodies.rectangle(x, y, 50, 50, { density: 1 }),
  });
  balls = new Stack(world, {
    x: 550,
    y: 0,
    cols: 3,
    rows: 1,
    colGap: 3,
    rowGap: 3,
    color: '#9bbc0f',
    create: (x, y) => Matter.Bodies.circle(x, y, 25, { density: 100 }),
  });

  bottomWall = new Block(
    world,
    {
      x: 0.5 * width,
      y: 1.5 * height,
      w: 2 * width,
      h: height,
      color: '#ffffff',
    },
    { isStatic: true }
  );
  topWall = new Block(
    world,
    {
      x: 0.5 * width,
      y: -0.5 * height,
      w: 2 * width,
      h: height,
      color: '#ffffff',
    },
    { isStatic: true }
  );
  leftWall = new Block(
    world,
    {
      x: -0.5 * width,
      y: 0.5 * height,
      w: width,
      h: 2 * height,
      color: '#ffffff',
    },
    { isStatic: true }
  );
  rightWall = new Block(
    world,
    {
      x: 1.5 * width,
      y: 0.5 * height,
      w: width,
      h: 2 * height,
      color: '#ffffff',
    },
    { isStatic: true }
  );

  spinner = new Block(
    world,
    { x: 0.5 * width, y: 0.5 * height, w: width - 30, h: 50, color: '#0f380f' },
    { isStatic: true, angle: 0 }
  );
  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Runner.run(engine);
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

let magic = 0;
// hslToHex(magic,100,50)

function draw() {
  background('#306230');
  boxes.draw();
  balls.draw();
  magic += 1;
  magic = magic % 360;
  // ground.attributes.color = hslToHex(magic,100,50);
  document.getElementById('p2').style.color = hslToHex(magic, 100, 50);
  Matter.Body.setAngle(spinner.body, angle);
  Matter.Body.setAngularVelocity(spinner.body, 0.15);
  angle += 0.01 * direction;
  spinner.draw();
  bottomWall.draw();
  topWall.draw();
  leftWall.draw();
  rightWall.draw();
  // mouse.draw();
}
