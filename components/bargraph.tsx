'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarGraphProps {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

const BarGraph: React.FC<BarGraphProps> = ({ labels, datasets }) => {
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [isIntersecting, setIsIntersecting] = useState(false);
  const barGraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth < 1000 ? 370 : 800;
      const height = window.innerWidth < 1000 ? 200 : 400;
      setDimensions({ width, height });
    };

    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!barGraphRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.unobserve(barGraphRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(barGraphRef.current);

    return () => {
      if (barGraphRef.current) {
        observer.unobserve(barGraphRef.current);
      }
    };
  }, [barGraphRef]);

  const data = {
    labels: labels,
    datasets: datasets
  };

  const options = {
    indexAxis: 'y' as 'y', // Change 'string' to 'y' or 'x' if needed
    scales: {
      x: {
        beginAtZero: true
      }
    }
  };

  return (
    <div ref={barGraphRef} style={{ width: dimensions.width, height: dimensions.height }}>
      {isIntersecting && <Bar data={data} options={options} />}
    </div>
  );
};

export default BarGraph;
