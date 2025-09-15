export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        
        <div className="prose prose-lg mx-auto">
          <p className="text-lg text-muted-foreground mb-6">
            Welcome to our company! We are dedicated to providing exceptional services 
            and solutions to meet your needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To deliver innovative solutions that empower businesses and individuals 
                to achieve their goals through cutting-edge technology and exceptional service.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
              <p className="text-muted-foreground">
                To be the leading provider of comprehensive solutions that transform 
                the way people work and live, creating lasting value for our clients and communities.
              </p>
            </div>
          </div>
          
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Excellence in everything we do</li>
              <li>• Innovation and continuous improvement</li>
              <li>• Integrity and transparency</li>
              <li>• Customer-centric approach</li>
              <li>• Collaboration and teamwork</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}