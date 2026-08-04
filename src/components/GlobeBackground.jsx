import { useEffect, useRef } from 'react';

/**
 * Apple-Style Subtle Globe — Light Mode.
 *
 * Ultra-light wireframe sphere with tiny nodes and gossamer
 * connection arcs. Rotation is extremely slow (~110s).
 * Designed to sit quietly behind hero typography.
 *
 * Three.js is dynamically imported — zero impact on LCP.
 */

export default function GlobeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let scene, camera, renderer, globeGroup;
    let animationId;
    let mounted = true;

    async function init() {
      const THREE = await import('three');
      if (!mounted || !mountRef.current) return;

      const mount = mountRef.current;
      const rect = mount.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w === 0 || h === 0) return;

      // ── Renderer ─────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(w, h, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      // ── Scene & Camera ───────────────────────────────
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
      camera.position.z = 3.4;

      globeGroup = new THREE.Group();
      scene.add(globeGroup);

      const R = 0.92;

      // ═══════════════════════════════════════════════════
      // WIREFRAME — visible light blue grid
      // ═══════════════════════════════════════════════════
      const wireGeo = new THREE.SphereGeometry(R, 52, 36);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xa8d4f0,
        wireframe: true,
        transparent: true,
        opacity: 0.10,
        depthWrite: false,
      });
      const wireframe = new THREE.Mesh(wireGeo, wireMat);
      globeGroup.add(wireframe);

      // Second inner wireframe for depth
      const wireGeo2 = new THREE.SphereGeometry(R * 0.95, 36, 24);
      const wireMat2 = new THREE.MeshBasicMaterial({
        color: 0x90c8e8,
        wireframe: true,
        transparent: true,
        opacity: 0.07,
        depthWrite: false,
      });
      globeGroup.add(new THREE.Mesh(wireGeo2, wireMat2));

      // Latitude rings — more visible
      for (let i = 0; i < 5; i++) {
        const lat = (i / 6) * Math.PI - Math.PI / 2;
        const latR = R * Math.cos(lat);
        const latY = R * Math.sin(lat);
        const ringGeo = new THREE.TorusGeometry(latR, 0.003, 8, 80);
        const ringMat = new THREE.MeshBasicMaterial({
          color: 0x90c8e0,
          transparent: true,
          opacity: 0.12,
          depthWrite: false,
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.y = latY;
        ring.rotation.x = Math.PI / 2;
        globeGroup.add(ring);
      }

      // ═══════════════════════════════════════════════════
      // NODES — visible glowing dots
      // ═══════════════════════════════════════════════════
      const nodeCount = 350;
      const nodeGroup = new THREE.Group();
      const nodeGeo = new THREE.SphereGeometry(0.008, 5, 5);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0x60b0e0,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
      });

      const phi_golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < nodeCount; i++) {
        const y = 1 - (i / (nodeCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi_golden * i;
        const x = Math.cos(theta) * radiusAtY * R;
        const z = Math.sin(theta) * radiusAtY * R;

        const dot = new THREE.Mesh(nodeGeo, nodeMat);
        dot.position.set(x, y * R, z);
        nodeGroup.add(dot);
      }
      globeGroup.add(nodeGroup);

      // ═══════════════════════════════════════════════════
      // CONNECTION ARCS — gossamer-thin, very faint
      // ═══════════════════════════════════════════════════
      const arcsGroup = new THREE.Group();
      const arcCount = 18;
      const arcPoints = [];
      for (let i = 0; i < nodeCount; i += Math.floor(nodeCount / 40)) {
        const y = 1 - (i / (nodeCount - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi_golden * i;
        arcPoints.push({
          x: Math.cos(theta) * radiusAtY * R,
          y: y * R,
          z: Math.sin(theta) * radiusAtY * R,
        });
      }

      const arcMat = new THREE.LineBasicMaterial({
        color: 0x80b8d8,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
      });

      for (let j = 0; j < arcCount; j++) {
        const a = arcPoints[Math.floor(Math.random() * arcPoints.length)];
        const b = arcPoints[Math.floor(Math.random() * arcPoints.length)];
        if (!a || !b || a === b) continue;
        const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
        if (dist > R * 1.3) continue;

        const mid = new THREE.Vector3(
          (a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2,
        ).normalize().multiplyScalar(R * 1.06);

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(a.x, a.y, a.z),
          mid,
          new THREE.Vector3(b.x, b.y, b.z),
        );
        const pts = curve.getPoints(12);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        arcsGroup.add(new THREE.Line(lineGeo, arcMat));
      }
      globeGroup.add(arcsGroup);

      // ═══════════════════════════════════════════════════
      // ANIMATION — extremely slow rotation
      // ═══════════════════════════════════════════════════
      const SPEED = prefersReduced ? 0 : 0.00015;

      function animate() {
        if (!mounted || !scene) return;
        if (!prefersReduced) {
          globeGroup.rotation.y += SPEED;
          globeGroup.rotation.x += SPEED * 0.04;
        }
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      }
      animate();
    }

    init().catch(() => {});

    // ── Resize ─────────────────────────────────────────
    function onResize() {
      if (!mountRef.current || !renderer) return;
      const { width, height } = mountRef.current.getBoundingClientRect();
      if (width === 0 || height === 0) return;
      renderer.setSize(width, height, false);
      if (camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      mounted = false;
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      if (renderer) {
        renderer.dispose();
        if (mountRef.current?.contains(renderer.domElement)) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
      if (scene) {
        scene.traverse((obj) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 select-none"
      aria-hidden="true"
    />
  );
}
