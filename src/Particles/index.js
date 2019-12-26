import Emitter from "./Emitter";
import Vector from "./Vector";
import Field from "./Field";

export const startDrawing = () => {
  let maxParticles = 20000,
    particleSize = 10,
    emissionRate = 30

  let canvas = document.querySelector('canvas');
  let ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let midX = canvas.width / 2;
  let midY = canvas.height / 2;

  let particles = [];
  let emitters = [
    new Emitter(new Vector(0, 0), Vector.fromAngle(0, 2)),
    new Emitter(new Vector(canvas.width, 0), Vector.fromAngle(0, 2)),
    new Emitter(new Vector(0, canvas.height), Vector.fromAngle(0, 2)),
    new Emitter(new Vector(canvas.width, canvas.height), Vector.fromAngle(0, 2))
  ];
  let fields = [new Field(new Vector(midX + 150, midY), -140)];

  const addNewParticles = () => {
    if (particles.length > maxParticles)
      return;
    emitters.map(emitter => {
      for (let now = 0; now < emissionRate; ++now)
        particles.push(emitter.emitParticle());
    })
  }

  const plotParticles = (boundsX, boundsY) => {
    let currentParticles = [];
    particles.map(particle => {
      let position = particle.position;
      if (position.x < 0 || position.x > boundsX || position.y < 0 || position.y > boundsY)
        return;
      particle.submitToFields(fields);

      particle.move();

      currentParticles.push(particle);
    })
    particles = currentParticles;
  }

  const drawParticles = () => {
    ctx.fillStyle = '#AFCBF2';
    particles.map(particle => {
      const { position } = particle;
      particleSize = parseInt(Math.random() * particleSize + 1);
      ctx.fillRect(position.x, position.y, particleSize, particleSize);
    })
  }

  const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const update = () => {
    addNewParticles();
    plotParticles(canvas.width, canvas.height);
  }

  const draw = () => {
    drawParticles();
  }

  const queue = () => {
    window.requestAnimationFrame(loop);
  }

  const loop = () => {
    update();
    clear();
    draw();
    queue();
  }

  return ({ turnOnLoop }, position) => {
    if (turnOnLoop)
      loop();
    else
      fields[0].setPosition(position);
  };
}