// Doors between palaces. A palace's loci.json may list "portals": a locus that
// leads to another palace, and where you arrive here when you come back
// through it. The page is reloaded as ?palace=<to>&from=<here>.

const REACH = 2.4; // metres, across the floor, from the locus
const ABOVE = 3.6; // how far the number may float above your feet

export class Portals {
  // `fromBlender` maps a Blender [x, y, z] to a three.js Vector3.
  constructor(portals, loci, fromBlender, palace) {
    this.palace = palace;
    this.fromBlender = fromBlender;
    this.list = portals.map((p) => ({
      ...p,
      at: fromBlender(loci[p.locus - 1].at),
      label: loci[p.locus - 1].label,
    }));
  }

  // Where to appear when arriving from `from`, or null.
  arrival(from) {
    const p = this.list.find((q) => q.to === from && q.arrive);
    if (!p) return null;
    const [x, y, z, yaw] = p.arrive;
    return { spawn: this.fromBlender([x, y, z]), yaw };
  }

  // The portal within reach of a player standing at `pos`, or null.
  near(pos) {
    return this.list.find((p) => Math.hypot(p.at.x - pos.x, p.at.z - pos.z) < REACH
      && p.at.y - pos.y > -0.5 && p.at.y - pos.y < ABOVE) ?? null;
  }

  go(portal) {
    location.search = `?palace=${encodeURIComponent(portal.to)}&from=${encodeURIComponent(this.palace)}`;
  }
}
