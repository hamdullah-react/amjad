const API_BASE_URL = '/api/contact-info'

export const contactService = {
  async getContactInfo() {
    try {
      const response = await fetch(API_BASE_URL)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch contact information')
      }

      return { success: true, data: data.data }
    } catch (error) {
      console.error('Error fetching contact info:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  },

  async updateContactInfo(contactData) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update contact information')
      }

      return { success: true, data: data.data, message: data.message }
    } catch (error) {
      console.error('Error updating contact info:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  },

  async sendContactEmail(formData) {
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email')
      }

      return { success: true, data, message: 'Email sent successfully' }
    } catch (error) {
      console.error('Error sending email:', error)
      return {
        success: false,
        error: error.message,
        data: null
      }
    }
  }
}

export default contactService