import React, { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import AllRoutes from "./Routes/AllRoutes";


function App() {
  useEffect(() => {

      const options = {
        autoConfig: true, // Allows Facebook to automatically track button clicks
        debug: false,     // Set to true if you want to see logs in console (for testing)
      };
      ReactPixel.init('1474358946901095', {}, options);
      ReactPixel.pageView();
    }, []);

    return (
     <>
      <AllRoutes />
     </>
    );
}

export default App;