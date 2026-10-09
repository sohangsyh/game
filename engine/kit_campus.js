/* Scene kit: school_campus */
(function(){
"use strict";
const E=ENG;E.kits=E.kits||{};
E.ENV.campus_morning={sky:0xBFE0F2,hs:0xFFF6E6,hg:0x6E7C64,hi:.64,sc:0xFFEBC8,si:.64,sp:[14,20,10]};
E.ENV.campus_noon={sky:0xA9D4EE,hs:0xFAFBF6,hg:0x6E7C64,hi:.68,sc:0xFFFFFF,si:.68,sp:[4,26,6]};
E.ENV.campus_afternoon={sky:0xF0C89A,hs:0xFFE4C4,hg:0x6A5E50,hi:.74,sc:0xFFB878,si:.74,sp:[-16,12,8]};
E.ENV.campus_alarm={sky:0x6A3A3A,hs:0xFFC8B8,hg:0x4A3434,hi:.6,sc:0xFF8A6A,si:.5,sp:[-6,18,6]};
const M=(h,o)=>E.M(h,o),box=(...a)=>E.box(...a),mesh=(...a)=>E.mesh(...a),cyl=(rt,rb,h,c,x,y,z,g,seg)=>mesh(new THREE.CylinderGeometry(rt,rb,h,seg||12),M(c),x,y,z,g);
const glass=(c)=>M(c||0xBFE8F2,{transparent:true,opacity:.45});
function bench(g,w,d){box(w,.86,d,0xDCD6C8,0,.43,0,g);box(w+.04,.05,d+.04,0x2A2D30,0,.88,0,g);}
function stool(g,x,z){const s=new THREE.Group();s.position.set(x,0,z);g.add(s);cyl(.17,.17,.05,0x3A6FB0,0,.62,0,s);cyl(.03,.03,.6,0x8A9098,0,.31,0,s);cyl(.16,.16,.02,0x8A9098,0,.01,0,s);}
function wallSeg(g,w,z,col){box(w,2.8,.2,col||0xF0E8D6,0,1.4,z,g);for(let x=-w/2+1.2;x<w/2-.6;x+=2.4){const wn=box(1.6,1,.05,0x9FC8E0,x,1.85,z+.11,g);wn.material=glass(0x9FC8E0);box(1.7,.06,.08,0xFFFFFF,x,1.33,z+.12,g);}box(w,.12,.24,0x5B7FA6,0,.06,z+.02,g);}
function plant(g,x,z,s){const p=new THREE.Group();p.position.set(x,0,z);p.scale.setScalar(s||1);g.add(p);cyl(.22,.17,.4,0xE7E2D8,0,.2,0,p);mesh(new THREE.IcosahedronGeometry(.36,0),M(0x4E8F5A,{flatShading:true}),0,.7,0,p);}
const props={
  eyewash_station(g){cyl(.05,.05,1,0x9AA0A6,0,.5,0,g);const b=mesh(new THREE.SphereGeometry(.28,14,8,0,Math.PI*2,0,Math.PI/2),M(0xE8ECEE),0,1.02,0,g);b.rotation.x=Math.PI;cyl(.03,.03,.12,0x9AA0A6,-.1,1.08,0,g);cyl(.03,.03,.12,0x9AA0A6,.1,1.08,0,g);
    box(.05,1.7,.05,0x9AA0A6,.45,.85,-.2,g);box(.5,.5,.03,0x2E9B5E,.45,1.6,-.18,g).material=M(0x2E9B5E,{emissive:0x0E3A20});box(.22,.1,.01,0xFFFFFF,.45,1.6,-.16,g);return 1.9;},
  reagent_bench(g){bench(g,1.6,.8);[[-.45,0x7A4A22],[-.15,0xDCE8EE],[.15,0x7A4A22],[.45,0xDCE8EE]].forEach(([x,c])=>{cyl(.07,.08,.26,c,x,1.04,0,g);cyl(.035,.035,.05,0x2A2D30,x,1.2,0,g);});
    const hz=box(.16,.16,.01,0xF2A23A,-.15,1.04,.085,g);hz.rotation.z=Math.PI/4;stool(g,0,.7);return 1.35;},
  poster(g){box(.05,1.6,.05,0x8A9098,0,.8,0,g);box(.9,1.2,.04,0xFFFFFF,0,1.3,.03,g);box(.7,.16,.01,0x2E9B5E,0,1.66,.055,g);for(let i=0;i<3;i++)box(.6,.05,.01,0x3A3F46,0,1.38-i*.14,.055,g);box(.2,.2,.01,0xF2A23A,0,.9,.055,g);return 1.95;},
  burner_bench(g){bench(g,1.4,.8);cyl(.1,.12,.04,0x3A3F46,0,.92,0,g);cyl(.04,.04,.26,0x8A9098,0,1.06,0,g);const f=mesh(new THREE.ConeGeometry(.05,.22,10),M(0x5AA8FF,{emissive:0x2A6AE0,transparent:true,opacity:.85}),0,1.3,0,g);
    [0,2.1,4.2].forEach(a=>{const l=box(.02,.42,.02,0x2A2D30,Math.cos(a)*.16,1.1,Math.sin(a)*.16,g);});cyl(.2,.2,.02,0x6A7078,0,1.32,0,g,6);stool(g,0,.7);return 1.55;},
  tube_rack(g){box(.8,.06,.5,0xD9D4CB,0,.72,0,g);[[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([a,b])=>box(.05,.72,.05,0x5A5F66,a*.32,.36,b*.2,g));
    box(.5,.06,.16,0xB98A4A,0,.84,0,g);box(.5,.06,.16,0xB98A4A,0,.98,0,g);for(let i=0;i<4;i++){const t=cyl(.03,.03,.32,0xDCF0F6,-.18+i*.12,.98,0,g,8);t.material=glass(0xDCF0F6);}
    const cl=box(.04,.04,.36,0xC9A06A,.32,.82,.1,g);cl.rotation.y=.6;return 1.25;},
  safety_card(g){const a=box(.5,.6,.03,0xF2D24A,0,.34,.08,g);a.rotation.x=-.28;const b=box(.5,.6,.03,0xF2D24A,0,.34,-.08,g);b.rotation.x=.28;box(.36,.08,.01,0xC8452F,0,.52,.15,g).rotation.x=-.28;return .75;},
  broken_glass(g){const r=E.rng(4);for(let i=0;i<9;i++){const s=mesh(new THREE.TetrahedronGeometry(.06+r()*.06,0),glass(0xCDEFF8),(r()-.5)*.9,.03,(r()-.5)*.7,g);s.rotation.set(r()*3,r()*3,r()*3);}
    const bk=cyl(.14,.12,.24,0xCDEFF8,.3,.12,.15,g);bk.material=glass(0xCDEFF8);bk.rotation.z=Math.PI/2;const w=mesh(new THREE.CircleGeometry(.4,16),M(0x9FC8E0,{transparent:true,opacity:.35}),-.1,.012,0,g);w.rotation.x=-Math.PI/2;return .45;},
  glass_bin(g){box(.6,.7,.5,0xC49A62,0,.35,0,g);box(.62,.14,.52,0xC8452F,0,.5,0,g);box(.5,.02,.4,0x8A6A44,0,.71,0,g);return .9;},
  broom_pan(g){const st=box(.04,1.4,.04,0xB98A4A,0,.72,0,g);st.rotation.z=.22;box(.4,.18,.08,0xD9B84A,-.15,.09,0,g);box(.34,.03,.3,0x3A6FB0,.45,.02,.1,g);box(.04,.28,.04,0x3A6FB0,.45,.15,-.05,g).rotation.x=-.5;return 1.5;},
  fire_alarm(g){box(.08,1.8,.08,0x8A9098,0,.9,0,g);box(.34,.42,.12,0xD23A2E,0,1.6,.04,g).material=M(0xD23A2E,{emissive:0x5A0E08});cyl(.12,.12,.06,0xE8C24A,0,1.95,.04,g,16).rotation.x=Math.PI/2;return 2.15;},
  exit_sign(g){box(.06,2,.06,0x8A9098,0,1,0,g);box(.8,.34,.08,0x1E9A55,0,2,.04,g).material=M(0x1E9A55,{emissive:0x0E6A30});const ar=mesh(new THREE.ConeGeometry(.08,.16,3),M(0xFFFFFF,{emissive:0x888888}),.22,2,.09,g);ar.rotation.z=-Math.PI/2;box(.22,.05,.01,0xFFFFFF,-.08,2,.09,g);return 2.25;},
  lift_door(g){box(1.6,2.4,.2,0xD9D4CB,0,1.2,0,g);box(.6,2,.04,0xB8BEC6,-.31,1,.11,g);box(.6,2,.04,0xB8BEC6,.31,1,.11,g);box(.12,.3,.04,0x3A3F46,.95,1.2,.11,g);box(.4,.12,.01,0xC8452F,0,2.25,.11,g);return 2.5;}
};
function lockers(g,x,z,n){for(let i=0;i<n;i++){box(.5,1.7,.45,[0x3A6FB0,0x4E86C6][i%2],x+i*.52,.85,z,g);box(.05,.2,.02,0xE8ECEE,x+i*.52+.15,1,z+.23,g);}}
function template(name,g){
  if(name==='science_lab'){wallSeg(g,13,-7.2);[-3.6,0,3.6].forEach(x=>{[-4.6,-6.1].forEach(z=>{const b=new THREE.Group();b.position.set(x,0,z);g.add(b);bench(b,2.8,.9);cyl(.18,.18,.04,0x8A9098,0,.9,0,b);box(.04,.3,.04,0x8A9098,0,1.05,-.25,b);stool(b,-.7,.7);stool(b,.7,.7);});});
    box(1.6,2.2,.8,0xE8E4DC,-5.6,1.1,-5.4,g);box(1.4,.9,.05,0xBFE8F2,-5.6,1.4,-4.98,g).material=glass();
    const pt=new THREE.Group();pt.position.set(3.6,1.9,-7.05);g.add(pt);for(let r=0;r<4;r++)for(let c=0;c<9;c++)if(!(r===0&&c>0&&c<8))box(.18,.16,.02,[0xF2A23A,0x5AA8E0,0x7ACB7A,0xE87A8A][(r+c)%4],(c-4)*.2,-r*.18,0,pt);plant(g,6,-4,1.1);}
  if(name==='prep_room'){wallSeg(g,13,-7,0xEDE6D4);[-4.2,-1.4,1.4].forEach(x=>{box(2.4,2.2,.5,0xDCD6C8,x,1.1,-6.5,g);for(let s=0;s<3;s++){box(2.3,.04,.48,0xB9B2A2,x,.5+s*.62,-6.45,g);for(let k=0;k<5;k++){const c=cyl(.07,.07,.2+((k+s)%2)*.08,0xCDEFF8,x-.9+k*.45,.62+s*.62,-6.4,g,10);c.material=glass(0xCDEFF8);}}});
    const sk=new THREE.Group();sk.position.set(4.6,0,-6.2);g.add(sk);bench(sk,2,.8);cyl(.25,.25,.04,0x8A9098,0,.9,0,sk);plant(g,-6,-4,1);}
  if(name==='corridor'){wallSeg(g,14,-7.2,0xEFE4D0);lockers(g,-6.4,-6.8,6);lockers(g,3.4,-6.8,6);box(1.2,2.2,.1,0x8A5A36,-.4,1.1,-7.05,g);box(1.6,1,.05,0xC9A06A,-3.2,1.6,-7.05,g);
    for(let i=0;i<5;i++)box(.3,.2,.01,[0xF2D24A,0xFFFFFF,0x9FD9C6][i%3],-3.6+i*.2,1.6+(i%2)*.2,-7.02,g);box(1.6,.45,.4,0x8A5A36,5.6,.25,-4.4,g);}
}
let alarmT=0;
E.kits.school_campus={
  build(W,stagePos){
    const g=new THREE.Group();E.scene.add(g);const r=E.rng(31);
    const gr=mesh(new THREE.PlaneGeometry(260,260),M(0x7DAE5E),0,0,-25,g);gr.rotation.x=-Math.PI/2;
    stagePos.forEach((p,i)=>{const fl=mesh(new THREE.PlaneGeometry(14,13),M(0xA3AE9C),p.x,.012,p.z-1.2,g);fl.rotation.x=-Math.PI/2;
      for(let k=-6;k<=6;k+=1.2)box(.02,.004,13,0x8E9A88,p.x+k,.016,p.z-1.2,g);
      const lg=new THREE.Group();lg.position.copy(p);g.add(lg);template(W.stages[i].template,lg);});
    for(let i=0;i<stagePos.length;i++){const a=i===0?new THREE.Vector3(0,0,14):stagePos[i-1],b=stagePos[i];const d=b.clone().sub(a),len=d.length();
      const gg=new THREE.Group();gg.position.set((a.x+b.x)/2,.01,(a.z+b.z)/2);gg.rotation.y=Math.atan2(d.x,d.z);g.add(gg);mesh(new THREE.PlaneGeometry(3,len),M(0xB0A894),0,0,0,gg).rotation.x=-Math.PI/2;}
    const near=(x,z)=>{for(let i=0;i<stagePos.length;i++){const p=stagePos[i];if(Math.abs(x-p.x)<9&&Math.abs(z-p.z+1)<9)return true;const a=i===0?{x:0,z:14}:stagePos[i-1],b=p;const dx=b.x-a.x,dz=b.z-a.z,L=dx*dx+dz*dz;let t=((x-a.x)*dx+(z-a.z)*dz)/L;t=Math.max(0,Math.min(1,t));if(Math.hypot(x-(a.x+t*dx),z-(a.z+t*dz))<4)return true;}return false;};
    let n=0;while(n<70){const x=-50+r()*100,z=-80+r()*100;if(near(x,z))continue;const t=new THREE.Group();t.position.set(x,0,z);t.scale.setScalar(.9+r()*.8);g.add(t);cyl(.13,.18,1.1,0x7A5236,0,.55,0,t,6);mesh(new THREE.IcosahedronGeometry(.95,0),M([0x5FA34E,0x6FB35A,0x4E9348][n%3],{flatShading:true}),0,1.75,0,t);n++;}
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2,d=64+r()*16,h=8+r()*8,w=12+r()*10;const bd=new THREE.Group();bd.position.set(Math.cos(a)*d,0,Math.sin(a)*d-28);bd.rotation.y=-a+Math.PI/2;g.add(bd);
      box(w,h,6,0xF0E4C8,0,h/2,0,bd);for(let k=1;k<h/2.6;k++)box(w-.6,.7,6.06,0x7FB0D6,0,k*2.6,0,bd);box(w+.4,.4,6.4,0xC8452F,0,h+.2,0,bd);}
    const tr=mesh(new THREE.TorusGeometry(22,1.4,4,40),M(0xC8573A),30,.02,26,g);tr.rotation.x=-Math.PI/2;tr.scale.set(1.4,1,.04);
    const pole=cyl(.08,.1,9,0xD9DDE0,-12,4.5,10,g);box(1.6,1,.03,0xC8452F,-11.2,8.3,10,g);
    return {};
  },
  prop(type){const g=new THREE.Group();const h=(props[type]||props.poster)(g);return {g,h};},
  onFrame(dt){if(E.env.tgt===E.ENV.campus_alarm){alarmT+=dt;if(alarmT>1.1){alarmT=0;E.flash(false,0xD8322A);E.env.pulse=.55;}}}
};
})();
