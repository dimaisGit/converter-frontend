import Vector from "./Vector";
import Particle from "./Particle";

class Emitter {
    constructor(point, velocity, spread, color) {
        this.position = point;
        this.velocity = velocity;
        this.spread = spread || Math.PI;
    }

    emitParticle = () => {
        let angle = this.velocity.getAngle() + this.spread - Math.random() * this.spread * 2;

        let magnitude = this.velocity.getMagnitude();

        let position = new Vector(this.position.x, this.position.y);

        let velocity = Vector.fromAngle(angle, magnitude);

        return new Particle(position, velocity);
    }

}

export default Emitter;