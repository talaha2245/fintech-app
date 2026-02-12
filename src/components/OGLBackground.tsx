import { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Plane, Program, Mesh, Color } from 'ogl';

const OGLBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const renderer = new Renderer({ alpha: true, dpr: 2 });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        containerRef.current.appendChild(gl.canvas);

        const camera = new Camera(gl);
        camera.position.z = 5;

        const scene = new Transform();

        const geometry = new Plane(gl, { width: 10, height: 10, widthSegments: 20, heightSegments: 20 });

        const vertex = /* glsl */ `
            attribute vec3 position;
            attribute vec2 uv;
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;

            void main() {
                vUv = uv;
                vec3 pos = position;
                
                // Flowing wave effect
                float elevation = sin(pos.x * 2.0 + uTime * 0.5) * 0.2 
                                + sin(pos.y * 1.5 + uTime * 0.4) * 0.2;
                
                pos.z += elevation;
                vElevation = elevation;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const fragment = /* glsl */ `
            precision highp float;
            uniform vec3 uColor;
            uniform float uTime;
            varying vec2 vUv;
            varying float vElevation;

            void main() {
                // Subtle glowing lines
                float alpha = smoothstep(0.4, 0.5, vElevation + 0.5);
                
                // Mix between deep black/blue and subtle white
                vec3 color = mix(vec3(0.0), uColor, alpha * 0.5);
                
                gl_FragColor = vec4(color, alpha * 0.15);
            }
        `;

        const program = new Program(gl, {
            vertex,
            fragment,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new Color(0.2, 0.2, 0.2) }, // Subtle gray
            },
            transparent: true,
            depthTest: false,
        });

        const mesh = new Mesh(gl, { geometry, program });
        mesh.setParent(scene);
        mesh.rotation.x = -0.4;

        let animationId: number;

        function resize() {
            if (!containerRef.current) return;
            renderer.setSize(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
            camera.perspective({ aspect: gl.canvas.width / gl.canvas.height });
        }

        window.addEventListener('resize', resize, false);
        resize();

        function update(t: number) {
            animationId = requestAnimationFrame(update);
            program.uniforms.uTime.value = t * 0.001;
            renderer.render({ scene, camera });
        }

        animationId = requestAnimationFrame(update);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
            if (containerRef.current && gl.canvas.parentNode === containerRef.current) {
                containerRef.current.removeChild(gl.canvas);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen"
        />
    );
};

export default OGLBackground;
