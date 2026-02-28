import { useEffect, useRef, useCallback } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

interface NeuralNetworkProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
}

export function NeuralNetwork({
  className = '',
  nodeCount = 50,
  connectionDistance = 150,
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const initNodes = useCallback((width: number, height: number) => {
    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 2,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }
    return nodes;
  }, [nodeCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      if (nodesRef.current.length === 0) {
        nodesRef.current = initNodes(rect.width, rect.height);
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let frameCount = 0;
    const animate = () => {
      frameCount++;
      // Render every 2nd frame for performance (30fps)
      if (frameCount % 2 !== 0) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const nodes = nodesRef.current;
      const time = Date.now() * 0.001;

      // Update and draw nodes
      nodes.forEach((node, i) => {
        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > rect.width) node.vx *= -1;
        if (node.y < 0 || node.y > rect.height) node.vy *= -1;

        // Keep in bounds
        node.x = Math.max(0, Math.min(rect.width, node.x));
        node.y = Math.max(0, Math.min(rect.height, node.y));

        // Mouse interaction (only for every 5th node for performance)
        if (i % 5 === 0) {
          const dx = mouseRef.current.x - node.x;
          const dy = mouseRef.current.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            node.vx += dx * 0.0001;
            node.vy += dy * 0.0001;
          }
        }

        // Limit velocity
        const maxVel = 1;
        node.vx = Math.max(-maxVel, Math.min(maxVel, node.vx));
        node.vy = Math.max(-maxVel, Math.min(maxVel, node.vy));

        // Draw node with pulse effect
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
        const radius = node.radius * pulse;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, radius * 3
        );
        gradient.addColorStop(0, `hsla(195, 100%, 65%, ${1.0 * pulse})`);
        gradient.addColorStop(0.5, `hsla(195, 100%, 65%, ${0.5 * pulse})`);
        gradient.addColorStop(1, 'hsla(195, 100%, 65%, 0)');

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(195, 100%, 75%, ${pulse})`;
        ctx.fill();
      });

      // Draw connections (optimized - only check every 3rd node)
      ctx.strokeStyle = 'hsla(195, 100%, 65%, 0.4)';
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i += 3) {
        for (let j = i + 1; j < nodes.length; j += 3) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.5;
            ctx.strokeStyle = `hsla(195, 100%, 65%, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initNodes, connectionDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ opacity: 1.0 }}
    />
  );
}
