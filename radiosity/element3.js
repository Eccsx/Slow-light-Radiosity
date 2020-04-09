import Vector3 from './vector3.js';
import Spectra from './spectra.js';

export default class Element3 {
  constructor(vertexArray, patch) {
    this.patch = patch;               // Parent patch
    this._area = 0;                    // Element area
    this.next = null;                 // Next element
    this.exitance = new Spectra();            // Spectral exitance
    this.vertexArray = vertexArray;   // Vexter array
    this.isQuad = false;
    this._norm = null;
  }

  get numVert() {
    return this.isQuad ? 4 : 3;
  }

  get area() {
    if (this._area === 0) {
      const va = new Vector3(this.vertexArray[0].posn, this.vertexArray[1].posn);
      const vb = new Vector3(this.vertexArray[0].posn, this.vertexArray[2].posn);
      let temp = va.cross(vb);
      this._area = temp.length / 2.0;
      if (this.isQuad) {
        const vc = new Vector3(this.vertexArray[3].posn, this.vertexArray[0].posn);
        temp = vb.cross(vc);
        this._area += temp.length / 2.0;
      }
    }
    return this._area;
  }

  get normal() {
    if (this._norm === null) {
      const va = new Vector3(this.vertexArray[0].posn, this.vertexArray[1].posn);
      const vb = new Vector3(this.vertexArray[0].posn, this.vertexArray[2].posn);
      this._norm = va.cross(vb);
    }
    return this._norm;
  }
}