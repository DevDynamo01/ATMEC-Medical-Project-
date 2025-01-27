function Hero(){
    return(
        <div
        className="relative bg-cover bg-center text-center py-16 px-8 rounded-lg shadow-lg"
        style={{
          backgroundImage: "url('https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v996-026-kroiri0r.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=4577c6079475aabe21bb30ef2ce85b71')",
        }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white bg-opacity-80 rounded-lg"></div>
      
        {/* Content Wrapper */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
            Don't let <span className="text-blue-600">health challenges</span> sneak up on you.
            Experience <span className="text-teal-600">AI-powered healthcare</span> solutions.
          </h1>
      
          {/* Features List */}
          <ul className="text-left text-gray-700 mt-6 space-y-3">
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Connect with <span className="text-blue-600 font-semibold">expert doctors</span> anytime, anywhere.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Generate <span className="text-teal-600 font-semibold">personalized treatment plans</span> using AI.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Utilize advanced <span className="text-blue-600 font-semibold">image analysis</span> for accurate diagnostics.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Access a <span className="text-teal-600 font-semibold">smart healthcare chatbot</span> for instant assistance.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 font-bold mr-2">•</span>
              <span>Track health progress with <span className="text-blue-600 font-semibold">verified medical reports</span>.</span>
            </li>
          </ul>
      
        </div>
      </div>
      

    )
}
export default Hero;