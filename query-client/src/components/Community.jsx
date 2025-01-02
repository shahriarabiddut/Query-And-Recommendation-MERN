import React from "react";
import bubble from '../assets/bubble.png'
import vote from '../assets/vote.png'
import check from '../assets/check.png'

const Community = () => {
    const cards = [
        {
          icon: bubble, 
          title: "Expert communities.",
          description:
            "Join a network of passionate individuals and industry experts who share insights, experiences, and advice. Connect with like-minded people to foster knowledge exchange and growth.",
        },
        {
          icon: vote,
          title: "The right answer. Right on top.",
          description:
            "Find the most accurate and reliable answers to your questions with community voting. The best solutions rise to the top, ensuring you get trustworthy and helpful information every time.",
        },
        {
          icon: check,
          title: "Share knowledge. Earn trust.",
          description:
            "Contribute your expertise to help others and build a reputation as a trusted source. Share valuable information, gain credibility, and earn the respect of your peers in the community.",
        },
      ];      

  return (
    <section className="bg-gray-300 ">
    <div className="flex flex-col items-center w-11/12 py-20 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-10 text-center">
      {import.meta.env.VITE_NAME || 'ProRecommendation'} Q&A communities are different. Here's how
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:-translate-y-5 hover:shadow-xl text-center"
          >
            <img src={card.icon} alt={card.title} className="w-24 h-20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 text-justify">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Community;
