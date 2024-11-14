// src/components/Testimonials.jsx
import React from 'react';
import { Carousel, CarouselItem } from '@shadcn/ui'; // Adjust import based on the library's documentation

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    testimonial: "This app has transformed the way I manage my job applications. Highly recommend!"
  },
  {
    name: "Jane Smith",
    role: "Product Manager",
    testimonial: "An excellent tool for keeping track of my ATS score and job applications."
  },
  {
    name: "Emily Johnson",
    role: "UX Designer",
    testimonial: "A game-changer for anyone looking to streamline their job search process."
  }
];

function Testimonials() {
  return (
    <section className="py-8 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-6">What Our Clients Say</h2>
        <Carousel className="space-y-6">
          {testimonials.map((item, index) => (
            <CarouselItem key={index} className="p-4 bg-white shadow-md rounded-lg">
              <p className="text-gray-700 mb-2">"{item.testimonial}"</p>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-gray-500">{item.role}</p>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default Testimonials;
