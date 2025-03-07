'use client';
import React, { useEffect, useState } from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { PortFolioProject } from "@prisma/client";

export function HeroParallaxDemo() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchRandomProjects = async () => {
      try {
        const res = await fetch("/api/random-projects");  // Fetch random projects
        const data = await res.json();

        // Transform data into the desired format
        const transformedData = data.map((project : PortFolioProject) => ({
          title: project.title,
          link: project.url,
          thumbnail: project.url || 'https://picsum.photos/seed/1/1240/874', // fallback image
        }));

        setProducts(transformedData);  // Set the fetched and transformed data to products state
      } catch (error) {
        console.error("Error fetching random projects:", error);
      }
    };

    fetchRandomProjects();  // Fetch the random projects when the component mounts
  }, []);

  return <HeroParallax products={products} />;
}
