import * as THREE from "three";

export class ParticleSystem {
  constructor(line = false) {
    this.geo = new THREE.BufferGeometry();
    this.count = 5000;

    if (!line) {
      this.mat = new THREE.PointsMaterial({
        size: 0.005,
      });
      this.mesh = new THREE.Points(this.geo, this.mat);
    } else {
      this.mat = new THREE.LineBasicMaterial({ vertexColors: true });
      this.mesh = new THREE.Line(this.geo, this.mat);
    //   this.mesh = new THREE.LineSegments(this.geo, this.mat);
    }

    this.clock = new THREE.Clock();
    this.particles = [];

    (this.x = 0.001),
      (this.y = 0.01),
      (this.z = 0.001),
      (this.a = 10),
      (this.b = 28),
      (this.c = 8.0 / 3.0);

    this.r = 50;
  }

  getMesh() {
    return this.mesh;
  }

  spawn(position) {
    const elapsedTime = this.clock.getElapsedTime();
    this.particles.push({
      position: position,
    //   color: [position[0] / this.r + 0.5, position[1] / this.r + 0.5, position[2] / this.r + 0.5]
    color: [position[0] / this.r + 0.5, position[1] / this.r + 0.5, position[2] / this.r + 0.5]
    });
    console.log(this.particles[this.particles.length - 1].color)
  }

  update() {
    // const elapsedTime = this.clock.getElapsedTime();

    const dt = 0.01;
    const dx = this.a * (this.y - this.x) * dt;
    const dy = (this.x * (this.b - this.z) - this.y) * dt;
    const dz = (this.x * this.y - this.c * this.z) * dt;

    this.x = this.x + dx;
    this.y = this.y + dy;
    this.z = this.z + dz;

    this.spawn([this.x, this.y, this.z]);

    this.geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(
        this.particles.map((particle) => particle.position).flat(),
        3
      )
    );

    this.geo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(
        this.particles.map((particle) => particle.color).flat(),
        3
      )
    );
    // this.geometry.setAttribute("scale", new THREE.Float32BufferAttribute(this.particles.map((particle) => particle.scale).flat(), 1));
    // this.geometry.setAttribute("alpha", new THREE.Float32BufferAttribute(this.particles.map((particle) => particle.alpha).flat(), 1));
    this.geo.attributes.position.needsUpdate = true;
    // this.geometry.attributes.scale.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
    // generateMorphTargets( this.geo, this.count, this.r );
  }
}

function generateMorphTargets(geometry, segments, r) {
  const data = [];

  for (let i = 0; i < segments; i++) {
    const x = Math.random() * r - r / 2;
    const y = Math.random() * r - r / 2;
    const z = Math.random() * r - r / 2;

    data.push(x, y, z);
  }

  const morphTarget = new THREE.Float32BufferAttribute(data, 3);
  morphTarget.name = "target1";

  geometry.morphAttributes.position = [morphTarget];
}
