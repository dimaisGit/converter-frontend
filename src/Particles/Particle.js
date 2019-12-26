import Vector from "./Vector";

class Particle {
    static forceMultiplier = 1.5

    constructor(point, velocity, acceleration){
        this.position = point || new Vector(0, 0);
        this.velocity = velocity || new Vector(0, 0);
        this.acceleration = acceleration || new Vector(0, 0);
    }

    submitToFields = fields => {
        let totalAccelerationX = 0;
        let totalAccelerationY = 0;
        fields.map(field => {
            let vectorX = field.position.x - this.position.x;
            let vectorY = field.position.y - this.position.y;

            let force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, Particle.forceMultiplier);

            totalAccelerationX += vectorX * force;
            totalAccelerationY += vectorY * force;
        })

        this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
    }

    move = () => {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
    }
}

export default Particle;