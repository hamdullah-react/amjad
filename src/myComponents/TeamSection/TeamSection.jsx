'use client'

import Image from 'next/image'
import { Linkedin, Twitter, Facebook, Instagram, MessageCircle, User } from 'lucide-react'
import { useTeam } from '@/contexts/TeamContext'

// Fallback data in case API fails
const fallbackTeamMembers = [
  {
    name: "Ahmed Al-Farsi",
    position: "Founder & CEO",
    image: "/images/IMG-20250910-WA0015.jpg",
    bio: "15+ years of experience leading Marhaba to success.",
    socialLinks: { 
      linkedin: "#", 
      twitter: "#", 
      facebook: "#", 
      instagram: "#",
      tiktok: "#"
    }
  },
  {
    name: "Fatima Rahman",
    position: "Operations Manager",
    image: "/images/IMG-20250910-WA0016.jpg",
    bio: "Expert in logistics and operational excellence.",
    socialLinks: { 
      linkedin: "#", 
      twitter: "#", 
      facebook: "#", 
      instagram: "#",
      tiktok: "#"
    }
  },
  {
    name: "Mohammed Khalid",
    position: "Customer Relations",
    image: "/images/IMG-20250910-WA0017.jpg",
    bio: "Dedicated to exceptional customer experiences.",
    socialLinks: { 
      linkedin: "#", 
      twitter: "#", 
      facebook: "#", 
      instagram: "#",
      tiktok: "#"
    }
  },
  {
    name: "Sara Al-Mansouri",
    position: "Logistics Specialist",
    image: "/images/IMG-20250910-WA0019.jpg",
    bio: "Ensuring smooth and efficient furniture transport.",
    socialLinks: { 
      linkedin: "#", 
      twitter: "#", 
      facebook: "#", 
      instagram: "#",
      tiktok: "#"
    }
  }
]

export default function TeamSection() {
  const { teamData, loading, error } = useTeam()

  // Use API data or fallback data
  const members = teamData && teamData.length > 0 ? teamData : fallbackTeamMembers

  if (loading) {
    return (
      <div className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Team</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Dedicated professionals committed to making your move seamless
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mt-4"></div>
        </div>

        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="flex justify-center space-x-3 pt-2 border-t border-gray-100">
                  {[1, 2, 3, 4, 5].map((icon) => (
                    <div key={icon} className="w-5 h-5 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    console.error('Error loading team data:', error)
    // Continue with fallback data but log the error
  }

  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">Team</span>
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Dedicated professionals committed to making your move seamless
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mt-4"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <div key={member.id || index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div className="relative h-50">
              <Image
                src={member.imageUrl || member.image || "/images/placeholder-team.jpg"}
                alt={member.name}
                fill
                style={{ objectFit: "cover" }}
                className="hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="256"%3E%3Crect width="400" height="256" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" font-size="16" fill="%239ca3af" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-bold mb-1 text-gray-800">{member.name}</h3>
              <p className="text-sm font-semibold text-blue-600 mb-3">
                {member.position}
              </p>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {member.bio || "Professional team member dedicated to excellence."}
              </p>
              
              {/* Social Icons at the bottom */}
              <div className="flex justify-center space-x-3 pt-2 border-t border-gray-100">
                {(member.socialLinks?.linkedin || member.social?.linkedin) && (
                  <a 
                    href={member.socialLinks?.linkedin || member.social?.linkedin} 
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {(member.socialLinks?.twitter || member.social?.twitter) && (
                  <a 
                    href={member.socialLinks?.twitter || member.social?.twitter} 
                    className="text-blue-400 hover:text-blue-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {(member.socialLinks?.facebook || member.social?.facebook) && (
                  <a 
                    href={member.socialLinks?.facebook || member.social?.facebook} 
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-5 h-5" />
                  </a>
                )}
                {(member.socialLinks?.instagram || member.social?.instagram) && (
                  <a 
                    href={member.socialLinks?.instagram || member.social?.instagram} 
                    className="text-pink-600 hover:text-pink-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                )}
                {(member.socialLinks?.tiktok || member.social?.tiktok) && (
                  <a 
                    href={member.socialLinks?.tiktok || member.social?.tiktok} 
                    className="text-black hover:text-gray-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Team Stats */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-8 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: `${members.length}+`, label: "Team Members" },
            { number: "15+", label: "Years Experience" },
            { number: "10K+", label: "Projects Completed" },
            { number: "24/7", label: "Customer Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}