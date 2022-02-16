class Pose {

  constructor() {
    this.coordinates = [];
    this.points = [];
    this.frame = [];
    this.shoulders = {
      ly: undefined,
      ry: undefined
    }
  }

  update() {
    this.coordinate();
    this.drawKeypoints();
    this.drawSkeleton();
  }

  coordinate() {
    // console.log(this.coordinates);
    this.points = this.coordinates.pose.keypoints;
    this.frame = this.coordinates.skeleton;
    this.shoulders.ly = this.coordinates.pose.leftShoulder.y;
    this.shoulders.ry = this.coordinates.pose.rightShoulder.y;
  }

  drawKeypoints()  {
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i].score > 0.2) {
        push();
        fill(255, 0, 0);
        noStroke();
        ellipse(this.points[i].position.x, this.points[i].position.y, 10, 10);
        pop();
      }
    }
  }

  drawSkeleton() {
    for (let i = 0; i < this.frame.length; i++) {
      let partA = this.frame[i][0];
      let partB = this.frame[i][1];
      push();
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
      pop();
    }
  }

  checkBalanceShoulders() {
    let balance = this.shoulders.ry - this.shoulders.ly;
    return balance;
  }

}
