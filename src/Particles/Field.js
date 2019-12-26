class Field {
    constructor(point, mass) {
        this.position = point;
        this.mass = mass || 100;
    }

    setPosition = position => {
        this.position = position
    }
}

export default Field;