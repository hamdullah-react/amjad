export default function ServicesAreaPage() {
  const serviceAreas = [
    {
      region: "North America",
      cities: ["New York", "Los Angeles", "Chicago", "Toronto", "Vancouver"],
      description: "Comprehensive coverage across major metropolitan areas in the United States and Canada."
    },
    {
      region: "Europe",
      cities: ["London", "Paris", "Berlin", "Amsterdam", "Madrid"],
      description: "Serving key business hubs throughout Europe with localized expertise."
    },
    {
      region: "Asia Pacific",
      cities: ["Tokyo", "Singapore", "Sydney", "Hong Kong", "Seoul"],
      description: "Strategic presence in the fastest-growing markets in the Asia Pacific region."
    },
    {
      region: "Middle East & Africa",
      cities: ["Dubai", "Riyadh", "Cairo", "Johannesburg", "Lagos"],
      description: "Expanding our reach to serve emerging markets with tailored solutions."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Service Areas</h1>
        <p className="text-lg text-muted-foreground text-center mb-12">
          We provide our services across multiple regions worldwide
        </p>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {serviceAreas.map((area, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-semibold mb-3">{area.region}</h3>
              <p className="text-muted-foreground mb-4">{area.description}</p>
              
              <div>
                <h4 className="font-medium mb-2">Major Cities:</h4>
                <div className="flex flex-wrap gap-2">
                  {area.cities.map((city, cityIndex) => (
                    <span 
                      key={cityIndex} 
                      className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-muted rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Global Reach, Local Expertise</h2>
          <p className="text-muted-foreground text-center mb-6">
            Our international presence allows us to provide 24/7 support and localized solutions 
            tailored to your specific market needs.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Cities Worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold mb-4">Not in Your Area?</h2>
          <p className="text-muted-foreground mb-6">
            We're constantly expanding our service areas. Contact us to discuss remote service options.
          </p>
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  )
}