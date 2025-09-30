'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const TeamContext = createContext()

export function TeamProvider({ children }) {
  const [teamData, setTeamData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTeamData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const res = await fetch('/api/team')
      
      if (!res.ok) {
        throw new Error('Failed to fetch team data')
      }
      
      const result = await res.json()
      
      if (result.success) {
        // Filter only active team members and sort by order
        const activeMembers = result.data
          .filter(member => member.isActive)
          .sort((a, b) => a.order - b.order)
        
        setTeamData(activeMembers)
      } else {
        setTeamData([])
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching team data:', err)
      setTeamData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTeamData()
  }, [])

  const value = {
    teamData,
    loading,
    error,
    refetch: fetchTeamData
  }

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  )
}

export function useTeam() {
  const context = useContext(TeamContext)
  if (context === undefined) {
    throw new Error('useTeam must be used within a TeamProvider')
  }
  return context
}